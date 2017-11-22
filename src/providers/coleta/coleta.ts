import { RotaClienteProvider } from './../rota-cliente/rota-cliente';
import { SqlLiteProvider } from './../sql-lite/sql-lite';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import * as moment_timezone from 'moment-timezone';
import 'rxjs/add/operator/map';

/*
  Generated class for the ColetaProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ColetaProvider {

  constructor(public http: Http, public banco: SqlLiteProvider, public rotaCliente: RotaClienteProvider) {
    console.log('Hello ColetaProvider Provider');
    this.banco.abrirBanco(false);
  }
  //manter coleta 
  iniciarColeta(rotaID) {
    let query = "INSERT INTO coletas(rota, caminhao, data, sincronizado, finalizado) " +
      " VALUES (?,?,?,?,?)";
    return this.banco.banco.executeSql(query, [rotaID, 1,moment_timezone.tz('America/Sao_Paulo').format('DD/MM/YYYY'), 'N', 'N']);
  }

  iniciarColetaCliente(data) {
    console.log(data.cliente);
    let query = 'INSERT INTO coletaCliente(cliente, coleta, quantidade, hora, temperatura, alizarol) ' +
      ' values (?,?,?,?,?,?) ';
    return this.banco.banco.executeSql(query, [data.cliente, data.coleta, data.quantidade, data.hora,
    data.temperatura, data.alizarol]);
  }

  salvarColetaCliente(data) {
    console.log(data);
    let query = 'update coletaCliente set quantidade=?, hora=?, temperatura=?, alizarol=? ' +
      ' where cliente = ? and coleta =? ';
    return this.banco.banco.executeSql(query, [data.quantidade, data.hora,
    data.temperatura, (data.alizarol ? 'S' : 'N'), data.cliente, data.coleta]);
  }
  //recebe por parametro se vai ser somente os finalizados (S), não finalizados (N) ou todos (T) 
  consultarColeta(Finalizado = 'T', Sincronizado = 'T') {
    var query = "Select cl.* from coletas cl";
    var where = "";
    if (Finalizado == 'S')
      where += " cl.finalizado = 'S' ";

    if (Finalizado == 'N')
      where += " cl.finalizado = 'N' ";

    if (where != "" && ((Sincronizado == 'S') || (Sincronizado == 'N')))
      where += " and ";

    if (Sincronizado == 'S')
      where += " cl.sincronizado = 'S' ";

    if (Sincronizado == 'N')
      where += " cl.sincronizado = 'N' ";

    if (where != "")
      query += " where " + where;

    query += " order by data desc";
    console.error(query);

    return this.banco.banco.executeSql(query, []);
  }

  consultaColetaCliente(idColeta, idCliente) {
    var query = "Select cc.*, c.*, cl.*, rc.ordem as ordem from coletaCliente cc, coletas cl, clientes c, rotaCliente rc " +
      " where (cl.id=cc.coleta) and (c.id=cc.cliente) and ((rc.rota = cl.rota) and (rc.cliente=cc.cliente)) ";
    if (idColeta > 0)
      query += " and (cc.coleta = " + idColeta + ")";
    if (idCliente > 0)
      query += " and (cc.cliente = " + idCliente + ")";

    query += " order by hora, ordem ";
    console.error(query);

    return this.banco.banco.executeSql(query, []);
  }

  finalizarColeta(idColeta) {
    let query = "update coletas set finalizado='S' where id = ?";
    return this.banco.banco.executeSql(query, [idColeta]);
  }

  sincronizarColeta() {
    let query = "update coletas set sincronizado='S'";
    return this.banco.banco.executeSql(query, []);
  }
  validarColeta(idColeta){

  }
}

import { RotaClienteProvider } from './../rota-cliente/rota-cliente';
import { SqlLiteProvider } from './../sql-lite/sql-lite';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ColetaProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ColetaProvider {

  constructor(public http: Http, public banco: SqlLiteProvider, public rotaCliente:RotaClienteProvider) {
    console.log('Hello ColetaProvider Provider');
    this.banco.abrirBanco(false);
  }
//manter coleta 
  iniciarColeta(rotaID) {
    let query = "INSERT INTO coletas(rota, caminhao, data, sincronizado) " +
      " VALUES (?,?,?,?)";
    return this.banco.banco.executeSql(query, [rotaID, 1, '5', 'N']);
  }
  iniciarColetaCliente(data){
    console.log(data.cliente);
    let query = 'INSERT INTO coletaCliente(cliente, coleta, quantidade, hora, temperatura, alizarol) '+
                    ' values (?,?,?,?,?,?) ';
    return this.banco.banco.executeSql(query, [data.cliente,data.coleta,data.quantidade,data.hora,
                                              data.temperatura, data.alizarol]);                
  }
  consultaColetaCliente(idColeta){
    var query = "Select cc.*, c.*, cl.*, rc.ordem as ordem from coletaCliente cc, coletas cl, clientes c, rotaCliente rc "+
                " where (cl.id=cc.coleta) and (c.id=cc.cliente) and ((rc.rota = cl.rota) and (rc.cliente=cc.cliente)) ";
    if(idColeta > 0)
      query += " and (cc.coleta = "+idColeta+")";
    query += " order by hora, ordem ";
    console.error(query);
    
    return this.banco.banco.executeSql(query,[]);  
  }

}

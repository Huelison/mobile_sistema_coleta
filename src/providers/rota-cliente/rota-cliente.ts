import { SqlLiteProvider } from './../sql-lite/sql-lite';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the RotaClienteProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class RotaClienteProvider {

  constructor(public http: Http,public banco:SqlLiteProvider) {
    console.log('Hello RotaClienteProvider Provider');
  }
  getClientesRota(rotaID){
    return this.banco.banco.executeSql('Select * from rotaCliente r, clientes c'+
                                      ' where r.rota=? and r.cliente=c.id order by r.ordem',[rotaID]);
  }
}

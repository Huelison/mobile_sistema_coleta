import { SqlLiteProvider } from './../sql-lite/sql-lite';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the RotaProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class RotaProvider {

  constructor(public http: Http, public banco:SqlLiteProvider) {
    this.banco.abrirBanco(false);
    console.log('Hello RotaProvider Provider');
  }

  getAllRotas(){
    return this.banco.banco.executeSql('Select * from rotas ',{});
  }

}

import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the SqlLiteProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class SqlLiteProvider {
  public banco: SQLiteObject;
  constructor(public http: Http, private sqlite: SQLite) {
    console.log('Hello SqlLiteProvider Provider');
  }
  abrirBanco(criar: boolean) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        this.banco = db;
        if (criar) {
          console.log('aqui');
          this.createDB();
        }
      })
      .catch(e => console.error('SQLLite: ', e));
  }
  createDB() {
    console.log('Create DB');
    this.banco.executeSql('create table IF NOT EXISTS clientes( ' +
      ' id integer primary key,' +
      ' nome text,' +
      ' endereco text,' +
      ' latitude text,' +
      ' longitude text, ' +
      ' fone text )', {})
      .then(() => console.log('Tabela clientes criada com sucesso!'))
      .catch(e => console.error('SQLLite: ', e));

    this.banco.executeSql('create table IF NOT EXISTS rotas( ' +
      ' id integer primary key,' +
      ' nome text,' +
      ' caminhao_atual integer)', {})
      .then(() => console.log('Tabela rotas criada com sucesso!'))
      .catch(e => console.error('SQLLite: ', e));

    this.banco.executeSql('create table IF NOT EXISTS rotacliente( ' +
      ' ordem integer,' +
      ' rota integer not null ,' +
      ' cliente integer not null ,' +
      ' primary key(cliente, rota))', {})
      .then(() => console.log('Tabela rotacliente criada com sucesso!'))
      .catch(e => console.error('SQLLite: ', e));

  }
}

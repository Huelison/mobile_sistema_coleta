import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
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
  constructor(public http: Http, private sqlite: SQLite, public toastCtrl: ToastController) {
    console.log('Hello SqlLiteProvider Provider');
    this.abrirBanco(true);
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
      .catch(e => {
        let toast = this.toastCtrl.create({
          message: 'Ocorreu um erro ao criar o banco.',
          duration: 5200,
          position: 'bottom',
          showCloseButton: true,
          closeButtonText: 'OK'
        });
        toast.present();
        console.error('SQLLite: ', e)
      });
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
      .catch(e => {
        let toast = this.toastCtrl.create({
          message: 'Ocorreu um erro ao criar Tabela clientes .',
          duration: 5200,
          position: 'bottom',
          showCloseButton: true,
          closeButtonText: 'OK'
        });
        toast.present();
        console.error('SQLLite: ', e)
      });

    this.banco.executeSql('create table IF NOT EXISTS rotas( ' +
      ' id integer primary key,' +
      ' nome text,' +
      ' caminhao_atual integer)', {})
      .then(() => console.log('Tabela rotas criada com sucesso!'))
      .catch(e => {
        let toast = this.toastCtrl.create({
          message: 'Ocorreu um erro ao criar Tabela rotas.',
          duration: 5200,
          position: 'bottom',
          showCloseButton: true,
          closeButtonText: 'OK'
        });
        toast.present();
        console.error('SQLLite: ', e)
      });

    this.banco.executeSql('create table IF NOT EXISTS rotacliente( ' +
      ' ordem integer,' +
      ' rota integer not null ,' +
      ' cliente integer not null ,' +
      ' primary key(cliente, rota))', {})
      .then(() => console.log('Tabela rotacliente criada com sucesso!'))
      .catch(e => {
        let toast = this.toastCtrl.create({
          message: 'Ocorreu um erro ao criar Tabela rotacliente.',
          duration: 5200,
          position: 'bottom',
          showCloseButton: true,
          closeButtonText: 'OK'
        });
        toast.present();
        console.error('SQLLite: ', e)
      });

    this.banco.executeSql('create table IF NOT EXISTS coletas( ' +
      ' id integer primary key autoincrement,' +
      ' rota integer not null,' +
      ' caminhao integer not null,' +
      ' data string not null,' +
      ' finalizado string not null,' +
      ' sincronizado string not null)', {})
      .then(() => console.log('Tabela coleta criada com sucesso!'))
      .catch(e => {
        let toast = this.toastCtrl.create({
          message: 'Ocorreu um erro ao criar Tabela coleta.',
          duration: 5200,
          position: 'bottom',
          showCloseButton: true,
          closeButtonText: 'OK'
        });
        toast.present();
        console.error('SQLLite: ', e)
      });

    this.banco.executeSql('create table IF NOT EXISTS coletaCliente( ' +
      ' cliente integer not null ,' +
      ' coleta integer not null ,' +
      ' quantidade double not null,' +
      ' hora string ,' +
      ' temperatura double ,' +
      ' alizarol string, ' +
      ' primary key(cliente, coleta))', {})
      .then(() => console.log('Tabela coletaCliente criada com sucesso!'))
      .catch(e => {
        let toast = this.toastCtrl.create({
          message: 'Ocorreu um erro ao criar Tabela coletaCliente.',
          duration: 5200,
          position: 'bottom',
          showCloseButton: true,
          closeButtonText: 'OK'
        });
        toast.present();
        console.error('SQLLite: ', e)
      });

      this.banco.executeSql('create table IF NOT EXISTS usuarios( ' +
      ' uID string not null, ' +
      ' email string,' +
      ' nome string, ' +
      ' caminhao integer, ' +
      ' primary key(uID))', {})
      .then(() => console.log('Tabela usuarios criada com sucesso!'))
      .catch(e => {
        let toast = this.toastCtrl.create({
          message: 'Ocorreu um erro ao criar Tabela usuarios.',
          duration: 5200,
          position: 'bottom',
          showCloseButton: true,
          closeButtonText: 'OK'
        });
        toast.present();
        console.error('SQLLite: ', e)
      });

      this.banco.executeSql('create table IF NOT EXISTS caminhoes( ' +
        ' id integer not null, ' +
        ' placa string, ' +
        ' primary key(id))', {})
        .then(() => console.log('Tabela caminhoes criada com sucesso!'))
        .catch(e => {
          let toast = this.toastCtrl.create({
            message: 'Ocorreu um erro ao criar Tabela caminhoes.',
            duration: 5200,
            position: 'bottom',
            showCloseButton: true,
            closeButtonText: 'OK'
          });
          toast.present();
          console.error('SQLLite: ', e)
        });
  }
}

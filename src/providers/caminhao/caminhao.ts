import { SqlLiteProvider } from './../sql-lite/sql-lite';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { ToastController } from 'ionic-angular';
import * as firebase from 'firebase/app';

/*
  Generated class for the CaminhaoProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class CaminhaoProvider {

  constructor(public toastCtrl: ToastController, public banco: SqlLiteProvider,
    public afDB: AngularFireDatabase) {
    this.banco.abrirBanco(false);
  }

  inserirCaminhao(id) {
    this.afDB.object('/caminhoes/-key' + id).subscribe(dados => {
      if (dados != null) {
        this.excluirCaminhao().then((dt) => {
          let query = "INSERT or replace INTO caminhoes(id, placa) " +
            " VALUES (?,?)";
          this.banco.banco.executeSql(query, [dados.id, dados.placa])
            .then((data) => {
            })
            .catch(e => {
              let toast = this.toastCtrl.create({
                message: 'Ocorreu um erro ao inserir caminhão.',
                duration: 5200,
                position: 'bottom',
                showCloseButton: true,
                closeButtonText: 'OK'
              });
              toast.present();
              console.log(e)
            });
        })
          .catch(e => {
            let toast = this.toastCtrl.create({
              message: 'Ocorreu um erro ao inserir o caminhão.',
              duration: 5200,
              position: 'bottom',
              showCloseButton: true,
              closeButtonText: 'OK'
            });
            toast.present();
            console.log(e)
          });
      }
    }, err => {
      let toast = this.toastCtrl.create({
        message: 'Ocorreu um erro ao consultar caminhão.' + '' + err.message,
        duration: 5200,
        position: 'bottom',
        showCloseButton: true,
        closeButtonText: 'OK'
      });
      toast.present();
      console.log(err)
    });
  }

  excluirCaminhao() {
    let query = "delete from caminhoes";
    return this.banco.banco.executeSql(query, []);
  }

  getCaminhao() {
    return this.banco.banco.executeSql('Select * from caminhoes ', {});
  }
}

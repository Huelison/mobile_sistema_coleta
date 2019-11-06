import { CaminhaoProvider } from './../caminhao/caminhao';
import { SqlLiteProvider } from './../sql-lite/sql-lite';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class LoginProvider {
  user: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth, public toastCtrl: ToastController, public banco: SqlLiteProvider,
    public afDB: AngularFireDatabase, public caminhaoProvider: CaminhaoProvider) {

    this.user = afAuth.authState;
    this.banco.abrirBanco(false);
  }

  signIn(email:string, senha) {
    email = email.trim();
    this.afAuth.auth.signInWithEmailAndPassword(email, senha)
      .then(res => {
        console.log(res.uid);
        var uid = res.uid;
        this.inserirUsuario(uid);
      })
      .catch(err => {
        let toast = this.toastCtrl.create({
          message: 'Ocorreu um erro ao realizar Login.' + '' + err.message,
          duration: 5200,
          position: 'bottom',
          showCloseButton: true,
          closeButtonText: 'OK'
        });
        toast.present();
        console.log(err)
      });
  }
  //onlylLogout é usado para não excluir o usuario
  signOut(showLogout: boolean = false, onlyLogout: boolean = false) {
    console.log(onlyLogout);
    return this.afAuth.auth.signOut()
      .then(res => {
        if (!(onlyLogout)) {
          console.log('logout completo');
          this.excluirUsuario().then((dt) => {
            if (showLogout) {
              let toast = this.toastCtrl.create({
                message: 'Usuário desconectado com sucesso.',
                duration: 5200,
                position: 'bottom',
                showCloseButton: true,
                closeButtonText: 'OK'
              });
              toast.present();
            }
          }).catch(e => {
            let toast = this.toastCtrl.create({
              message: 'Ocorreu um erro ao desconectar usuário.' + '' + e.message,
              duration: 5200,
              position: 'bottom',
              showCloseButton: true,
              closeButtonText: 'OK'
            });
            toast.present();
            console.log(e)
          });
        }else{
          console.log('somente logout');
        }
        console.log(res)
      }).catch(err => {
        console.log(err);
        let toast = this.toastCtrl.create({
          message: 'Ocorreu um erro ao desconectar usuário.' + '' + err.message,
          duration: 5200,
          position: 'bottom',
          showCloseButton: true,
          closeButtonText: 'OK'
        });
        toast.present();
      });
  }

  inserirUsuario(uID) {
    this.afDB.object('/usuarios/' + uID).subscribe(data => {
      if (data != null) {

        this.excluirUsuario().then((dt) => {
          console.debug('===============================================');
          console.warn(data);
          console.debug('===============================================');
          this.caminhaoProvider.inserirCaminhao(data.caminhao);
          let query = "INSERT or replace INTO usuarios(uID, email, nome, caminhao) " +
            " VALUES (?,?,?,?)";
          return this.banco.banco.executeSql(query, [data.uID, data.email, data.nome, data.caminhao])
            .then((data) => {
              this.signOut(false,true);
            })
            .catch(e => {
              let toast = this.toastCtrl.create({
                message: 'Ocorreu um erro ao inserir o usuário.' + '' + e.message,
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
              message: 'Ocorreu um erro ao inserir o usuário.' + '' + e.message,
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
        message: 'Ocorreu um erro ao consultar usuário.' + '' + err.message,
        duration: 5200,
        position: 'bottom',
        showCloseButton: true,
        closeButtonText: 'OK'
      });
      toast.present();
      console.log(err)
    });
    
  }

  excluirUsuario() {
    let query = "delete from usuarios";
    return this.banco.banco.executeSql(query, []);
  }

  getUsuario() {
    return this.banco.banco.executeSql('Select * from usuarios ', []);
  }
}

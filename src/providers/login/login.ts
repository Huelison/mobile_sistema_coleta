import { Injectable } from '@angular/core'; 
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { ToastController } from 'ionic-angular'; 
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class LoginProvider {
  user: Observable<firebase.User>;

  constructor(public afAuth: AngularFireAuth, public toastCtrl: ToastController, public afDB: AngularFireDatabase) {
    this.user = afAuth.authState;
  }

  signIn(email, senha) {
    this.afAuth.auth.signInWithEmailAndPassword(email, senha)
      .then(res => {
        console.log(res.uid);
        var uid = res.uid;
        this.afDB.list("/usuarios/").update(uid, { name: email })
          .then(res => console.log(res))
          .catch(err => console.log(err));
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

  signUp(email, senha) {
    this.afAuth.auth.createUserWithEmailAndPassword(email, senha)
      .then(res => {
        console.log(res.uid);
        var uid = res.uid;
        this.afDB.list("/usuarios/").update(uid, { name: email })
          .then(res => console.log(res))
          .catch(err => console.log(err));
      })
      .catch(err => {
        let toast = this.toastCtrl.create({
          message: 'Ocorreu um erro ao realizar Cadastro.' + '' + err.message,
          duration: 5200,
          position: 'bottom',
          showCloseButton: true,
          closeButtonText: 'OK'
        });
        toast.present();
        console.log(err)
      });
  }

  signOut() {
    this.afAuth.auth.signOut()
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }
}

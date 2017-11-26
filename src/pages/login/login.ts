import { SplashScreen } from '@ionic-native/splash-screen';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from './../home/home';
import { LoginProvider } from './../../providers/login/login';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string;
  senha: string;
  homePage: HomePage;
  public hideSplash: boolean;//está fechado o splash
  public sair: boolean;//controla se a função requisitada vem do sair
  public importarDados: boolean;//controla se a função requisitada vem da tela de importar

  constructor(public navCtrl: NavController, public navParams: NavParams, public loginProvider: LoginProvider,
    public splashScreen: SplashScreen) {
    this.email = '';
    this.senha = '';
    this.hideSplash = false;
    if (navParams.get('sair') == 'true') {
      this.sair = true;
    } else {
      this.sair = false;
    }

    if (navParams.get('importarDados') == 'true') {
      this.importarDados = true;
    } else {
      this.importarDados = false;
    }
  }

  ionViewDidEnter() {
    this.getLogado();
  }

  getLogado() {
    this.loginProvider.getUsuario().then((resp) => {
      let usuario: boolean = false;
      if (resp == null) {
        return;
      } else {
        var output = [];
        if (resp.rows) {
          console.log(resp);
          if (resp.rows.length > 0) {
            usuario = true;
          }
        }
      }

      if (!this.hideSplash) {
        this.splashScreen.hide();
        this.hideSplash = true;
      }

      if (!usuario || this.sair || this.importarDados) {
        if (!this.importarDados)
          this.loginProvider.signOut();

        this.loginProvider.user.subscribe(user => {
          if (!user) {
            this.navCtrl.popToRoot();
            return;
          } else {
            this.loginProvider.inserirUsuario(user.uid);
            this.navCtrl.setRoot(HomePage);
            if(this.importarDados)
              this.navCtrl.push('ImportaDadosPage');
          }
        });
      } else {
        this.navCtrl.setRoot(HomePage);
      }
    });
  }

  getLogin() {
    this.loginProvider.signIn(this.email, this.senha);
  }

}
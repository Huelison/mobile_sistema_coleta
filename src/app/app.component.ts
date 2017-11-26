import { SqlLiteProvider } from './../providers/sql-lite/sql-lite';
import { LoginProvider } from './../providers/login/login';
import { LoginPage } from './../pages/login/login';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginPage;
  @ViewChild(Nav) nav: Nav;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public loginProvider: LoginProvider,
    public menuCtrl: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //statusBar.backgroundColorByName('black');
      //statusBar.show();
      statusBar.styleDefault();
      //splashScreen.hide();
    });
  }

  abrirPagina(pagina) {
    if (this.nav.getActive().component.name !== "HomePage") {
      this.nav.popToRoot();
      console.log('teste' + this.nav.getActive().component.name);
    }
    switch (pagina) {
      case 'ImportaDados':
        //aqui faz login
        this.menuCtrl.close();
        this.loginProvider.signOut().then(res => {
          this.nav.setRoot(LoginPage, { importarDados: 'true' });
        });
        //        this.nav.push('ImportaDadosPage');
        break;
      case 'ListaRotas':
        this.nav.push('ListaRotasPage');
        break;
      case 'ListaColetas':
        this.nav.push('ListaColetasPage');
        break;
      default:
        break;
    }
  }

  sair() {
    this.menuCtrl.close();
    this.loginProvider.signOut(true).then(res => {
      this.nav.setRoot(LoginPage, { sair: 'true' });
    });

  }
}


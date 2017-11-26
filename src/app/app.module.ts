import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, LoadingController, DateTime, NavController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpModule } from '@angular/http';
import { SQLite } from '@ionic-native/sqlite';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { format, subDays } from 'date-fns';
import * as moment from 'moment';
import * as moment_timezone from 'moment-timezone';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from './../pages/login/login';

import { SqlLiteProvider } from '../providers/sql-lite/sql-lite';
import { RotaClienteProvider } from '../providers/rota-cliente/rota-cliente';
import { RotaProvider } from '../providers/rota/rota';
import { ColetaProvider } from '../providers/coleta/coleta';
import { LoginProvider } from '../providers/login/login';
import { CaminhaoProvider } from '../providers/caminhao/caminhao';

var config = {
  apiKey: "AIzaSyA-XNBTD3Q3F4EFD9qFPMdfl1pYkeYZAss",
  authDomain: "teste-92e08.firebaseapp.com",
  databaseURL: "https://teste-92e08.firebaseio.com",
  projectId: "teste-92e08",
  storageBucket: "teste-92e08.appspot.com",
  messagingSenderId: "574611796994"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    SqlLiteProvider,
    RotaClienteProvider,
    RotaProvider,
    LoadingController,
    ColetaProvider,
    DateTime,
    AngularFireAuth,
    LoginProvider,
    CaminhaoProvider
  ]
})
export class AppModule { }

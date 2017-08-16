import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpModule } from '@angular/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import {AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SqlLiteProvider } from '../providers/sql-lite/sql-lite';
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
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SqlLiteProvider
  ]
})
export class AppModule {}

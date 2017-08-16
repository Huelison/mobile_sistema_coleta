import { SqlLiteProvider } from './../../providers/sql-lite/sql-lite';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,public banco:SqlLiteProvider) {
    this.banco.abrirBanco(true);
  }

}

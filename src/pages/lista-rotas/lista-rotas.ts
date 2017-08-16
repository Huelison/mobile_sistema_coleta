import { SqlLiteProvider } from './../../providers/sql-lite/sql-lite';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ListaRotasPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-rotas',
  templateUrl: 'lista-rotas.html',
})
export class ListaRotasPage {
  listaRotas :any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public banco: SqlLiteProvider) {
    this.banco.abrirBanco(false);
    this.banco.banco.executeSql('Select * from rotas ',{})
      .then(resp => {
        let ls = [];
        if (resp == null) {
          return;
        }
        var output = [];
        if (resp.rows) {
          console.log(resp);
          if (resp.rows.length > 0) {
            for (var i = 0; i < resp.rows.length; i++) {
              output.push(resp.rows.item(i));
            }
          }
          console.log(output);
        }
        this.listaRotas = output;
      }).catch(Error =>{console.log(Error)});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaRotasPage');
  }

}

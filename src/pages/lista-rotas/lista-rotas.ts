import { RotaProvider } from './../../providers/rota/rota';
import { SqlLiteProvider } from './../../providers/sql-lite/sql-lite';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, MenuController } from 'ionic-angular';

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
  listaRotas: any;
  load: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public providerRota: RotaProvider, 
              public menuCtrl: MenuController,public loadingCtrl: LoadingController) {

  }

  exibirClientes(rota) {
    this.navCtrl.push('ListaRotaClientePage', { rotaID: rota });
  }

  iniciarColeta(Rota) {

  }

  ionViewDidLoad() {
    this.carregarRotas();    
    console.log('ionViewDidLoad ListaRotasPage');
  }

  carregarRotas() {
    this.load = this.loadingCtrl.create({
      content: 'Aguarde, Carregando Rotas...',
    });
    this.load.present();
    this.providerRota.getAllRotas()
      .then(resp => {
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
        this.load.dismiss();
        this.menuCtrl.close();
      }).catch(Error => {
        this.load.dismiss();
        this.menuCtrl.close();
        console.error(Error)
      });
  }
}

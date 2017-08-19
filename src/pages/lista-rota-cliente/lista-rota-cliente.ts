import { RotaClienteProvider } from './../../providers/rota-cliente/rota-cliente';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

/**
 * Generated class for the ListaRotaClientePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-rota-cliente',
  templateUrl: 'lista-rota-cliente.html',
})
export class ListaRotaClientePage {
  public load:any;
  public listaRotaCliente:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public providerRotaCliente:RotaClienteProvider,public loadingCtrl:LoadingController) { 
    let rota = navParams.data.rotaID;
    this.carregarRotas(rota);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaRotaClientePage');
  }

  carregarRotas(rotaID) {
    this.load = this.loadingCtrl.create({
      content: 'Aguarde, Carregando Rotas...',
    });
    this.load.present();
    this.providerRotaCliente.getClientesRota(rotaID)
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
        this.listaRotaCliente = output;
        this.load.dismiss();
      }).catch(Error => {
        this.load.dismiss();
        console.error(Error)
      });
  }
}

import { RotaClienteProvider } from './../../providers/rota-cliente/rota-cliente';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

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
  public load: any;
  public listaRotaCliente: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, 
    public providerRotaCliente: RotaClienteProvider, public toastCtrl: ToastController) {
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
        let toast = this.toastCtrl.create({
          message: 'Ocorreu um erro ao recuperar dados da rota selecionada.',
          duration: 5200,
          position: 'bottom',
          showCloseButton: true,
          closeButtonText: 'OK'
        });
        toast.present();
        console.error(Error)
      });
  }
}

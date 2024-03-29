import { ColetaProvider } from './../../providers/coleta/coleta';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

/**
 * Generated class for the ListaColetaClientePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-coleta-cliente',
  templateUrl: 'lista-coleta-cliente.html',
})
export class ListaColetaClientePage {
  public listaColetas: any;
  public load: any;
  public coleta;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController,
    public toastCtrl: ToastController, public providerColeta: ColetaProvider) {
    this.coleta = navParams.data.coletaID;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaColetaClientePage');
  }

  ionViewDidEnter() {
    this.carregarColetas(this.coleta);
  }

  carregarColetas(coleta) {
    this.load = this.loadingCtrl.create({
      content: 'Aguarde, Carregando Coletas...',
    });
    this.load.present();

    this.providerColeta.consultaColetaCliente(coleta, 0)
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
        this.listaColetas = output;
        this.load.dismiss();
      }).catch(Error => {
        this.load.dismiss();
        let toast = this.toastCtrl.create({
          message: 'Ocorreu um erro ao recuperar dados da coleta id: ' + coleta + '.',
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

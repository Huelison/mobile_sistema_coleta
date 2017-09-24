import { ColetaProvider } from './../../providers/coleta/coleta';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, ToastController } from 'ionic-angular';

/**
 * Generated class for the ListaColetasPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-coletas',
  templateUrl: 'lista-coletas.html',
})
export class ListaColetasPage {
  listaColetas: any;
  load: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public providerColeta: ColetaProvider,
    public menuCtrl: MenuController, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListaColetasPage');
  }

  ionViewDidEnter() {
    this.carregarRotas();
  }

  exibirColetasClientes(coleta) {
    this.navCtrl.push('ListaColetaClientePage', { coletaID: coleta })
  }

  carregarRotas() {
    this.load = this.loadingCtrl.create({
      content: 'Aguarde, Carregando Coletas...',
    });
    this.load.present();
    this.providerColeta.consultarColeta('T')
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
        this.menuCtrl.close();
      }).catch(Error => {
        this.load.dismiss();
        this.menuCtrl.close();
        let toast = this.toastCtrl.create({
          message: 'Ocorreu um erro ao recuperar dados das coletas.',
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

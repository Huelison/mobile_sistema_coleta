import { ColetaProvider } from './../../providers/coleta/coleta';
import { SqlLiteProvider } from './../../providers/sql-lite/sql-lite';
import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public listaColetas: any;
  public exibeColetas: boolean;
  public load: any;
  constructor(public navCtrl: NavController, public providerColeta: ColetaProvider, public banco: SqlLiteProvider, public loadingCtrl: LoadingController) {
    this.banco.abrirBanco(true);

    //this.carregarColetas();
  }
  ionViewDidLoad() {


  }
  ionViewDidEnter() {
    this.carregarColetas();
  }
  carregarColetas() {
    this.load = this.loadingCtrl.create({
      content: 'Aguarde, Carregando Coletas...',
    });
    this.load.present();
    this.providerColeta.consultaColetaCliente(15)
      .then(resp => {
        if (resp == null) {
          return;
        }
        var output = [];
        this.exibeColetas = true;
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
        console.error(Error)
      });
  }
}

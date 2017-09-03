import { ColetaProvider } from './../../providers/coleta/coleta';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

/**
 * Generated class for the ManterColetasPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
export class iColeta {
  public cliente: number;
  public cliente_nome: string;
  public coleta: number;
  public quantidade: number;
  public hora: string;
  public temperatura: number;
  public alizarol: boolean;
}

@IonicPage()
@Component({
  selector: 'page-manter-coletas',
  templateUrl: 'manter-coletas.html',
})
export class ManterColetasPage {
  public data: iColeta;
  public cliente: any;
  public coleta: any;
  public load: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public providerColeta: ColetaProvider) {
    this.cliente = navParams.data.clienteID;
    this.coleta = navParams.data.coletaID;
    this.data = new iColeta();
    this.carregarColetaCliente();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManterColetasPage');
  }

  salvarColeta() {
    this.load = this.loadingCtrl.create({
      content: 'Aguarde, Salvando Coleta...',
    });
    this.load.present();
    this.providerColeta.salvarColetaCliente(this.data)
      .then((data) => {
        this.load.dismiss();
        console.log('elemento atualizado com sucesso');
        console.log(data);
      }).catch(Error => {
        this.load.dismiss();
        console.error(Error)
      });
  }

  carregarColetaCliente() {
    this.load = this.loadingCtrl.create({
      content: 'Aguarde, Carregando Coletas...',
    });
    this.load.present();
    this.providerColeta.consultaColetaCliente(this.coleta, this.cliente)
      .then(resp => {
        if (resp == null) {
          return;
        }
        var output;
        if (resp.rows) {
          console.log(resp);
          if (resp.rows.length > 0) {
            for (var i = 0; i < resp.rows.length; i++) {
              output = resp.rows.item(i);
            }
          }
          console.log(output);
          this.data.alizarol = (output.alizarol == 'S');
          this.data.quantidade = output.quantidade;
          this.data.cliente = output.cliente;
          this.data.cliente_nome = output.nome;
          this.data.coleta = output.coleta;
          this.data.hora = output.hora;
          this.data.temperatura = output.temperatura;
          /*
          this.data.alizarol = output.alizarol;
          this.data.alizarol = output.alizarol;
          output;*/
        }
        this.load.dismiss();
      }).catch(Error => {
        this.load.dismiss();
        console.error(Error)
      });
  }
}

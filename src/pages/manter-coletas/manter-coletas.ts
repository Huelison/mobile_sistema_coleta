import { ColetaProvider } from './../../providers/coleta/coleta';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import * as moment_timezone from 'moment-timezone';

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
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController,
    public providerColeta: ColetaProvider, public toastCtrl: ToastController, public alertCtrl: AlertController) {
    this.cliente = navParams.data.clienteID;
    this.coleta = navParams.data.coletaID;
    console.log(navParams.data);

    this.data = new iColeta();
    this.carregarColetaCliente();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManterColetasPage');
  }

  salvarColeta() {
    if (this.validarDados()) {
      this.load = this.loadingCtrl.create({
        content: 'Aguarde, Salvando Coleta...',
      });
      this.load.present();
      //validaçoes
      this.providerColeta.salvarColetaCliente(this.data)
        .then((data) => {
          this.load.dismiss();
          console.log('elemento atualizado com sucesso');
          console.log(data);
          this.navCtrl.pop();
        }).catch(Error => {
          this.load.dismiss();
          let toast = this.toastCtrl.create({
            message: 'Ocorreu um erro ao salvar coleta.',
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
          if (output.hora == null) {
            this.data.hora = moment_timezone.tz('America/Sao_Paulo').format('HH:mm');
          }
          else
            this.data.hora = output.hora

          this.data.temperatura = output.temperatura;
          /*
          this.data.alizarol = output.alizarol;
          this.data.alizarol = output.alizarol;
          output;*/
        }
        this.load.dismiss();
      }).catch(Error => {
        this.load.dismiss();
        let toast = this.toastCtrl.create({
          message: 'Ocorreu um erro ao recuperar dados da coleta selecionada.',
          duration: 5200,
          position: 'bottom',
          showCloseButton: true,
          closeButtonText: 'OK'
        });
        toast.present();
        console.error(Error)
      });
  }

  cancelarColeta() {
    this.navCtrl.pop();
  }

  validarDados() {
    var erros = "";// = "";

    if ((this.data.quantidade < 0) || (this.data.quantidade.toPrecision == null))
      erros += "\nA Quantidade deve ser maior que zero.";

    if ((this.data.hora == '') || (this.data.hora == null))
      erros += "\nA Hora de coleta deve ser informada.";

    if (this.data.temperatura.toPrecision == null)
      erros += "\nA temperatura deve ser informada.";

    console.log(erros);
    console.log(this.data.quantidade.toPrecision);

    if (erros == "") {
      return true;
    } else {
      let alert = this.alertCtrl.create({
        title: 'Ocorreram erros na validação dos dados. ',
        message: erros,
        buttons: [
          {
            text: 'OK',
            role: 'cancel',
            handler: () => {

            }

          }
        ]
      });
      alert.present();
      return false;
    }
  }
}

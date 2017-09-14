import { RotaClienteProvider } from './../../providers/rota-cliente/rota-cliente';
import { ColetaProvider } from './../../providers/coleta/coleta';
import { RotaProvider } from './../../providers/rota/rota';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, MenuController, ToastController } from 'ionic-angular';

/**
 * Generated class for the ListaRotasPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
export class iRota {
  public cliente: number;
  public coleta: number;
  public quantidade: number;
  public hora: string;
  public temperatura: number;
  public alizarol: string;
}

@IonicPage()
@Component({
  selector: 'page-lista-rotas',
  templateUrl: 'lista-rotas.html',
})
export class ListaRotasPage {
  listaRotas: any;
  load: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public providerRota: RotaProvider,
    public menuCtrl: MenuController, public loadingCtrl: LoadingController, public providerColeta: ColetaProvider,
    public providerRotaCliente: RotaClienteProvider, public toastCtrl: ToastController) {

  }

  exibirClientes(rota) {
    this.navCtrl.push('ListaRotaClientePage', { rotaID: rota });
  }

  iniciarColeta(idRota) {
    this.load = this.loadingCtrl.create({
      content: 'Aguarde, Carregando Rotas...',
    });
    this.load.present();
    this.providerColeta.iniciarColeta(idRota)
      .then((data) => {
        console.log('elemento inserido com sucesso');
        console.log(data);

        this.providerRotaCliente.getClientesRota(idRota).then(resp => {
          if (resp == null) {
            return;
          }
          var output = [];
          if (resp.rows) {
            console.log(resp);
            if (resp.rows.length > 0) {
              for (var j = 0; j < resp.rows.length; j++) {
                output.push(resp.rows.item(j));
              }
            }
            console.log(output);
          }

          if (output.length > 0) {
            for (var i = 0; i < output.length; i++) {
              var dados = new iRota();
              console.log(output[i]);
              console.log(output[i].cliente);

              dados.cliente = output[i].cliente;
              dados.coleta = data.insertId;
              dados.quantidade = -1;
              dados.hora = null;//usar dois digitos 
              dados.temperatura = null;
              dados.alizarol = null;
              console.log(dados.hora);
              this.providerColeta.iniciarColetaCliente(dados)
                .then((data) => {
                  console.log('elemento inserido com sucesso');
                  console.log(data);
                  console.log(dados);


                }).catch(Error => {
                  this.load.dismiss();
                  let toast = this.toastCtrl.create({
                    message: 'Ocorreu um erro ao inserir os clientes na coleta.',
                    duration: 5200,
                    position: 'bottom',
                    showCloseButton:true,
                    closeButtonText:'OK'
                  });        
                  toast.present();  
                  console.error(Error)
                });
            }
          }
          //this.listaRotaCliente = output;
          this.load.dismiss();
        }).catch(Error => {
          this.load.dismiss();
          let toast = this.toastCtrl.create({
            message: 'Ocorreu um erro ao recuperar dados da rota selecionada.',
            duration: 5200,
            position: 'bottom',
            showCloseButton:true,
            closeButtonText:'OK'
          });        
          toast.present();  
          console.error(Error)
        });
      })
      .catch(e => {
        let toast = this.toastCtrl.create({
          message: 'Ocorreu um erro ao iniciar a coleta.',
          duration: 5200,
          position: 'bottom',
          showCloseButton:true,
          closeButtonText:'OK'
        });        
        toast.present();  
        console.log(e)
      });
  }

  pad(num: number, size: number): string {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
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
        let toast = this.toastCtrl.create({
          message: 'Ocorreu um erro ao recuperar dados das rotas.',
          duration: 5200,
          position: 'bottom',
          showCloseButton:true,
          closeButtonText:'OK'
        });        
        toast.present();  
        console.error(Error)
      });
  }
}

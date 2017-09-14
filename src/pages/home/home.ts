import { ColetaProvider } from './../../providers/coleta/coleta';
import { SqlLiteProvider } from './../../providers/sql-lite/sql-lite';
import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public listaColetas: any;
  public exibeColetas: boolean;
  public load: any;
  public coleta;
  constructor(public navCtrl: NavController, public providerColeta: ColetaProvider, public banco: SqlLiteProvider,
    public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
    this.banco.abrirBanco(true);

    //this.carregarColetas();
  }
  ionViewDidLoad() {

  }

  ionViewDidEnter() {
    this.carregarColetas();
  }

  manterColeta(cliente: number) {
    console.log('Cliente --->' + cliente);
    this.navCtrl.push('ManterColetasPage', { clienteID: cliente, coletaID: this.coleta });
  }

  carregarColetas() {
    this.coleta = 15
    this.load = this.loadingCtrl.create({
      content: 'Aguarde, Carregando Coletas...',
    });
    this.load.present();
    this.providerColeta.consultarColeta('N')
      .then(resp => {
        if (resp == null) {
          return;
        }

        var coleta = [];
        this.exibeColetas = true;
        if (resp.rows) {
          console.log(resp);
          if (resp.rows.length > 0) {
            coleta.push(resp.rows.item(0));
            this.coleta = coleta[0].id;
            this.providerColeta.consultaColetaCliente(this.coleta, 0)
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
                let toast = this.toastCtrl.create({
                  message: 'Ocorreu um erro ao recuperar dados da coleta id: ' + this.coleta + '.',
                  duration: 5200,
                  position: 'bottom',
                  showCloseButton: true,
                  closeButtonText: 'OK'
                });
                toast.present();
                console.error(Error)
              });
          }else{
            this.load.dismiss();    
          }
        }else{
          this.load.dismiss();
        }
        console.log(coleta);
      }).catch(Error => {
        this.load.dismiss();
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

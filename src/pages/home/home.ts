import { LoginPage } from './../login/login';
import { LoginProvider } from './../../providers/login/login';
import { RotaProvider } from './../../providers/rota/rota';
import { RotaClienteProvider } from './../../providers/rota-cliente/rota-cliente';
import { ColetaProvider } from './../../providers/coleta/coleta';
import { SqlLiteProvider } from './../../providers/sql-lite/sql-lite';
import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';

export class iRota {
  public cliente: number;
  public coleta: number;
  public quantidade: number;
  public hora: string;
  public temperatura: number;
  public alizarol: string;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public listaColetas: any;
  public exibeColetas: boolean;
  public load: any;
  public coleta;
  public atual: number;
  public total: number;
  listaRotas: any;

  constructor(public navCtrl: NavController, public providerColeta: ColetaProvider, public banco: SqlLiteProvider,
    public loadingCtrl: LoadingController, public toastCtrl: ToastController, public providerRotaCliente: RotaClienteProvider,
    public providerRota: RotaProvider, public loginProvider: LoginProvider) {
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
    this.load = this.loadingCtrl.create({
      content: 'Aguarde, Carregando Coletas...',
    });
    this.load.present();
    this.providerColeta.consultarColeta('N')
      .then(resp => {
        if (resp == null) {
          this.exibeColetas = false;
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
          } else {
            this.load.dismiss();
            this.exibeColetas = false;

          }
        } else {
          this.load.dismiss();
          this.exibeColetas = false;
        }
        if (!this.exibeColetas) {
          this.carregarRotas();
          console.log('Carregar rotas');
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

  finalizarColeta() {
    this.load = this.loadingCtrl.create({
      content: 'Aguarde, Finalizando Coleta...',
    });
    this.load.present();
    this.providerColeta.finalizarColeta(this.coleta)
      .then((data) => {
        this.load.dismiss();
        console.log('elemento atualizado com sucesso');
        console.log(data);
        let toast = this.toastCtrl.create({
          message: 'Coleta finalizada com sucesso.',
          duration: 5200,
          position: 'bottom',
          showCloseButton: true,
          closeButtonText: 'OK'
        });
        toast.present();
        this.carregarColetas();
      }).catch(Error => {
        this.load.dismiss();
        let toast = this.toastCtrl.create({
          message: 'Ocorreu um erro ao finalizar coleta.',
          duration: 5200,
          position: 'bottom',
          showCloseButton: true,
          closeButtonText: 'OK'
        });
        toast.present();
        console.error(Error)
      });
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
            this.total = output.length;
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
                  this.atual++;
                  if (this.atual == this.total) {
                    let toast = this.toastCtrl.create({
                      message: 'Coleta iniciada com sucesso.',
                      duration: 5200,
                      position: 'bottom',
                      showCloseButton: true,
                      closeButtonText: 'OK'
                    });
                    toast.present();
                    this.carregarColetas();
                  }
                }).catch(Error => {
                  this.load.dismiss();
                  let toast = this.toastCtrl.create({
                    message: 'Ocorreu um erro ao inserir os clientes na coleta.',
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
          //this.listaRotaCliente = output;
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
      }).catch(e => {
        let toast = this.toastCtrl.create({
          message: 'Ocorreu um erro ao iniciar a coleta.',
          duration: 5200,
          position: 'bottom',
          showCloseButton: true,
          closeButtonText: 'OK'
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
      }).catch(Error => {
        this.load.dismiss();
        let toast = this.toastCtrl.create({
          message: 'Ocorreu um erro ao recuperar dados das rotas.',
          duration: 5200,
          position: 'bottom',
          showCloseButton: true,
          closeButtonText: 'OK'
        });
        toast.present();
        console.error(Error)
      });
  }

  

  getLogado() {
    //consulta se está logado
    this.loginProvider.user.subscribe(user => {
      if (!user) {
        this.navCtrl.setRoot(LoginPage);
        this.navCtrl.popToRoot();
        console.log(null);
        return;
      }
      console.log(user);
    });
    console.log(this.loginProvider.user)
  }
}

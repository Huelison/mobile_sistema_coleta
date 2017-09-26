import { ColetaProvider } from './../../providers/coleta/coleta';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController } from 'ionic-angular';
import { SqlLiteProvider } from '../../providers/sql-lite/sql-lite';


/**
 * Generated class for the ImportaDadosPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ImportaDadosPage-dados',
  templateUrl: 'importa-dados.html',
})
export class ImportaDadosPage {
  public listaClientes: FirebaseListObservable<any>;
  public atual: number;
  public total: number;
  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController,
    public banco: SqlLiteProvider, public af: AngularFireDatabase, public providerColeta: ColetaProvider,
    public toastCtrl: ToastController) {
    this.banco.abrirBanco(false);
  }

  inserirCliente() {
  }

  importarClientes() {

    this.listaClientes = this.af.list('/clientes');
    this.listaClientes.subscribe(dados => {
      if (dados.length > 0) {
        this.total = dados.length;
        dados.forEach(data => {
          let query = "INSERT or replace INTO clientes(id, nome, endereco, fone) " +
            " VALUES (?,?,?,?)";
          this.banco.banco.executeSql(query, [data.id, data.nome, data.endereco, data.fone])
            .then((data) => {
              this.atual++;
              if (this.atual == this.total) {
                let toast = this.toastCtrl.create({
                  message: 'Clientes importados com Sucesso.',
                  duration: 5200,
                  position: 'bottom',
                  showCloseButton: true,
                  closeButtonText: 'OK'
                });
                toast.present();
              }
            })
            .catch(e => {
              let toast = this.toastCtrl.create({
                message: 'Ocorreu um erro ao importar clientes.',
                duration: 5200,
                position: 'bottom',
                showCloseButton: true,
                closeButtonText: 'OK'
              });
              toast.present();
              console.log(e)
            });
        });
      }
      // calculate average here
    }, function (err) {
      console.log(err);
    });

  }

  importarRotas() {
    this.af.list('/rotas').subscribe(dados => {
      if (dados.length > 0) {
        dados.forEach(data => {
          let rota = data.id;
          var rotaCliente = []
          rotaCliente = data.RotaCliente;

          let query = "INSERT or replace INTO rotas(id, nome, caminhao_atual) " +
            " VALUES (?,?,?)";
          this.banco.banco.executeSql(query, [data.id, data.nome, data.caminhao_atual])
            .then((data2) => {
              console.log(rota)
              this.af.list('/rotas/' + data.$key + '/RotaCliente').subscribe(dados1 => {
                dados1.forEach(element => {
                  console.log(element);
                  let query1 = "INSERT or replace INTO rotaCliente(ordem,cliente,rota) " +
                    " VALUES (?,?,?)";
                  this.banco.banco.executeSql(query1, [element.ordem, element.cliente, rota])
                    .then((data1) => {
                      console.log('elemento inserido com sucesso')
                    }).catch(e => console.log(e));
                  console.log('elemento inserido com sucesso')
                });
                console.log(dados1);
              }, function (err) {
                console.log(err);
              });

              console.log(rotaCliente);/*
              */
            })
            .catch(e => console.log(e));
        });
      }
      // calculate average here
    }, function (err) {
      console.log(err);
    });
  }

  teste() {
    this.banco.banco.executeSql('select * from rotas r, rotaCliente c where c.rota=r.id', [])
      .then((resp) => {
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

      })
      .catch((Error) => console.log(Error)
      )
  }

  exportarColetas() {
    this.providerColeta.consultarColeta('S', 'N')
      .then((resp) => {
        if (resp == null) {
          return;
        }
        var output = [];
        if (resp.rows) {
          console.log(resp);
          if (resp.rows.length > 0) {
            for (var i = 0; i < resp.rows.length; i++) {
              output.push(resp.rows.item(i));
              this.providerColeta.consultaColetaCliente(resp.rows.item(i).id, 0)
                .then((resp) => {
                  if (resp == null) {
                    return;
                  }
                  var output = [];
                  if (resp.rows) {
                    console.log(resp);
                    if (resp.rows.length > 0) {
                      var coleta = {
                        caminhao: resp.rows.item(0).caminhao,
                        data: resp.rows.item(0).data,
                        rota: resp.rows.item(0).rota,
                        ColetaCliente: new Object(),
                        Sincronizado: 'N'
                      }
                      var objColetaCliente = {};
                      for (var i = 0; i < resp.rows.length; i++) {
                        output.push(resp.rows.item(i));
                        let xColetaCliente = {
                          alizarol: resp.rows.item(i).alizarol,
                          cliente: resp.rows.item(i).cliente,
                          hora: resp.rows.item(i).hora,
                          quantidade: resp.rows.item(i).quantidade,
                          temperatura: resp.rows.item(i).temperatura
                        }
                        objColetaCliente[resp.rows.item(i).cliente] = xColetaCliente;
                      }
                      coleta.ColetaCliente = objColetaCliente;
                      console.log(JSON.stringify(coleta));
                      this.af.list('/Coletas').push(coleta);
                    }
                    console.log(output);
                  }

                })
                .catch((Error) => {
                  console.log(Error)
                })
            }
          }
          console.log(output);
        }

      }).catch((Error) => console.log(Error))
  }

  ionViewDidLoad() {
    this.menuCtrl.close();
  }

}

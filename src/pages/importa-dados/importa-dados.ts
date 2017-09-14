import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController,
    public banco: SqlLiteProvider, public af: AngularFireDatabase) {
    this.banco.abrirBanco(false);
  }

  inserirCliente() {
  }

  importarClientes() {

    this.listaClientes = this.af.list('/clientes');
    this.listaClientes.subscribe(dados => {
      if (dados.length > 0) {
        dados.forEach(data => {
          let query = "INSERT or replace INTO clientes(id, nome, endereco, fone) " +
            " VALUES (?,?,?,?)";
          this.banco.banco.executeSql(query, [data.id, data.nome, data.endereco, data.fone])
            .then((data) => console.log('elemento inserido com sucesso'))
            .catch(e => console.log(e));
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

  ionViewDidLoad() {
    this.menuCtrl.close();
  }

}

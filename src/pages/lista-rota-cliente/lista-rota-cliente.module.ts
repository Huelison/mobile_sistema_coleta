import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaRotaClientePage } from './lista-rota-cliente';

@NgModule({
  declarations: [
    ListaRotaClientePage,
  ],
  imports: [
    IonicPageModule.forChild(ListaRotaClientePage),
  ],
})
export class ListaRotaClientePageModule {}

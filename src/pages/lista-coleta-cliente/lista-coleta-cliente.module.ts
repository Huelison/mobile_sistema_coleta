import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaColetaClientePage } from './lista-coleta-cliente';

@NgModule({
  declarations: [
    ListaColetaClientePage,
  ],
  imports: [
    IonicPageModule.forChild(ListaColetaClientePage),
  ],
})
export class ListaColetaClientePageModule {}

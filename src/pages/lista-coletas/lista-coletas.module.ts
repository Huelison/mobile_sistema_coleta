import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaColetasPage } from './lista-coletas';

@NgModule({
  declarations: [
    ListaColetasPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaColetasPage),
  ],
})
export class ListaColetasPageModule {}

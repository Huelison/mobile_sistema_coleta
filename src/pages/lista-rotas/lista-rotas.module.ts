import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListaRotasPage } from './lista-rotas';

@NgModule({
  declarations: [
    ListaRotasPage,
  ],
  imports: [
    IonicPageModule.forChild(ListaRotasPage),
  ],
})
export class ListaRotasPageModule {}

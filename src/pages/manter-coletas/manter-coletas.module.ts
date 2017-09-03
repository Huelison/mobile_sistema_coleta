import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManterColetasPage } from './manter-coletas';

@NgModule({
  declarations: [
    ManterColetasPage,
  ],
  imports: [
    IonicPageModule.forChild(ManterColetasPage),
  ],
})
export class ManterColetasPageModule {}

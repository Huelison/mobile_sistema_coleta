import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImportaDadosPage } from './importa-dados';

@NgModule({
  declarations: [
    ImportaDadosPage
  ],
  imports: [
    IonicPageModule.forChild(ImportaDadosPage),
  ],
  exports:[
    ImportaDadosPage
  ]
})
export class ImportaDadosPageModule {}

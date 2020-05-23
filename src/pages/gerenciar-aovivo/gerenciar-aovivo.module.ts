import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GerenciarAovivoPage } from './gerenciar-aovivo';

@NgModule({
  declarations: [
    GerenciarAovivoPage,
  ],
  imports: [
    IonicPageModule.forChild(GerenciarAovivoPage),
  ],
})
export class GerenciarAovivoPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CaixaPage } from './caixa';

@NgModule({
  declarations: [
    CaixaPage,
  ],
  imports: [
    IonicPageModule.forChild(CaixaPage),
  ],
})
export class CaixaPageModule {}

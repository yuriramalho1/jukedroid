import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeuCaixaPage } from './meu-caixa';

@NgModule({
  declarations: [
    MeuCaixaPage,
  ],
  imports: [
    IonicPageModule.forChild(MeuCaixaPage),
  ],
})
export class MeuCaixaPageModule {}

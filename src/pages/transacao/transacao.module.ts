import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransacaoPage } from './transacao';

@NgModule({
  declarations: [
    TransacaoPage,
  ],
  imports: [
    IonicPageModule.forChild(TransacaoPage),
  ],
})
export class TransacaoPageModule {}

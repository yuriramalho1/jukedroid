import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FaturaPage } from './fatura';

@NgModule({
  declarations: [
    FaturaPage,
  ],
  imports: [
    IonicPageModule.forChild(FaturaPage),
  ],
})
export class FaturaPageModule {}

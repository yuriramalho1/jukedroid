import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BilheteFiltroPage } from './bilhete-filtro';

@NgModule({
  declarations: [
    BilheteFiltroPage,
  ],
  imports: [
    IonicPageModule.forChild(BilheteFiltroPage),
  ],
})
export class BilheteFiltroPageModule {}

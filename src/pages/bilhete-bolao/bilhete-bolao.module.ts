import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BilheteBolaoPage } from './bilhete-bolao';

@NgModule({
  declarations: [
    BilheteBolaoPage,
  ],
  imports: [
    IonicPageModule.forChild(BilheteBolaoPage),
  ],
})
export class BilheteBolaoPageModule {}

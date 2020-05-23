import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BilhetePage } from './bilhete';

@NgModule({
  declarations: [
    BilhetePage,
  ],
  imports: [
    IonicPageModule.forChild(BilhetePage),
  ],
})
export class BilhetePageModule {}

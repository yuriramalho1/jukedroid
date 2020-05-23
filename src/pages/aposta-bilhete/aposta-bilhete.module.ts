import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApostaBilhetePage } from './aposta-bilhete';

@NgModule({
  declarations: [
    ApostaBilhetePage,
  ],
  imports: [
    IonicPageModule.forChild(ApostaBilhetePage),
  ],
})
export class ApostaBilhetePageModule {}

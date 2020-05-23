import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SaquePage } from './saque';

@NgModule({
  declarations: [
    SaquePage,
  ],
  imports: [
    IonicPageModule.forChild(SaquePage),
  ],
})
export class SaquePageModule {}

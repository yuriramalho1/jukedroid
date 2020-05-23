import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConsultarBilhetePage } from './consultar-bilhete';

@NgModule({
  declarations: [
    ConsultarBilhetePage,
  ],
  imports: [
    IonicPageModule.forChild(ConsultarBilhetePage),
  ],
})
export class ConsultarBilhetePageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SimulacaoAdminPage } from './simulacao-admin';

@NgModule({
  declarations: [
    SimulacaoAdminPage,
  ],
  imports: [
    IonicPageModule.forChild(SimulacaoAdminPage),
  ],
})
export class SimulacaoAdminPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeusBilhetesPage } from './meus-bilhetes';

@NgModule({
  declarations: [
    MeusBilhetesPage,
  ],
  imports: [
    IonicPageModule.forChild(MeusBilhetesPage),
  ],
})
export class MeusBilhetesPageModule {}

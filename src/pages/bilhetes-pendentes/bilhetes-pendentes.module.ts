import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BilhetesPendentesPage } from './bilhetes-pendentes';

@NgModule({
  declarations: [
    BilhetesPendentesPage,
  ],
  imports: [
    IonicPageModule.forChild(BilhetesPendentesPage),
  ],
})
export class BilhetesPendentesPageModule {}

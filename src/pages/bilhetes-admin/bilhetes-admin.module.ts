import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BilhetesAdminPage } from './bilhetes-admin';

@NgModule({
  declarations: [
    BilhetesAdminPage,
  ],
  imports: [
    IonicPageModule.forChild(BilhetesAdminPage),
  ],
})
export class BilhetesAdminPageModule {}

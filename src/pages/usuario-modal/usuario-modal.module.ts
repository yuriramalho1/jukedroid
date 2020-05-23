import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsuarioModalPage } from './usuario-modal';

@NgModule({
  declarations: [
    UsuarioModalPage,
  ],
  imports: [
    IonicPageModule.forChild(UsuarioModalPage),
  ],
})
export class UsuarioModalPageModule {}

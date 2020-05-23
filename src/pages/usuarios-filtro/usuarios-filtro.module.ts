import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsuariosFiltroPage } from './usuarios-filtro';

@NgModule({
  declarations: [
    UsuariosFiltroPage,
  ],
  imports: [
    IonicPageModule.forChild(UsuariosFiltroPage),
  ],
})
export class UsuariosFiltroPageModule {}

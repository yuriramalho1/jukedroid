import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsuarioCadastroPage } from './usuario-cadastro';

@NgModule({
  declarations: [
    UsuarioCadastroPage,
  ],
  imports: [
    IonicPageModule.forChild(UsuarioCadastroPage),
  ],
})
export class UsuarioCadastroPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClienteSemCadastroPage } from './cliente-sem-cadastro';

@NgModule({
  declarations: [
    ClienteSemCadastroPage,
  ],
  imports: [
    IonicPageModule.forChild(ClienteSemCadastroPage),
  ],
})
export class ClienteSemCadastroPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BolaoCadastroPage } from './bolao-cadastro';
import { IonicSelectableModule } from 'ionic-selectable';

@NgModule({
  declarations: [
    BolaoCadastroPage,
  ],
  imports: [
    IonicPageModule.forChild(BolaoCadastroPage),
    IonicSelectableModule
  ],
})
export class BolaoCadastroPageModule {}

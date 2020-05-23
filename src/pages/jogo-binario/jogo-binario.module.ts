import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JogoBinarioPage } from './jogo-binario';

@NgModule({
  declarations: [
    JogoBinarioPage,
  ],
  imports: [
    IonicPageModule.forChild(JogoBinarioPage),
  ],
})
export class JogoBinarioPageModule {}

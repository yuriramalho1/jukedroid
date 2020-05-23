import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfiguracoesBancaPage } from './configuracoes-banca';

@NgModule({
  declarations: [
    ConfiguracoesBancaPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfiguracoesBancaPage),
  ],
})
export class ConfiguracoesBancaPageModule {}

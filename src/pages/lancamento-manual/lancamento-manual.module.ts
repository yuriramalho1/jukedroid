import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LancamentoManualPage } from './lancamento-manual';

@NgModule({
  declarations: [
    LancamentoManualPage,
  ],
  imports: [
    IonicPageModule.forChild(LancamentoManualPage),
  ],
})
export class LancamentoManualPageModule {}

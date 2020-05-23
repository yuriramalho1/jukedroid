import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CaixaGerentePage } from './caixa-gerente';

@NgModule({
  declarations: [
    CaixaGerentePage,
  ],
  imports: [
    IonicPageModule.forChild(CaixaGerentePage),
  ],
})
export class CaixaGerentePageModule {}

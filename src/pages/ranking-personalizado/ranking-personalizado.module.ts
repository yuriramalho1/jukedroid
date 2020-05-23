import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RankingPersonalizadoPage } from './ranking-personalizado';

@NgModule({
  declarations: [
    RankingPersonalizadoPage,
  ],
  imports: [
    IonicPageModule.forChild(RankingPersonalizadoPage),
  ],
})
export class RankingPersonalizadoPageModule {}

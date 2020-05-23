import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BolaoPalpitePage } from './bolao-palpite';

@NgModule({
  declarations: [
    BolaoPalpitePage,
  ],
  imports: [
    IonicPageModule.forChild(BolaoPalpitePage),
  ],
})
export class BolaoPalpitePageModule {}

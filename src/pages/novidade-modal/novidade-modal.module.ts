import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NovidadeModalPage } from './novidade-modal';

@NgModule({
  declarations: [
    NovidadeModalPage,
  ],
  imports: [
    IonicPageModule.forChild(NovidadeModalPage),
  ],
})
export class NovidadeModalPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResumosPage } from './resumos';

@NgModule({
  declarations: [
    ResumosPage,
  ],
  imports: [
    IonicPageModule.forChild(ResumosPage),
  ],
})
export class ResumosPageModule {}

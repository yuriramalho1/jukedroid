import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GerentePage } from './gerente';

@NgModule({
  declarations: [
    GerentePage,
  ],
  imports: [
    IonicPageModule.forChild(GerentePage),
  ],
})
export class GerentePageModule {}

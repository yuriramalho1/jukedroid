import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeSmPage } from './home-sm';

@NgModule({
  declarations: [
    HomeSmPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeSmPage),
  ],
})
export class HomeSmPageModule {}

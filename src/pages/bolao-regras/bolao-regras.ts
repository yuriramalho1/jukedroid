import { BolaoService } from './../../service/bolao.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the BolaoRegrasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bolao-regras',
  templateUrl: 'bolao-regras.html',
})
export class BolaoRegrasPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController,
              public bolaoService: BolaoService) {
  
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }
}

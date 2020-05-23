import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BilhetesPendentesApostasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bilhetes-pendentes-apostas',
  templateUrl: 'bilhetes-pendentes-apostas.html',
})
export class BilhetesPendentesApostasPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BilhetesPendentesApostasPage');
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Bilhete } from '../../model/bilhete.model';

@IonicPage()
@Component({
  selector: 'page-bilhete-sucesso',
  templateUrl: 'bilhete-sucesso.html',
})
export class BilheteSucessoPage {
  imagemTeste : string;
  bilhete     : Bilhete;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController) {
    this.bilhete = this.navParams.get('bilhete');
  }

  ionViewDidLoad() {

  }

  voltar(){
    this.viewCtrl.dismiss();
  }

}

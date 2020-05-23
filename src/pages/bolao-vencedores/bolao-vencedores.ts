import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { Bilhete } from '../../model/bilhete.model';
import { BolaoService } from '../../service/bolao.service';
import { Bolao } from '../../model/bolao.model';

@IonicPage()
@Component({
  selector: 'page-bolao-vencedores',
  templateUrl: 'bolao-vencedores.html',
})
export class BolaoVencedoresPage {

  listaBilhetesVencedores : Bilhete[] = [];
  bolao : Bolao;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController,
              private bolaoService: BolaoService, private loadCtrl: LoadingController) {
    this.bolao = this.navParams.get('bolao');

    this.getVencedoresBolao(this.bolao);
  }

  getVencedoresBolao(bolao : Bolao){
    let loader = this.loadCtrl.create();
    loader.present();

    this.bolaoService.getVencedoresBolao(bolao).then(lista=>{
      this.listaBilhetesVencedores = lista;
      loader.dismiss();
    }).catch(erro =>{
      loader.dismiss();
    })
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}

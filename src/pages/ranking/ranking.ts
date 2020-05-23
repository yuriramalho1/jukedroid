import { Usuario } from './../../model/usuario.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import localePtBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';


@IonicPage()
@Component({
  selector: 'page-ranking',
  templateUrl: 'ranking.html',
})
export class RankingPage {

  usuario : Usuario
  ranking : Usuario[] = []

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController) {
    this.usuario = navParams.get('usuario')
    this.ranking = navParams.get('ranking')

    console.log(this.usuario.apelido);

    this.ajustaRanking()

    registerLocaleData(localePtBr);
  }

  voltar(){
    this.viewCtrl.dismiss()
  }

  ajustaRanking(){
    for (let u of this.ranking){
      if (u.nome == this.usuario.nome){
        this.usuario.posicao = u.posicao
        this.usuario.numeroVitorias = u.numeroVitorias
        this.usuario.cotacaoTotalVitorias = u.cotacaoTotalVitorias
      }
    }
  }

}

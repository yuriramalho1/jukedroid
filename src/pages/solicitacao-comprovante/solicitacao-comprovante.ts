import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Transacao } from '../../model/transacao.model';
import { TransacaoService } from '../../service/transacao.service';

/**
 * Generated class for the SolicitacaoComprovantePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-solicitacao-comprovante',
  templateUrl: 'solicitacao-comprovante.html',
})
export class SolicitacaoComprovantePage {

  transacao : Transacao

  constructor(public navCtrl: NavController, public navParams: NavParams, public ts : TransacaoService) {
    this.transacao = navParams.get('transacao')
  }

  getImage() : string{
    return this.ts.getImage(this.transacao.id)
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { NovidadeService } from '../../service/novidade.service';
import { Notificacao } from '../../model/notificacao.model';

@IonicPage()
@Component({
  selector: 'page-novidade-modal',
  templateUrl: 'novidade-modal.html',
})
export class NovidadeModalPage {

  notificacao : Notificacao;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public ns : NovidadeService) {
    this.notificacao = this.navParams.get('notificacao');
  }

  voltar(){
    this.viewCtrl.dismiss();
  }

  getImage(id: number) : string{
    return this.ns.getImage(id);
  }
}

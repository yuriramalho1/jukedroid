import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Notificacao } from '../../model/notificacao.model';
import { NovidadeService } from '../../service/novidade.service';
import { Storage } from '@ionic/storage';
import { NovidadeModalPage } from '../novidade-modal/novidade-modal';

@IonicPage()
@Component({
  selector: 'page-novidades',
  templateUrl: 'novidades.html',
})
export class NovidadesPage {
  notificacoes : Notificacao[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public ns : NovidadeService,
              public storage : Storage, public modalCtrl : ModalController) {
    this.notificacoes = this.navParams.get('notificacoes');

    for(let notificacao of this.notificacoes){
      notificacao.data = new Date(this.notificacoes[0].dataAUD.substring(1,28));
    }
  }

  ionViewDidLoad() {
    this.storage.set('notificacoesVisualizadas', this.notificacoes).then(salvo =>{
      this.ns.getNovidadesNaoVisualizadas();
    });
  }

  getImage(id: number) : string{
    return this.ns.getImage(id);
  }

  toModal(notificacao : Notificacao){
    let modal = this.modalCtrl.create(NovidadeModalPage, {
      notificacao: notificacao
    });
    modal.present();
  }
}

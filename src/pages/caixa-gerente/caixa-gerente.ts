import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { Resumo } from '../../model/resumo.model';
import { CaixaCambistaPage } from '../caixa-cambista/caixa-cambista';

@IonicPage()
@Component({
  selector: 'page-caixa-gerente',
  templateUrl: 'caixa-gerente.html',
})
export class CaixaGerentePage {

  resumoGerente : Resumo;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
              public modalCtrl: ModalController) {
    this.resumoGerente = this.navParams.get('resumoGerente');
  }

  voltar(){
    this.viewCtrl.dismiss();
  }


  detalhaCambista(resumo : Resumo){
    let modal = this.modalCtrl.create(CaixaCambistaPage, {
      resumoCambista: resumo
    });
    modal.present();
  }
}

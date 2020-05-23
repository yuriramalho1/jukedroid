import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Banca } from '../../model/banca.model';
import { BancaService } from '../../service/banca.service';

@IonicPage()
@Component({
  selector: 'page-configuracoes-banca',
  templateUrl: 'configuracoes-banca.html',
})
export class ConfiguracoesBancaPage {

  banca : Banca;
  constructor(public navCtrl: NavController, public navParams: NavParams, public bancaService: BancaService, public toastCtrl: ToastController) {

  }

  ionViewDidLoad() {
    this.banca = this.navParams.get('banca');
  }

  clickAtualizar(){
    if(this.banca.recadastrarPartidas === undefined){
      this.banca.recadastrarPartidas = false;
    }
    if(this.banca.recadastrarOpcaoCotacao === undefined){
      this.banca.recadastrarOpcaoCotacao = false;
    }
    if(this.banca.desativarCampeonatosVazios === undefined){
      this.banca.desativarCampeonatosVazios = false;
    }
    if(this.banca.enviarEmailMarketing === undefined){
      this.banca.enviarEmailMarketing = false;
    }

    this.bancaService.atualizarConfigBanca(this.banca).then(banca =>{
      this.banca = banca;

      let toast = this.toastCtrl.create({
        message: 'Configurações da Banca atualizadas com sucesso!',
        duration: 4000,
        position: 'bottom'
      });

      toast.present();
    })
  }

}

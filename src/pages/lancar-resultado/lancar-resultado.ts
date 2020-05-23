import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ApostaService } from '../../service/aposta.service';
import { Aposta } from '../../model/aposta.model';

/**
 * Generated class for the LancarResultadoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lancar-resultado',
  templateUrl: 'lancar-resultado.html',
})
export class LancarResultadoPage {

  apostas : Aposta[]
  apostasSelecionadas : Aposta[] = []

  constructor(public navCtrl: NavController, public navParams: NavParams, private as : ApostaService, private toastCtrl : ToastController) {
  }

  ionViewDidEnter(){
    this.atualizaPagina()
  }

  atualizaPagina(){
    this.as.getApostasNaoApuradas().then(lista => this.apostas = lista)
  }

  adicionaAposta(aposta : Aposta, status : string){
    let encontrou : boolean = false
    aposta.statusAposta = status

    for (let a of this.apostasSelecionadas){
      if (a.id === aposta.id){
        a.statusAposta = aposta.statusAposta
        encontrou = true
      }
    }

    if (!encontrou){
      this.apostasSelecionadas.push(aposta)
    }
  }

  verificaAposta(aposta : Aposta, status : string) : boolean{
    let encontrou : boolean = false

    for (let a of this.apostasSelecionadas){
      if (a.id == aposta.id && a.statusAposta == status){
        encontrou = true
      }
    }

    return !encontrou
  }

  confirmar(){
    if (this.apostasSelecionadas.length > 0){
      this.as.atualizaApostas(this.apostasSelecionadas).then(sucesso => {
        if (sucesso){
          this.presentToast('Apostas atualizadas')
          this.apostasSelecionadas = []
          this.atualizaPagina()
        } else{
          this.presentToast('Ocorreu um erro ao atualizar as apostas. Favor entrar em contato com o suporte')
        }
      })
    }
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, LoadingController, Platform } from 'ionic-angular';
import { Bilhete } from '../../model/bilhete.model';
import { BilheteService } from '../../service/bilhete.service';
import { ApostaBilhetePage } from '../aposta-bilhete/aposta-bilhete';

@IonicPage()
@Component({
  selector: 'page-consultar-bilhete',
  templateUrl: 'consultar-bilhete.html',
})
export class ConsultarBilhetePage {
  bilhete : Bilhete;
  id      : number;
  constructor(public navCtrl: NavController, public navParams: NavParams, public bs : BilheteService,
              public alertCtrl: AlertController, public modalCtrl : ModalController, public loadCtrl: LoadingController,
              private plt: Platform) {
    this.bilhete = new Bilhete();
  }

  statusFormatado(bilhete : Bilhete) : string{
    let resultado : string = bilhete.statusBilhete
    if (bilhete.statusBilhete == 'EM_ABERTO')
      resultado = "Em Aberto"
    if (bilhete.statusBilhete == 'CANCELADO')
      resultado = "Cancelado"
    if (bilhete.statusBilhete == 'FINALIZADO')
      resultado = "Finalizado"

    return resultado
  }

  verApostas(bilheteSelecionado : Bilhete){
    this.navCtrl.push(ApostaBilhetePage,{
      bilhete : bilheteSelecionado
    })
  }

  shareBilhete(bilhete){
    let alert = this.alertCtrl.create({
      title: "Compartilhar Bilhete",
      message: "Escolha como deseja Compartilhar o seu Bilhete.",
      cssClass: "alertCompeticoes",
      buttons: [{
        text: 'Compartilhar Imagem',
        handler: () =>{
          if(this.plt.is('android')){
            this.bs.shareComprovante(bilhete)
          }else{
            this.bs.downloadImagemBilhete(bilhete);
          }
        }
      },
      {
        text: 'Compartilhar Link',
        handler: () =>{
          if(this.plt.is('android')){
            this.bs.compartilharLink(bilhete)
          }else{
            this.bs.downloadImagemBilhete(bilhete);
          }
        }
      }]
    })

    alert.present();
  }

  buscarBilhete(id : number){
    if(id > 0){
      let load = this.loadCtrl.create();
      load.present();
      this.bs.getBilheteById(id).then(bilhete=>{
        this.bilhete = bilhete;
        load.dismiss();

        if(!bilhete.id){
          let alert = this.alertCtrl.create({
            title: "Bilhete não encontrado",
            message: "Código do bilhete não encontrado.",
            cssClass: "alertCompeticoes",
            buttons: ['OK']
          })

          alert.present();
        }
      })
    }else{
        let alert = this.alertCtrl.create({
          title: "Insira um código de bilhete",
          message: "Digite o Código do bilhete que deseja buscar.",
          cssClass: "alertCompeticoes",
          buttons: ['OK']
        })

        alert.present();
    }
  }

}

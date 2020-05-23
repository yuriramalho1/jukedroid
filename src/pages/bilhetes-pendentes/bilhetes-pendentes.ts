import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Bilhete } from '../../model/bilhete.model';
import { Banca } from '../../model/banca.model';
import { BilheteService } from '../../service/bilhete.service';
import { ApostaBilhetePage } from '../aposta-bilhete/aposta-bilhete';
import { PrinterProvider } from '../../providers/printer-provider';
import { ID_BANCA } from "../../service/app.api";
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-bilhetes-pendentes',
  templateUrl: 'bilhetes-pendentes.html',
})
export class BilhetesPendentesPage {

  bilhetes : Bilhete[]

  constructor(public navCtrl: NavController, public navParams: NavParams, private bs : BilheteService, private toastCtrl : ToastController,
              public printer: PrinterProvider, public storage : Storage) {
  }

  ionViewDidEnter(){
    this.atualizaPagina()
  }

  atualizaPagina(){
    this.bs.getBilhetesPendentes().then(lista => this.bilhetes = lista)
  }

  finalizarBilhete(bilhete : Bilhete){
    this.bs.finalizarBilhete(bilhete).then(obj => {
      if (obj != undefined && obj.id > 0){
        this.presentToast('Bilhete Finalizado')
        this.atualizaPagina();
      }
    })
  }

  finalizarTodos(){
    let bancaAtual = new Banca();
    bancaAtual.id = ID_BANCA;
    for (let i = 0; i < this.bilhetes.length; i++) {
        this.bilhetes[i].banca = bancaAtual;
    }
    this.bs.finalizarTodos(this.bilhetes).then(obj => {
      this.presentToast('Todos os bilhetes foram finalizados')
      this.atualizaPagina();
    })
  }

  tipoBilhete(tipo : string) : string{
    let retorno = ''

    if (tipo == 'BILHETE_VENCEDOR'){
      retorno = 'Bilhete Vencedor'
    }
    if (tipo == 'BILHETE_PERDEDOR'){
      retorno = 'Bilhete Perdedor'
    }

    return retorno
  }

  tipoApostaBilhete(tipo : string) : string{
    let retorno = ''

    if (tipo == 'APOSTA_SIMPLES'){
      retorno = 'Aposta Simples'
    }
    if (tipo == 'APOSTA_MULTIPLA_DOIS'){
      retorno = 'Aposta Múltipla 2'
    }
    if (tipo == 'APOSTA_MULTIPLA_TRES'){
      retorno = 'Aposta Múltipla 3'
    }
    if (tipo == 'APOSTA_MULTIPLA_MAIS_QUATRO'){
      retorno = 'Aposta Múltipla +4'
    }

    return retorno
  }

  verApostas(bilheteSelecionado : Bilhete){
    this.navCtrl.push(ApostaBilhetePage,{
      bilhete : bilheteSelecionado
    })
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

  printBilhete(bilhete){
    this.storage.get('impressora').then(impressora =>{
      this.printer.imprimirBilhete(impressora, bilhete);
    });
  }

}

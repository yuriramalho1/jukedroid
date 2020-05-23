import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Bilhete } from '../../model/bilhete.model';
import { BilheteService } from '../../service/bilhete.service';
import { Lancamento } from '../../model/lancamento.model';
import { HomePage } from '../home/home';

/**
 * Generated class for the LancamentoManualPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lancamento-manual',
  templateUrl: 'lancamento-manual.html',
})
export class LancamentoManualPage {

  bilhete : Bilhete
  descricaoLancamento : string
  idBilhete : number

  loader = undefined

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public loadingCtrl: LoadingController,
              public bs : BilheteService) {
  }

  pesquisarBilhete(){
    this.presentLoading()

    this.bs.getBilheteById(this.idBilhete).then(bilhete => {
      this.bilhete = undefined

      if (bilhete == undefined || bilhete.id == undefined || bilhete.id == 0){
        this.presentToast("Código inválido ou bilhete cancelado")
      } else{
        if (bilhete.origemBilhete != 'BANCA'){
          this.presentToast("Este bilhete foi criado pelo cliente, você não pode fazer o pagamento desse bilhete")
        } else{
          if (bilhete.bilheteVencedor == undefined){
            this.presentToast("Este bilhete ainda não foi finalizado")
          } else{
            if (bilhete.bilheteVencedor == false){
              this.presentToast(`O bilhete de código ${bilhete.id} não é um bilhete vencedor`)
            } else{
              if (bilhete.pago != undefined && bilhete.pago == true){
                this.presentToast(`O bilhete de código ${bilhete.id} já foi pago`)
              } else{
                this.bilhete = bilhete
              }
            }
          }
        }
      }

      this.loader.dismissAll()
    })
  }

  pagar(){
    if (this.descricaoLancamento != undefined && this.descricaoLancamento != ""){
      this.presentLoading()

      let lancamento = new Lancamento()

      lancamento.bilhete = this.bilhete
      lancamento.descricaoLancamento = this.descricaoLancamento

      this.bs.lancamentoManual(lancamento).then(resultado => {
        if (resultado){
          this.presentToast(`Lançamento cadastrado com sucesso, faça o pagameto do bilhete`)
          this.navCtrl.setRoot(HomePage)
        } else{
          this.presentToast(`Ocorreu uma falha. Favor contactar o suporte`)
        }

        this.loader.dismissAll()
      })
    } else{
      this.presentToast(`Preencha a descrição do lançamento`)
    }
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    this.loader.present();
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

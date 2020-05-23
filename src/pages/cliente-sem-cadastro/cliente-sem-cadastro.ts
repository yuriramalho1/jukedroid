import { Bilhete } from './../../model/bilhete.model';
import { BilheteService } from './../../service/bilhete.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';

/**
 * Generated class for the ClienteSemCadastroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cliente-sem-cadastro',
  templateUrl: 'cliente-sem-cadastro.html',
})
export class ClienteSemCadastroPage {

  nome : string = ''
  bilhete : Bilhete

  constructor(public navCtrl: NavController, public navParams: NavParams, public bs : BilheteService, public toastCtrl: ToastController, 
              public alertCtrl: AlertController) {
  }

  salvarBilhete(){
    if (this.nome.length > 0){
      this.bs.setNomeCliente(this.nome)

      this.bs.salvarBilhete().then(obj =>{ 
        if (obj != undefined && obj.id != undefined && obj.id > 0){
          this.bilhete = obj
          this.sucesso()
        } else{
          this.falha()
        }
      })
    } else{
      let toast = this.toastCtrl.create({
        message: 'Ocorreu uma falha, favor contacte o suporte',
        duration: 2000
      });
      toast.present()
    }
  }

  sucesso(){
    this.dialogShare()

    this.limparBilhete()
  }

  dialogShare() {
    let confirm = this.alertCtrl.create({
      title: 'Bilhete registrado com sucesso',
      message: 'Deseja compartilhar o comprovante do bilhete?',
      buttons: [
        {
          text: 'Não',
          handler: () => {

          }
        },
        {
          text: 'Compartilhar',
          handler: () => {
            console.log(this.bilhete.id)
            this.bs.shareComprovante(this.bilhete)
          }
        }
      ]
    });
    confirm.present();
  }

  falha(){
    let toast = this.toastCtrl.create({
      message: 'Ocorreu uma falha, favor contacte o suporte',
      duration: 2000
    });
    toast.present()
  }

  limparBilhete(){
    this.bs.limparBilhete()
    this.navCtrl.pop()
    this.navCtrl.pop()
    this.navCtrl.pop()
  }
}

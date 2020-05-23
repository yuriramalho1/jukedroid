import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Usuario } from '../../model/usuario.model';
import { sha256 } from 'js-sha256';
import { UsuarioService } from '../../service/usuario.service';

/**
 * Generated class for the AlterarSenhaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-alterar-senha',
  templateUrl: 'alterar-senha.html',
})
export class AlterarSenhaPage {

  usuario : Usuario

  senhaAtual : string
  novaSenha : string
  confirmacao : string

  constructor(public navCtrl: NavController, public navParams: NavParams, private toastCtrl : ToastController, private us : UsuarioService) {
    this.usuario = navParams.get('usuario')
  }

  clickCancelar() {
    this.navCtrl.pop()
  }

  clickConfirmar(){
    if (sha256(this.senhaAtual) != this.usuario.senha){
      this.presentToast("Senha atual inválida")
    } else{
      if (this.novaSenha != this.confirmacao){
        this.presentToast("A confirmação difere da senha digitada")
      } else{
        this.usuario.senha = sha256(this.novaSenha)

        this.us.salvar(this.usuario).then(obj => {
          if (obj != undefined && obj.id > 0){
            this.presentToast("Senha alterada com sucesso")
            this.clickCancelar()
          } else{
            this.presentToast("Ocorreu um erro ao tentar alterar a senha. Contacte o Suporte.")
          }
        })
      }
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

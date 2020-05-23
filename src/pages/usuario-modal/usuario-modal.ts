import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController} from 'ionic-angular';
import { Usuario } from '../../model/usuario.model';
import { UsuarioService } from '../../service/usuario.service';

@IonicPage()
@Component({
  selector: 'page-usuario-modal',
  templateUrl: 'usuario-modal.html',
})
export class UsuarioModalPage {

  usuario : Usuario;
  escolheTipo : boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
              public viewCtrl : ViewController, public us : UsuarioService){
    if(this.us.usuario.tipoUsuario == "ADMINISTRADOR"){
      this.escolheTipo = true;
    }
  }

  ionViewDidLoad() {
    this.usuario = this.navParams.get('us');
  }

  salvarUsuario(){
    this.us.salvar(this.usuario).then(usuario =>{
        this.usuario = usuario;

        let alert = this.alertCtrl.create({
          title: 'Usuário Atualizado',
          message: "Informações atualizadas com sucesso!",
          buttons: [{
            text : 'OK',
          }]
        });

        alert.present();
    })
  }

  voltar(){
    this.viewCtrl.dismiss()
  }

}

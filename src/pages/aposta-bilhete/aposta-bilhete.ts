import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Bilhete } from '../../model/bilhete.model';
import { Usuario } from '../../model/usuario.model';
import { BilheteService } from '../../service/bilhete.service';
import { UsuarioService } from '../../service/usuario.service';
import { BilhetePage } from '../bilhete/bilhete';

@IonicPage()
@Component({
  selector: 'page-aposta-bilhete',
  templateUrl: 'aposta-bilhete.html',
})
export class ApostaBilhetePage {

  bilheteSelecionado : Bilhete

  bilhete : Bilhete
  usuario : Usuario

  constructor(public navCtrl: NavController, public navParams: NavParams, public bs : BilheteService, public toastCtrl: ToastController, public us : UsuarioService) {
    this.bilheteSelecionado = navParams.get('bilhete');
    this.bs.getApostaBilhete(this.bilheteSelecionado).then(lista =>{
      this.bilheteSelecionado.listaApostas = lista;
    });
  }

  ionViewDidLoad() {

  }

  ionViewDidEnter(){
    this.us.getUsuario().then(usuario => {
      this.usuario = usuario
    })
  }

  toBilhete(){
    this.navCtrl.push(BilhetePage)
  }

  statusApostaCss(status : string){
    let resultado = "aposta-nao-apurada"

    if (status == 'VENCEDORA'){
      resultado = "aposta-vencedora"
    }
    if (status == 'PERDEDORA'){
      resultado = "aposta-perdedora"
    }
    if (status == 'CANCELADA'){
      resultado = "aposta-perdedora"
    }

    return resultado
  }

  escreveStatus(status : string){
    let resultado = "NÃO APURADA"

    if (status == 'VENCEDORA'){
      resultado = "VENCEDORA"
    }
    if (status == 'PERDEDORA'){
      resultado = "PERDEDORA"
    }
    if (status == 'CANCELADA'){
      resultado = "CANCELADA"
    }

    return resultado
  }
}

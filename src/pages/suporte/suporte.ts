import { BilhetePage } from './../bilhete/bilhete';
import { UsuarioService } from './../../service/usuario.service';
import { BilheteService } from './../../service/bilhete.service';
import { Usuario } from './../../model/usuario.model';
import { Bilhete } from './../../model/bilhete.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';

/**
 * Generated class for the SuportePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-suporte',
  templateUrl: 'suporte.html',
})
export class SuportePage {
  
  bilhete : Bilhete
  usuario : Usuario

  constructor(public navCtrl: NavController, public navParams: NavParams, public bs : BilheteService, public us : UsuarioService) {
    this.bilhete = bs.getBilhete()
    this.usuario = navParams.get('usuario')
  }

  ionViewDidEnter(){
    this.bilhete = this.bs.getBilhete()
  }

  toBilhete(){
    this.navCtrl.push(BilhetePage)
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, ModalController } from 'ionic-angular';
import { Competicao } from '../../model/competicao.model';
import { CompeticaoPojo } from '../../model/competicao.model';
import { PartidaService } from '../../service/partida.service';
import { LoginPage } from '../login/login';
import { Partida } from '../../model/partida.model';
import { BilheteService } from '../../service/bilhete.service';
import { CompeticaoService } from '../../service/competicao.service';
import { UsuarioService } from '../../service/usuario.service';
import { Bilhete } from '../../model/bilhete.model';
import { Aposta } from '../../model/aposta.model';
import { Esporte } from '../../model/esporte.enum';



@IonicPage()
@Component({
  selector: 'page-home-sm',
  templateUrl: 'home-sm.html',
})
export class HomeSmPage {


  constructor(public navCtrl: NavController, public navParams: NavParams, public partidaService : PartidaService, public bs : BilheteService,
              public toastCtrl: ToastController, public ps : PartidaService, public cs : CompeticaoService, public loadCtrl: LoadingController,
              public modalCtrl: ModalController, public us : UsuarioService) {

  }

  toLogin(){
    this.navCtrl.push(LoginPage,{
      saiu: true,
      cadastrar: false
    })
  }

}

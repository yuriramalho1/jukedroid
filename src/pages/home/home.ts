import { Component } from '@angular/core';
import { NavController, ModalController, AlertController, NavParams, LoadingController, ToastController  } from 'ionic-angular';
import { Competicao, CompeticaoPojo } from '../../model/competicao.model';
import { CompeticaoService } from '../../service/competicao.service';
import { TenisService } from '../../service/tenis.service';
import { LoginPage } from '../login/login';
import { BilheteService } from '../../service/bilhete.service';
import { Bilhete } from '../../model/bilhete.model';
import { UsuarioService } from '../../service/usuario.service';
import { HomeSmPage } from '../home-sm/home-sm';

import { RankingService } from '../../service/ranking.service';
import { BancaService } from '../../service/banca.service';
import { ConfiguracaoService } from '../../service/configuracao.service';
import { Esporte } from "../../model/esporte.enum";
import { ID_BANCA } from '../../service/app.api';
import { Partida } from '../../model/partida.model';
import { Aposta } from '../../model/aposta.model';
import { PartidaService } from '../../service/partida.service';

import { Util } from '../../providers/util';
import { Regiao } from '../../model/regiao.model';
import { File, DirectoryEntry, FileEntry, Entry } from '@ionic-native/file';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  constructor(public navCtrl: NavController, public modalCtrl : ModalController, public competicaoService : CompeticaoService,
              public bs : BilheteService, public us : UsuarioService, public rk : RankingService, private alertCtrl: AlertController,
              public navParams: NavParams, public tenisService : TenisService, public bancaService : BancaService,
              public configService: ConfiguracaoService, public loadCtrl: LoadingController, public toastCtrl: ToastController,
              public ps: PartidaService, private file: File) {

  
  }             

 
}

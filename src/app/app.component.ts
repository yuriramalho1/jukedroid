import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ModalController, LoadingController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { Competicao } from '../model/competicao.model';
import { UsuarioService } from '../service/usuario.service';
import { BilheteService } from '../service/bilhete.service';
import { TransacaoService } from '../service/transacao.service';

import { RankingService } from '../service/ranking.service';
import { CaixaPage } from '../pages/caixa/caixa';
import { MeuCaixaService } from '../service/meu-caixa.service';



import { HomeSmPage } from '../pages/home-sm/home-sm';

import { PrinterProvider } from '../providers/printer-provider'
import { PrinterCommands } from '../providers/printer-commands'
import { CompeticaoService } from '../service/competicao.service';
import { PartidaService } from '../service/partida.service';
import { NovidadeService } from '../service/novidade.service';
import { Notificacao } from '../model/notificacao.model';
import { Esporte } from "../model/esporte.enum";
import { Usuario } from '../model/usuario.model';
import { BancaService } from '../service/banca.service';
import { ID_BANCA } from "../service/app.api";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage
  impressora: any;


  id_banca : number = ID_BANCA;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public us : UsuarioService,
              public ts : TransacaoService, public rk : RankingService, public modalCtrl : ModalController, public mcs : MeuCaixaService,
              public printer : PrinterProvider, public bs: BilheteService, public competicaoService: CompeticaoService, public ps: PartidaService,
              public storage : Storage, public ns : NovidadeService, public loadCtrl: LoadingController, public bancaService : BancaService,
              public alertCtrl: AlertController) {
  


   // this.bancaService.getBancaAtual().then(banca =>{
   //   this.rankingPersonalizado = banca.rankingPersonalizado;

      //this.storage.get('login').then(login =>{
       // this.storage.get('senha').then(senha =>{
            this.rootPage = HomePage;

          

         //   if(login && senha){
         //     this.rootPage = LoginPage;
         //   }
      //  });
     // });

      
  //  })
  }

 
}

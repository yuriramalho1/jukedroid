import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController, ToastController, AlertController, Platform } from 'ionic-angular';
import { BilheteService } from '../../service/bilhete.service';
import { AoVivoService } from '../../service/aovivo.service';
import { BancaService } from '../../service/banca.service';
import { AovivoPartidaPage } from '../aovivo-partida/aovivo-partida'
import { AovivoHorarioPage } from '../aovivo-horario/aovivo-horario'
import { PartidaAoVivo } from '../../model/partida-aovivo.model';
import { ID_BANCA } from "../../service/app.api";

@IonicPage()
@Component({
  selector: 'page-gerenciar-aovivo',
  templateUrl: 'gerenciar-aovivo.html',
})
export class GerenciarAovivoPage {

  partidas  : PartidaAoVivo[] = [];
  id_banca : number = ID_BANCA;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public bs : BilheteService,
              private avservice : AoVivoService, public loadCtrl: LoadingController, public modalCtrl: ModalController,
              public alertCtrl: AlertController, private platform : Platform, public bancaService: BancaService) {
      let load = this.loadCtrl.create();
      load.present();

      this.onResume = this.platform.resume.subscribe(() => {
        this.ionViewDidLoad();
      });

      this.avservice.getPartidasAoVivo().then(partidas =>{
        if(partidas.length > 0 && !avservice.isEmpty(partidas[0].event)){
            this.avservice.partidas = partidas;
        }
        load.dismiss();
      });
  }

  onResume(){
    this.ionViewDidLoad();
  }

  ionViewDidLoad(){
    clearInterval(this.avservice.req);
    this.avservice.getPartidas();
  }


  toPartidaAoVivo(partida){
    let modal = this.modalCtrl.create(AovivoPartidaPage,{
      partida: partida,
      isGerenciar: true
    });
    modal.present();
    modal.onDidDismiss(data =>{
      this.ionViewDidLoad();
    });
  }

  toAoVivoHorario(partida){
    let modal = this.modalCtrl.create(AovivoHorarioPage,{
      partida: partida,
      isGerenciar: true
    });
    modal.present();
    modal.onDidDismiss(data =>{
      this.ionViewDidLoad();
    });
  }

  habilitaDesabilitaPartida(partida){
    this.avservice.habilitarDesabilitarPartida(partida.eventId).then(partidaAtualizada =>{
      partida = partidaAtualizada;
    });
  }

  ionViewDidLeave(){
    clearInterval(this.avservice.req);
  }

}

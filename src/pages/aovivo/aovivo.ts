import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController, ToastController, AlertController, Platform } from 'ionic-angular';
import { BilheteService } from '../../service/bilhete.service';
import { AoVivoService } from '../../service/aovivo.service';
import { BancaService } from '../../service/banca.service';
import { BilhetePage } from '../bilhete/bilhete';
import { HomePage } from '../home/home';
import { AovivoPartidaPage } from '../aovivo-partida/aovivo-partida'
import { PartidaAoVivo } from '../../model/partida-aovivo.model';
import { Aposta } from '../../model/aposta.model';

@IonicPage()
@Component({
  selector: 'page-aovivo',
  templateUrl: 'aovivo.html',
})
export class AovivoPage {

  partidas  : PartidaAoVivo[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public bs : BilheteService,
              private avservice : AoVivoService, public loadCtrl: LoadingController, public modalCtrl: ModalController,
              public alertCtrl: AlertController, private platform : Platform, public bancaService: BancaService) {
      let load = this.loadCtrl.create();
      load.present();

      this.onResume = this.platform.resume.subscribe(() => {
        this.ionViewDidLoad();
      });

      this.bancaService.isSuspenderAoVivo().then(suspender =>{
        if(suspender){
          let alert = this.alertCtrl.create({
            title: "Atualizando Partidas Ao Vivo",
            message: "Estamos atualizando as partidas ao-vivo, por favor tente novamente mais tarde!",
            cssClass: "alertCompeticoes",
            buttons: ['OK']
          })

          load.dismiss();
          alert.present();
          return;
        }

        this.avservice.getPartidasAoVivo().then(partidas =>{
          if(partidas.length > 0 && !avservice.isEmpty(partidas[0].event)){
              this.avservice.partidas = partidas;
          }
          load.dismiss();
        });
      });
  }

  onResume(){
    this.ionViewDidLoad();
  }

  ionViewDidLoad(){
    clearInterval(this.avservice.req);
    this.bancaService.isSuspenderAoVivo().then(suspender =>{
      if(suspender){
        return;
      }

      this.avservice.getPartidas();
    });
  }

  adicionarPartida(partida : PartidaAoVivo, escolha : number, cotacao: number) : void{
    if (this.bs.verificarPartidaAoVivo(partida)){
      if (this.bs.verificarApostaAoVivo(partida,escolha, '1x2')){
        this.bs.removeApostaPorPartidaAoVivo(partida,escolha)
      } else{
        let toast = this.toastCtrl.create({
          message: 'Já existe uma aposta para a partida selecionada',
          duration: 2000
        });
        toast.present();
      }
    }else{
      let aposta : Aposta   = new Aposta()
      aposta.partidaAoVivo  = partida
      aposta.ativo          = true;
      aposta.competicao     = "AoVivo";
      aposta.tipoCompeticao = partida.event.Region.Name;
      aposta.cotacaoAposta  = cotacao;
      aposta.placarAoVivoDelay = partida.event.scoreTeam1 + 'x' + partida.event.scoreTeam2;

      if(aposta.partidaAoVivo.event.MainMarket.Results && aposta.partidaAoVivo.event.MainMarket.Results.length > 0){
         aposta.dataEvento    = partida.event.Date;
         aposta.tipoAposta    = '1x2';
         aposta.evento        = partida.event.Player1 +' x '+ partida.event.Player2;
         aposta.result        = partida.event.MainMarket.Results[escolha];
         switch(escolha){
           case 0:{
             aposta.escolha = partida.event.Player1;
             break;
           }
           case 1:{
             aposta.escolha = 'X'
             break;
           }
           case 2:{
             aposta.escolha = partida.event.Player2;
             break;
           }
         }

         this.bs.addAposta(aposta);
      }
    }
  }

  buttonStyle(partida : PartidaAoVivo, escolha : number) : string{
    let resultado : string = ""

    if (this.bs.verificarApostaAoVivo(partida, escolha, '1x2')){
      resultado = "secondary"
    }

    return resultado
  }

  toBilhete(){
    let modal = this.modalCtrl.create(BilhetePage);
    modal.present();
  }

  toPartidaAoVivo(partida){
    let modal = this.modalCtrl.create(AovivoPartidaPage,{
      partida: partida
    });
    modal.present();
    modal.onDidDismiss(data =>{
      this.ionViewDidLoad();
    });
  }

  ionViewDidLeave(){
      clearInterval(this.avservice.req);
  }

}

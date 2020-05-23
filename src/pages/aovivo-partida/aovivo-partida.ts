import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, ModalController } from 'ionic-angular';
import { PartidaAoVivo } from '../../model/partida-aovivo.model';
import { Result }        from '../../model/partida-aovivo.model';
import { Market }        from '../../model/partida-aovivo.model';
import { Counter }        from '../../model/partida-aovivo.model';
import { Aposta }        from '../../model/aposta.model';
import { BilhetePage }   from '../bilhete/bilhete';
import { AoVivoService } from '../../service/aovivo.service';
import { BilheteService } from '../../service/bilhete.service';

@IonicPage()
@Component({
  selector: 'page-aovivo-partida',
  templateUrl: 'aovivo-partida.html',
})
export class AovivoPartidaPage {

  partida : PartidaAoVivo;
  showGrafico : boolean = false;
  interval    : any;
  isGerenciar : boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
              private avservice : AoVivoService, public bs : BilheteService, public toastCtrl: ToastController,
              public modalCtrl: ModalController) {
    this.partida     = this.navParams.get('partida');
    this.isGerenciar = this.navParams.get('isGerenciar');

    this.avservice.getPartida(this.partida.eventId).then(partida =>{
      if(!avservice.isEmpty(partida[0].event)){
        this.partida = partida[0];
      }
    });
    clearInterval(this.avservice.req);
  }

  dismiss() {
    this.viewCtrl.dismiss();
    clearInterval(this.interval);
  }

  ionViewDidEnter(){
    clearInterval(this.interval);
    this.interval = setInterval(() =>{
      this.avservice.getPartida(this.partida.eventId).then(partida =>{
        if(!partida || partida.length == 0){
          this.dismiss();
          return;
        }

        if(partida[0].event){
          if(this.partida && this.partida.event && this.partida.event.Markets && this.partida.event.Markets.length > 0){
            for (let i = 0; i < partida[0].event.Markets.length; i++) {
              if(this.partida.event.Markets[i] && this.partida.event.Markets[i].Id == partida[0].event.Markets[i].Id){
                partida[0].event.Markets[i].esconder = this.partida.event.Markets[i].esconder;
              };
            }
          }

          this.partida = partida[0];
        }
      });
    }, 2000);
  }

  show(bool : boolean){
    let element  : any;
    let element2 : any;
    this.showGrafico = bool;

    if(this.showGrafico){
      element = document.getElementsByClassName("fixed-content")[2];
      element.style.marginTop = '300px';

      element2 = document.getElementsByClassName("scroll-content")[2];
      element2.style.marginTop = '300px';
    }else{
      element = document.getElementsByClassName("fixed-content")[2];
      element.style.marginTop = '216px';

      element2 = document.getElementsByClassName("scroll-content")[2];
      element2.style.marginTop = '216px';
    }
  }

  selecionaOpcao(result : Result, market: Market){
    if(!this.isGerenciar){
      if (this.bs.verificarPartidaAoVivo(this.partida)){
        if (this.bs.verificarApostaMaisOpcoesAoVivo(this.partida, result.Name, market.Name)){
          this.bs.removeApostaPorPartidaMaisOpcoesAoVivo(this.partida, result.Name);
        } else{
          let toast = this.toastCtrl.create({
            message: 'Já existe uma aposta para a partida selecionada',
            duration: 2000
          });
          toast.present();
        }
      } else{
        let aposta : Aposta   = new Aposta();
        aposta.partidaAoVivo  = this.partida;
        aposta.ativo          = true;
        aposta.competicao     = "AoVivo";
        aposta.tipoCompeticao = this.partida.event.Region.Name;
        aposta.cotacaoAposta  = result.Odds;
        aposta.escolha        = result.Name;
        aposta.result         = result;
        aposta.tipoAposta     = market.Name;
        aposta.dataEvento     = this.partida.event.Date;
        aposta.evento         = this.partida.event.Player1 + ' x ' +this.partida.event.Player2;

        this.bs.addAposta(aposta)
      }
    }
  }

  toBilhete(){
    let modal = this.modalCtrl.create(BilhetePage);
    modal.present();
    clearInterval(this.interval);
  }

  buttonStyle(result : Result, market: Market) : string{
    let resultado : string = ""

    if (this.bs.verificarApostaMaisOpcoesAoVivo(this.partida, result.Name, market.Name)){
      resultado = "secondary"
    }

    return resultado
  }

  somaCounter(counters : Counter[]) : number{
    let retorno         = 0;
    let ultimoPeriodoId = 0;
    for (let counter of counters) {
      if(counter.PeriodId > ultimoPeriodoId){
        retorno = counter.Value;
      }
      ultimoPeriodoId = counter.PeriodId;
    }
    return retorno;
  }

}

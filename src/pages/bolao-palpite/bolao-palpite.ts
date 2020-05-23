import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { BolaoService } from '../../service/bolao.service';
import { Palpite } from '../../model/palpite.model';
import { Bolao } from '../../model/bolao.model';
import { Aposta } from '../../model/aposta.model';

@IonicPage()
@Component({
  selector: 'page-bolao-palpite',
  templateUrl: 'bolao-palpite.html',
})
export class BolaoPalpitePage {

  bolao        : Bolao;
  listaPalpite : Palpite[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private bolaoService: BolaoService,
              private viewCtrl: ViewController, private loadCtrl: LoadingController) {
    this.bolao = this.navParams.get('bolao');

    this.getPalpiteBolao(this.bolao);
  }

  getPalpiteBolao(bolao: Bolao){
    let load = this.loadCtrl.create();
    load.present();

    let palpite = new Palpite();

    this.bolaoService.getPalpiteBolao(bolao).then(lista =>{
      for(let aposta of lista){
        let teveNovoPalpite : boolean = false;

        if(this.listaPalpite.length == 0){
          palpite                = new Palpite();
          palpite.bolaoPremiado  = aposta.vencedora;
          palpite.timeCasa       = this.dadosAposta(aposta, false, true);
          palpite.timeFora       = this.dadosAposta(aposta, false, false);
          palpite.placarTimeCasa = this.dadosAposta(aposta, true, true);
          palpite.placarTimeFora = this.dadosAposta(aposta, true, false);
          palpite.quantidade     = 1;
          this.listaPalpite.push(palpite);
        }else{
          for (let i = 0; i < this.listaPalpite.length; i++) {
            if(this.listaPalpite[i].timeCasa == this.dadosAposta(aposta, false, true) && this.listaPalpite[i].timeFora == this.dadosAposta(aposta, false, false) &&
               this.listaPalpite[i].placarTimeCasa == this.dadosAposta(aposta, true, true) && this.listaPalpite[i].placarTimeFora == this.dadosAposta(aposta, true, false)){
              this.listaPalpite[i].quantidade = (this.listaPalpite[i].quantidade + 1);
              teveNovoPalpite = false;
              break;
            }else{
              palpite                = new Palpite();
              palpite.bolaoPremiado  = aposta.vencedora;
              palpite.timeCasa       = this.dadosAposta(aposta, false, true);
              palpite.timeFora       = this.dadosAposta(aposta, false, false);
              palpite.placarTimeCasa = this.dadosAposta(aposta, true, true);
              palpite.placarTimeFora = this.dadosAposta(aposta, true, false);
              palpite.quantidade     = 1;
              teveNovoPalpite        = true;
            }
          }

          if(teveNovoPalpite){
            this.listaPalpite.push(palpite);
          }
        }
      }

      console.log(this.listaPalpite);
      load.dismiss();
    }).catch(erro =>{
      load.dismiss();
    })
  }

  dadosAposta(aposta: Aposta, isPlacar?: boolean, isCasa?: boolean): any{
    let retorno        : any;
    let timeCasa       : string = "";
    let timeFora       : string = "";
    let placarTimeCasa : number;
    let placarTimeFora : number;

    timeCasa = aposta.evento.split('x')[0].trim();
    timeFora = aposta.evento.split('x')[1].trim();

    placarTimeCasa = Number(aposta.escolha.split('x')[0]);
    placarTimeFora = Number(aposta.escolha.split('x')[1]);

    retorno = timeCasa;

    if (isPlacar){
      retorno = placarTimeCasa;

      if(!isCasa){
        retorno = placarTimeFora;
        return retorno;
      }
      return retorno;
    }

    if(!isCasa){
      retorno = timeFora;
      return retorno;
    }

    return retorno;
  }

  getImage(palpite : Palpite): string{
    let retorno = 'assets/imgs/trofeu-inativo.png';

    if(palpite.bolaoPremiado){
      retorno = 'assets/imgs/trofeu-ativo.png';
    }

    return retorno;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}

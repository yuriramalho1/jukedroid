import { BolaoRegrasPage } from './../bolao-regras/bolao-regras';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, ModalController } from 'ionic-angular';
import { Bolao } from '../../model/bolao.model';
import { BolaoService } from '../../service/bolao.service';
import { EventoBolao } from '../../model/evento-bolao.model';
import { Aposta } from '../../model/aposta.model';
import { Util } from '../../providers/util';
import { BilheteBolaoPage } from '../bilhete-bolao/bilhete-bolao';
import { UsuarioService } from '../../service/usuario.service';
import { BancaService } from '../../service/banca.service';

@IonicPage()
@Component({
  selector: 'page-bolao-rodada',
  templateUrl: 'bolao-rodada.html',
})
export class BolaoRodadaPage {
  rodada        : Bolao;
  util          : Util;
  encerrado     : boolean;
  tipoBolao     : string;
  isSimulacao   : boolean;
  acumuladao1x2 : boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
              public bolaoService : BolaoService, private toastCtrl: ToastController, private modalCtrl: ModalController,
              private us: UsuarioService, private bancaService: BancaService) {

    this.rodada        = this.navParams.get('rodada');
    this.encerrado     = this.navParams.get('encerrado');
    this.tipoBolao     = this.navParams.get('tipoBolao');
    this.acumuladao1x2 = this.bancaService.banca.acumuladao1x2;
    this.util          = new Util();

    //Sempre que construir o modal zera os placares para não ficar em memória.
    for(let partida of this.rodada.listaEvento){
      partida.resultadoTimeUm   = null;
      partida.resultadoTimeDois = null;
    }

    //Será uma simulação caso não tenha usuário em sessão.
    this.isSimulacao = (this.us.usuario == undefined || this.us.usuario.id == undefined);

    this.bolaoService.setPossivelRetorno(this.rodada.premio, this.rodada.valorBilhete);
    this.bolaoService.setBilheteBolao(this.rodada);

    if(this.rodada.premioMultiplo){
      this.bolaoService.setPremiosMultiplos(this.rodada.premio_dois, this.rodada.premio_tres);
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad(){
    document.getElementsByTagName('page-bolao-rodada')[0].getElementsByClassName('fixed-content')[0].className = 'fixed-content imagemAcumuladao';

    if(this.tipoBolao == 'BOLAO'){
      document.getElementsByTagName('page-bolao-rodada')[0].getElementsByClassName('fixed-content')[0].className = 'fixed-content imagemBolao';
    }
  }

  toBilheteBolao(){
    if(this.bolaoService.getBilheteBolao().listaApostas.length !== this.rodada.listaEvento.length){
      let toast = this.toastCtrl.create({
        message: 'Todos os placares devem ser preenchidos antes de finalizar a aposta',
        duration: 3000,
        position: 'bottom'
      });

      toast.present();
      return;
    }

    let modal = this.modalCtrl.create(BilheteBolaoPage, {
      tipoBolao  : this.tipoBolao,
      isSimulacao: this.isSimulacao
    });
    modal.present();

    modal.onDidDismiss(cadastrou =>{
      if(cadastrou){
        this.dismiss();
      }
    })
  }


  addApostaBolao(partida: EventoBolao){
    //Remove aposta já existente na lista de apostas para garantir os placares atualizados.
    this.bolaoService.removeApostaPartida(partida);

    if(partida && partida.resultadoTimeUm && partida.resultadoTimeDois){
      let apostaBolao = new Aposta();

      apostaBolao.competicao     = partida.competicao;
      apostaBolao.evento         = `${partida.timeCasa.nome} x ${partida.timeFora.nome}`;
      apostaBolao.escolha        = `${partida.resultadoTimeUm}x${partida.resultadoTimeDois}`;
      apostaBolao.tipoAposta     = 'Placar Exato';
      apostaBolao.tipoCompeticao = 'Acumuladão';
      apostaBolao.dataFormatada  = partida.dataFormatada;
      apostaBolao.ativo          = true;
      apostaBolao.cotacaoAposta  = null;

      this.bolaoService.getBilheteBolao().listaApostas.push(apostaBolao);
    }
  }

  addAposta1x2(partida: EventoBolao, escolha: string){
    //Remove aposta já existente na lista de apostas para garantir os placares atualizados.
    this.bolaoService.removeApostaPartida(partida);

    let apostaBolao = new Aposta();

    apostaBolao.competicao     = partida.competicao;
    apostaBolao.evento         = `${partida.timeCasa.nome} x ${partida.timeFora.nome}`;
    apostaBolao.escolha        = escolha;
    apostaBolao.tipoAposta     = '1x2';
    apostaBolao.tipoCompeticao = 'Acumuladão';
    apostaBolao.dataFormatada  = partida.dataFormatada;
    apostaBolao.ativo          = true;
    apostaBolao.cotacaoAposta  = null;

    this.bolaoService.getBilheteBolao().listaApostas.push(apostaBolao);
  }

  buttonStyle(partida : EventoBolao, escolha : string) : string{
    let resultado : string = ""

    if (this.bolaoService.verificarAposta(partida, escolha)){
      resultado = "secondary"
    }

    return resultado
  }

  toRegrasBolao(){
    let modal = this.modalCtrl.create(BolaoRegrasPage);

    modal.present();
  }
}

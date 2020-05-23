import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, AlertController } from 'ionic-angular';
import { Bolao } from '../../model/bolao.model';
import { Banca } from '../../model/banca.model';
import { EventoBolao } from '../../model/evento-bolao.model';
import { ID_BANCA } from '../../service/app.api';
import { Time } from '../../model/time.model';
import { BolaoService } from '../../service/bolao.service';
import { Util } from '../../providers/util';


@IonicPage()
@Component({
  selector: 'page-bolao-cadastro',
  templateUrl: 'bolao-cadastro.html',
})
export class BolaoCadastroPage {
  //Variáveis do Bolão
  titulo           : string;
  premio           : number;
  premio_dois      : number;
  premio_tres      : number;
  valorBilhete     : number;
  dataEncerramento : string;
  horaEncerramento : string;
  listaEvento      : EventoBolao[] = [];
  premioMultiplo   : boolean = false;

  //Variáveis do Evento do Bolão;
  timeLista               : Time[] = [];
  timeCasa                : Time;
  timeFora                : Time;
  dataEncerramentoPartida : string;
  horaEncerramentoPartida : string;
  competicao              : string;

  //Demais varáveis
  tipoBolao     : string;
  isValid       : boolean = false;
  isRefreshList : boolean = false;
  isEditar      : boolean = false;
  bolaoEditar   : Bolao;
  util          : Util;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
              private bolaoService: BolaoService, private toastCtrl: ToastController, private alertCtrl: AlertController) {
    this.util      = new Util();
    this.tipoBolao = this.navParams.get('tipoBolao');

    if(this.navParams.get('bolao')){
      this.bolaoEditar = this.navParams.get('bolao');
      this.isEditar    = true;

      this.titulo           = this.bolaoEditar.titulo;
      this.premio           = this.bolaoEditar.premio;
      this.premio_dois      = this.bolaoEditar.premio_dois;
      this.premio_tres      = this.bolaoEditar.premio_tres;
      this.valorBilhete     = this.bolaoEditar.valorBilhete;
      this.premioMultiplo   = this.bolaoEditar.premioMultiplo;
      this.dataEncerramento = this.util.toDate(this.bolaoEditar.dataFormatada.substr(0, 10)).toISOString();
      this.horaEncerramento = this.bolaoEditar.dataFormatada.substr(14, 5);
      this.listaEvento      = this.bolaoEditar.listaEvento;
      this.tipoBolao        = this.bolaoEditar.tipoBolao;
    }

    this.bolaoService.todosTimes().then(times =>{
      this.timeLista = times;
    });
  }

  dismiss() {
    this.viewCtrl.dismiss(this.isRefreshList);
  }

  cadastrarBolao(){
    if(!this.titulo || !this.premio || !this.dataEncerramento || !this.horaEncerramento || this.listaEvento.length == 0){
      let toast = this.toastCtrl.create({
        message: 'É necessário preencher todos os campos para cadastrar um ' + (this.tipoBolao == 'BOLAO' ? 'Bolão' : 'Acumuladão'),
        duration: 3000,
        position: 'bottom'
      });

      toast.present();
      return;
    }

    if(new Date(this.dataEncerramento).getTime() < new Date().getTime()){
      let toast = this.toastCtrl.create({
        message: 'Não é possível cadastrar uma data de encerramento inferior a data atual',
        duration: 3000,
        position: 'bottom'
      });

      toast.present();
      return;
    }

    if(this.premioMultiplo && !this.premio_dois){
      let toast = this.toastCtrl.create({
        message: 'É necessário preencher mais de um prêmio para este tipo de ' + (this.tipoBolao == 'BOLAO' ? 'Bolão' : 'Acumuladão'),
        duration: 3000,
        position: 'bottom'
      });

      toast.present();
      return;
    }

    if(this.isEditar){
      this.editarBolao();
      return;
    }

    let bolao      = new Bolao();
    bolao.banca    = new Banca();
    bolao.banca.id = ID_BANCA;

    bolao.titulo         = this.titulo;
    bolao.premio         = this.premio;
    bolao.premio_dois    = this.premio_dois;
    bolao.premio_tres    = this.premio_tres;
    bolao.premioMultiplo = this.premioMultiplo;
    bolao.valorBilhete   = this.valorBilhete;
    bolao.competicao     = this.competicao;
    bolao.encerrado      = false;
    bolao.dataFormatada  = this.dataEncerramento + ' ' + this.horaEncerramento;
    bolao.listaEvento    = this.listaEvento;
    bolao.tipoBolao      = this.tipoBolao;

    this.bolaoService.cadastrarBolao(bolao).then(retorno =>{
      if(retorno.id > 0){
        let alert = this.alertCtrl.create({
          title: (this.tipoBolao == 'BOLAO' ? 'Bolão' : 'Acumuladão') + ' Cadastrado com Sucesso',
          cssClass: "alertSimulacao",
          buttons: [{
            text: 'OK',
            handler: () =>{
              this.isRefreshList = true;
              this.dismiss();
            }
          }]
        })

        alert.present();
      }else{
        let toast = this.toastCtrl.create({
          message: 'Erro ao cadastrar o ' + (this.tipoBolao == 'BOLAO' ? 'Bolão' : 'Acumuladão'),
          duration: 3000,
          position: 'bottom'
        });

        toast.present();
        return;
      }

      //Limpar formulário Acumuladão
      this.titulo           = null;
      this.premio           = null;
      this.premio_dois      = null;
      this.premio_tres      = null;
      this.premioMultiplo   = false;
      this.valorBilhete     = null;
      this.dataEncerramento = null;
      this.horaEncerramento = null;
      this.listaEvento      = [];
    })
  }

  editarBolao(){
    this.bolaoEditar.titulo         = this.titulo;
    this.bolaoEditar.premio         = this.premio;
    this.bolaoEditar.premio_dois    = this.premio_dois;
    this.bolaoEditar.premio_tres    = this.premio_tres;
    this.bolaoEditar.premioMultiplo = this.premioMultiplo;
    this.bolaoEditar.valorBilhete   = this.valorBilhete;
    this.bolaoEditar.competicao     = this.competicao;
    this.bolaoEditar.dataFormatada  = this.dataEncerramento.substr(0, 10) + ' ' + this.horaEncerramento;
    this.bolaoEditar.listaEvento    = this.listaEvento;

    this.bolaoService.cadastrarBolao(this.bolaoEditar).then(retorno =>{
      if(retorno.id > 0){
        let alert = this.alertCtrl.create({
          title: (this.tipoBolao == 'BOLAO' ? 'Bolão' : 'Acumuladão') + ' Alterado com Sucesso',
          cssClass: "alertSimulacao",
          buttons: [{
            text: 'OK',
            handler: () =>{
              this.isRefreshList = true;
              this.dismiss();
            }
          }]
        })

        alert.present();
      }else{
        let toast = this.toastCtrl.create({
          message: 'Erro ao alterar o ' + (this.tipoBolao == 'BOLAO' ? 'Bolão' : 'Acumuladão'),
          duration: 3000,
          position: 'bottom'
        });

        toast.present();
        return;
      }
    })
  }

  adicionarPartida(){
    if(!this.timeCasa || !this.competicao || !this.timeFora || !this.dataEncerramentoPartida || !this.horaEncerramentoPartida){
      let toast = this.toastCtrl.create({
        message: 'É necessário preencher todos os campos para adicionar uma partida',
        duration: 3000,
        position: 'bottom'
      });

      toast.present();
      return;
    }

    if(new Date(this.dataEncerramentoPartida).getTime() < new Date().getTime()){
      let toast = this.toastCtrl.create({
        message: 'Não é possível cadastrar uma data da partida inferior a data atual',
        duration: 3000,
        position: 'bottom'
      });

      toast.present();
      return;
    }

    let eventoBolao           = new EventoBolao();
    eventoBolao.competicao    = this.competicao;
    eventoBolao.timeCasa      = this.timeCasa;
    eventoBolao.timeFora      = this.timeFora;
    eventoBolao.dataFormatada = this.dataEncerramentoPartida + ' ' + this.horaEncerramentoPartida;

    this.listaEvento.push(eventoBolao);

    //Limpar formulário Partida
    this.timeCasa                = null;
    this.timeFora                = null;
  }

  encontraTime(nomeTime: string) : Time{
    let retorno = new Time();

    for(let time of this.timeLista){
      if(time.nome === nomeTime){
        retorno = time;
      }
    }

    return retorno;
  }

}

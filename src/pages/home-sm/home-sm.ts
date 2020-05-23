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
import { BilhetePage } from '../bilhete/bilhete';
import { MaisOpcoesPage } from '../mais-opcoes/mais-opcoes';

@IonicPage()
@Component({
  selector: 'page-home-sm',
  templateUrl: 'home-sm.html',
})
export class HomeSmPage {

  bilhete         : Bilhete;
  existePartidas  : boolean;
  competicao      : Competicao;
  competicoesPojo  : CompeticaoPojo[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public partidaService : PartidaService, public bs : BilheteService,
              public toastCtrl: ToastController, public ps : PartidaService, public cs : CompeticaoService, public loadCtrl: LoadingController,
              public modalCtrl: ModalController, public us : UsuarioService) {

    let jogosDia = new Competicao();
    jogosDia.id             = -3;
    jogosDia.tipoCompeticao = "Todos os Jogos";

    this.competicao = jogosDia;

    this.competicao.listaPartidas = [];
    this.bilhete = bs.getBilhete();
    this.competicoesPojo = [];

    let load = this.loadCtrl.create();
    load.present();

    if(this.competicao.id < 0){
      cs.jogosDoDiaPorCompeticao(this.us.usuario, this.competicao).then(partidas =>{
        let competicoes      = this.prepareJogosDoDia(partidas);
        this.competicoesPojo = [];

        for(let competicao of competicoes){
          let competicaoPojo            = new CompeticaoPojo;
          competicaoPojo.competicao     = competicao;
          competicaoPojo.listaPartidas  = competicao.listaPartidas;
          competicaoPojo.tipoCompeticao = competicao.tipoCompeticao.replace('_', ' ').replace('_', ' ');
          competicaoPojo.ativo          = true;
          this.competicoesPojo.push(competicaoPojo);
        }

        load.dismiss();
      })
    }
  }

  ionViewDidEnter(){
    this.bilhete = this.bs.getBilhete()
  }

  toBilhete(){
    let modal = this.modalCtrl.create(BilhetePage);
    modal.present();
  }

  adicionarPartida(partida : Partida, escolha : number) : void{
    if(this.competicao.id < 0){
      partida.competicao.listaPartidas = [];
    }

    if (this.bs.verificarPartida(partida)){
      let semEmpate = (this.competicao.esporte && this.competicao.esporte != Esporte.FUTEBOL.toUpperCase());

      if (this.bs.verificarAposta(partida, escolha, semEmpate)){
        this.bs.removeApostaPorPartida(partida, escolha, semEmpate)
      } else{
        let toast = this.toastCtrl.create({
          message: 'Já existe uma aposta para a partida selecionada',
          duration: 2000
        });
        toast.present();
      }
    } else{
      let aposta : Aposta = new Aposta()
      aposta.partida = partida
      aposta.ativo = true
      aposta.competicao = partida.competicao.descricao;

      if (escolha == 0){
        aposta.cotacaoAposta = partida.cotacaoTimeCasa
        aposta.escolha = partida.timeCasa
        aposta.tipoAposta = '1x2'
      }

      if (escolha == 1 && (this.competicao.esporte && this.competicao.esporte != Esporte.FUTEBOL.toUpperCase())){
        aposta.cotacaoAposta = partida.cotacaoTimeFora
        aposta.escolha = partida.timeFora
        aposta.tipoAposta = '1x2'
      }else if(escolha == 1){
        aposta.cotacaoAposta = partida.cotacaoEmpate
        aposta.escolha = 'Empate'
        aposta.tipoAposta = '1x2'
      }

      if (escolha == 2){
        aposta.cotacaoAposta = partida.cotacaoTimeFora
        aposta.escolha = partida.timeFora
        aposta.tipoAposta = '1x2'
      }

      aposta.dataEvento = partida.dataPartida
      aposta.evento = `${partida.timeCasa} x ${partida.timeFora}`

      this.bs.addAposta(aposta)
    }
  }

  buttonStyle(partida : Partida, escolha : number) : string{
    let resultado : string = ""
    let semEmpate = (this.competicao.esporte && this.competicao.esporte != Esporte.FUTEBOL.toUpperCase());

    if (this.bs.verificarAposta(partida,escolha,semEmpate)){
      resultado = "secondary"
    }

    return resultado
  }

  carregaMaisOpcoes(partidaSelecionada : Partida){
    let load = this.loadCtrl.create();
    load.present();
    this.ps.maisOpcoesPorPartida(partidaSelecionada, this.us.usuario).then(lista => {
      if(this.competicao.id < 0){
        partidaSelecionada.competicao.listaPartidas = [];
      }
      this.navCtrl.push(MaisOpcoesPage, {
        partida : partidaSelecionada,
        opcoesCotacao : lista,
        competicao : partidaSelecionada.competicao
      })
      load.dismiss();
    })

  }

  prepareJogosDoDia(partidas : Partida[]){
    let competicaoJogosDia : Competicao[] = [];
    let ultimaCompeticao   : string;
    for(let partida of partidas){
      if(partida.competicao.descricao != ultimaCompeticao){
        competicaoJogosDia.push(partida.competicao);
        if(!competicaoJogosDia[competicaoJogosDia.length - 1].listaPartidas){
          competicaoJogosDia[competicaoJogosDia.length - 1].listaPartidas = [];
        }
        competicaoJogosDia[competicaoJogosDia.length - 1].listaPartidas.push(partida);
      }else{
        competicaoJogosDia[competicaoJogosDia.length - 1].listaPartidas.push(partida);
      }

      ultimaCompeticao = partida.competicao.descricao;
    }
    return competicaoJogosDia;
  }

  toCadastro(){
    this.navCtrl.push(LoginPage,{
      saiu: true,
      cadastrar: true
    })
  }

  toLogin(){
    this.navCtrl.push(LoginPage,{
      saiu: true,
      cadastrar: false
    })
  }

}

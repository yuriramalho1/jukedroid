import { Component } from '@angular/core';
import { NavController, ModalController, AlertController, NavParams, LoadingController, ToastController  } from 'ionic-angular';
import { Competicao, CompeticaoPojo } from '../../model/competicao.model';
import { CompeticaoService } from '../../service/competicao.service';
import { TenisService } from '../../service/tenis.service';
import { CompeticaoPage } from '../competicao/competicao';
import { LoginPage } from '../login/login';
import { BilheteService } from '../../service/bilhete.service';
import { Bilhete } from '../../model/bilhete.model';
import { BilhetePage } from '../bilhete/bilhete';
import { UsuarioService } from '../../service/usuario.service';
import { RankingPage } from '../ranking/ranking';
import { HomeSmPage } from '../home-sm/home-sm';
import { RankingPersonalizadoPage } from '../ranking-personalizado/ranking-personalizado';
import { RankingService } from '../../service/ranking.service';
import { BancaService } from '../../service/banca.service';
import { ConfiguracaoService } from '../../service/configuracao.service';
import { Esporte } from "../../model/esporte.enum";
import { ID_BANCA } from '../../service/app.api';
import { Partida } from '../../model/partida.model';
import { Aposta } from '../../model/aposta.model';
import { PartidaService } from '../../service/partida.service';
import { MaisOpcoesPage } from '../mais-opcoes/mais-opcoes';
import { Util } from '../../providers/util';
import { Regiao } from '../../model/regiao.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  bilhete                   : Bilhete
  tipoCompeticao            : string
  funcoesUtil               : Util;

  todasCompeticoes          : Competicao[] = [];
  regioes                   : Regiao[]     = [];

  competicoesJogosDoDia     : Competicao[] = [];
  competicoesCombateMundo   : Competicao[] = [];
  competicaoTenisATP        : Competicao[] = [];
  competicaoTenisWTA        : Competicao[] = [];
  competicaoTenisCOPA_DAVIS : Competicao[] = [];
  competicaoTenisFED_CUP    : Competicao[] = [];
  competicaoTenisITF_MEN    : Competicao[] = [];
  competicaoTenisITF_WOMEN  : Competicao[] = [];
  competicaoTenisCHALLENGER : Competicao[] = [];

  exibeModal           : boolean = true;
  atualizando          : Boolean = false;
  rankingPersonalizado : boolean = false;
  esporteExibir        : Esporte = Esporte.FUTEBOL;

  competicoesDestaqueDia   : CompeticaoPojo[];
  partidasDestaqueCotacoes : Partida[];
  todasAsPartidas          : Partida[];
  listaJogosMelhorCotacao  : Partida[];
  tipoLista                : string = '0';

  constructor(public navCtrl: NavController, public modalCtrl : ModalController, public competicaoService : CompeticaoService,
              public bs : BilheteService, public us : UsuarioService, public rk : RankingService, private alertCtrl: AlertController,
              public navParams: NavParams, public tenisService : TenisService, public bancaService : BancaService,
              public configService: ConfiguracaoService, public loadCtrl: LoadingController, public toastCtrl: ToastController,
              public ps: PartidaService) {

    this.funcoesUtil = new Util();

    if(this.navParams.get('esporteExibir')){
      this.esporteExibir = this.navParams.get('esporteExibir');
    }

    this.bilhete = bs.getBilhete();
    this.rankingPersonalizado = this.bancaService.banca.rankingPersonalizado;

    switch(this.esporteExibir){
      case Esporte.FUTEBOL:{
        this.bancaService.isAtualizandoBanca().then(atualizando =>{
          this.atualizando = atualizando;
          if (atualizando) {
            let alert = this.alertCtrl.create({
              title: "Atualizando Partidas",
              message: "Estamos atualizando as partidas, por favor tente novamente mais tarde!",
              cssClass: "alertCompeticoes",
              buttons: ['OK']
            })

            alert.present();
            return;
          }

          this.destaquesDoDia();

          this.competicaoService.listaTodasCompeticoes().then(lista =>{
            this.todasCompeticoes = lista;

            this.competicaoService.getRegiao().then(lista=>{
              this.regioes = [];

              for(let regiao of lista){
                regiao.competicoesVisible = false;
                regiao.competicoes = this.retornaCompeticoes(regiao.id);
                this.regioes.push(regiao);
              }

            });

          });

          this.competicaoService.listaCompeticoesPorTipo("JOGOS_DO_DIA").then(lista => this.competicoesJogosDoDia = lista);
        });
        break;
      }

      case Esporte.TENIS:{
        this.bancaService.isAtualizandoBanca().then(atualizando =>{
          this.atualizando = atualizando;
          if (atualizando) {
            let alert = this.alertCtrl.create({
              title: "Atualizando Partidas",
              message: "Estamos atualizando as partidas, por favor tente novamente mais tarde!",
              cssClass: "alertCompeticoes",
              buttons: ['OK']
            })

            alert.present();
            return;
          }

          this.tenisService.listaCompeticoesPorTipo("ATP").then(lista =>        this.competicaoTenisATP        = lista);
          this.tenisService.listaCompeticoesPorTipo("WTA").then(lista =>        this.competicaoTenisWTA        = lista);
          this.tenisService.listaCompeticoesPorTipo("COPA_DAVIS").then(lista => this.competicaoTenisCOPA_DAVIS = lista);
          this.tenisService.listaCompeticoesPorTipo("FED_CUP").then(lista =>    this.competicaoTenisFED_CUP    = lista);
          this.tenisService.listaCompeticoesPorTipo("ITF_MEN").then(lista =>    this.competicaoTenisITF_MEN    = lista);
          this.tenisService.listaCompeticoesPorTipo("ITF_WOMEN").then(lista =>  this.competicaoTenisITF_WOMEN  = lista);
          this.tenisService.listaCompeticoesPorTipo("CHALLENGER").then(lista => this.competicaoTenisCHALLENGER = lista);
        });
        break;
      }

      case Esporte.COMBATE:{
        this.bancaService.isAtualizandoBanca().then(atualizando =>{
          this.atualizando = atualizando;
          if (atualizando) {
            let alert = this.alertCtrl.create({
              title: "Atualizando Partidas",
              message: "Estamos atualizando as partidas, por favor tente novamente mais tarde!",
              cssClass: "alertCompeticoes",
              buttons: ['OK']
            })

            alert.present();
            return;
          }

          this.tenisService.listaCompeticoesPorTipo("MUNDO_COMBATE").then(lista => this.competicoesCombateMundo = lista);
        });
        break;
      }
    }
  }

  retornaCompeticoes(idRegiao: number): Competicao[]{
    let retorno : Competicao[] = [];

    retorno = this.todasCompeticoes.filter(function(item) {
      if(item.regiao.id){
        return item.regiao.id === idRegiao
      }
    });

    return retorno;
  }

  ionViewDidEnter(){
    this.bilhete = this.bs.getBilhete()

    this.us.getUsuario()

    this.configService.getConfiguracaoPadrao().then(config =>{
      if(config && config.id > 0){
        this.configService.configuracaoPrincipal = config;
      }
    })
  }

  selecionaCompeticao(competicaoSelecionada : Competicao){
      this.navCtrl.push(CompeticaoPage,{
        competicao : competicaoSelecionada
      })
  }

  toBilhete(){
    let modal = this.modalCtrl.create(BilhetePage);
    modal.present();
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

  openRanking(isPersonalizado? : boolean){
    if(isPersonalizado){
      this.navCtrl.push(RankingPersonalizadoPage, {usuario: this.us.usuario});
    }else{
      this.rk.getRanking().then(lista => {
        let modal = this.modalCtrl.create(RankingPage, {usuario : this.us.usuario, ranking : lista})
        modal.present()
      })
    }
  }

  destaquesDoDia(){
    let competicao = new Competicao();
    competicao.id = -3; //Id para consultar Competições do dia atual

    let load = this.loadCtrl.create();
    load.present();

    this.competicaoService.jogosDoDiaPorCompeticao(this.us.usuario, competicao).then(partidas =>{
      let competicoes      = this.competicaoService.prepareJogosDoDia(partidas);
      this.competicoesDestaqueDia = [];

      //Filtrando lista de partidas com as 10 melhores cotações
      this.partidasDestaqueCotacoes = partidas.sort((obj1 : Partida, obj2 : Partida) => {
        if(obj1.cotacaoTimeCasa > obj2.cotacaoTimeCasa){
          return -1;
        }

        if (obj1.cotacaoTimeCasa < obj2.cotacaoTimeCasa){
          return 1;
        }

        return 0;
      });

      while(this.partidasDestaqueCotacoes.length > 10){
        this.partidasDestaqueCotacoes.pop();
      }

      for(let competicao of competicoes){
        let competicaoPojo            = new CompeticaoPojo;
        competicaoPojo.competicao     = competicao;
        competicaoPojo.listaPartidas  = competicao.listaPartidas;
        competicaoPojo.tipoCompeticao = String(competicao.tipoCompeticao).replace('_', ' ').replace('_', ' ');
        competicaoPojo.ativo          = true;
        this.competicoesDestaqueDia.push(competicaoPojo);
      }

      this.competicoesDestaqueDia = this.competicoesDestaqueDia.sort((obj1 : CompeticaoPojo, obj2 : CompeticaoPojo) => {
        if(obj1.tipoCompeticao == 'BRASIL' || obj2.tipoCompeticao == 'BRASIL'){
          return -1;
        }

        return 0;
      });

      load.dismiss();
    }).catch(erro =>{
      load.dismiss();
    });
  }

  buttonStyle(partida : Partida, escolha : number) : string{
    let resultado : string = ""
    let semEmpate = false;

    if (this.bs.verificarAposta(partida,escolha,semEmpate)){
      resultado = "secondary"
    }

    return resultado
  }

  adicionarPartida(partida : Partida, escolha : number) : void{
    partida.competicao.listaPartidas = [];

    if (this.bs.verificarPartida(partida)){
      let semEmpate = false;

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

      if (escolha == 1){
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

  carregaMaisOpcoes(partidaSelecionada : Partida){
    let load = this.loadCtrl.create();
    load.present();
    this.ps.maisOpcoesPorPartida(partidaSelecionada, this.us.usuario).then(lista => {

      partidaSelecionada.competicao.listaPartidas = [];

      this.navCtrl.push(MaisOpcoesPage, {
        partida : partidaSelecionada,
        opcoesCotacao : lista,
        competicao : partidaSelecionada.competicao
      })
      load.dismiss();
    })

  }

  todosOsJogos(){
    let load = this.loadCtrl.create();
    load.present();

    this.ps.todasPartidas(this.us.usuario).then(lista => {
      this.todasAsPartidas = lista;
      load.dismiss();
    }).catch(erro => {
      load.dismiss();
    })
  }

  jogosMelhoresCotacoes(){
    let load = this.loadCtrl.create();
    load.present();

    this.ps.melhoresCotacoes(this.us.usuario).then(lista => {
      this.listaJogosMelhorCotacao = lista;
      load.dismiss();
    }).catch(erro => {
      load.dismiss();
    })
  }

  bestSellers(){
    let alert = this.alertCtrl.create({
      title: "Best Sellers",
      message: "Não há Best Sellers cadastrados.",
      cssClass: "alertCompeticoes",
      buttons: ['OK']
    });

    alert.present();
  }
}

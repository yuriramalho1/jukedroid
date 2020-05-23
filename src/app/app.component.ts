import { RankingPage } from './../pages/ranking/ranking';
import { SuportePage } from '../pages/suporte/suporte';
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
import { TransacaoPage } from '../pages/transacao/transacao';
import { MeusBilhetesPage } from '../pages/meus-bilhetes/meus-bilhetes';
import { ExtratoPage } from '../pages/extrato/extrato';
import { TransacaoService } from '../service/transacao.service';
import { SaquePage } from '../pages/saque/saque';
import { PerfilPage } from '../pages/perfil/perfil';
import { LancarResultadoPage } from '../pages/lancar-resultado/lancar-resultado';
import { SolicitacoesPage } from '../pages/solicitacoes/solicitacoes';
import { BilhetesPendentesPage } from '../pages/bilhetes-pendentes/bilhetes-pendentes';
import { TransacoesPage } from '../pages/transacoes/transacoes';
import { BilhetesAdminPage } from '../pages/bilhetes-admin/bilhetes-admin';
import { RankingService } from '../service/ranking.service';
import { CaixaPage } from '../pages/caixa/caixa';
import { MeuCaixaService } from '../service/meu-caixa.service';
import { LancamentoManualPage } from '../pages/lancamento-manual/lancamento-manual';
import { ConsultarBilhetePage } from '../pages/consultar-bilhete/consultar-bilhete';
import { GerentePage } from '../pages/gerente/gerente';
import { UsuariosPage } from '../pages/usuarios/usuarios';
import { SimulacaoAdminPage } from '../pages/simulacao-admin/simulacao-admin';
import { RegrasPage } from '../pages/regras/regras';
import { NovidadesPage } from '../pages/novidades/novidades';
import { AovivoPage } from '../pages/aovivo/aovivo';
import { GerenciarAovivoPage } from '../pages/gerenciar-aovivo/gerenciar-aovivo';
import { HomeSmPage } from '../pages/home-sm/home-sm';
import { ConfiguracoesBancaPage } from '../pages/configuracoes-banca/configuracoes-banca';
import { ConfiguracaoPage } from '../pages/configuracao/configuracao';
import { CreditoPage } from '../pages/credito/credito';
import { ClientesPage } from '../pages/clientes/clientes';
import { FaturaPage } from '../pages/fatura/fatura';
import { PrinterProvider } from '../providers/printer-provider'
import { PrinterCommands } from '../providers/printer-commands'
import { CompeticaoService } from '../service/competicao.service';
import { PartidaService } from '../service/partida.service';
import { NovidadeService } from '../service/novidade.service';
import { Notificacao } from '../model/notificacao.model';
import { Esporte } from "../model/esporte.enum";
import { Usuario } from '../model/usuario.model';
import { RankingPersonalizadoPage } from '../pages/ranking-personalizado/ranking-personalizado';
import { BancaService } from '../service/banca.service';
import { ID_BANCA } from "../service/app.api";
import { BolaoPage } from '../pages/bolao/bolao';
import { JogoBinarioPage } from '../pages/jogo-binario/jogo-binario';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage
  impressora: any;
  notifiacoes: Notificacao[] = [];
  notificacoesNaoVisualizadas: number = 0;
  competicoesJogosDoDia: Competicao[] = [];
  rankingPersonalizado: boolean = false;

  id_banca : number = ID_BANCA;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public us : UsuarioService,
              public ts : TransacaoService, public rk : RankingService, public modalCtrl : ModalController, public mcs : MeuCaixaService,
              public printer : PrinterProvider, public bs: BilheteService, public competicaoService: CompeticaoService, public ps: PartidaService,
              public storage : Storage, public ns : NovidadeService, public loadCtrl: LoadingController, public bancaService : BancaService,
              public alertCtrl: AlertController) {
    this.competicaoService.listaCompeticoesPorTipo("JOGOS_DO_DIA").then(lista =>{
      this.competicoesJogosDoDia = lista;

      for (let i = 0; i < this.competicoesJogosDoDia.length; i++) {
          this.competicaoService.listaJogosDoDia().then(partidas => this.competicoesJogosDoDia[i].listaPartidas = partidas);
      }
    });

    this.ns.getNovidades().then(lista =>{
        this.notifiacoes = lista;
    });

    this.ns.getNovidadesNaoVisualizadas().then(retorno =>{
      this.notificacoesNaoVisualizadas = retorno;
    })

    this.bancaService.getBancaAtual().then(banca =>{
      this.rankingPersonalizado = banca.rankingPersonalizado;

      this.storage.get('login').then(login =>{
        this.storage.get('senha').then(senha =>{
            this.rootPage = HomePage;

            if(banca.focoBolao && !banca.focoFutebol){
              this.rootPage = BolaoPage
            }

            if(login && senha){
              this.rootPage = LoginPage;
            }
        });
      });

      this.initializeApp();
    })
  }

  isAdmin() : boolean{
    return this.us.isAdmin()
  }

  isNotCliente() : boolean{
    return this.us.isNotCliente()
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPerfil(){
    this.us.getUsuario().then(obj => {
      this.nav.push(PerfilPage,{
        usuario : obj
      })
    })
  }

  PermissoesDefault(){
    if(this.us.usuario.id === 0){
      this.us.usuario.visualizaBolao   = this.bancaService.banca.focoBolao;
      this.us.usuario.visualizaFutebol = this.bancaService.banca.focoFutebol;
    }
  }

  visualizarFutebol() : boolean{
    this.PermissoesDefault();
    return this.us.visualizarFutebol()
  }

  visualizarAoVivo() : boolean{
    return this.us.visualizarAoVivo()
  }

  visualizarBolao() : boolean{
    this.PermissoesDefault();
    return this.us.visualizarBolao()
  }

  liberarBolao() : boolean{
    return this.bancaService.banca.vizualizarParametrosModalidade;
  }

  liberarBinario() : boolean{
    return this.bancaService.banca.focoBinario;
  }

  visualizarTenis() : boolean{
    return this.us.visualizarTenis()
  }

  visualizarCombate() : boolean{
    return this.us.visualizarCombate()
  }

  visualizarNBA() : boolean{
    return this.us.visualizarNBA()
  }

  openJogos(esporte: Esporte){
    this.nav.setRoot(HomePage, {
      esporteExibir : esporte
    })
  }

  openSuporte(){
    this.us.getUsuario().then(obj => {
      this.nav.setRoot(SuportePage,{
        usuario : obj
      })
    })
  }

  openGerente(){
    this.us.getUsuario().then(usuario =>{
      this.nav.setRoot(GerentePage,{
        gerente : usuario
      });
    });
  }

  openSimulacaoAdmin(){
    this.nav.setRoot(SimulacaoAdminPage);
  }

  openCredito(){
    this.nav.setRoot(CreditoPage);
  }

  openTransacao(){
    this.us.getUsuario().then(usuario => {
      this.ts.getExtrato(usuario).then(lista => {
        this.nav.setRoot(TransacaoPage,{
          transacoes : lista
        })
      })
    })
  }

  openBilhetesPendentes(){
    this.nav.setRoot(BilhetesPendentesPage)
  }

  openMeusBilhetes(){
    this.nav.setRoot(MeusBilhetesPage);
  }

  openTodosBilhetes(){
    this.nav.setRoot(BilhetesAdminPage);
  }

  openConsultarBilhete(){
    this.nav.setRoot(ConsultarBilhetePage);
  }

  openSaque(){
    this.nav.setRoot(SaquePage)
  }

  openRanking(isPersonalizado? : boolean){
    if(isPersonalizado){
      this.nav.setRoot(RankingPersonalizadoPage, {usuario: this.us.usuario});
    }else{
      this.rk.getRanking().then(lista => {
        let modal = this.modalCtrl.create(RankingPage, {usuario : this.us.usuario, ranking : lista})
        modal.present()
      })
    }
  }

  openRegras(){
    this.nav.setRoot(RegrasPage);
  }

  openExtrato(){
    this.us.getUsuario().then(usuario => {
      this.ts.getExtrato(usuario).then(lista => {
        this.nav.setRoot(ExtratoPage,{
          transacoes : lista
        })
      })
    })
  }

  openLancarResultado(){
    this.nav.setRoot(LancarResultadoPage)
  }

  openLancamentoManual(){
    this.nav.setRoot(LancamentoManualPage)
  }

  openUsuarios(){
    this.nav.setRoot(UsuariosPage)
  }

  openSolicitacoes(){
    this.nav.setRoot(SolicitacoesPage)
  }

  openCaixa(){
    let load = this.loadCtrl.create();
    load.present();
    this.us.getUsuario().then(obj => {
      this.mcs.getMeuCaixa(obj.id, obj.tipoUsuario).then(meuCaixa => {
        this.nav.setRoot(CaixaPage,{
          meuCaixa : meuCaixa,
          tipo : 0
        })

        load.dismiss();
      })
    })
  }

  openMeuCaixa(){
    let load = this.loadCtrl.create();
    load.present();
    this.mcs.getMeuCaixa(0, '').then(meuCaixa => {
      this.nav.setRoot(CaixaPage,{
        meuCaixa : meuCaixa,
        tipo : 1
      })

      load.dismiss();
    })
  }

  openTransacoes(){
    this.ts.getTransacoes().then(lista => {
      this.nav.setRoot(TransacoesPage,{
        transacoes : lista,
        tipo : 2
      })
    })
  }

  openImpressora(){
    this.printer.listaDispositivos();
  }

  prepareJogosDoDia(){
    let competicaoJogosDia : Competicao[] = [];
    let ultimaCompeticao   : string;
    for(let partida of this.competicoesJogosDoDia[0].listaPartidas){
      if(partida.competicao.descricao != ultimaCompeticao){
        competicaoJogosDia.push(partida.competicao);
        competicaoJogosDia[competicaoJogosDia.length - 1].listaPartidas.push(partida);
      }else{
        competicaoJogosDia[competicaoJogosDia.length - 1].listaPartidas.push(partida);
      }

      ultimaCompeticao = partida.competicao.descricao;
    }
    this.competicoesJogosDoDia = competicaoJogosDia
  }

  imprimir(){
    this.prepareJogosDoDia();
    this.storage.get('impressora').then(impressora =>{
      this.impressora = impressora;
      if (this.impressora != ''){
        let title    = this.us.usuario.banca.nome;
        let subtitle = "Jogos do Dia"

        let data = '';
        data += PrinterCommands.HARDWARE.HW_INIT;
        //Título
        data += PrinterCommands.TEXT_FORMAT.TXT_4SQUARE;
        data += PrinterCommands.TEXT_FORMAT.TXT_ALIGN_CT;
        data += title.toUpperCase();
        data += PrinterCommands.EOL;
        data += PrinterCommands.EOL;
        //SubTítulo
        data += PrinterCommands.TEXT_FORMAT.TXT_ALIGN_CT;
        data += PrinterCommands.TEXT_FORMAT.TXT_2WIDTH;
        data += subtitle;
        data += PrinterCommands.EOL;
        //Data
        data += PrinterCommands.TEXT_FORMAT.TXT_ALIGN_CT;
        data += new Intl.DateTimeFormat('pt-BR').format(new Date());
        data += PrinterCommands.EOL;
        data += PrinterCommands.TEXT_FORMAT.TXT_NORMAL;
        data += PrinterCommands.HORIZONTAL_LINE.HR_58MM;
        data += PrinterCommands.EOL;
        //Competição
        for(let competicao of this.competicoesJogosDoDia){
          data += PrinterCommands.TEXT_FORMAT.TXT_2WIDTH;
          data += PrinterCommands.TEXT_FORMAT.TXT_ALIGN_CT;
          data += PrinterCommands.TXT_BOLD_ON;
          data += competicao.descricao + ' - ' + competicao.tipoCompeticao;
          data += PrinterCommands.TXT_BOLD_OFF;
          data += PrinterCommands.EOL;
          data += PrinterCommands.EOL;

          for(let partida of competicao.listaPartidas){
            data += PrinterCommands.TEXT_FORMAT.TXT_NORMAL;
            data += PrinterCommands.TEXT_FORMAT.TXT_ALIGN_CT;
            data += (partida.dataFormatadaString.split(" ")[1]) +" "+ partida.timeCasa + ' x ' + partida.timeFora;
            data += PrinterCommands.EOL;
            data += PrinterCommands.TXT_BOLD_ON;
            data += '|'+partida.cotacaoTimeCasa + ' |    |' +partida.cotacaoEmpate+ ' |    |' + partida.cotacaoTimeFora+' |';
            data += PrinterCommands.TXT_BOLD_OFF;
            data += PrinterCommands.EOL;
            data += PrinterCommands.HORIZONTAL_LINE.HR3_58MM;
            data += PrinterCommands.EOL;
          }
        }
        //secure space on footer
        data += PrinterCommands.EOL;
        data += PrinterCommands.EOL;
        data += PrinterCommands.EOL;
        this.printer.print(this.impressora, data);
      }
    });
  }

  openNovidades(){
      this.nav.setRoot(NovidadesPage,{
        notificacoes : this.notifiacoes
      });
  }

  openFatura(){
    this.nav.setRoot(FaturaPage);
  }

  openConfigBanca(){
    this.nav.setRoot(ConfiguracoesBancaPage,{
      banca: this.us.usuario.banca
    });
  }

  openClientes(){
    this.nav.setRoot(ClientesPage,{
      cambista: this.us.usuario
    });
  }

  openConfiguracao(){
    this.nav.setRoot(ConfiguracaoPage);
  }

  openAoVivo(){
    this.nav.setRoot(AovivoPage)
  }

  openGerenciarAoVivo(){
    this.nav.setRoot(GerenciarAovivoPage)
  }

  downloadAPK(){
    window.open((this.bancaService.banca.baixarPorLinkComum ? this.bancaService.banca.linkDownload : this.bancaService.banca.linkDownloadAlternativo));
  }

  sair(){
    this.us.usuario = new Usuario();

    if(this.bancaService.banca.focoBolao && !this.bancaService.banca.focoFutebol){
      this.nav.setRoot(BolaoPage, {tipoBolao: 'ACUMULADAO'});
    }else{
      this.nav.setRoot(HomePage);
    }
  }

  dialogI3(){
    let alert = this.alertCtrl.create({
      title: 'jukedroid - Contato',
      message: 'Contato: (062) 9 9102-0935',
      cssClass: 'alertCompeticoes',
      buttons: ['OK']
    })

    alert.present();
  }

  openBolao(tipoBolao: string){
    this.nav.setRoot(BolaoPage, {
      tipoBolao: tipoBolao
    });
  }

  openBinario(){
    this.nav.setRoot(JogoBinarioPage);
  }

  openDesafio(){
    let alert = this.alertCtrl.create({
      title: "Desafios",
      message: "Não há Desafios Cadastrados.",
      cssClass: "alertCompeticoes",
      buttons: ['OK']
    });

    alert.present();
  }
}

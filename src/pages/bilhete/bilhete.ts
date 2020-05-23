import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, ModalController, LoadingController, ViewController  } from 'ionic-angular';
import { Bilhete } from '../../model/bilhete.model';
import { BilheteService } from '../../service/bilhete.service';
import { Aposta } from '../../model/aposta.model';
import { Banca } from '../../model/banca.model';
import { UsuarioService } from '../../service/usuario.service';
import { AoVivoService } from '../../service/aovivo.service';
import { Usuario } from '../../model/usuario.model';
import { ListaClientePage } from '../lista-cliente/lista-cliente';
import { PrinterProvider } from '../../providers/printer-provider';
import { Storage } from '@ionic/storage';
import { BilheteSucessoPage } from '../bilhete-sucesso/bilhete-sucesso';
import { Esporte } from "../../model/esporte.enum";
import { ConfiguracaoService } from '../../service/configuracao.service';

@IonicPage()
@Component({
  selector: 'page-bilhete',
  templateUrl: 'bilhete.html',
})
export class BilhetePage {

  bilhete              : Bilhete;
  banca                : Banca   = new Banca();
  usuario              : Usuario = new Usuario();
  premioMaximo         : number = 0;
  saldo                : number = 0;
  impressora           : string;
  verificarAoVivo      : boolean = false;
  verificarPreJogo     : boolean = false;
  isAoVivo             : boolean = false;
  finalizandoSimulacao : boolean = false;
  esportes = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public bs : BilheteService, public toastCtrl: ToastController,
              public us : UsuarioService, public alertCtrl: AlertController, public modalCtrl: ModalController, public printer: PrinterProvider,
              public storage : Storage, public loadCtrl: LoadingController, public viewCtrl: ViewController, public avservice : AoVivoService,
              public configService: ConfiguracaoService) {
    this.bilhete              = bs.getBilhete();
    this.impressora           = this.navParams.get('impressora');
    this.banca                = this.bs.banca;
    this.finalizandoSimulacao = this.navParams.get('finalizandoSimulacao');
  }

  ionViewDidLoad() {
    if(this.bilhete){
      let ultimoesporte  = '';
      for(let aposta of this.bilhete.listaApostas){
          if(aposta.competicao == 'AoVivo'){
            this.isAoVivo = true;
          }

          if(aposta.partida){
            if(aposta.partida.competicao.esporte != ultimoesporte){
              this.esportes.push(aposta.partida.competicao.esporte);
            }

            ultimoesporte = aposta.partida.competicao.esporte;
          }
      }

      if(this.esportes.length > 1){
        let confirm = this.alertCtrl.create({
          title: 'Aviso!',
          message: 'Existem apostas de dois esportes diferentes, aceite para removê-las.',
          buttons: [
            {
              text: 'Cancelar',
              handler: () => {
                this.bs.limparBilhete();
                this.navCtrl.pop();
              }
            },
            {
              text: 'Aceitar',
              handler: () => {
                for (let i = 0; i < this.bilhete.listaApostas.length; i++) {
                    if(this.bilhete.listaApostas[i].partida.competicao.esporte != Esporte.FUTEBOL){
                      if (i >= 0){
                        this.bilhete.listaApostas.splice(i, 1);
                      }
                    };
                }
              }
            }]
        });
        confirm.present();
      }
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  diferencaSegundos(dataComparar: Date):number{
    let retorno = 0;
    let dataAtual = new Date();

    retorno = (dataAtual.getTime() - dataComparar.getTime())/1000;

    return retorno;
  }

  verificaBilheteAoVivo() : boolean{
      let retorno = false

      if(this.bilhete){
        if(this.avservice.ultimaTentativa && (this.diferencaSegundos(this.avservice.ultimaTentativa) < 6)){
          retorno = true;
        }else if(this.avservice.validaBilheteAoVivo(this.bilhete)){
          let confirm = this.alertCtrl.create({
            title: 'Aviso!',
            message: 'As probabilidades, os mercados ou a disponibilidade da sua aposta mudaram, aceite as mudanças para confirmar a aposta.',
            buttons: [
              {
                text: 'Cancelar',
                handler: () => {
                  this.bs.limparBilhete();
                  this.navCtrl.pop();
                }
              },
              {
                text: 'Aceitar',
                handler: () => {
                  this.avservice.atualizaResultsBilhete(this.bilhete);
                  retorno = true;
                }
              }]
          });
          confirm.present();
        }else{
          retorno = true;
        }

      return retorno;
    }
  }

  usuarioGerente() : boolean{
    if (this.usuario.id && this.usuario != undefined && this.usuario.tipoUsuario != 'CLIENTE'){
      return true
    } else{
      return false
    }
  }

  ionViewDidEnter(){
    this.usuario = new Usuario();
    this.bilhete = this.bs.getBilhete()
    this.us.getUsuario().then(usuario => {
      if(usuario){
        this.usuario = usuario;
        this.validaBilhete();

        if(this.finalizandoSimulacao && this.usuario.configuracao.porcentagemOdds && this.usuario.configuracao.porcentagemOdds != 0){
          for(let aposta of this.bilhete.listaApostas){
            aposta.cotacaoAposta += ((this.usuario.configuracao.porcentagemOdds/100) * aposta.cotacaoAposta);
          }
        }
      }
    })
  }

  apagarAposta(aposta : Aposta){
    this.bs.removeAposta(aposta)
  }

  limparBilhete(){
    this.bs.limparBilhete()
    this.navCtrl.pop()
  }

  confirmarBilhete(){
    if(!this.usuario.id){
      this.confirmarBilheteDeslogado();
    }else{
      this.confirmarBilheteLogado();
    }
  }

  confirmarBilheteLogado(){
    this.saldo = (this.usuario.tipoUsuario != 'CLIENTE' ? this.usuario.conta.saldoLimite : this.usuario.conta.saldo);

    if(this.isAoVivo){
      let load = this.loadCtrl.create();
      load.present();
      setTimeout(() =>{
        for(let aposta of this.bilhete.listaApostas){
          if(aposta.competicao == 'AoVivo'){
            this.verificarAoVivo = true;
          }else{
            this.verificarPreJogo = true;
          }
        }

        if(this.verificarPreJogo){
          let confirm = this.alertCtrl.create({
            title: 'Aviso!',
            message: 'Existem apostas de pré-jogo junto com apostas de categoria Ao Vivo, aceite para removê-las.',
            buttons: [
              {
                text: 'Cancelar',
                handler: () => {
                  this.bs.limparBilhete();
                  this.navCtrl.pop();
                }
              },
              {
                text: 'Aceitar',
                handler: () => {
                  for (let i = 0; i < this.bilhete.listaApostas.length; i++) {
                      if(this.bilhete.listaApostas[i].competicao != 'AoVivo'){
                        if (i >= 0){
                          this.bilhete.listaApostas.splice(i, 1);
                        }
                      };
                  }
                  this.verificarPreJogo = false;
                }
              }]
          });
          confirm.present();
        }

        if(this.verificarAoVivo && !this.verificarPreJogo){
          let listaEventos = '';
          if(this.bilhete){
            for (let i = 0; i < this.bilhete.listaApostas.length; i++) {
                listaEventos = listaEventos + this.bilhete.listaApostas[i].partidaAoVivo.eventId;

                if(i < this.bilhete.listaApostas.length){
                  listaEventos = listaEventos + ';';
                }
            }

            this.avservice.getPartida(listaEventos).then(partidas =>{
              this.avservice.partidasAtualizadas = partidas;
              this.verificarAoVivo = !this.verificaBilheteAoVivo();

              if(!this.verificarAoVivo && !this.verificarPreJogo){
                if (this.saldo>= this.bilhete.valor){
                  if (this.validaBilhete(true)){
                    this.bs.setUsuario(this.usuario)
                    this.bs.salvarBilhete().then(obj =>{
                      if (obj != undefined && obj.id != undefined && obj.id > 0){
                        this.bilhete = obj;
                        this.sucesso();

                        if(load){
                          load.dismiss();
                        }

                      }else if(obj == "ERRO_PLACAR_APOSTA_DIVERGENTE"){
                        let toast = this.toastCtrl.create({
                          message: 'As probabilidades, os mercados ou a disponibilidade da sua aposta mudaram. Refaça sua aposta.',
                          duration: 4000
                        });
                        toast.present();
                        load.dismiss();
                      }else{
                        this.falha();

                        if(load){
                          load.dismiss();
                        }
                      }
                    })
                  }
                }else{
                  this.presentToast('Saldo insuficiente');

                  if(load){
                    load.dismiss();
                  }
                }
              }else{
                if(load){
                  load.dismiss();
                }
              }
            })
          }
        }
      }, 2000);
    }else{
        let load = this.loadCtrl.create();
        load.present();
        if (this.saldo >= this.bilhete.valor){
          if (this.validaBilhete(true)){
            this.bs.setUsuario(this.usuario);
            this.bs.setStatusBilhete('EM_ABERTO');
            this.bs.salvarBilhete().then(obj =>{
              if (obj != undefined && obj.id != undefined && obj.id > 0){
                this.bilhete = obj;
                this.sucesso();
                load.dismiss();
              }else if(obj == "ERRO_APOSTA_PARTIDA_JA_INICIOU"){
                let toast = this.toastCtrl.create({
                  message: 'Uma ou mais partidas no bilhete já iniciaram',
                  duration: 4000
                });
                toast.present();
                load.dismiss();
              }else{
                this.falha();
                load.dismiss();
              }
            })
          }else{
            load.dismiss();
          }
        } else{
          this.presentToast('Saldo insuficiente');
          load.dismiss();
        }
    }
  }

  simularBilhete(){
    let load = this.loadCtrl.create();
    load.present();

    if (this.validaBilhete(true)){
      this.bs.setStatusBilhete('SIMULADO');
      this.bs.salvarBilhete().then(obj =>{
        if (obj != undefined && obj.id != undefined && obj.id > 0){
          this.bilhete = obj;
          this.sucessoSimulacao();
          load.dismiss();
        } else{
          this.falha();
          load.dismiss();
        }
      })
    }
  }

  confirmarBilheteDeslogado(){
    let alert = this.alertCtrl.create({
      title: "Entre ou Cadastre-se",
      message: "Para confirmar sua aposta é necessário entrar ou se cadastrar no sistema!",
      cssClass: "alertCompeticoes",
      buttons: ['OK']
    })

    alert.present();
  }

  openListaCliente(){
    this.us.getAllClientes().then(lista => {
      this.navCtrl.push(ListaClientePage, {
        clientes : lista,
        bilhete : this.bilhete
      })
    })
  }

  validaBilhete(isSubmit? : boolean) : boolean{
    let retorno = true

    let bilhete = this.bilhete

    this.premioMaximo = this.getCotacao() * (bilhete.valor);

    if (bilhete.valor < this.configService.configuracaoPrincipal.valorMinCupom && isSubmit){
      this.presentToast(`O valor mínimo para um bilhete é de R$ ${this.configService.configuracaoPrincipal.valorMinCupom}`)
      retorno = false
    }
    if (bilhete.valor > this.configService.configuracaoPrincipal.valorMaxCupom){
      this.presentToast(`O valor máximo para um bilhete é de R$ ${this.configService.configuracaoPrincipal.valorMaxCupom}`)
      bilhete.valor = Number(undefined);
      this.premioMaximo = 0;
      retorno = false;
    }

    if (this.getCotacao() > this.configService.configuracaoPrincipal.cotacaoMaxCupom){
      this.presentToast(`O valor máximo da cotação é de R$ ${this.configService.configuracaoPrincipal.cotacaoMaxCupom}`)
      retorno = false
    }

    if(this.configService.configuracaoPrincipal && bilhete.listaApostas && (bilhete.listaApostas.length < this.configService.configuracaoPrincipal.minimoPartidaBilhete)){
      this.presentToast(`O valor mínimo de partidas por Bilhete é de ${this.configService.configuracaoPrincipal.minimoPartidaBilhete}`)
      retorno = false
    }

    if(this.isAoVivo && this.configService.configuracaoPrincipal && bilhete.valor > this.configService.configuracaoPrincipal.valorMaximoApostaAoVivo){
      this.presentToast(`O valor máximo da cotação (Ao Vivo) é de R$ ${this.configService.configuracaoPrincipal.valorMaximoApostaAoVivo}`)
      retorno = false
    }

    if (bilhete.listaApostas.length <= 1 && bilhete.valor > this.configService.configuracaoPrincipal.limitePartidaUnicaBilhete && isSubmit){
      this.presentToast(`Para um bilhete com uma única partida, o valor máximo de aposta é de R$ ${this.configService.configuracaoPrincipal.limitePartidaUnicaBilhete}`)
      retorno = false
    }

    if(this.usuario && this.usuario.tipoUsuario != 'CLIENTE' && isSubmit && (!bilhete.clienteNome || bilhete.clienteNome.length < 1)){
      this.presentToast('É obrigatório informar o Nome do Cliente.')
      retorno = false
    }

    if (this.premioMaximo > this.configService.configuracaoPrincipal.premioMaxCupom){
      this.premioMaximo = this.configService.configuracaoPrincipal.premioMaxCupom;
    }

    this.bilhete.valorPossivelRetorno = this.premioMaximo;

    return retorno
  }

  limparCliente(){
    this.bs.setCliente(undefined)
    this.bs.setNomeCliente('')
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  sucesso(){
    this.dialogShare()

    this.limparBilhete()
  }

  sucessoSimulacao(){
    let alert = this.alertCtrl.create({
      title: "Simulação registrada com sucesso!",
      message: String(this.bilhete.id),
      cssClass: "alertSimulacao",
      buttons: [{
        text : 'OK',
        handler: () => {
          this.bs.limparBilhete();
          this.navCtrl.pop();
        }
      },
      {
        text: 'Compartilhar',
        handler: () => {
          this.bs.compartilharLink(this.bilhete);
          this.bs.limparBilhete();
          this.navCtrl.pop();
        }
      }]
    })

    alert.present();
  }

  modalSucesso(){
    let modal = this.modalCtrl.create(BilheteSucessoPage, {bilhete: this.bilhete});
    modal.present();
  }

  dialogShare() {
    let confirm = this.alertCtrl.create({
      title: 'Bilhete registrado com sucesso',
      message: 'Deseja compartilhar o comprovante do bilhete?',
      buttons: [
        {
          text: 'Não',
          handler: () => {

          }
        },
        {
          text: 'Compartilhar Link',
          handler: () => {
            console.log(this.bilhete.id)
            this.bs.compartilharLink(this.bilhete)
          }
        },
        {
          text: 'Compartilhar Bilhete',
          handler: () => {
            console.log(this.bilhete.id)
            this.bs.shareComprovante(this.bilhete)
          }
        },
        {
          text: 'Imprimir',
          handler: () => {
            this.storage.get('impressora').then(impressora =>{
              this.printBilhete(impressora, this.bilhete);
            });

          }
        }
      ]
    });
    confirm.present();
  }

  falha(){
    let toast = this.toastCtrl.create({
      message: 'Ocorreu uma falha, favor contacte o suporte',
      duration: 2000
    });
    toast.present()
  }

  getCotacao(): number {
    let cotacao: number = 0

    for (let aposta of this.bilhete.listaApostas) {
      if (cotacao == 0) {
        cotacao = aposta.cotacaoAposta
      } else {
        cotacao *= aposta.cotacaoAposta
      }
    }
    if(this.usuario && cotacao > this.banca.limiteCotacao){
      cotacao = this.banca.limiteCotacao;
    }
    this.bilhete.cotacaoTotal = cotacao
    return cotacao
  }

  printBilhete(impressora, bilhete){
    this.printer.imprimirBilhete(impressora, bilhete);
  }
}

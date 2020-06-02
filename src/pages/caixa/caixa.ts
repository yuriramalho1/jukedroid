import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { BilheteService } from '../../service/bilhete.service';
import { Bilhete } from '../../model/bilhete.model';
import { Resumo } from '../../model/resumo.model';
import { MeuCaixaService } from '../../service/meu-caixa.service';
import { UsuarioService } from '../../service/usuario.service';
import { ID_BANCA } from '../../service/app.api';

@IonicPage()
@Component({
  selector: 'page-caixa',
  templateUrl: 'caixa.html',
})
export class CaixaPage {

  bilhete  : Bilhete
  meuCaixa : Resumo;
  titulo   : string
  tipo     : number = 0;

  saldoAtual                 : number;
  saldoAnterior              : number;
  entrada                    : number;
  entradaEmAberto            : number;
  entradaGerente             : number;
  entradaCambista            : number;
  entradaCliente             : number;
  entradaAdministrador       : number;
  entradaAbertoGerente       : number;
  entradaAbertoCambista      : number;
  entradaAbertoCliente       : number;
  entradaAbertoAdministrador : number;
  totalEntrada               : number;
  entradaDeposito            : number;
  lancamento                 : number;
  saida                      : number;
  comissao                   : number;
  liquido                    : number;
  bilhetesCancelados         : number;
  totalCreditoClientes       : number;

  idUsuario : number

  dataInicial : string;
  dataFinal   : string;

  isModal : boolean;
  visibleEntradaAberto     : boolean = false;
  visibleEntradaFinalizado : boolean = false;
  visibleAdmins            : boolean = false;
  visibleGerentes          : boolean = false;
  visibleCambistas         : boolean = false;
  visibleCambSemGerente    : boolean = false;
  visibleClientes          : boolean = false;
  visibleEntradaTotal      : boolean = false;
  visibleTodasEntradas     : boolean = false;
  visibleTodasSaidas       : boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
              public bs : BilheteService, public mcs : MeuCaixaService, public modalCtrl: ModalController,
              public alertCtrl: AlertController, public us : UsuarioService, public loadCtrl: LoadingController,
              private toastCtrl: ToastController) {
    this.bilhete = bs.getBilhete()
    this.meuCaixa = navParams.get('meuCaixa');
    this.tipo = navParams.get('tipo');
    this.isModal = navParams.get('isModal');
    this.prepareValores();

    if (this.tipo == 1){
      this.titulo = 'Caixa(Apuração) da Banca'
    } else{
      this.titulo = (this.isModal ? 'Caixa (Apuração) ' + this.meuCaixa.usuario.nome : 'Caixa (Apuração)');
    }
  }

  voltar(){
    this.viewCtrl.dismiss();
  }

  statusTotal() : string{
    let retorno : string;

    if(this.meuCaixa.totalLiquido == 0){
      retorno = 'azul';
    }else if(this.meuCaixa.totalLiquido > 0){
      retorno = 'verde';
    }else if(this.meuCaixa.totalLiquido < 0){
      retorno = 'vermelho';
    }

    return retorno
  }

  consultaCaixa(dataInicial, dataFinal : string){
    let load = this.loadCtrl.create();
    load.present();

    dataInicial = new Date(dataInicial).toISOString();
    dataFinal   = new Date(dataFinal).toISOString();
    this.mcs.getMeuCaixa(this.us.usuario.id, this.us.usuario.tipoUsuario, dataInicial, dataFinal).then(meuCaixa => {
      this.meuCaixa = meuCaixa;
      this.prepareValores();
      load.dismiss();
    })
  }



  detalhaSaldo(){
    if(this.tipo == 0){
      return;
    }

    let alert = this.alertCtrl.create({
      title: "Detalhamento do Saldo Atual",
      message: "<p>Total de Entradas: " + String(this.totalEntrada.toFixed(2)) + '<br/>'+
               "Total de Saídas: " + String(this.saida.toFixed(2)) + '<br/>'+
               "Total de Comissões: " + String(this.comissao.toFixed(2)) + '<br/>'+
               "Saldo Atual: " + String(this.totalEntrada.toFixed(2)) + ' - ' + String(this.saida.toFixed(2)) + ' - ' + String(this.comissao.toFixed(2)) + ' = ' + String(this.saldoAtual.toFixed(2)) + '<br/>'+
               "Total de Bilhetes Em Aberto: " + String(this.meuCaixa.totalBilhetesVencedoresEmAberto.toFixed(2))  + '<br/>'+
               '<br/>'+
               "Saldo Atual Com Bilhetes Vencedores Em Aberto: " + String(this.saldoAtual.toFixed(2)) + ' - ' + String(this.meuCaixa.totalBilhetesVencedoresEmAberto.toFixed(2)) + ' = ' +
               String(this.meuCaixa.saldoAtualComBilhetesVencedoresEmAberto.toFixed(2)) + '</p>',
      cssClass: "alertSaldo",
      buttons: ['OK']
    })

    alert.present();
  }

  prepareValores(){
    this.lancamento      = this.meuCaixa.totalLancamento;
    this.saida           = this.meuCaixa.totalSaida;
    this.comissao        = this.meuCaixa.totalComissao;
    this.saldoAtual      = (this.tipo == 1 ? this.meuCaixa.saldoAtualComBilhetesVencedoresEmAberto : this.meuCaixa.saldoAtual);
    this.saldoAnterior   = this.meuCaixa.saldoAnterior;
    this.liquido         = this.meuCaixa.totalLiquido;

    switch(this.meuCaixa.usuario.tipoUsuario){
      case "GERENTE":{
        this.entrada         = this.meuCaixa.totalEntradaFinalizadoGerente;
        this.entradaEmAberto = this.meuCaixa.totalEntradaEmAbertoGerente;
        break;
      }
      case "CAMBISTA":{
        this.entrada         = this.meuCaixa.totalEntradaFinalizadoCambista;
        this.entradaEmAberto = this.meuCaixa.totalEntradaEmAbertoCambista;
        break;
      }
      case "ADMINISTRADOR":{
        this.bilhetesCancelados         = this.meuCaixa.totalEntradaCanceladoCliente;
        this.entrada                    = this.meuCaixa.totalEntradaFinalizadoGeral;
        this.entradaEmAberto            = this.meuCaixa.totalEntradaEmAbertoGeral;
        this.entradaAbertoGerente       = this.meuCaixa.totalEntradaEmAbertoGerente;
        this.entradaAbertoCambista      = this.meuCaixa.totalEntradaEmAbertoCambista;
        this.entradaAbertoCliente       = this.meuCaixa.totalEntradaEmAbertoCliente;
        this.entradaAbertoAdministrador = this.meuCaixa.totalEntradaFinalizadoAdministrador;
        this.entradaGerente             = this.meuCaixa.totalEntradaFinalizadoGerente;
        this.entradaCambista            = this.meuCaixa.totalEntradaFinalizadoCambista;
        this.entradaCliente             = this.meuCaixa.totalEntradaFinalizadoCliente;
        this.entradaDeposito            = this.meuCaixa.totalEntradaDeposito;
        this.entradaAdministrador       = this.meuCaixa.totalEntradaFinalizadoAdministrador;
        this.totalEntrada               = this.meuCaixa.totalGeralEntrada;
        this.totalCreditoClientes       = this.meuCaixa.saldoTotalCreditoCliente;
        break;
      }
    }

    if(ID_BANCA == 1 && this.tipo == 0){
       this.meuCaixa.totalLiquido = (this.meuCaixa.totalLiquido * (-1));
    }
    
  }

  fecharCaixa(){
    let load = this.loadCtrl.create();
    load.present();

    let alert = this.alertCtrl.create({
      title: "Fechar Caixa",
      message: "Deseja realmente fechar esse Caixa e inicar um novo Caixa?",
      buttons: [{
          text: 'Cancelar',
          handler: () => {
            alert.dismiss;
            load.dismiss();
          }
        },
        {
          text: 'Confirmar',
          handler: () =>{
            this.mcs.fecharCaixa().then(caixa =>{
              this.meuCaixa = caixa;
              this.prepareValores();

              let toastMsg = this.toastCtrl.create({
                message: "Caixa fechado com sucesso!",
                duration: 3000
              })
              toastMsg.present();
            }).catch(erro =>{
              load.dismiss();

              let toastMsg = this.toastCtrl.create({
                message: "Erro ao fechar o caixa.",
                duration: 3000
              })
              toastMsg.present();
            })

          }
        }]
    });

    alert.present();
  }

}

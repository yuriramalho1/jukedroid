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
import { BolaoService } from '../../service/bolao.service';

@IonicPage()
@Component({
  selector: 'page-bilhete-bolao',
  templateUrl: 'bilhete-bolao.html',
})
export class BilheteBolaoPage {

  bilhete     : Bilhete;
  banca       : Banca   = new Banca();
  usuario     : Usuario = new Usuario();
  saldo       : number = 0;
  impressora  : string;
  tipoBolao   : string;
  isSimulacao : boolean = false
  cadastrou   : boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public bs : BilheteService, public toastCtrl: ToastController,
              public us : UsuarioService, public alertCtrl: AlertController, public modalCtrl: ModalController, public printer: PrinterProvider,
              public storage : Storage, public loadCtrl: LoadingController, public viewCtrl: ViewController, public configService: ConfiguracaoService,
              private bolaoService: BolaoService) {
    this.bilhete      = bolaoService.getBilheteBolao();
    this.impressora   = this.navParams.get('impressora');
    this.banca        = this.bs.banca;
    this.tipoBolao    = this.navParams.get('tipoBolao');
    this.isSimulacao  = this.navParams.get('isSimulacao');
  }

  dismiss() {
    this.viewCtrl.dismiss(this.cadastrou);
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
    this.bilhete = this.bolaoService.getBilheteBolao();

    this.us.getUsuario().then(usuario => {
      if(usuario){
        this.usuario = usuario;
      }
    })
  }

  sucessoSimulacao(){
    let alert = this.alertCtrl.create({
      title: "Simulação registrada com sucesso!",
      message: String(this.bilhete.id),
      cssClass: "alertSimulacao",
      buttons: [{
        text : 'OK',
        handler: () => {
        }
      },
      {
        text: 'Compartilhar',
        handler: () => {
          this.bs.compartilharLink(this.bilhete);
        }
      }]
    })

    alert.present();
  }

  simularBilhete(){
    let load = this.loadCtrl.create();
    load.present();

    this.bolaoService.setUsuario(this.usuario);
    this.bolaoService.setStatusBilhete('SIMULADO');

    this.bolaoService.cadastrarBilheteBolao().then(obj =>{
      if (obj != undefined && obj.id != undefined && obj.id > 0){
        this.bilhete = obj;
        this.sucessoSimulacao();
        load.dismiss();

        this.cadastrou = true;
        this.dismiss();
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
    });
  }

  confirmarBilhete(){
    if(this.isSimulacao){
      this.simularBilhete();
      return;
    }

    this.saldo = (this.usuario.tipoUsuario != 'CLIENTE' ? this.usuario.conta.saldoLimite : this.usuario.conta.saldo);

    let load = this.loadCtrl.create();
    load.present();

    if (this.saldo >= this.bilhete.valor){
      this.bolaoService.setUsuario(this.usuario);
      this.bolaoService.setStatusBilhete('EM_ABERTO');

      this.bolaoService.cadastrarBilheteBolao().then(obj =>{
        if (obj != undefined && obj.id != undefined && obj.id > 0){
          this.bilhete = obj;
          this.dialogShare();
          load.dismiss();

          this.cadastrou = true;
          this.dismiss();
        }else if(obj != undefined && !obj.id){
          let toast = this.toastCtrl.create({
            message: obj,
            duration: 4000
          });
          toast.present();
          load.dismiss();
        }else{
          this.falha();
          load.dismiss();
        }
      })
    } else{
      this.presentToast('Saldo insuficiente');
      load.dismiss();
    }

  }

  openListaCliente(){
    this.us.getAllClientes().then(lista => {
      this.navCtrl.push(ListaClientePage, {
        clientes : lista,
        bilhete : this.bilhete
      })
    })
  }

  limparCliente(){
    this.bolaoService.setCliente(undefined)
    this.bolaoService.setNomeCliente('')
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

  printBilhete(impressora, bilhete){
    this.printer.imprimirBilhete(impressora, bilhete);
  }
}

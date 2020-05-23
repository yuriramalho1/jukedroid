import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { TransacaoService } from '../../service/transacao.service';
import { BilheteService } from '../../service/bilhete.service';
import { Bilhete } from '../../model/bilhete.model';
import { BilhetePage } from '../bilhete/bilhete';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { SERVICE } from '../../service/app.api'
import { Transacao } from '../../model/transacao.model';
import { UsuarioService } from '../../service/usuario.service';
import { Usuario } from '../../model/usuario.model';
import { SolicitacaoComprovantePage } from '../solicitacao-comprovante/solicitacao-comprovante';

@IonicPage()
@Component({
  selector: 'page-transacao',
  templateUrl: 'transacao.html',
})
export class TransacaoPage {
  bilhete: Bilhete
  usuario: Usuario
  transacoes: Transacao[] = [];
  transacoesPendentes: Transacao[] = [];

  tipoDeposito: string = '';
  bancoDestino: string = '';
  observacao:   string = '';
  valor: number

  imageURI: any;
  imageFileName: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public transacaoService: TransacaoService, public bs: BilheteService,
    private transfer: FileTransfer, private camera: Camera, public loadingCtrl: LoadingController, public toastCtrl: ToastController,
    private usuarioService: UsuarioService, private alertCtrl: AlertController) {
    this.bilhete = bs.getBilhete()
    this.usuarioService.getUsuario().then(usuario => {
      this.usuario = usuario;
      this.getTransacoesPendentes();
    })
  }

  ionViewDidEnter() {
    this.bilhete = this.bs.getBilhete();
  }

  toBilhete() {
    this.navCtrl.push(BilhetePage)
  }

  getTransacoesPendentes(){
    this.transacaoService.getTransacoesPendentes().then(lista =>{
        let transacoesP : Transacao[] = [];

        for(let transacao of lista){
          if(transacao.usuario.id == this.usuario.id){
            this.trataTransacao(transacao);
            transacoesP.push(transacao);
          }
        }

        this.transacoesPendentes = transacoesP;
    });
  }

  resetarTela() {
    this.valor = Number('');
    this.tipoDeposito = '';
    this.bancoDestino = '';
  }

  trataTransacao(transacao : Transacao){
    switch(transacao.bancoDestino){
      case 'BANCO_DO_BRASIL': transacao.bancoDestinoDesc = "Banco do Brasil"; break;
    }

    switch(transacao.tipoDeposito){
      case 'TRANSFERENCIA_ENTRE_CONTA': transacao.tipoDepositoDesc = "Transferência entre Contas(mesmo banco)"; break;
      case 'TED'                      : transacao.tipoDepositoDesc = "TED"; break;
      case 'DOC'                      : transacao.tipoDepositoDesc = "DOC"; break;
      case 'DINHEIRO_CAIXA_AGENCIA'   : transacao.tipoDepositoDesc = "Dinheiro no caixa da agência"; break;
      case 'DINHEIRO_CAIXA_ELETRONICO': transacao.tipoDepositoDesc = "Dinheiro no caixa da eletronico"; break;
    }
  }

  getImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then((imageData) => {
      this.imageURI = imageData;
    }, (err) => {
      console.log(err);
      this.presentToast(err);
    });
  }

  clickCreditar() {
    if (this.tipoDeposito != undefined && this.tipoDeposito != '' && this.bancoDestino != undefined && this.bancoDestino != "" && this.valor != undefined && this.valor > 0) {
      let loader = this.loadingCtrl.create({
        content: "Enviando solicitacao..."
      });
      loader.present();
      const fileTransfer: FileTransferObject = this.transfer.create();

      let transacao: Transacao = new Transacao()
      transacao.valor = this.valor
      transacao.bancoDestino = this.bancoDestino
      transacao.tipoDeposito = this.tipoDeposito
      transacao.tipoTransacao = 'DEPOSITO_DINHEIRO'
      transacao.statusTransacao = 'PENDENTE'
      transacao.usuario = this.usuario
      transacao.observacao = this.observacao;

      if (this.imageURI != undefined && this.imageURI != '') {
        transacao.tipoFoto = 'jpeg'
      }

      this.transacaoService.salvarTransacao(transacao).then(obj => {
        if ((obj != undefined) && (obj.id != undefined)) {

          if (this.imageURI != undefined && this.imageURI != '') {

            let options: FileUploadOptions = {
              fileKey: 'ionicfile',
              fileName: obj.id.toString(),
              chunkedMode: false,
              mimeType: "image/jpeg",
              headers: {}
            }

            fileTransfer.upload(this.imageURI, `${SERVICE}/banca/uploadTransacaoImagem`, options)
              .then((data) => {
                console.log(data + " Uploaded Successfully");
                this.sucessoTransacao();
                this.resetarTela();
                this.getTransacoesPendentes();
              }, (err) => {
                console.log(err);
                loader.dismiss();
                this.presentToast(err);
              })
          } else {
            this.sucessoTransacao();
            this.resetarTela();
            this.getTransacoesPendentes();
          }
        } else {
          this.presentToast("Ocorreu uma falha ao gravar a solicitação de crédito");
        }

        loader.dismiss();

      }, (err) => {
        console.log(err);
        loader.dismiss();
        this.presentToast(err);
      });
    } else {
      this.presentToast("Todos os campos são obrigatórios")
    }
  }

  sucessoTransacao(){
    let alert = this.alertCtrl.create({
      message: "Solicitação de crédito realizada com sucesso",
      cssClass: "alertSimulacao",
      buttons: ['OK']
    })

    alert.present();
  }

  addComprovantePendente(transacao: Transacao){
    var imageURI = '';

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then((imageData) => {
      imageURI = imageData;

      let loader = this.loadingCtrl.create({
        content: "Enviando solicitacao..."
      });
      loader.present();

      if (imageURI != undefined && imageURI != '') {
        transacao.tipoFoto = 'jpeg';

        this.transacaoService.salvarTransacao(transacao).then(obj => {
          let options: FileUploadOptions = {
            fileKey: 'ionicfile',
            fileName: obj.id.toString(),
            chunkedMode: false,
            mimeType: "image/jpeg",
            headers: {}
          }

          const fileTransfer: FileTransferObject = this.transfer.create();

          fileTransfer.upload(imageURI, `${SERVICE}/banca/uploadTransacaoImagem`, options)
            .then((data) => {
              console.log(data + " Uploaded Successfully");
              this.presentToast("Solicitação de crédito realizada com sucesso");
              loader.dismiss();
            }, (err) => {
              console.log(err);
              loader.dismiss();
              this.presentToast(err);
            });

        });
      }
    }, (err) => {
      console.log(err);
      this.presentToast(err);
    });


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

  comprovante(selecionado : Transacao){
    if (!this.existeComprovante(selecionado)){
      this.navCtrl.push(SolicitacaoComprovantePage, {transacao : selecionado})
    }
  }

  existeComprovante(transacao : Transacao){
    if (transacao.tipoFoto != undefined && transacao.tipoFoto != ""){
      return false
    } else{
      return true
    }
  }

}

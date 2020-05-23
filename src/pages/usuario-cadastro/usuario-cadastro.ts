import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { UsuarioService } from '../../service/usuario.service';
import { Usuario } from '../../model/usuario.model';
import { GerenteCambista } from '../../model/gerente-cambista.model';
import { CambistaCliente } from '../../model/cambista-cliente.model';
import { Banca } from '../../model/banca.model';
import { ID_BANCA } from '../../service/app.api';

@IonicPage()
@Component({
  selector: 'page-usuario-cadastro',
  templateUrl: 'usuario-cadastro.html',
})
export class UsuarioCadastroPage {
  usuario          : Usuario;
  gerente          : Usuario;
  cambistaCadastro : Usuario
  cambistaCliente  : CambistaCliente;

  existeLogin : boolean = false;
  escolheTipo : boolean = false;

  DECIMAL_SEPARATOR = ".";
  GROUP_SEPARATOR = ",";
  pureResult: any;
  maskedId: any;
  loader: any;

  cadastroConfirmacao: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
              private us : UsuarioService, public loadingCtrl: LoadingController, public toastCtrl: ToastController,
              public alertCtrl : AlertController) {
    this.usuario = new Usuario();

    let banca          = new Banca();
    banca.id           = ID_BANCA;
    this.usuario.banca = banca;

    this.usuario.visualizaAoVivo  = this.us.usuario.visualizaAoVivo;
    this.usuario.visualizaTenis   = this.us.usuario.visualizaTenis;
    this.usuario.visualizaCombate = this.us.usuario.visualizaCombate;
    this.usuario.visualizaNBA     = this.us.usuario.visualizaNBA;
    this.usuario.visualizaBolao   = this.us.usuario.banca.focoBolao;

    this.gerente          = this.navParams.get('gerente');
    this.cambistaCadastro = this.navParams.get('cambistaCadastro');

    this.escolheTipo = !(this.navParams.get('tipoUsuario') != undefined);

    if(this.navParams.get('tipoUsuario')){
      this.usuario.tipoUsuario = this.navParams.get('tipoUsuario');
    }

    if(this.cambistaCadastro){
      this.escolheTipo = false;
      this.usuario.tipoUsuario = "CLIENTE";

      this.cambistaCliente = new CambistaCliente();
      this.cambistaCliente.cambista = this.cambistaCadastro;
    }
  }

  unFormat(val) {
    if (!val) {
      return '';
    }
    val = val.replace(/\D/g, '');
    val = val.replace('(', '');
    val = val.replace(')', '');
    val = val.replace(' ', '');
    val = val.replace('-', '');

    if (this.GROUP_SEPARATOR === ',') {
      return val.replace(/,/g, '');
    } else {
      return val.replace(/\./g, '');
    }
  };

  verificaLogin(){
    this.us.existeLogin(this.usuario).then(existe => this.existeLogin = existe);
  }

  validaForm() : boolean{
    let resultado : boolean = true

    if (this.existeLogin){
      resultado = false
    }

    return resultado
  }

  voltar(){
    this.viewCtrl.dismiss();
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    this.loader.present();
  }

  dialogCadastrado() {
    let confirm = this.alertCtrl.create({
      title: 'Cadastro de Usuário',
      message: 'Cadastro realizado com sucesso.',
      buttons: [
        {
          text: 'Ok',
          handler: () => {

          }
        }
      ]
    });
    confirm.present();
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

  clickCadastrar() {
    if (this.usuario.nome && this.usuario.login && this.usuario.senha && this.cadastroConfirmacao){
      if ((this.usuario.senha != "" && this.cadastroConfirmacao != "") &&
          (this.usuario.senha === this.cadastroConfirmacao)){

        let banca = new Banca();
        banca.id = ID_BANCA;
        this.usuario.banca = banca;

        this.presentLoading()

        if(this.gerente){
          let gerenteCambista      = new GerenteCambista;
          gerenteCambista.cambista = this.usuario;
          gerenteCambista.gerente  = this.gerente;

          this.us.salvarCambistaGerente(gerenteCambista).then(obj => {
            if (obj != undefined && obj.id > 0){
              this.usuario = new Usuario;

              let formCadastro : any;
              formCadastro = document.getElementById('formCadastro');
              formCadastro.reset();

              this.loader.dismissAll();
              this.dialogCadastrado();
            } else{
              this.presentToast("Erro ao cadastrar o cambista informado. ");
            }
          })
        }else{
          this.us.salvar(this.usuario).then(obj => {
            if (obj != undefined && obj.id > 0){
              this.usuario = new Usuario;

              let formCadastro : any;
              formCadastro = document.getElementById('formCadastro');
              formCadastro.reset();

              this.loader.dismissAll();

              if(this.cambistaCadastro){
                this.cambistaCliente.cliente = obj;
                this.us.salvarCambistaCliente(this.cambistaCliente);
              }

              this.dialogCadastrado();
            } else{
              this.presentToast("Já existe um usuário com o login e/ou e-mail informado");
            }
          })
        }
      } else{
        this.presentToast("A confirmação difere da senha digitada");
      }
    } else{
      this.presentToast("Todos os campos são obrigatórios");
    }
  }


}

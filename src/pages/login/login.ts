import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { UsuarioService } from '../../service/usuario.service';
import { Usuario } from '../../model/usuario.model';
import { Banca } from '../../model/banca.model';
import { sha256 } from 'js-sha256'
import { Storage } from '@ionic/storage';
import { ID_BANCA } from '../../service/app.api'
import { RECUPERAR_SENHA } from '../../service/app.api'
import { Platform } from 'ionic-angular';
import { BolaoPage } from '../bolao/bolao';
import { BancaService } from '../../service/banca.service';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  cadastrar: boolean = false
  entrar: boolean = false
  inicio: boolean = true

  cadastroNome: string
  cadastroConfirmacao: string
  cadastroSenha: string
  cadastroLogin: string

  login: string = ''
  senha: string = ''

  mensagem: string = ''

  DECIMAL_SEPARATOR = ".";
  GROUP_SEPARATOR = ",";
  pureResult: any;
  maskedId: any;

  existeLogin : boolean = false
  lembrar     : boolean = false;

  recuperarSenhaLink : string = RECUPERAR_SENHA;

  loader = undefined

  constructor(public navCtrl: NavController, public navParams: NavParams, public usuarioService: UsuarioService, public toastCtrl: ToastController,
              public storage : Storage, public alertCtrl : AlertController, public loadingCtrl: LoadingController, private plt: Platform,
              private bancaService: BancaService) {
    this.mensagem = ''

    if(this.navParams.get('cadastrar') == undefined){
      this.storage.get('login').then(val => {
        if (val != undefined){
          this.login = val
          this.clickInicioLogin()
        }
      });

      this.storage.get('lembrar').then(lembrar => {
        this.lembrar = lembrar;
        if (lembrar){
          this.reLogin(this.navParams.get('saiu'));
        }
      });
    }else if(this.navParams.get('cadastrar')){
      this.clickInicioCadastrar()
    }else{
      this.clickInicioLogin()
    }
  }

  clickInicioCadastrar() {
    this.cadastrar = true
    this.entrar = false
    this.inicio = false
  }

  clickInicioLogin() {
    this.cadastrar = false
    this.entrar = true
    this.inicio = false
  }

  clickInicioEntrar() {
    this.cadastrar = false
    this.entrar = true
    this.inicio = false
  }

  clickVoltar() {
    this.usuarioService.verificaVersao().then(aceitavel => {
      if (!aceitavel){
        if(this.plt.is('android')){
          this.versaoInvalida();
        }
      }else{
        if(this.bancaService.banca.focoBolao && !this.bancaService.banca.focoFutebol){
          this.navCtrl.setRoot(BolaoPage, {tipoBolao: 'ACUMULADAO'});
        }else{
          this.navCtrl.setRoot(HomePage);
        }
      }
    })
  }

  clickEntrar(event: Event): boolean {
    let usuario: Usuario = new Usuario()
    usuario.login = this.login
    usuario.senha = sha256(this.senha)

    this.usuarioService.verificaVersao().then(aceitavel => {
      if (aceitavel){
        this.usuarioService.login(usuario).then(usuario => {
          if (usuario != undefined && usuario.id > 0 && usuario.banca.id == ID_BANCA) {

            this.storage.set('login', usuario.login);
            if(this.lembrar){
              this.storage.set('lembrar', this.lembrar);
              this.storage.set('senha', sha256(this.senha));
            }

            if(this.bancaService.banca.focoBolao && !this.bancaService.banca.focoFutebol){
              this.navCtrl.setRoot(BolaoPage, {tipoBolao: 'ACUMULADAO'});
            }else{
              this.navCtrl.setRoot(HomePage);
            }
          } else {
            this.usuarioService.usuario = new Usuario();
            this.senha = ''
            this.mensagem = 'Login e/ou senha inválido(a)'
          }
        })
      } else{
        if(this.plt.is('android')){
          this.versaoInvalida();
        }
      }
    })


    return true
  }

  reLogin(saiu? : boolean){
    if(!saiu){
      let usuario: Usuario = new Usuario();
      this.storage.get('login').then(login =>{
        usuario.login = login;
      });
      this.storage.get('senha').then(senha =>{
        usuario.senha = senha;

        this.usuarioService.verificaVersao().then(aceitavel => {
          if (aceitavel){
            this.usuarioService.login(usuario).then(usuario => {
              if (usuario != undefined && usuario.id > 0 && usuario.banca.id == ID_BANCA) {
                if(this.bancaService.banca.focoBolao && !this.bancaService.banca.focoFutebol){
                  this.navCtrl.setRoot(BolaoPage, {tipoBolao: 'ACUMULADAO'});
                }else{
                  this.navCtrl.setRoot(HomePage);
                }
              } else {
                console.log('Login inválido')
                this.mensagem = 'Login e/ou senha inválido(a)'
              }
            })
          } else{
            if(this.plt.is('android')){
              this.versaoInvalida();
            }
          }
        })
      });
    }
  }

  clickCadastrar() {
    if (this.cadastroNome && this.cadastroLogin && this.cadastroSenha && this.cadastroConfirmacao){
      if ((this.cadastroSenha != "" && this.cadastroConfirmacao != "") &&
          (this.cadastroSenha === this.cadastroConfirmacao)){
        let usuario: Usuario = new Usuario()
        usuario.nome = this.cadastroNome
        usuario.login = this.cadastroLogin
        usuario.senha = this.cadastroSenha
        usuario.tipoUsuario = 'CLIENTE'
        let banca = new Banca();
        banca.id = ID_BANCA;
        usuario.banca = banca;

        this.presentLoading()

        this.usuarioService.salvar(usuario).then(obj => {
          if (obj != undefined && obj.id > 0){
            this.cadastroNome = ""
            this.cadastroLogin = ""
            this.cadastroSenha = ""
            this.cadastroConfirmacao = ""

            this.clickVoltar()

            this.loader.dismissAll()
            this.dialogCadastrado()
          } else{
            this.presentToast("Já existe um usuário com o login e/ou e-mail informado")
          }
        })
      } else{
        this.presentToast("A confirmação difere da senha digitada")
      }
    } else{
      this.presentToast("Todos os campos são obrigatórios")
    }
  }

  dialogCadastrado() {
    let confirm = this.alertCtrl.create({
      title: 'Cadastro',
      message: 'Cadastro realizado com sucesso!',
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

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    this.loader.present();
  }

  versaoInvalida() {
    const alert = this.alertCtrl.create({
      enableBackdropDismiss: false,
      title: 'Atualização disponível',
      cssClass: 'alertVersao',
      subTitle: `Seu aplicativo está desatualizado. Todas as funcionalidades foram bloqueadas baixer a versão mais nova do aplicativo para utilizar todos os recursos.
      \n
      Versão atual: `+ this.usuarioService.versao,
      buttons: [{
        text : 'Baixar',
        handler: () => {
          window.open((this.bancaService.banca.baixarPorLinkComum ? this.bancaService.banca.linkDownload : this.bancaService.banca.linkDownloadAlternativo));
        }
      }]
    });
    alert.present();
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

  formatFone(valString) {
    if (!valString) {
      return '';
    }
    let val = valString.toString();
    const parts = this.unFormat(val).split(this.DECIMAL_SEPARATOR);
    this.pureResult = parts;
    if (parts[0].length === 11) {
      this.maskedId = this.fone_mask(parts[0]);
      return this.maskedId;
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

  fone_mask(v) {
    v = v.replace(/\D/g, ''); //Remove tudo o que não é dígito
    v = v.replace(/(\d{2})(\d)/, '($1)$2'); //Coloca um ponto entre o terceiro e o quarto dígitos
    v = v.replace(/(\d{5})(\d)/, '$1-$2'); //Coloca um ponto entre o terceiro e o quarto dígitos
    //de novo (para o segundo bloco de números)
    return v;
  }

  verificaLogin(){
    let usuario : Usuario = new Usuario()

    let banca     = new Banca();
    banca.id      = ID_BANCA;
    usuario.banca = banca;

    usuario.login = this.cadastroLogin
    usuario.id = 0

    this.usuarioService.existeLogin(usuario).then(existe => this.existeLogin = existe)
  }

  validaForm() : boolean{
    let resultado : boolean = true

    if (this.existeLogin){
      resultado = false
    }

    return resultado
  }

}

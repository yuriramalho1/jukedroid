import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Usuario } from '../../model/usuario.model';
import { UsuarioService } from '../../service/usuario.service';
import { AlterarSenhaPage } from '../alterar-senha/alterar-senha';

/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  usuario : Usuario

  DECIMAL_SEPARATOR = ".";
  GROUP_SEPARATOR = ",";
  pureResult: any;
  maskedId: any;

  existeEmail : boolean = false
  existeLogin : boolean = false
  existeCpf   : boolean = false

  constructor(public navCtrl: NavController, public navParams: NavParams, public us : UsuarioService, public toastCtrl : ToastController) {
    this.usuario = navParams.get('usuario')

    this.usuario.cpf = this.formatCpf(this.usuario.cpf)
    this.usuario.celular = this.formatFone(this.usuario.celular)
  }

  ionViewDidEnter(){
    this.us.getUsuario().then(usuario => {
      this.usuario = usuario
    })

    this.usuario.cpf = this.unFormat(this.usuario.cpf)
    this.usuario.celular = this.unFormat(this.usuario.celular)

    this.usuario.cpf = this.formatCpf(this.usuario.cpf)
    this.usuario.celular = this.formatFone(this.usuario.celular)
  }

  clickAlterarSenha(){
    this.navCtrl.push(AlterarSenhaPage,{
      usuario: this.usuario
    })
  }

  clickCancelar(){
    this.navCtrl.pop()
  }

  clickConfirmar(){
    if (this.usuario.nome != "" && this.usuario.email != "" && this.usuario.cpf != "" && this.usuario.dataNascimentoCadastro != "" && 
        this.usuario.login != "" && this.usuario.celular != ""){

        this.us.salvar(this.usuario).then(obj => {
          if (obj != undefined && obj.id > 0){
            this.clickCancelar()

            this.presentToast("Dados alterados com sucesso")
          } else{
            this.presentToast("Já existe um usuário com o login e/ou e-mail informado")
          }
        })
    } else{
      this.presentToast("Todos os campos são obrigatórios")
    }
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

  formatCpf(valString) {
    if (!valString) {
      return '';
    }
    let val = valString.toString();
    const parts = this.unFormat(val).split(this.DECIMAL_SEPARATOR);
    this.pureResult = parts;
    if (parts[0].length <= 11) {
      this.maskedId = this.cpf_mask(parts[0]);
      return this.maskedId;
    }
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

  cpf_mask(v) {
    v = v.replace(/\D/g, ''); //Remove tudo o que não é dígito
    v = v.replace(/(\d{3})(\d)/, '$1.$2'); //Coloca um ponto entre o terceiro e o quarto dígitos
    v = v.replace(/(\d{3})(\d)/, '$1.$2'); //Coloca um ponto entre o terceiro e o quarto dígitos
    //de novo (para o segundo bloco de números)
    v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); //Coloca um hífen entre o terceiro e o quarto dígitos
    return v;
  }

  fone_mask(v) {
    v = v.replace(/\D/g, ''); //Remove tudo o que não é dígito
    v = v.replace(/(\d{2})(\d)/, '($1)$2'); //Coloca um ponto entre o terceiro e o quarto dígitos
    v = v.replace(/(\d{5})(\d)/, '$1-$2'); //Coloca um ponto entre o terceiro e o quarto dígitos
    //de novo (para o segundo bloco de números)
    return v;
  }

  verificaEmail(){
    this.us.existeEmail(this.usuario).then(existe => this.existeEmail = existe)
  }

  verificaLogin(){
    this.us.existeLogin(this.usuario).then(existe => this.existeLogin = existe)
  }

  verificaCpf(){
    this.usuario.cpf = this.formatCpf(this.usuario.cpf)

    let usuario : Usuario = new Usuario()

    usuario.cpf = this.usuario.cpf.replace(".","")
    usuario.cpf = usuario.cpf.replace(".","")
    usuario.cpf = usuario.cpf.replace(".","")
    usuario.cpf = usuario.cpf.replace("-","")
    usuario.id = this.usuario.id
    this.us.existeCpf(usuario).then(existe => this.existeCpf = existe)
  }

  validaForm() : boolean{
    let resultado : boolean = true

    if (this.existeEmail || this.existeLogin || this.existeCpf){
      resultado = false
    }

    return resultado
  }
}

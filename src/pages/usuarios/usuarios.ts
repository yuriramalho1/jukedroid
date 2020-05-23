import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioService } from '../../service/usuario.service';
import { Usuario } from '../../model/usuario.model';
import { ModalController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { UsuarioModalPage} from '../usuario-modal/usuario-modal'
import { UsuarioExtratoPage } from '../usuario-extrato/usuario-extrato'
import { UsuarioCadastroPage } from '../usuario-cadastro/usuario-cadastro';
import { UsuarioComissaoPage } from '../usuario-comissao/usuario-comissao';
import { CaixaPage } from '../caixa/caixa';
import { GerentePage } from '../gerente/gerente';
import { MeuCaixaService } from '../../service/meu-caixa.service';
import { CreditoPage } from '../credito/credito';

@IonicPage()
@Component({
  selector: 'page-usuarios',
  templateUrl: 'usuarios.html',
})
export class UsuariosPage {

  listaUsuarios  : Usuario[] = []
  usuariosAtivos : number = 0;
  usuariosCamb   : number = 0;
  usuariosTotal  : number = 0;
  usuariosInativ : number = 0;
  filtro         : string = 'Todos';


  constructor(public navCtrl: NavController, public navParams: NavParams, private us : UsuarioService,
              public modalCtrl: ModalController, public alertCtrl: AlertController, public mcs : MeuCaixaService) {

  }

  ionViewDidEnter(){
    this.getListaUsuarios();
  }

  setQuantidadeUsuarios(lista: Usuario[]){
    this.usuariosAtivos = 0;
    this.usuariosCamb   = 0;
    this.usuariosTotal  = 0;
    this.usuariosInativ = 0;
    this.usuariosTotal  = lista.length;
    for (let usuario of lista){
      if (usuario.tipoUsuario == "GERENTE" || usuario.tipoUsuario == "CAMBISTA"){
        this.usuariosCamb += 1;
      }
      if (usuario.ativo == true){
        this.usuariosAtivos += 1;
      }
    }
    this.usuariosInativ = (this.usuariosTotal - this.usuariosAtivos);
  }

  showModal(usuario: Usuario, tipoModal: string) {
    let modal : any;

    if(tipoModal == "INFO"){
      modal = this.modalCtrl.create(UsuarioModalPage, {us: usuario});
    }else if(tipoModal == "CADASTRO"){
      modal = this.modalCtrl.create(UsuarioCadastroPage);
      modal.onDidDismiss(data =>{
        if(this.filtro == 'Todos'){
          this.getListaUsuarios();
        }else{
          this.us.getUsuarioByTipo(this.filtro.toUpperCase()).then(lista =>{
            this.listaUsuarios = lista;
            this.setQuantidadeUsuarios(lista);
          })
        }
      });
    }else if(tipoModal == "CAIXA"){
      this.mcs.getMeuCaixa(usuario.id, usuario.tipoUsuario).then(meuCaixa => {
        modal = this.modalCtrl.create(CaixaPage, {
          meuCaixa: meuCaixa,
          tipo : 0,
          isModal: true
        });
        modal.present();
      })
    }else if(tipoModal == "EXTRATO"){
      modal = this.modalCtrl.create(UsuarioExtratoPage, {us: usuario});
      modal.onDidDismiss(data =>{
        this.getListaUsuarios();
      });
    }else if(tipoModal == "COMISSAO"){
      modal = this.modalCtrl.create(UsuarioComissaoPage, {us: usuario});
    }else if(tipoModal == "CAMBISTAS_GERENTE"){
      modal = this.modalCtrl.create(GerentePage, {gerente: usuario, isModal: true});
    }else if(tipoModal == "CREDITO"){
      modal = this.modalCtrl.create(CreditoPage, {usuarioCredito: usuario});
      modal.onDidDismiss(data =>{
        if(this.filtro == 'Todos'){
          this.getListaUsuarios();
        }else{
          this.us.getUsuarioByTipo(this.filtro.toUpperCase()).then(lista =>{
            this.listaUsuarios = lista;
            this.setQuantidadeUsuarios(lista);
          })
        }
      });
    }

    if(tipoModal != "CAIXA"){
      modal.present();
    }

  }

  showAlert(usuario: Usuario, tipoAlerta: string){
    let titulo : string = '';
    let message: string = '';

    if(tipoAlerta == "RESETA_SENHA"){
        titulo  = 'Resetar Senha do Usuário';
        message = 'Deseja realmente resetar a senha deste usuário ?'
    }else if(tipoAlerta == "DESABILITA_USUARIO"){
        if(usuario.ativo){
          titulo  = 'Desabilitar Usuário';
          message = 'Deseja realmente desabilitar este usuário ?'
        }else{
          titulo  = 'Habilitar Usuário';
          message = 'Deseja realmente habilitar este usuário ?'
        }

    }

    const alert = this.alertCtrl.create({
      title: titulo,
      message: message,
      buttons: [{
            text: 'Não',
            handler: () => {
              alert.dismiss;
            }
          },
          {
            text: 'Sim',
            handler: () => {
              if(tipoAlerta == "RESETA_SENHA"){
                this.us.resetarSenha(usuario);
                const alertSenhaAlterada = this.alertCtrl.create({title: 'Senha Alterada com Sucesso!', message: 'A senha do usuário ' + usuario.nome + ' agora é: "mudar123"', buttons: ['OK']});
                alert.dismiss;
                alertSenhaAlterada.present();
              }else if(tipoAlerta == "DESABILITA_USUARIO"){
                this.us.desativarUsuario(usuario).then(lista => {
                  this.getListaUsuarios();
                });
                const alertUsuarioDesabilitado = this.alertCtrl.create({title: 'Usuário Desabilitado!', message: 'O usuário ' + usuario.nome + ' foi desabilitado.', buttons: ['OK']});
                const alertUsuarioHabilitado = this.alertCtrl.create({title: 'Usuário Habilitado!', message: 'O usuário ' + usuario.nome + ' foi habilitado.', buttons: ['OK']});
                alert.dismiss;
                if(usuario.ativo){
                  alertUsuarioDesabilitado.present();
                }else{
                  alertUsuarioHabilitado.present();
                }
              }
            }
          }
        ]
    });

    alert.present();
  }

  getListaUsuarios(){
    this.us.getTodosUsuarios().then(lista => {
      this.listaUsuarios = lista;
      this.setQuantidadeUsuarios(lista)
    });
  }

  filterItems(ev: any, tipoUsuario? : boolean) {
    let val = (tipoUsuario ? ev : ev.target.value);

    if (val && val.trim() !== '' && val !== 'Todos') {
      if(tipoUsuario){
        this.us.getUsuarioByTipo(val.toUpperCase()).then(lista =>{
          this.listaUsuarios = lista;
          this.setQuantidadeUsuarios(lista);
        })
      }else{
        this.listaUsuarios = this.listaUsuarios.filter(function(item) {
          return item.nome.toLowerCase().includes(val.toLowerCase());
        });
      }
    }else{
      this.getListaUsuarios();
    }
  }

  cpf_mask(v) {
    if(v){
      v = v.replace(/\D/g, ''); //Remove tudo o que não é dígito
      v = v.replace(/(\d{3})(\d)/, '$1.$2'); //Coloca um ponto entre o terceiro e o quarto dígitos
      v = v.replace(/(\d{3})(\d)/, '$1.$2'); //Coloca um ponto entre o terceiro e o quarto dígitos
      //de novo (para o segundo bloco de números)
      v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); //Coloca um hífen entre o terceiro e o quarto dígitos
    }
    return v;
  }
}

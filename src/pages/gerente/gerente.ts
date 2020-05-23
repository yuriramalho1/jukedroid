import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, ToastController, ViewController } from 'ionic-angular';
import { Usuario } from '../../model/usuario.model';
import { UsuarioService } from '../../service/usuario.service';
import { UsuarioModalPage} from '../usuario-modal/usuario-modal';
import { UsuarioExtratoPage } from '../usuario-extrato/usuario-extrato';
import { UsuarioCadastroPage } from '../usuario-cadastro/usuario-cadastro';
import { UsuarioComissaoPage } from '../usuario-comissao/usuario-comissao';
import { CaixaPage } from '../caixa/caixa';
import { MeuCaixaService } from '../../service/meu-caixa.service';
import { GerenteCambista } from '../../model/gerente-cambista.model';
import { CreditoPage } from '../credito/credito';

@IonicPage()
@Component({
  selector: 'page-gerente',
  templateUrl: 'gerente.html',
})
export class GerentePage {
  listaCambistas : Usuario[] = [];
  gerente        : Usuario;
  usuariosCamb   : number = 0;
  usuariosAtivos : number = 0;
  isModal        : boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private us : UsuarioService,
              public modalCtrl: ModalController, public alertCtrl: AlertController, public mcs : MeuCaixaService,
              public toastCtrl: ToastController, public viewCtrl: ViewController) {
    this.gerente = navParams.get('gerente');

    if(navParams.get('isModal')){
      this.isModal = navParams.get('isModal');
    }

    this.getListaUsuarios();
  }

  getListaUsuarios(){
    this.us.getCambistasGerente(this.gerente.id).then(cambistas =>{
      this.listaCambistas = cambistas;
      this.setQuantidadeUsuarios(this.listaCambistas);
    });
  }

  setQuantidadeUsuarios(lista: Usuario[]){
    this.usuariosAtivos = 0;
    this.usuariosCamb   = 0;

    for (let usuario of lista){
      if (usuario.tipoUsuario == "CAMBISTA"){
        this.usuariosCamb += 1;
      }
      if (usuario.ativo == true){
        this.usuariosAtivos += 1;
      }
    }
  }

  showModal(usuario: Usuario, tipoModal: string) {
    let modal : any;

    if(tipoModal == "INFO"){
      modal = this.modalCtrl.create(UsuarioModalPage, {us: usuario});
    }else if(tipoModal == "CAIXA"){
      this.mcs.getMeuCaixa(usuario.id, usuario.tipoUsuario).then(meuCaixa => {
        modal = this.modalCtrl.create(CaixaPage, {
          meuCaixa: meuCaixa,
          tipo : 0,
          isModal: true
        });
        modal.present();
      })
    }else if(tipoModal == "CADASTRO"){
      modal = this.modalCtrl.create(UsuarioCadastroPage, {
        tipoUsuario : 'CAMBISTA',
        gerente : this.gerente
      });
      modal.onDidDismiss(data =>{
        this.getListaUsuarios();
      });
    }else if(tipoModal == "EXTRATO"){
      modal = this.modalCtrl.create(UsuarioExtratoPage, {us: usuario});
      modal.onDidDismiss(data =>{
        this.getListaUsuarios();
      });
    }else if(tipoModal == "COMISSAO"){
      modal = this.modalCtrl.create(UsuarioComissaoPage, {us: usuario});
    }else if(tipoModal == "CREDITO"){
      modal = this.modalCtrl.create(CreditoPage, {usuarioCredito: usuario});
      modal.onDidDismiss(data =>{
        this.getListaUsuarios();
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

  selectCambistas(){
    this.us.getCambistasSemGerente().then(cambistas =>{
      let alert = this.alertCtrl.create();
      alert.setTitle('Selecione os Cambistas');

      for (let i = 0; i < cambistas.length; i++) {
        alert.addInput({
          type: 'checkbox',
          label: cambistas[i].nome + ' - ' + cambistas[i].login,
          value: String(i),
          checked: false
        });
      }

      alert.addButton('Cancelar');
      alert.addButton({
        text: 'Selecionar',
        handler: data => {
          for(let index of data){
            let gerenteCambista      = new GerenteCambista;
            let usuario              = new Usuario;
            usuario                  = cambistas[index];
            gerenteCambista.cambista = usuario;
            gerenteCambista.gerente  = this.gerente;

            this.us.salvarCambistaGerente(gerenteCambista).then(obj => {
              if (obj != undefined && obj.id > 0){
                this.presentToast("Cambistas vinculados com sucesso. ");
                this.getListaUsuarios();
              } else{
                this.presentToast("Erro ao vincular cambista(s). ");
              }
            })
          }
        }
      });

      alert.present();
    });
  }

  filterItems(ev: any) {
    let val = ev.target.value;

    if (val && val.trim() !== '') {
      this.listaCambistas = this.listaCambistas.filter(function(item) {
        return item.nome.toLowerCase().includes(val.toLowerCase());
      });
    }else{
      this.getListaUsuarios();
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

  desvincularCambista(usuario : Usuario){
    let gerenteCambista = new GerenteCambista;
    gerenteCambista.gerente  = this.gerente;
    gerenteCambista.cambista = usuario;

    this.us.deletarCambistaGerente(gerenteCambista).then(gerenteCambista =>{
      this.presentToast("Cambista retirado com sucesso. ");
      this.getListaUsuarios();
    });
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

  voltar(){
    this.viewCtrl.dismiss()
  }

}

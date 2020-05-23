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
import { CambistaCliente } from '../../model/cambista-cliente.model';

@IonicPage()
@Component({
  selector: 'page-clientes',
  templateUrl: 'clientes.html',
})
export class ClientesPage {
  listaClientes : Usuario[] = [];
  cambista        : Usuario;
  usuariosCamb   : number = 0;
  usuariosAtivos : number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private us : UsuarioService,
              public modalCtrl: ModalController, public alertCtrl: AlertController, public mcs : MeuCaixaService,
              public toastCtrl: ToastController, public viewCtrl: ViewController) {
    this.cambista = navParams.get('cambista');

    this.getListaUsuarios();
  }

  getListaUsuarios(){
    this.us.getClientesCambista(this.cambista.id).then(clientes =>{
      this.listaClientes = clientes;
    });
  }

  showModal(usuario: Usuario, tipoModal: string) {
    let modal : any;

    if(tipoModal == "INFO"){
      modal = this.modalCtrl.create(UsuarioModalPage, {us: usuario});
    }else if(tipoModal == "CADASTRO"){
      modal = this.modalCtrl.create(UsuarioCadastroPage, {
        cambistaCadastro : this.cambista
      });
      modal.onDidDismiss(data =>{
        this.getListaUsuarios();
      });
    }else if(tipoModal == "EXTRATO"){
      modal = this.modalCtrl.create(UsuarioExtratoPage, {us: usuario, isSaldoCambista: true});
      modal.onDidDismiss(data =>{
        this.getListaUsuarios();
      });
    }

    modal.present();
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

  filterItems(ev: any) {
    let val = ev.target.value;

    if (val && val.trim() !== '') {
      this.listaClientes = this.listaClientes.filter(function(item) {
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

  cpf_mask(v) {
    v = v.replace(/\D/g, ''); //Remove tudo o que não é dígito
    v = v.replace(/(\d{3})(\d)/, '$1.$2'); //Coloca um ponto entre o terceiro e o quarto dígitos
    v = v.replace(/(\d{3})(\d)/, '$1.$2'); //Coloca um ponto entre o terceiro e o quarto dígitos
    //de novo (para o segundo bloco de números)
    v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); //Coloca um hífen entre o terceiro e o quarto dígitos
    return v;
  }

  voltar(){
    this.viewCtrl.dismiss()
  }

  desvincularCliente(usuario : Usuario){
    let cambistaCliente = new CambistaCliente;
    cambistaCliente.cambista  = this.cambista;
    cambistaCliente.cliente = usuario;

    this.us.deletarCambistaCliente(cambistaCliente).then(gerenteCambista =>{
      this.presentToast("Cliente retirado com sucesso. ");
      this.getListaUsuarios();
    });
  }

  selectClientes(){
    this.us.getClienteSemCambista().then(clientes =>{
      let alert = this.alertCtrl.create();
      alert.setTitle('Selecione o(s) Cliente(s)');

      for (let i = 0; i < clientes.length; i++) {
        alert.addInput({
          type: 'checkbox',
          label: clientes[i].nome + ' - ' + clientes[i].login,
          value: String(i),
          checked: false
        });
      }

      alert.addButton('Cancelar');
      alert.addButton({
        text: 'Selecionar',
        handler: data => {
          for(let index of data){
            let cambistaCliente      = new CambistaCliente;
            let usuario              = new Usuario;
            usuario                  = clientes[index];
            cambistaCliente.cambista = this.cambista;
            cambistaCliente.cliente  = usuario;

            this.us.salvarCambistaCliente(cambistaCliente).then(obj => {
              if (obj != undefined && obj.id > 0){
                this.presentToast("Cliente(s) vinculado(s) com sucesso. ");
                this.getListaUsuarios();
              } else{
                this.presentToast("Erro ao vincular cliente(s). ");
              }
            })
          }
        }
      });

      alert.present();
    });
  }

}

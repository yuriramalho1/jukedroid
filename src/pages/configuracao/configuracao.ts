import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { ConfiguracaoCadastroPage } from '../configuracao-cadastro/configuracao-cadastro';
import { Configuracao } from '../../model/configuracao.model';
import { Usuario } from '../../model/usuario.model';
import { ConfiguracaoService } from '../../service/configuracao.service';

@IonicPage()
@Component({
  selector: 'page-configuracao',
  templateUrl: 'configuracao.html',
})
export class ConfiguracaoPage {

  listaConfiguracao : Configuracao[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl : ModalController,
              public configService : ConfiguracaoService, public loadCtrl: LoadingController, public alertCtrl: AlertController,
              public toastCtrl: ToastController) {

    this.buscarConfiguracao();
  }

  adicionarConfiguracao(tipoModal? : number, config? : Configuracao){
    let configuracao = (config ? config : new Configuracao());

    let modal = this.modalCtrl.create(ConfiguracaoCadastroPage, {
      tipoModal: tipoModal,
      configuracao: configuracao
    });
    modal.present();

    modal.onDidDismiss(data =>{
      this.buscarConfiguracao();
    })
  }

  buscarConfiguracao(){
    let load = this.loadCtrl.create();
    load.present();

    this.configService.getTodasConfig().then(lista =>{
      this.listaConfiguracao = lista;
      load.dismiss();
    })
  }

  deletarConfiguracao(config : Configuracao){
    let alert = this.alertCtrl.create({
      title: "Deletar Configuração",
      message: "Deseja realmente deletar a configuração selecionada ?",
      buttons: [
        {text: 'Não',
         handler: () =>{alert.dismiss()}},

        {text: 'Sim',
         handler: () =>{
           this.configService.excluir(config).then(data =>{
             this.buscarConfiguracao();
           });
         }}]
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

  vincularUsuarios(config: Configuracao){
    this.configService.getUsuariosConfig(config).then(usuarios =>{
      let alert = this.alertCtrl.create();
      alert.setTitle('Selecione os Usuários');

      for (let i = 0; i < usuarios.length; i++) {
        alert.addInput({
          type: 'checkbox',
          label: usuarios[i].nome,
          value: String(i),
          checked: (usuarios[i].configuracao && usuarios[i].configuracao.id == config.id)
        });
      }

      alert.addButton('Cancelar');
      alert.addButton({
        text: 'Selecionar',
        handler: data => {
          for(let index of data){
            let listaUsuario         : Usuario[] = [];
            usuarios[index].configuracao = config;
            listaUsuario.push(usuarios[index]);

            this.configService.salvarUsuariosConfig(listaUsuario).then(obj => {
              this.presentToast("Configuração aplicada aos usuários!");
            })
          }
        }
      });

      alert.present();
    });
  }
}

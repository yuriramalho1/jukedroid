import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { Configuracao } from '../../model/configuracao.model';
import { ConfiguracaoService } from '../../service/configuracao.service';

@IonicPage()
@Component({
  selector: 'page-configuracao-cadastro',
  templateUrl: 'configuracao-cadastro.html',
})
export class ConfiguracaoCadastroPage {

  configuracao : Configuracao;
  tipoModal    : number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
              public configService : ConfiguracaoService, public loadCtrl: LoadingController) {
    this.configuracao = this.navParams.get('configuracao');
    this.tipoModal    = this.navParams.get('tipoModal');
  }

  voltar(){
    this.viewCtrl.dismiss();
  }

  salvarConfiguracao(){
    let load = this.loadCtrl.create();
    load.present();

    this.configService.salvar(this.configuracao).then(config =>{
      if(config.id != 0){
        this.viewCtrl.dismiss();
        load.dismiss();
      }
    })
  }

}

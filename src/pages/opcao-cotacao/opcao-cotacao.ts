import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Bilhete } from '../../model/bilhete.model';
import { Usuario } from '../../model/usuario.model';
import { Partida } from '../../model/partida.model';
import { OpcaoCotacao } from '../../model/opcao-cotacao.model';
import { UsuarioService } from '../../service/usuario.service';
import { PartidaService } from '../../service/partida.service';
import { BilheteService } from '../../service/bilhete.service';
import { ItemCotacao } from '../../model/item-cotacao.model';
import { Aposta } from '../../model/aposta.model';
import { Competicao } from '../../model/competicao.model';
import { BilhetePage } from '../bilhete/bilhete';

/**
 * Generated class for the OpcaoCotacaoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-opcao-cotacao',
  templateUrl: 'opcao-cotacao.html',
})
export class OpcaoCotacaoPage {

  bilhete : Bilhete
  usuario : Usuario

  competicao : Competicao
  partida : Partida
  opcaoCotacao : OpcaoCotacao

  constructor(public navCtrl: NavController, public navParams: NavParams, public bs : BilheteService, public toastCtrl: ToastController,
              public us : UsuarioService, public ps : PartidaService) {
    this.opcaoCotacao = navParams.get('opcaoCotacao')
    this.partida = navParams.get('partida')
    this.competicao = navParams.get('competicao')

    this.bilhete = bs.getBilhete()
  }

  ionViewDidLoad() {

  }

  ionViewDidEnter(){
    this.bilhete = this.bs.getBilhete()

    this.us.getUsuario().then(usuario => {
      this.usuario = usuario
    })
  }

  toBilhete(){
    this.navCtrl.push(BilhetePage)
  }

  selecionaItemCotacao(itemCotacao : ItemCotacao){
    let partida = this.partida
    let escolha = itemCotacao.descricao

    if (this.bs.verificarPartida(partida)){
      if (this.bs.verificarApostaMaisOpcoes(partida,escolha)){
        this.bs.removeApostaPorPartidaMaisOpcoes(partida,escolha)
      } else{
        let toast = this.toastCtrl.create({
          message: 'Já existe uma aposta para a partida selecionada',
          duration: 2000
        });
        toast.present();
      }
    } else{
      let aposta : Aposta = new Aposta()
      aposta.partida = partida
      aposta.ativo = true
      aposta.competicao = this.competicao.descricao

      aposta.cotacaoAposta = itemCotacao.cotacao
      aposta.escolha = itemCotacao.descricao
      aposta.tipoAposta = this.opcaoCotacao.descricao

      aposta.dataEvento = partida.dataPartida
      aposta.evento = `${partida.timeCasa} x ${partida.timeFora}`

      this.bs.addAposta(aposta)
    }
  }

  buttonStyle(itemCotacao : ItemCotacao) : string{
    let resultado : string = ""

    if (this.bs.verificarApostaMaisOpcoes(this.opcaoCotacao.partida,itemCotacao.descricao)){
      resultado = "secondary"
    }

    return resultado
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, ModalController } from 'ionic-angular';
import { Bilhete } from '../../model/bilhete.model';
import { Usuario } from '../../model/usuario.model';
import { Partida } from '../../model/partida.model';
import { BilheteService } from '../../service/bilhete.service';
import { UsuarioService } from '../../service/usuario.service';
import { PartidaService } from '../../service/partida.service';
import { OpcaoCotacaoPage } from '../opcao-cotacao/opcao-cotacao';
import { OpcaoCotacao } from '../../model/opcao-cotacao.model';
import { Competicao } from '../../model/competicao.model';
import { ItemCotacao } from '../../model/item-cotacao.model';
import { Aposta } from '../../model/aposta.model';
import { BilhetePage } from '../bilhete/bilhete';

@IonicPage()
@Component({
  selector: 'page-mais-opcoes',
  templateUrl: 'mais-opcoes.html',
})
export class MaisOpcoesPage {

  bilhete : Bilhete
  usuario : Usuario

  partida : Partida
  competicao : Competicao
  opcoesCotacao : OpcaoCotacao[] = []

  constructor(public navCtrl: NavController, public navParams: NavParams, public bs : BilheteService, public toastCtrl: ToastController,
              public us : UsuarioService, public ps : PartidaService, public loadCtrl: LoadingController, public modalCtrl : ModalController) {
    this.partida = navParams.get('partida')
    this.opcoesCotacao = navParams.get('opcoesCotacao')
    this.competicao = navParams.get('competicao')

    this.bilhete = bs.getBilhete()

    for(let cotacao of this.opcoesCotacao){
      cotacao.ativo = true;
    }
  }

  ionViewDidLoad() {

  }

  ionViewDidEnter(){
    this.bilhete = this.bs.getBilhete()

    this.us.getUsuario().then(usuario => {
      this.usuario = usuario
    })

    //this.ps.maisOpcoesPorPartida(this.partida).then(lista => this.opcoesCotacao = lista)
  }

  selecionaOpcao(opcaoSelecionada : OpcaoCotacao){
    this.navCtrl.push(OpcaoCotacaoPage, {
      opcaoCotacao : opcaoSelecionada,
      partida : this.partida,
      competicao : this.competicao
    })
  }

  selecionaItemCotacao(opcaoCotacao : OpcaoCotacao, itemCotacao : ItemCotacao){
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
      aposta.competicao = partida.competicao.descricao

      aposta.cotacaoAposta = itemCotacao.cotacao
      aposta.escolha = itemCotacao.descricao
      aposta.tipoAposta = opcaoCotacao.descricao

      aposta.dataEvento = partida.dataPartida
      aposta.evento = `${partida.timeCasa} x ${partida.timeFora}`

      this.bs.addAposta(aposta)
    }
  }

  toBilhete(){
    let modal = this.modalCtrl.create(BilhetePage);
    modal.present();
  }

  buttonStyle(opcaoCotacao : OpcaoCotacao, itemCotacao : ItemCotacao) : string{
    let resultado : string = ""

    if (this.bs.verificarApostaMaisOpcoes(opcaoCotacao.partida,itemCotacao.descricao)){
      resultado = "secondary"
    }

    return resultado
  }

}

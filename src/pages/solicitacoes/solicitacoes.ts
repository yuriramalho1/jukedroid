import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Transacao } from '../../model/transacao.model';
import { TransacaoService } from '../../service/transacao.service';
import { SolicitacaoComprovantePage } from '../solicitacao-comprovante/solicitacao-comprovante';

/**
 * Generated class for the SolicitacoesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-solicitacoes',
  templateUrl: 'solicitacoes.html',
})
export class SolicitacoesPage {

  transacoes : Transacao[]
  transacoesSelecionadas : Transacao[] = []

  constructor(public navCtrl: NavController, public navParams: NavParams, private ts : TransacaoService, private toastCtrl : ToastController) {
  }

  ionViewDidEnter(){
    this.atualizaPagina()
  }

  comprovante(selecionado : Transacao){
    if (!this.existeComprovante(selecionado)){
      this.navCtrl.push(SolicitacaoComprovantePage, {transacao : selecionado})
    }
  }

  atualizaPagina(){
    this.ts.getTransacoesPendentes().then(lista => this.transacoes = lista)
  }

  adicionaTransacao(transacao : Transacao, status : string){
    let encontrou : boolean = false
    transacao.statusTransacao = status
    
    if (status == 'CONCLUIDO'){
      transacao.transacaoAprovada = true
    } else{
      transacao.transacaoAprovada = false
    }

    for (let t of this.transacoesSelecionadas){
      if (t.id === transacao.id){
        t.statusTransacao = transacao.statusTransacao
        encontrou = true
      }
    }

    if (!encontrou){
      this.transacoesSelecionadas.push(transacao)
    }
  }

  verificaTransacao(transacao : Transacao, status : string) : boolean{
    let encontrou : boolean = false

    for (let t of this.transacoesSelecionadas){
      if (t.id == transacao.id && t.statusTransacao == status){
        encontrou = true
      }
    }

    return !encontrou
  }

  existeComprovante(transacao : Transacao){
    if (transacao.tipoFoto != undefined && transacao.tipoFoto != ""){
      return false
    } else{
      return true
    }
  }

  confirmar(){
    if (this.transacoesSelecionadas.length > 0){
      this.ts.atualizaTransacoes(this.transacoesSelecionadas).then(sucesso => {
        if (sucesso){
          this.presentToast('Transações atualizadas')
          this.transacoesSelecionadas = []
          this.atualizaPagina()
        } else{
          this.presentToast('Ocorreu um erro ao atualizar as transações. Favor entrar em contato com o suporte')
        }
      })
    }
  }

  tipoTransacao(transacao : Transacao) : string{
    let retorno : string = ""

    if (transacao.tipoTransacao == "DEPOSITO_DINHEIRO"){
      retorno = "Depósito Dinheiro"
    }
    if (transacao.tipoTransacao == "PREMIO_BILHETE"){
      retorno = "Prêmio Bilhete"
    }
    if (transacao.tipoTransacao == "NOVO_BILHETE"){
      retorno = "Novo Bilhete"
    }
    if (transacao.tipoTransacao == "SAQUE_DINHEIRO"){
      retorno = "Saque Dinheiro"
    }

    return retorno
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

}

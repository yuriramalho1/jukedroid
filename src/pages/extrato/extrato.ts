import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Transacao } from '../../model/transacao.model';
import { Bilhete } from '../../model/bilhete.model';
import { Usuario } from '../../model/usuario.model';
import { BilheteService } from '../../service/bilhete.service';
import { UsuarioService } from '../../service/usuario.service';
import { TransacaoService } from '../../service/transacao.service';

@IonicPage()
@Component({
  selector: 'page-extrato',
  templateUrl: 'extrato.html',
})
export class ExtratoPage {

  transacoes : Transacao[] = []

  bilhete : Bilhete
  usuario : Usuario

  constructor(public navCtrl: NavController, public navParams: NavParams, public bs : BilheteService, public us : UsuarioService, public ts : TransacaoService) {
    this.bilhete = bs.getBilhete() 

    this.transacoes = this.navParams.get('transacoes')
  }

  ionViewDidLoad() {
    
  }

  ionViewDidEnter(){
    this.bilhete = this.bs.getBilhete()

    this.us.getUsuario().then(usuario => {
      this.usuario = usuario
    })
  }

  getTipoTransacao(transacao : Transacao) : string{
    let tipo : string = ''
    
    if (transacao.tipoTransacao == 'DEPOSITO_DINHEIRO'){
      tipo = "Depósito dinheiro"
    }
    if (transacao.tipoTransacao == 'PREMIO_BILHETE'){
      tipo = "Prêmio Bilhete"
    }
    if (transacao.tipoTransacao == 'NOVO_BILHETE'){
      tipo = "Novo Bilhete"
    }
    if (transacao.tipoTransacao == 'SAQUE_DINHEIRO'){
      tipo = "Saque dinheiro"
    }

    return tipo
  }

  cssValor(transacao : Transacao) : string{
    let css : string = ''

    if (transacao.tipoTransacao == 'DEPOSITO_DINHEIRO'){
      css = "extrato-entrada"
    }
    if (transacao.tipoTransacao == 'PREMIO_BILHETE'){
      css = "extrato-entrada"
    }
    if (transacao.tipoTransacao == 'NOVO_BILHETE'){
      css = "extrato-bilhete"
    }
    if (transacao.tipoTransacao == 'SAQUE_DINHEIRO'){
      css = "extrato-saida"
    } 

    return css
  }

  cssIcone(transacao : Transacao) : string{
    let css : string = ''

    if (transacao.tipoTransacao == 'DEPOSITO_DINHEIRO'){
      css = "fa-caret-square-o-up"
    }
    if (transacao.tipoTransacao == 'PREMIO_BILHETE'){
      css = "fa-money"
    }
    if (transacao.tipoTransacao == 'NOVO_BILHETE'){
      css = "fa-ticket"
    }
    if (transacao.tipoTransacao == 'SAQUE_DINHEIRO'){
      css = "fa-caret-square-o-down"
    } 

    return css
  }

  iconeStatus(transacao : Transacao) : string{
    let icone : string = ''

    if (transacao.statusTransacao == 'PENDENTE'){
      icone = "timer"
    }
    if (transacao.statusTransacao == 'CONCLUIDO'){
      icone = "checkmark"
    }

    return icone
  }
}

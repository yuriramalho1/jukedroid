import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Transacao } from '../../model/transacao.model';
import { UsuarioService } from '../../service/usuario.service';
import { TransacaoService } from '../../service/transacao.service';
import { BilheteService } from '../../service/bilhete.service';
import { ContaService } from '../../service/conta.service';
import { Bilhete } from '../../model/bilhete.model';
import { Usuario } from '../../model/usuario.model';
import { Conta } from '../../model/conta.model';
import { ExtratoPage } from '../extrato/extrato';

@IonicPage()
@Component({
  selector: 'page-saque',
  templateUrl: 'saque.html',
})
export class SaquePage {

  bilhete : Bilhete
  usuario : Usuario
  conta   : Conta;
  valor   : number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public transacaoService : TransacaoService, public bs : BilheteService,
              public toastCtrl: ToastController, private usuarioService : UsuarioService, private contaService : ContaService) {
    this.bilhete = bs.getBilhete();
    this.usuarioService.getUsuario().then(usuario => {
      this.usuario = usuario;
      this.conta   = this.usuario.conta;
    })
  }

  ionViewDidEnter(){
    this.bilhete = this.bs.getBilhete()
  }


  clickSacar() {
    this.contaService.atualizarConta(this.conta).then(conta =>{
        this.usuario.conta = conta;

        if (this.usuario.conta.saldo >= this.valor){
          if (this.valor >= 5){
            let transacao : Transacao = new Transacao()
            transacao.valor = this.valor
            transacao.tipoTransacao = 'SAQUE_DINHEIRO'
            transacao.usuario = this.usuario

            this.transacaoService.salvarTransacao(transacao).then(obj => {
              this.presentToast('Pedido de saque realizado com sucesso')
              this.openExtrato()
            })
          } else{
            this.presentToast('Saque mínimo de R$ 5,00')
          }
        } else{
          this.presentToast('Saldo insuficiente')
        }
    })
  }

  openExtrato(){
    this.usuarioService.getUsuario().then(usuario => {
      this.transacaoService.getExtrato(usuario).then(lista => {
        this.navCtrl.setRoot(ExtratoPage,{
          transacoes : lista
        })
      })
    })
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

  getBanco() : string{
    let resultado : string = ''

    if (this.usuario != undefined && this.usuario.conta != undefined){
      if (this.usuario.conta.banco == 'BANCO_DO_BRASIL'){
        resultado = "Banco do Brasil"
      }
      if (this.usuario.conta.banco == 'CAIXA_ECONÔMICA_FEDERA'){
        resultado = "Caixa Econômica"
      }
      if (this.usuario.conta.banco == 'BRADESCO'){
        resultado = "Bradesco"
      }
      if (this.usuario.conta.banco == 'SANTANDER_BANESPA_SA'){
        resultado = "Santander"
      }
      if (this.usuario.conta.banco == 'HSBC_BANK_BRASIL_SA'){
        resultado = "HSBC"
      }
      if (this.usuario.conta.banco == 'ITAU'){
        resultado = "Itaú"
      }
    }

    return resultado
  }

  getTipoConta() : string{
    let resultado : string = ''

    if (this.usuario != undefined && this.usuario.conta != undefined){
      if (this.usuario.conta.tipoConta == 'CONTA_CORRENTE'){
        resultado = "Conta Corrente"
      }
      if (this.usuario.conta.tipoConta == 'CONTA_POUPANCA'){
        resultado = "Conta Poupança"
      }
    }

    return resultado
  }

}

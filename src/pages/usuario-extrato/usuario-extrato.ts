import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController} from 'ionic-angular';
import { Usuario } from '../../model/usuario.model';
import { Transacao } from '../../model/transacao.model';
import { TransacaoService } from '../../service/transacao.service';
import { ContaService } from '../../service/conta.service';
import { Conta } from '../../model/conta.model';
import { UsuarioService } from '../../service/usuario.service';
@IonicPage()
@Component({
  selector: 'page-usuario-extrato',
  templateUrl: 'usuario-extrato.html',
})
export class UsuarioExtratoPage {

  usuario      : Usuario;
  conta        : Conta;
  transacoes   : Transacao[] = [];
  saldo        : number = 0;
  novoSaldo    : number = 0;
  credito      : number;

  isSaldoCambista : boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl: ViewController, public ts : TransacaoService,
              public cs: ContaService, public us : UsuarioService, public alertCtrl: AlertController) {
    this.conta = new Conta();

    if(this.navParams.get('isSaldoCambista')){
      this.isSaldoCambista = this.navParams.get('isSaldoCambista');
    }
  }

  ionViewDidLoad() {
    this.usuario    = this.navParams.get('us');
    this.ts.getExtrato(this.usuario).then(lista => {
      this.transacoes = lista;
    });

    this.conta           = this.usuario.conta;
    this.conta.idUsuario = this.usuario.id;
    this.saldo           = (this.usuario.tipoUsuario != 'CLIENTE' ? this.usuario.conta.saldoLimite : this.usuario.conta.saldo);
  }

  voltar(){
    this.viewCtrl.dismiss();
  }

  atualizarSaldo(){
    if(this.usuario.tipoUsuario != 'CLIENTE'){
      this.novoSaldo = Number(this.credito);
    }else{
      this.novoSaldo = (Number(this.saldo) + Number(this.credito));
    }
  }

  atualizaSaldo(){
    this.conta.credito   = this.credito;
    this.conta.novoSaldo = this.novoSaldo;

    if(!this.isSaldoCambista){
      this.us.getUsuario().then(usuarioAdmin =>{
        this.conta.idUsuarioAdministrador = usuarioAdmin.id;
      })

      this.cs.atualizarSaldo(this.conta).then(conta =>{
        this.us.getUsuarioById(this.usuario).then(usuario =>{
            this.usuario = usuario;
        });
        this.ts.getExtrato(this.usuario).then(lista => {
          this.transacoes = lista;
        });

        let alert = this.alertCtrl.create({
          title: (this.usuario.tipoUsuario != 'CLIENTE' ? "Limite" : "Saldo") + " Atualizado",
          message: "O " + (this.usuario.tipoUsuario != 'CLIENTE' ? "Limite" : "Saldo") + " foi atualizado com sucesso!",
          buttons: [{
            text : 'OK',
          }]
        })

        alert.present();

        this.saldo = (this.usuario.tipoUsuario != 'CLIENTE' ? conta.saldoLimite : conta.saldo);
      });
    }else{
      this.us.atualizarSaldoCliente(this.conta, this.us.usuario).then(conta =>{
        let alert = this.alertCtrl.create({
          title: (this.usuario.tipoUsuario != 'CLIENTE' ? "Limite" : "Saldo") + " Atualizado",
          message: "O " + (this.usuario.tipoUsuario != 'CLIENTE' ? "Limite" : "Saldo") + " foi atualizado com sucesso!",
          buttons: [{
            text : 'OK',
          }]
        })

        this.saldo = conta.saldo;
      })
    }

    this.credito   = Number(undefined);
    this.novoSaldo = Number(0);
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

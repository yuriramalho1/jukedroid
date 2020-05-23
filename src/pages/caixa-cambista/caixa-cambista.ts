import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Resumo } from '../../model/resumo.model';
import { Bilhete } from '../../model/bilhete.model';
import { Lancamento } from '../../model/lancamento.model';
import { BilheteService } from '../../service/bilhete.service';

@IonicPage()
@Component({
  selector: 'page-caixa-cambista',
  templateUrl: 'caixa-cambista.html',
})
export class CaixaCambistaPage {

  resumoCambista   : Resumo;
  isPremiacoes     : boolean = false;
  resumoPremiacoes : Resumo;
  lista            : Resumo;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
              public bs: BilheteService) {
    this.resumoCambista = this.navParams.get('resumoCambista');
    this.isPremiacoes     = this.navParams.get('isPremiacoes');
    this.resumoPremiacoes = this.navParams.get('resumo');

    if(this.isPremiacoes){
      this.resumoPremiacoes.lancamentos = this.resumoPremiacoes.lancamentos.filter(function(item){
        return item.descricaoLancamento.toUpperCase().includes("PAGAMENTO_CLIENTE");
      })

      this.resumoCambista = this.resumoPremiacoes;
    }

    this.lista = this.resumoCambista;
  }

  voltar(){
    this.viewCtrl.dismiss();
  }

  tipoBilhete(bilhete : Bilhete, css: boolean = false): string{
    return this.bs.tipoBilhete(bilhete, css);
  }

  statusFormatado(bilhete : Bilhete) : string{
    let resultado : string = bilhete.statusBilhete
    if (bilhete.statusBilhete == 'EM_ABERTO')
      resultado = "Em Aberto"
    if (bilhete.statusBilhete == 'CANCELADO')
      resultado = "Cancelado"
    if (bilhete.statusBilhete == 'FINALIZADO')
      resultado = "Finalizado"

    return resultado
  }

  // filterItems(ev: any) {
  //   let lancamentos : Lancamento[];
  //   let val =  ev.target.value;
  //
  //   lancamentos = this.lista.lancamentos;
  //
  //   if (val && val.trim() !== '') {
  //     this.resumoCambista.lancamentos = lancamentos.filter(function(item) {
  //       return String(item.bilhete.id).toLowerCase().includes(val.toLowerCase());
  //     });
  //   }else{
  //     this.resumoCambista.lancamentos = this.lista.lancamentos;
  //   }
  // }


  descricaoAposta(bilhete?: Bilhete) : string{
    let resultado : string = '';
    if(bilhete.tipoAposta == 'APOSTA_SIMPLES'){
      resultado = "Aposta Simples"
    }else if(bilhete.tipoAposta == 'APOSTA_MULTIPLA_DOIS'){
      resultado = "Aposta Multipla 2"
    }
    else if(bilhete.tipoAposta == 'APOSTA_MULTIPLA_TRES'){
      resultado = "Aposta Multipla 3"
    }
    else if(bilhete.tipoAposta == 'APOSTA_MULTIPLA_MAIS_QUATRO'){
      resultado = "Aposta Multipla +4"
    }

    return resultado;
  }
}

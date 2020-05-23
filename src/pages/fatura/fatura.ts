import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { BancaService } from '../../service/banca.service';
import { UsuarioService } from '../../service/usuario.service';
import { MovimentacaoFinanceira } from '../../model/movimentacao-financeira.model';

@IonicPage()
@Component({
  selector: 'page-fatura',
  templateUrl: 'fatura.html',
})
export class FaturaPage {

  movimentacoes : MovimentacaoFinanceira[] = [];
  dataInicial   : string;
  dataFinal     : string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public bancaService: BancaService,
              public loadCtrl: LoadingController, public usuarioService: UsuarioService) {

  }

  consultaMovimentacoes(dataInicial, dataFinal){
    dataInicial = new Date(dataInicial).toISOString();
    dataFinal   = new Date(dataFinal).toISOString();

    let loader = this.loadCtrl.create();
    loader.present();

    this.bancaService.getMovimentacaoFinanceira(this.usuarioService.usuario, dataInicial, dataFinal).then(movimentacoes =>{
      this.movimentacoes = movimentacoes;
      loader.dismiss();
    })
  }
}

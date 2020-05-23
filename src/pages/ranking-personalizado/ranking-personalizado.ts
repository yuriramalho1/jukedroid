import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Premiacao } from "../../model/premiacao.model";
import { Usuario } from "../../model/usuario.model";
import { PremiacaoCategoria } from "../../model/premiacao.model";
import { PremiacaoCategoriaVencedor } from "../../model/premiacao.model";
import { RankingService } from "../../service/ranking.service";

import localePtBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';

@IonicPage()
@Component({
  selector: 'page-ranking-personalizado',
  templateUrl: 'ranking-personalizado.html',
})
export class RankingPersonalizadoPage {

  premiacoes           : Premiacao[] = [];
  premiacao            : Premiacao;
  categorias           : PremiacaoCategoria[] = [];
  tipoCategoria        : string;
  categoriaSelecionada : PremiacaoCategoria;
  usuario              : Usuario;
  categoriaUsuario     : PremiacaoCategoriaVencedor;

  constructor(public navCtrl: NavController, public navParams: NavParams, public rs: RankingService) {
    this.rs.getTodasPremiacoes().then(lista =>{
      this.premiacoes = lista;

      if(lista[0]){
        this.loadCategorias(lista[0]);
        this.premiacao = lista[0];
      }
    })

    this.usuario = this.navParams.get('usuario');

    registerLocaleData(localePtBr);
  }

  descricaoCategoria(tipoCategoriaPremiacao: string): string{
    let retorno = '';
    switch(tipoCategoriaPremiacao){
      case "PLATINUM":{retorno = 'Platina'} break;
      case "OURO"    :{retorno = 'Ouro'}    break;
      case "PRATA"   :{retorno = 'Prata'}   break;
      case "BRONZE"  :{retorno = 'bronze'}  break;
    }

    return retorno;
  }

  prepareCategoria(categoria: PremiacaoCategoria){
    if(categoria){
      this.categoriaSelecionada = categoria
      this.definePosicaoRanking(categoria);
    }
  }

  getRankingImage() : string{
    return this.rs.getRankingImage(this.tipoCategoria);
  }

  definePosicaoRanking(categoria: PremiacaoCategoria){
    this.categoriaUsuario = new PremiacaoCategoriaVencedor();
    if(categoria){
      for(let categoriaUsuarioVencedor of categoria.listaPremiacaoCategoriaVencedor){
        if(categoriaUsuarioVencedor.usuarioVencedor.id == this.usuario.id){
          this.categoriaUsuario = categoriaUsuarioVencedor;
        }
      }
    }
  }

  loadCategorias(premiacao: Premiacao){
    if(premiacao.listaPremiacaoCategoria){
      this.categorias    = premiacao.listaPremiacaoCategoria;

      if(premiacao.listaPremiacaoCategoria[0]){
        this.tipoCategoria        = premiacao.listaPremiacaoCategoria[0].tipoCategoriaPremiacao;
        this.categoriaSelecionada = premiacao.listaPremiacaoCategoria[0];
        this.definePosicaoRanking(premiacao.listaPremiacaoCategoria[0]);
      }
    }
  }

}

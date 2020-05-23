import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Usuario } from '../../model/usuario.model';
import { UsuarioComissao } from '../../model/usuario-comissao.model';
import { UsuarioService } from '../../service/usuario.service';
import { BancaService } from '../../service/banca.service';

@IonicPage()
@Component({
  selector: 'page-usuario-comissao',
  templateUrl: 'usuario-comissao.html',
})
export class UsuarioComissaoPage {
  tipoComissao       : string = 'PRE_JOGO';
  usuario            : Usuario;
  quantidadeApostas  : number;
  percentualComissao : number;

  listaComissaoPreJogo    : UsuarioComissao[] = [];
  listaComissaoAoVivo     : UsuarioComissao[] = [];
  listaComissaoAcumuladao : UsuarioComissao[] = [];
  listaComissaoBolao      : UsuarioComissao[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController,
              public us : UsuarioService, public bs: BancaService) {
    this.usuario    = this.navParams.get('us');

    if(!this.bs.banca.focoFutebol){
      this.tipoComissao = 'ACUMULADAO';
    }

    this.consultarComissoes();
  }

  consultarComissoes(){
    this.listaComissaoPreJogo    = [];
    this.listaComissaoAoVivo     = [];
    this.listaComissaoAcumuladao = [];
    this.listaComissaoBolao      = [];

    this.us.getComissoesUsuario(this.usuario.id).then(lista =>{
      for(let comissao of lista){
        if(comissao.tipoPartida == 'PRE_JOGO'){
          this.listaComissaoPreJogo.push(comissao);
        }else if(comissao.tipoPartida == 'AO_VIVO'){
          this.listaComissaoAoVivo.push(comissao);
        }else if(comissao.tipoPartida == 'ACUMULADAO'){
          this.listaComissaoAcumuladao.push(comissao);
        }else if(comissao.tipoPartida == 'BOLAO'){
          this.listaComissaoBolao.push(comissao);
        }
      }
    })
  }

  retornaListaComissao(tipoComissao: string): UsuarioComissao[]{
    let retorno: UsuarioComissao[] = [];

    switch(tipoComissao){
      case 'PRE_JOGO'   :{ retorno = this.listaComissaoPreJogo}; break;
      case 'AO_VIVO'    :{ retorno = this.listaComissaoAoVivo}; break;
      case 'ACUMULADAO' :{ retorno = this.listaComissaoAcumuladao}; break;
      case 'BOLAO'      :{ retorno = this.listaComissaoBolao}; break;
    }

    return retorno
  }

  voltar(){
    this.viewCtrl.dismiss();
  }

  salvarComissaoUsuario(){
    let lista = this.retornaListaComissao(this.tipoComissao);
    let usuarioComissao = new UsuarioComissao();

    this.quantidadeApostas = lista.length + 1;

    usuarioComissao.tipoPartida        = this.tipoComissao;
    usuarioComissao.quantidadeApostas  = this.quantidadeApostas;
    usuarioComissao.percentualComissao = this.percentualComissao;
    usuarioComissao.usuario            = this.usuario;

    this.us.salvarComissaoUsuario(lista, usuarioComissao).then(uc =>{
      this.consultarComissoes();
      this.quantidadeApostas  = Number(undefined);
      this.percentualComissao = Number(undefined);
    });
  }

  deletarUsuarioComissao(usuarioComissao : UsuarioComissao){
    let lista = this.retornaListaComissao(this.tipoComissao);

    this.us.deletarUsuarioComissao(lista, usuarioComissao).then(uc =>{
      this.consultarComissoes();
    });
  }

}

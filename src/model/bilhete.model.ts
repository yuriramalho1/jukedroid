import { Usuario } from "./usuario.model";
import { Partida } from "./partida.model";
import { Aposta } from "./aposta.model";
import { Banca } from "./banca.model";
import { Bolao } from "./bolao.model";


export class Bilhete {
  id                     : number
  data                   : Date
  usuario                : Usuario
  usuarioSessao          : Usuario
  cliente                : Usuario
  clienteNome            : string
  origemBilhete          : string // OrigemBilhete
  statusBilhete          : string //StatusBilhete
  tipoAposta             : string //TipoAposta
  tipoBilhete            : string //TipoBilhete
  valor                  : number
  cotacaoTotal           : number
  valorPossivelRetorno   : number
  listaApostas           : Aposta[]
  listaPartidas          : Partida[]
  numeroBilhete          : string
  observacaoCancelamento : string
  bilheteVencedor        : boolean
  nomeSistema            : string
  dataFinalizacao        : Date
  pago                   : boolean
  dataPagamento          : Date
  dataFormatada          : string
  ativo                  : boolean;
  banca                  : Banca;
  tipoPartida            : string;
  bolao                  : Bolao;
  pontosBolao            : number;
  valorPremioDois        : number;
  valorPremioTres        : number;

  getCotacao(): number {
    let cotacao: number = 0

    for (let aposta of this.listaApostas) {
      if (cotacao == 0) {
        cotacao = aposta.cotacaoAposta
      } else {
        cotacao *= aposta.cotacaoAposta
      }
    }

    this.cotacaoTotal = cotacao

    return cotacao
  }

  statusFormatado(bilhete?: Bilhete) : string {
    let resultado : string = this.statusBilhete
    if (this.statusBilhete == 'EM_ABERTO' || bilhete.statusBilhete == 'EM_ABERTO')
      resultado = "Em Aberto"
    if (this.statusBilhete == 'CANCELADO' || bilhete.statusBilhete == 'CANCELADO')
      resultado = "Cancelado"
    if (this.statusBilhete == 'FINALIZADO' || bilhete.statusBilhete == 'FINALIZADO')
      resultado = "Finalizado"

    return resultado
  }

  statusAposta(statusAposta) : string {
    let resultado : string;

    if (statusAposta == 'NAO_APURADA')
      resultado = "Não Apurada";
    else if (statusAposta == 'PERDEDORA')
      resultado = "Perdedora";
    else if (statusAposta == 'CANCELADA')
      resultado = "Cancelada";
    else if (statusAposta == 'VENCEDORA')
      resultado = "Vencedora";

    return resultado
  }

  descricaoAposta(bilhete?: Bilhete) : string{
    let resultado : string = '';
    if(this.tipoAposta == 'APOSTA_SIMPLES' || bilhete.tipoAposta == 'APOSTA_SIMPLES'){
      resultado = "Aposta Simples"
    }else if(this.tipoAposta == 'APOSTA_MULTIPLA_DOIS' || bilhete.tipoAposta == 'APOSTA_MULTIPLA_DOIS'){
      resultado = "Aposta Multipla 2"
    }
    else if(this.tipoAposta == 'APOSTA_MULTIPLA_TRES' || bilhete.tipoAposta == 'APOSTA_MULTIPLA_TRES'){
      resultado = "Aposta Multipla 3"
    }
    else if(this.tipoAposta == 'APOSTA_MULTIPLA_MAIS_QUATRO' || bilhete.tipoAposta == 'APOSTA_MULTIPLA_MAIS_QUATRO'){
      resultado = "Aposta Multipla +4"
    }

    return resultado;
  }
  prepareHeaders(espacos : string, texto : string) : string{
    let resultado : string;
    resultado = texto + espacos.substr(0, (espacos.length - texto.length));
    return resultado;
  }


}

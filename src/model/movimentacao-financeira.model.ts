import { Usuario } from "./usuario.model";
import { Bilhete } from "./bilhete.model";
import { MeuCaixa } from "./meu-caixa.model";

export class MovimentacaoFinanceira{
    id                         : number;
    usuario                    : Usuario;
    usuarioTransferecnia       : Usuario;
    valorAnterior              : number;
    valorMovimento             : number;
    valorAtual                 : number;
    email                      : string;
    tipoMovimentacaoFinanceira : string;
    data                       : Date;
    bilhete                    : Bilhete;
    meuCaixa                   : MeuCaixa;
    quantidadeApostas          : number;
    percentualComissao         : number;
    opcoesDoCalculoDaComissao  : string;
    valorComissao              : number;

    constructor(){}
}

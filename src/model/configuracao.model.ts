import { Banca } from "./banca.model";

export class Configuracao{
    id                              : number;
    banca                           : Banca;
    nome                            : string;
    valorMinCupom                   : number;
    valorMaxCupom                   : number;
    premioMaxCupom                  : number;
    cotacaoMaxCupom                 : number;
    alertaCupomSimplesCotacaoAcima  : number;
    alertaCupomMultiploCotacaoAcima : number;
    minimoPartidaBilhete            : number;
    limiteCotacao                   : number;
    limitePartidaUnicaBilhete       : number;
    porcentagemOdds                 : number;
    tempoLimiteCancelamentoBilhete  : number;
    permissaoCancelarBilhete        : boolean;
    qtdBilhetesIguaisPorUsuario     : number;
    permissaoAlterarSaldoLimite     : boolean;
    valorMaximoApostaAoVivo         : number;
    valorBilheteBolao               : number;
    percentualComissaoBolao         : number;
    configuracaoPrincipal           : boolean;
}

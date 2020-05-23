import { Caixa } from "./caixa.model";

export class MeuCaixa{
    id : number
    caixaAberto : boolean
    totalBilhete : number
    dataInicial : Date
    dataFinal : Date
    liquido : number
    entrada : number
    saida : number
    totalComissaoCambista : number
    totalPagamentoClientes : number
    dataInicioFormatada : string
    dataFinalFormatada : string
    totalDepositos : number;
    totalSaques : number;
    totalPagamentoCambGerente : number;
    caixaQuantidadeBilhetes : Caixa;
}

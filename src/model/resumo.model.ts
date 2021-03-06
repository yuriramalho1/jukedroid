import { Usuario } from "./usuario.model";
import { Caixa } from "./caixa.model";
import { MeuCaixa } from "./meu-caixa.model";
import { Lancamento } from "./lancamento.model";
import { GerenteCambista } from "./gerente-cambista.model";

export class Resumo{
    id                                      : number;
    meuCaixa                                : MeuCaixa;
    listaCaixaCambista                      : Caixa[];
    lancamentos                             : Lancamento[];
    lancamentosEntrada                      : Lancamento[];
    lancamentosSaida                        : Lancamento[];
    resumoAdministradores                   : Resumo[];
    resumoClientes                          : Resumo[];
    resumoGerentes                          : Resumo[];
    resumoCambistas                         : Resumo[];
    gerenteCambistas                        : GerenteCambista[];
    saldoAtual                              : number = 0.00;
    saldoAnterior                           : number = 0.00;
    totalEntradaFinalizadoCliente           : number = 0.00;
    totalEntradaEmAbertoCliente             : number = 0.00;
    totalEntradaFinalizadoCambista          : number = 0.00;
    totalEntradaEmAbertoCambista            : number = 0.00;
    totalEntradaFinalizadoGerente           : number = 0.00;
    totalEntradaEmAbertoGerente             : number = 0.00;
    totalEntradaCanceladoCliente            : number = 0.00;
    totalEntradaDeposito                    : number = 0.00;
    totalEntradaEmAbertoGeral               : number = 0.00;
    totalEntradaFinalizadoGeral             : number = 0.00;
    totalEntradaEmAbertoAdministrador       : number = 0.00;
    totalEntradaFinalizadoAdministrador     : number = 0.00;
    saldoAtualComBilhetesVencedoresEmAberto : number = 0.00;
    saldoTotalCreditoCliente                : number = 0.00;
    totalSaida                              : number = 0.00;
    totalComissao                           : number = 0.00;
    totalGeral                              : number = 0.00;
    totalBilhetes                           : number = 0.00;
    totalBilhetesVencedoresEmAberto         : number = 0.00;
    totalLancamento                         : number = 0.00;
    lucroAtual                              : number = 0.00;
    totalSaqueBanca                         : number = 0.00;
    totalPagamentoCliente                   : number = 0.00;
    usuario                                 : Usuario;
    totalLiquido                            : number = 0.00;
    totalGeralEntrada                       : number = 0.00;
}

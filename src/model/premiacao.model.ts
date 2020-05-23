
import { Banca } from "./banca.model";
import { Usuario } from "./usuario.model";

export class Premiacao{
    id                            : number;
    nome                          : string;
    banca                         : Banca;
    tipoPremiacao                 : string;
    tipoCalculoCotacaoPremiacao   : string;
    dataInicio                    : Date;
    dataPremiacao                 : Date;
    descricaoProduto              : string;
    valor                         : number;
    usuarioVencedorPremiacaoUnica : Usuario;
    listaPremiacaoCategoria       : PremiacaoCategoria[];


    constructor(){}
}

export class PremiacaoCategoria{
    id                              : number;
    premiacao                       : Premiacao;
    tipoCategoriaPremiacao          : string;
    valorPremiacao                  : number;
    valorInicialCreditoCliente      : number;
    valorFinalCreditoCliente        : number;
    descricaoProduto                : string;
    listaPremiacaoCategoriaVencedor : PremiacaoCategoriaVencedor[];

    constructor(){}
}

export class PremiacaoCategoriaVencedor{
    id                 : number;
    sortId             : number;
    PremiacaoCategoria : PremiacaoCategoria;
    usuarioVencedor    : Usuario;
}

import { Conta } from "./conta.model";
import { Banca } from "./banca.model";
import { Configuracao } from "./configuracao.model";

export class Usuario{
    id                     : number;
    login                  : string;
    nome                   : string;
    apelido                : string;
    sobreNomeUsuario       : string;
    senha                  : string;
    email                  : string;
    celular                : string;
    forcarTrocaSenha       : boolean;
    tipoUsuario            : string;
    usuarioAdministrador   : boolean;
    ultimoAcesso           : Date;
    dataNascimento         : Date;
    dataNascimentoCadastro : string;
    cpf                    : string;
    ipUltimoAcesso         : string;
    banca                  : Banca;
    conta                  : Conta;
    ativo                  : boolean;
    posicao                : number;
    numeroVitorias         : number;
    cotacaoTotalVitorias   : number;
    tipoConsultaBilhete    : number;
    percentualComissao     : number;
    configuracao           : Configuracao;
    listaBilheteAposta     : any;
    totalCotacaoRanking    : number;
    visualizaAoVivo        : boolean;
    visualizaCombate       : boolean;
    visualizaTenis         : boolean;
    visualizaNBA           : boolean;
    visualizaFutebol       : boolean;
    visualizaBolao         : boolean;

    constructor(){}
}

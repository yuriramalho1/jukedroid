import { Esporte } from "./esporte.enum";
import { Competicao } from "./competicao.model";

export class Regiao{
    id                 : number;
    descricao          : string;
    idHtml             : string;
    url                : string;
    dataAtualizacao    : Date;
    esporte            : Esporte;
    permiteResetar     : boolean;
    competicoes        : Competicao[] = [];
    competicoesVisible : boolean;
}

import { Banca } from "./banca.model";
import { EventoBolao } from "./evento-bolao.model";

export class Bolao{
    id                    : number;
    titulo                : string;
    competicao            : string;
    encerrado             : boolean;
    premio                : number;
    premio_dois           : number;
    premio_tres           : number;
    valorBilhete          : number;
    dataFormatada         : string;
    dataFormatadaCadastro : string;
    banca                 : Banca;
    statusBolao           : string;
    listaEvento           : EventoBolao[];
    tipoBolao             : string;
    premioMultiplo        : boolean;
}

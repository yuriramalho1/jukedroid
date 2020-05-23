import { Banca } from "./banca.model";

export class Notificacao{
    id             : number;
    tipoFoto       : string;
    titulo         : string;
    descricaoBreve : string;
    visualizado    : boolean;
    banca          : Banca;
    dataAUD        : string;
    data           : Date;
}

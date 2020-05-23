import { Time } from "./time.model";
import { Bolao } from "./bolao.model";

export class EventoBolao{
    id                : number;
    competicao        : string;
    timeCasa          : Time;
    timeFora          : Time;
    resultadoTimeUm   : number;
    resultadoTimeDois : number;
    dataFormatada     : string;
    bolao             : Bolao;
}

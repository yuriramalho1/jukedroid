import { Partida } from "./partida.model";
import { PartidaAoVivo } from './partida-aovivo.model';
import { Result } from './partida-aovivo.model';

export class Aposta{
    id : number
    ativo : boolean
    competicao : string
    tipoCompeticao : string;
    dataEvento : Date
    dataFormatada : string
    evento : string
    tipoAposta : string
    escolha : string
    cotacaoAposta : number
    vencedora : boolean
    statusAposta : string //StatusAposta
    partida : Partida
    partidaAoVivo : PartidaAoVivo;
    result : Result;
    oddsDesatualizado : boolean = undefined;
    oddsAtualizado    : number;
    placarAoVivoDelay : string;
}

import { Competicao } from "./competicao.model";

export class Partida{
    id : number
    dataPartida : Date
    dataFormatadaString : string
    horaString : string
    timeCasa : string
    timeFora : string
    quantidadeOpcoes : number
    cotacaoTimeCasa : number
    cotacaoTimeFora : number
    cotacaoEmpate : number
    linkOpcoesCotacao : string
    competicao : Competicao
    cotacao : number
    escolha : string
    timeAposta : string
    selecionado : boolean
    evento : string
    escolheuTimeCasa : boolean
    escolheuEmpate : boolean
    escolheuFora : boolean
}

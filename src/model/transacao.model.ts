import { Usuario } from "./usuario.model";

export class Transacao{
    id : number
    tipoDeposito : string //TipoDeposito
    bancoDestino : string //BancoDestino
    dataTransacao : Date
    dataFormatada : string
    tipoTransacao : string //TipoTransacao
    statusTransacao : string //StatusTransacao
    observacao : string
    valor : number
    valorCreditado : number
    usuario : Usuario
    tipoFoto : string = '';
    transacaoAprovada : boolean;
    bancoDestinoDesc : string;
    tipoDepositoDesc : string;
}

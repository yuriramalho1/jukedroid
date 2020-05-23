import { Bilhete } from "./bilhete.model";
import { Transacao } from "./transacao.model";
import { MeuCaixa } from "./meu-caixa.model";
import { Usuario } from "./usuario.model";

export class Lancamento{
    id : number
    valor : number
    descricaoLancamento : string
    tipoLancamento : string
    data : Date
    bilhete : Bilhete
    transacao : Transacao
    meuCaixa : MeuCaixa
    lancamentoAutomatico : boolean
    observacaoCancelamento : string
    dataInicial : Date
    dataFinal : Date
    usuario : Usuario;
    usuarioTransferencia : Usuario;
}

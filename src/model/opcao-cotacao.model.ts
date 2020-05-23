import { Partida } from "./partida.model";
import { ItemCotacao } from "./item-cotacao.model";



export class OpcaoCotacao{
    id : number
    descricao : string
    listaItensCotacao : ItemCotacao[]
    partida : Partida
    tipoOpcaoCotacao : string // TipoOpcaoCotacao
    ativo : Boolean
}

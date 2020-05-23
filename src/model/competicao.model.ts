import { Partida } from "./partida.model";
import { Esporte } from "./esporte.enum";
import { Regiao } from "./regiao.model";

export class Competicao{
    id             : number;
    linkCompeticao : string;
    descricao      : string;
    tipoCompeticao : string;
    listaPartidas  : Partida[];
    esporte        : Esporte;
    regiao         : Regiao;
}

export class CompeticaoPojo{
  competicao     : Competicao;
  regiao         : Regiao;
  tipoCompeticao : string;
  listaPartidas  : Partida[];
  ativo          : boolean;
}

import { Usuario } from "./usuario.model";

export class UsuarioComissao{
    id                 : number;
    usuario            : Usuario;
    tipoPartida        : string;
    quantidadeApostas  : number;
    percentualComissao : number;

    constructor(){}
}

import { Usuario } from "./usuario.model";

export class Caixa{
    id : number
    dataInicial : Date
    dataFinal : Date
    liquido : number
    entrada : number
    totalBilhetes : number
    totalEntradaBilhetes : number;
    totalBilhetesEmAberto : number
    totalBilhetesFinalizados : number
    totalBilhetesVencedores : number
    totalBilhetesPerdedores : number
    totalBilhetesCancelados : number
    usuario : Usuario
}

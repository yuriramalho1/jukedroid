import { Injectable } from "@angular/core"
import { Http } from "@angular/http"

import { SERVICE } from './app.api'
import { ID_BANCA } from "./app.api";
import { Partida } from "../model/partida.model";
import { Usuario } from "../model/usuario.model";
import { OpcaoCotacao } from "../model/opcao-cotacao.model";

@Injectable()
export class PartidaService{
    classe : string = 'futebol'

    constructor(protected http: Http) {}

    listaPartidaPorCompeticao(idCompeticao : number, usuario: Usuario) {
        return this.http.post(`${SERVICE}/${this.classe}/partidasPorCompeticao`, String(idCompeticao) + '</>' + JSON.stringify(usuario.id))
            .toPromise()
            .then(res => <Partida[]>res.json())
            .then(data => {
                return data
            })
    }

    maisOpcoesPorPartida(partida : Partida, usuario: Usuario){
        return this.http.post(`${SERVICE}/${this.classe}/maisOpcoesPorPartida`, String(partida.id) + '</>' + JSON.stringify(usuario.id) + '</>' + String(ID_BANCA))
            .toPromise()
            .then(res => <OpcaoCotacao[]>res.json())
            .then(data => {
                return data
            })
    }

    melhoresCotacoes(usuario: Usuario) {
        return this.http.post(`${SERVICE}/${this.classe}/melhoresCotacoes`, JSON.stringify(usuario.id))
            .toPromise()
            .then(res => <Partida[]>res.json())
            .then(data => {
                return data
            })
    }

    todasPartidas(usuario: Usuario) {
        return this.http.post(`${SERVICE}/${this.classe}/todasPartidas`, JSON.stringify(usuario.id))
            .toPromise()
            .then(res => <Partida[]>res.json())
            .then(data => {
                return data
            })
    }
}

import { Injectable } from "@angular/core"
import { Http } from "@angular/http"

import { SERVICE } from './app.api'
import { ID_BANCA } from "./app.api";
import { Competicao } from "../model/competicao.model";
import { Partida } from "../model/partida.model";

@Injectable()
export class TenisService{
    classe : string = 'tenis'

    constructor(protected http: Http) {}

    listaCompeticoesPorTipo(tipoCompeticao : string) {
      return this.http.post(`${SERVICE}/${this.classe}/competicoesPorTipo`, tipoCompeticao)
          .toPromise()
          .then(res => <Competicao[]>res.json())
          .then(data => {
              return data
          })
    }

    listaJogosDoDia() {
        return this.http.post(`${SERVICE}/${this.classe}/jogosDoDia`, '')
            .toPromise()
            .then(res => <Partida[]>res.json())
            .then(data => {
                return data
            })
    }

    isAtualizando(){
      return this.http.post(`${SERVICE}/${this.classe}/isAtualizandoTenis`, '')
          .toPromise()
          .then(res => <Boolean>res.json())
          .then(data => {
              return data
          })
    }
}

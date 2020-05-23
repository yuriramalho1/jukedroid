import { Injectable } from "@angular/core"
import { Http } from "@angular/http"

import { SERVICE } from './app.api'
import { ID_BANCA } from "./app.api";
import { Usuario } from "../model/usuario.model";
import { Premiacao } from "../model/premiacao.model";

@Injectable()
export class RankingService {
    exibeRanking : boolean = true

    private classe : string = 'usuario'

    constructor(protected http: Http) {}

    getRanking(){
        return this.http.post(`${SERVICE}/${this.classe}/getRanking`, ID_BANCA)
            .toPromise()
            .then(res => <Usuario[]>res.json())
            .then(data => {
                return data
            })
    }


    getRankingImage(tipoCategoria: string): string {
        return `${SERVICE}/premiacao/getRankingImage/${ID_BANCA}/${tipoCategoria}`
    }

    getTodasPremiacoes(){
        return this.http.post(`${SERVICE}/premiacao/getTodasPremiacoes`, ID_BANCA)
            .toPromise()
            .then(res => <Premiacao[]>res.json())
            .then(data => {
                return data
            })
    }


}

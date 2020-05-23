import { Injectable } from "@angular/core"

import { Aposta } from "../model/aposta.model";
import { Http } from "@angular/http";
import { SERVICE } from "./app.api";
import { ID_BANCA } from "./app.api";

@Injectable()
export class ApostaService{
    classe : string = 'banca'

    constructor(protected http: Http) {}

    getApostasNaoApuradas(){
        return this.http.post(`${SERVICE}/${this.classe}/getApostasNaoApuradas`, '')
            .toPromise()
            .then(res => <Aposta[]>res.json())
            .then(data => {
                return data
            })
    }

    atualizaApostas(apostas : Aposta[]){
        return this.http.post(`${SERVICE}/${this.classe}/atualizaApostas`, JSON.stringify(apostas))
            .toPromise()
            .then(res => <boolean>res.json())
            .then(data => {
                return data
            })
    }
}

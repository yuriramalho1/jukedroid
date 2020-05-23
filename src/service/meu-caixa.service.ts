import { Injectable } from "@angular/core"
import { Http } from "@angular/http"

import { SERVICE } from './app.api'
import { ID_BANCA } from "./app.api";
import { Resumo } from "../model/resumo.model";

@Injectable()
export class MeuCaixaService {
    exibeRanking : boolean = true

    private classe : string = 'banca'

    constructor(protected http: Http) {}

    getMeuCaixa(idUsuario : number, tipoUsuario : string, dataInicial?,dataFinal? : string){
      let jsonComDatas = '';

      if(dataInicial && dataFinal){
        jsonComDatas = '</>' + dataInicial + '</>' + dataFinal;
      }

      return this.http.post(`${SERVICE}/${this.classe}/getMeuCaixa`, (String(ID_BANCA) + '</>' + String(idUsuario) + '</>' + tipoUsuario + jsonComDatas))
          .toPromise()
          .then(res => <Resumo>res.json())
          .then(data => {
              return data
          })
    }

    fecharCaixa(){
      return this.http.post(`${SERVICE}/${this.classe}/fecharCaixa`, ID_BANCA)
          .toPromise()
          .then(res => <Resumo>res.json())
          .then(data => {
              return data
          })
    }
}

import { Injectable } from "@angular/core";
import { Configuracao } from "../model/configuracao.model";
import { Banca } from "../model/banca.model";
import { Usuario } from "../model/usuario.model";
import { Http } from "@angular/http";

import { SERVICE } from './app.api'
import { ID_BANCA } from "./app.api";

@Injectable()
export class ConfiguracaoService{
    private classe : string = 'configuracao'

    configuracaoPrincipal : Configuracao;

    constructor(protected http: Http) {

    }

    salvar(configuracao: Configuracao) {
      if(!configuracao.banca || configuracao.banca.id == 0){
        let banca = new Banca();
        banca.id  = ID_BANCA;

        configuracao.banca = banca;
      }

      return this.http.post(`${SERVICE}/${this.classe}/salvar`, JSON.stringify(configuracao))
          .toPromise()
          .then(res => <Configuracao>res.json())
          .then(data => {
              return data
          })
    }

    excluir(configuracao: Configuracao) {
      return this.http.post(`${SERVICE}/${this.classe}/excluir`, JSON.stringify(configuracao))
          .toPromise()
          .then(res => <Configuracao>res.json())
          .then(data => {
              return data
          })
    }

    getTodasConfig(){
        return this.http.post(`${SERVICE}/${this.classe}/getTodasConfig`, ID_BANCA)
            .toPromise()
            .then(res => <Configuracao[]>res.json())
            .then(data => {
                return data
            })
    }

    getUsuariosConfig(config: Configuracao){
        return this.http.post(`${SERVICE}/${this.classe}/getUsuariosConfig`, JSON.stringify(config))
            .toPromise()
            .then(res => <Usuario[]>res.json())
            .then(data => {
                return data
            })
    }

    salvarUsuariosConfig(listaUsuario: Usuario[]){
      return this.http.post(`${SERVICE}/${this.classe}/salvarUsuariosConfig`, JSON.stringify(listaUsuario))
          .toPromise()
          .then(res => <Usuario[]>res.json())
          .then(data => {
              return data
          })
    }

    getConfiguracaoPadrao() {
      return this.http.post(`${SERVICE}/${this.classe}/getConfiguracaoPadrao`, ID_BANCA)
          .toPromise()
          .then(res => <Configuracao>res.json())
          .then(data => {
              return data;
          })
    }

}

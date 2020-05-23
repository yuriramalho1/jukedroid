import { Injectable } from "@angular/core"
import { Http } from "@angular/http"
import { SERVICE } from './app.api'
import { ID_BANCA } from "./app.api";
import { Banca } from "../model/banca.model";
import { Usuario } from "../model/usuario.model";
import { MovimentacaoFinanceira } from "../model/movimentacao-financeira.model";

@Injectable()
export class BancaService {
    classe: string = 'banca'

    public banca : Banca;

    constructor(protected http: Http) {
      this.banca = new Banca();
      
      this.getBancaAtual().then(banca =>{
        this.banca = banca;
      });
    }

    atualizarConfigBanca(banca: Banca) {
        return this.http.post(`${SERVICE}/${this.classe}/atualizarConfigBanca`, JSON.stringify(banca))
            .toPromise()
            .then(res => <Banca>res.json())
            .then(data => {
                return data
            })
    }

    getBancaAtual(){
      return this.http.post(`${SERVICE}/${this.classe}/getBancaAtual`, ID_BANCA)
          .toPromise()
          .then(res => <Banca>res.json())
          .then(data => {
              return data
          })
    }

    isAtualizandoBanca(){
      return this.http.post(`${SERVICE}/${this.classe}/isAtualizandoBanca`, ID_BANCA)
          .toPromise()
          .then(res => <Boolean>res.json())
          .then(data => {
              return data
          })
    }

    isSuspenderAoVivo(){
      return this.http.post(`${SERVICE}/${this.classe}/isSuspenderAoVivo`, ID_BANCA)
          .toPromise()
          .then(res => <Boolean>res.json())
          .then(data => {
              return data
          })
    }

    getTodosTiposMovimentacaoFinanceira(){
      return this.http.post(`${SERVICE}/${this.classe}/getTodosTiposMovimentacaoFinanceira`, '')
          .toPromise()
          .then(res => <any>res.json())
          .then(data => {
              return data
          })
    }

    getMovimentacaoFinanceira(usuario: Usuario, dataInicio, dataFinal : string){
      return this.http.post(`${SERVICE}/${this.classe}/getTodosTiposMovimentacaoFinanceira`, JSON.stringify(usuario.id) + '</>' + dataInicio + '</>' + dataFinal)
          .toPromise()
          .then(res => <MovimentacaoFinanceira[]>res.json())
          .then(data => {
              return data
          })
    }

    tipoMovimentacaoFinanceira(tipo : string, css?: boolean, icon?: boolean) : string{
      let retorno : string;

      switch(tipo){
        case "CREDITO"                  : { retorno = "Crédito";                     break; }
        case "DEBITO"                   : { retorno = "Débito";                      break; }
        case "DEBITO_BILHETE"           : { retorno = "Débito - Aposta Realizada";   break; }
        case "CREDITO_BILHETE_VENCEDOR" : { retorno = "Crédito - Aposta Vencedora";  break; }
        case "CREDITO_BILHETE_CANCELADO": { retorno = "Crédito - Bilhete Cancelado"; break; }
      }

      if(css){
        switch(tipo){
          case "CREDITO"                  : { retorno = "verde";    break; }
          case "DEBITO"                   : { retorno = "vermelho"; break; }
          case "DEBITO_BILHETE"           : { retorno = "vermelho"; break; }
          case "CREDITO_BILHETE_VENCEDOR" : { retorno = "verde";    break; }
          case "CREDITO_BILHETE_CANCELADO": { retorno = "laranja";  break; }
        }
      }

      if(icon){
        switch(tipo){
          case "CREDITO"                  : { retorno = "fa-arrow-circle-up";    break; }
          case "DEBITO"                   : { retorno = "fa-arrow-circle-down"; break; }
          case "DEBITO_BILHETE"           : { retorno = "fa-arrow-circle-down"; break; }
          case "CREDITO_BILHETE_VENCEDOR" : { retorno = "fa-arrow-circle-up";    break; }
          case "CREDITO_BILHETE_CANCELADO": { retorno = "fa-arrow-circle-down";  break; }
        }
      }

      return retorno;
    }

}

import { Injectable } from "@angular/core"
import { Conta } from "../model/conta.model"
import { Http } from "@angular/http"

import { SERVICE } from './app.api'
import { ID_BANCA } from "./app.api";

@Injectable()
export class ContaService{
  conta: Conta;
  private classe : string = 'conta'

  constructor(protected http: Http) {}

  atualizarSaldo(conta: Conta) {
      return this.http.post(`${SERVICE}/${this.classe}/atualizarSaldo`, JSON.stringify(conta))
          .toPromise()
          .then(res => <Conta>res.json())
          .then(data => {
              return data
          })
  }

  atualizarConta(conta: Conta) {
      return this.http.post(`${SERVICE}/${this.classe}/atualizarConta`, JSON.stringify(conta))
          .toPromise()
          .then(res => <Conta>res.json())
          .then(data => {
              return data
          })
  }
}

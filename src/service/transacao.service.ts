import { Injectable } from "@angular/core"
import { Http } from "@angular/http"

import { SERVICE } from './app.api'
import { ID_BANCA } from "./app.api";
import { Transacao } from "../model/transacao.model";
import { Lancamento } from "../model/lancamento.model";
import { Usuario } from "../model/usuario.model";

@Injectable()
export class TransacaoService {
    classe: string = 'banca'

    constructor(protected http: Http) { }

    salvarTransacao(transacao: Transacao) {
        return this.http.post(`${SERVICE}/${this.classe}/salvarTransacao`, JSON.stringify(transacao))
            .toPromise()
            .then(res => <Transacao>res.json())
            .then(data => {
                return data
            })
    }

    addCredito(lancamento: Lancamento) {
        return this.http.post(`${SERVICE}/${this.classe}/addCredito`, JSON.stringify(lancamento))
            .toPromise()
            .then(res => <Lancamento>res.json())
            .then(data => {
                return data
            })
    }

    getDescricaoLancamentoMovimentoCreditoCambistaGerente(idUsuario: number){
        return this.http.post(`${SERVICE}/${this.classe}/tipoDescricaoLancamentoMovimentoCreditoCambistaGerente`, idUsuario)
            .toPromise()
            .then(res => <any>res.json())
            .then(data => {
                return data
            })
    }

    upload(formData) {
        return this.http.post(`${SERVICE}/${this.classe}/uploadTransacaoImagem`, formData)
            .toPromise()
            .then(res => res.json())
            .then(data => { return data; })
    }

    getImage(id: number): string {
        return `${SERVICE}/${this.classe}/transacaoImage/${id}`
    }

    getExtrato(usuario : Usuario){
        return this.http.post(`${SERVICE}/${this.classe}/getExtrato`, usuario.id)
            .toPromise()
            .then(res => <Transacao[]>res.json())
            .then(data => {
                return data
            })
    }

    getTransacoes(){
        return this.http.post(`${SERVICE}/${this.classe}/getTransacoes`, ID_BANCA)
            .toPromise()
            .then(res => <Transacao[]>res.json())
            .then(data => {
                return data
            })
    }

    getTransacoesPendentes(){
        return this.http.post(`${SERVICE}/${this.classe}/getTransacoesPendentes`, ID_BANCA)
            .toPromise()
            .then(res => <Transacao[]>res.json())
            .then(data => {
                return data
            })
    }

    atualizaTransacoes(transacoes : Transacao[]){
        return this.http.post(`${SERVICE}/${this.classe}/atualizaTransacoes`, JSON.stringify(transacoes))
            .toPromise()
            .then(res => <boolean>res.json())
            .then(data => {
                return data
            })
    }


    descricaoLancamento(chave: string): string{
      let retorno = '';

      switch(chave){
        case "DEPOSITO_CLIENTE"    :{retorno = "Depósito do Cliente"; break;}
        case "CREDITO_CAMBISTA"    :{retorno = "Crédito no Saldo do Cambista/Gerente"; break;}
        case "SAQUE_CLIENTE"       :{retorno = "Saque do Cliente"; break;}
        case "BILHETE"             :{retorno = "Bilhete"; break;}
        case "PAGAMENTO_CLIENTE"   :{retorno = "Pagamento ao Cliente"; break;}
        case "CANCELAMENTO_BILHETE":{retorno = "Cancelamento do Bilhete"; break;}
        case "DEBITO"              :{retorno = "Débito"; break;}
        case "CREDITO"             :{retorno = "Crédito"; break;}
        case "SAQUE_BANCA"         :{retorno = "Saque da Banca"; break;}
        case "REPOSICAO_CAMBISTA"  :{retorno = "Reposição de Crédito para o Cambista"; break;}
        case "REPOSICAO_GERENTE"   :{retorno = "Reposição de Crédito para o Gerente"; break;}
        case "REPOSICAO_BANCA"     :{retorno = "Reposição de Crédito para a Banca"; break;}
        case "DEBITO_CAMBISTA"     :{retorno = "Débito no Saldo do Cambista/Gerente"; break;}
      }

      return retorno;
    }
}

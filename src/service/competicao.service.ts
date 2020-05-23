import { Injectable } from "@angular/core"
import { Http } from "@angular/http"

import { SERVICE } from './app.api'
import { ID_BANCA } from "./app.api";
import { Competicao } from "../model/competicao.model";
import { Partida } from "../model/partida.model";
import { Usuario } from "../model/usuario.model";
import { Regiao } from "../model/regiao.model";
import { Util } from "../providers/util";

@Injectable()
export class CompeticaoService{
    classe : string = 'futebol'

    private util : Util = new Util();

    constructor(protected http: Http) {}

    listaCompeticoesPorTipo(tipoCompeticao : string) {
      return this.http.post(`${SERVICE}/${this.classe}/competicoesPorTipo`, tipoCompeticao)
          .toPromise()
          .then(res => <Competicao[]>res.json())
          .then(data => {
              return data
          })
    }

    listaTodasCompeticoes(){
      return this.http.post(`${SERVICE}/${this.classe}/competicoesPorTipoGeral`, ID_BANCA)
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

    getRegiao() {
        return this.http.post(`${SERVICE}/${this.classe}/getRegiao`, ID_BANCA)
            .toPromise()
            .then(res => <Regiao[]>res.json())
            .then(data => {
                return data
            })
    }

    isAtualizando(){
      return this.http.post(`${SERVICE}/${this.classe}/isAtualizando`, '')
          .toPromise()
          .then(res => <Boolean>res.json())
          .then(data => {
              return data
          })
    }

    jogosDoDiaPorCompeticao(usuario: Usuario, competicao: Competicao){
      return this.http.post(`${SERVICE}/${this.classe}/jogosDoDiaPorCompeticao`, JSON.stringify(competicao) + '</>' + JSON.stringify(usuario.id))
          .toPromise()
          .then(res => <Partida[]>res.json())
          .then(data => {
              return data
          })
    }

    prepareJogosDoDia(partidas : Partida[]){
      let competicaoJogosDia : Competicao[] = [];
      let ultimaCompeticao   : string;
      for(let partida of partidas){
        if(partida.competicao.descricao != ultimaCompeticao){
          competicaoJogosDia.push(partida.competicao);
          if(!competicaoJogosDia[competicaoJogosDia.length - 1].listaPartidas){
            competicaoJogosDia[competicaoJogosDia.length - 1].listaPartidas = [];
          }
          competicaoJogosDia[competicaoJogosDia.length - 1].listaPartidas.push(partida);
        }else{
          competicaoJogosDia[competicaoJogosDia.length - 1].listaPartidas.push(partida);
        }

        ultimaCompeticao = partida.competicao.descricao;
      }
      return competicaoJogosDia;
    }

    getImagemRegiao(regiao : string): string {
        if(regiao){
          regiao = this.util.removeAcento(regiao);
          regiao = regiao.replace(/ /gi, "-");
        }

        return `${SERVICE}/${this.classe}/imagemRegiao/${regiao}`
    }
}

import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { SERVICE } from "./app.api";
import { ID_BANCA } from "./app.api";
import { PartidaAoVivo } from "../model/partida-aovivo.model";
import { Market } from "../model/partida-aovivo.model";
import { Bilhete } from "../model/bilhete.model";
import { Aposta } from "../model/aposta.model";

@Injectable()
export class AoVivoService{
    classe              : string = 'futebol'
    partidas            : PartidaAoVivo[] = [];
    req                 : any;
    listaAtualizada     : Aposta[];
    ultimaTentativa     : Date;
    partidasAtualizadas : PartidaAoVivo[] = []

    constructor(protected http: Http) {

    }

    getPartidasAoVivo(){
        return this.http.post(`${SERVICE}/${this.classe}/futebolAoVivo`, ID_BANCA)
            .toPromise()
            .then(res => <PartidaAoVivo[]>res.json())
            .then(data => {
                return data
            })
    }

    isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

    getPartidas(){
      this.req = setInterval(() =>{
        this.getPartidasAoVivo().then(partidas =>{
          if(partidas.length > 0 && !this.isEmpty(partidas[0].event)){
            this.partidas = partidas;
          }
        });
      }, 2000);
    }

    getPartida(eventId: string){
      return this.http.post(`${SERVICE}/${this.classe}/partidaAoVivo`, String(ID_BANCA) + '</>' + eventId)
          .toPromise()
          .then(res => <PartidaAoVivo[]>res.json())
          .then(data => {
              return data
          })
    }

    habilitarDesabilitarPartida(eventId: string){
      return this.http.post(`${SERVICE}/${this.classe}/habilitarDesabilitarPartida`, (eventId + ';' + String(ID_BANCA)))
          .toPromise()
          .then(res => <PartidaAoVivo>res.json())
          .then(data => {
              return data
          })
    }

    editarHorarioPartida(eventId: string, data, horario){
      return this.http.post(`${SERVICE}/${this.classe}/editarHorarioPartida`, JSON.stringify(eventId + '</>' + String(data) + '</>' + String(horario)))
          .toPromise()
          .then(res => <any>res.json())
          .then(data => {
              return data
          })
    }

    validaBilheteAoVivo(bilhete: Bilhete) : boolean {
      let retorno = false;
      this.listaAtualizada = [];

      if(bilhete.listaApostas.length > 0){
        for(let partida of this.partidasAtualizadas){
          if(!partida.event.Markets){
            partida.event.Markets = [];
            partida.event.Markets.push(partida.event.MainMarket);
          }

          for (let i = 0; i < bilhete.listaApostas.length; i++){
            for(let market of partida.event.Markets){
              for(let result of market.Results){
                if(bilhete.listaApostas[i].partidaAoVivo){
                  if(result.Id == bilhete.listaApostas[i].result.Id){
                    if(result.Visible){
                      bilhete.listaApostas[i].oddsDesatualizado = false;

                      if(result.Odds != bilhete.listaApostas[i].result.Odds){
                        bilhete.listaApostas[i].oddsDesatualizado = true;
                        retorno                                   = true;
                        bilhete.listaApostas[i].oddsAtualizado    = result.Odds;
                      }
                      this.listaAtualizada.push(bilhete.listaApostas[i]);
                    }else{
                      bilhete.listaApostas[i].result.Visible = false;
                    }
                  }
                }
              }
            }
          }
        }
      }


      if(bilhete.listaApostas.length != this.listaAtualizada.length){
        retorno = true;
      }

      return retorno
    }

    atualizaResultsBilhete(bilhete: Bilhete){
      if(bilhete.listaApostas.length != this.listaAtualizada.length){
        bilhete.listaApostas = this.listaAtualizada;
      }

      if(bilhete.listaApostas.length > 0){
        for(let partida of this.partidasAtualizadas){
          if(!partida.event.Markets){
            partida.event.Markets = [];
            partida.event.Markets.push(partida.event.MainMarket);
          }
          for(let market of partida.event.Markets){
            for(let result of market.Results){
              for (let i = 0; i < bilhete.listaApostas.length; i++){
                if(bilhete.listaApostas[i].partidaAoVivo){
                  if(result.Id == bilhete.listaApostas[i].result.Id && result.Visible){
                     bilhete.listaApostas[i].result.Odds       = result.Odds;
                     bilhete.listaApostas[i].oddsAtualizado    = result.Odds;
                     bilhete.listaApostas[i].oddsDesatualizado = false;
                     bilhete.listaApostas[i].cotacaoAposta     = result.Odds;
                  }
                }
              }
            }
          }
        }
      }

      this.ultimaTentativa = new Date();
    }

}

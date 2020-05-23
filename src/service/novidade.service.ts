import { Injectable } from "@angular/core"
import { Notificacao } from "../model/notificacao.model"
import { Http } from "@angular/http"
import { Storage } from '@ionic/storage';
import { SERVICE } from './app.api'
import { ID_BANCA } from "./app.api";


@Injectable()
export class NovidadeService{
  private classe: string = 'banca'
  public novidadesNaoVisualizadas: number;
  constructor(protected http: Http, public storage : Storage) {}

  getNovidades(){
      return this.http.post(`${SERVICE}/${this.classe}/getNovidades`, ID_BANCA)
          .toPromise()
          .then(res => <Notificacao[]>res.json())
          .then(data => {
              return data
          })
  }

  getImage(id: number): string {
      return `${SERVICE}/${this.classe}/novidadeImage/${id}`
  }

  getNovidadesNaoVisualizadas(){
    let retorno = 0;

    return this.getNovidades().then(lista =>{
      return this.storage.get('notificacoesVisualizadas').then(visualizadas =>{
        if(visualizadas){
          for (let i = 0; i < lista.length; i++) {
            if(visualizadas[i] == undefined){
              retorno++;
            }

            if(visualizadas[i] != undefined && lista[i].id != visualizadas[i].id){
              retorno++;
            };
          }
        }else{
          retorno = lista.length;
        }

        this.novidadesNaoVisualizadas = retorno;
      }).then(retorno =>{return this.novidadesNaoVisualizadas});
    }).then(retorno =>{return this.novidadesNaoVisualizadas})

  }
}

import { Injectable } from "@angular/core"
import { Http } from "@angular/http"
import { SERVICE } from './app.api'
import { ID_BANCA } from "./app.api";
import { Time } from "../model/time.model";
import { Bolao } from "../model/bolao.model";
import { Bilhete } from "../model/bilhete.model";
import { EventoBolao } from "../model/evento-bolao.model";
import { Usuario } from "../model/usuario.model";
import { Banca } from "../model/banca.model";
import { Aposta } from "../model/aposta.model";
import { Util } from "../providers/util";


@Injectable()
export class BolaoService{

  private classe       : string  = 'bolao';
  private bilheteBolao : Bilhete = new Bilhete();
  private util         : Util    = new Util();

  constructor(protected http: Http) {

  }

  todosTimes(){
      return this.http.post(`${SERVICE}/${this.classe}/todosTimes`, '')
          .toPromise()
          .then(res => <Time[]>res.json())
          .then(data => {
              return data
          })
  }

  cadastrarBolao(bolao: Bolao){
    return this.http.post(`${SERVICE}/${this.classe}/cadastrarBolao`, JSON.stringify(bolao))
        .toPromise()
        .then(res => <Bolao>res.json())
        .then(data => {
            return data
        })
  }

  desativarBolao(bolao: Bolao){
    return this.http.post(`${SERVICE}/${this.classe}/desativarBolao`, JSON.stringify(bolao))
        .toPromise()
        .then(res => <Bolao>res.json())
        .then(data => {
            return data
        })
  }

  cadastrarBilheteBolao(){
    return this.http.post(`${SERVICE}/${this.classe}/cadastrarBilheteBolao`, JSON.stringify(this.bilheteBolao))
        .toPromise()
        .then(res => <any>res.json())
        .then(data => {
            return data
        })
  }

  premiarBolao(bolao: Bolao){
    return this.http.post(`${SERVICE}/${this.classe}/premiarBolao`, JSON.stringify(bolao))
        .toPromise()
        .then(res => <any>res.json())
        .then(data => {
            return data
        })
  }

  getListaBolao(tipoBolao: string, encerrado: boolean){
    return this.http.post(`${SERVICE}/${this.classe}/getListaBolao`, JSON.stringify(tipoBolao) + '</>' + JSON.stringify(encerrado) + '</>' + ID_BANCA)
        .toPromise()
        .then(res => <Bolao[]>res.json())
        .then(data => {
            return data
        })
  }

  getPalpiteBolao(bolao: Bolao){
    return this.http.post(`${SERVICE}/${this.classe}/getPalpiteBolao`, JSON.stringify(bolao))
        .toPromise()
        .then(res => <Aposta[]>res.json())
        .then(data => {
            return data
        })
  }

  getVencedoresBolao(bolao: Bolao){
    return this.http.post(`${SERVICE}/${this.classe}/getVencedoresBolao`, JSON.stringify(bolao))
        .toPromise()
        .then(res => <Bilhete[]>res.json())
        .then(data => {
            return data
        })
  }

  getBilheteBolao(): Bilhete{
    if (this.bilheteBolao.listaApostas == undefined){
        this.bilheteBolao.listaApostas = []
    }

    return this.bilheteBolao;
  }

  newBilhete(){
    this.bilheteBolao          = new Bilhete();
    this.bilheteBolao.banca    = new Banca();
    this.bilheteBolao.banca.id = ID_BANCA;
  }

  setPossivelRetorno(premio: number, valorBilhete: number){
    this.bilheteBolao.valorPossivelRetorno = premio;
    this.bilheteBolao.valor                = valorBilhete;
  }

  setPremiosMultiplos(premio2:number, premio3:number){
    this.bilheteBolao.valorPremioDois = premio2;
    this.bilheteBolao.valorPremioTres = premio3;
  }

  setBilheteBolao(bolao: Bolao){
    this.bilheteBolao.bolao = bolao;
  }

  setCliente(cliente : Usuario){
      this.bilheteBolao.cliente = cliente;
  }

  setNomeCliente(nome : string){
      this.bilheteBolao.clienteNome = nome;
  }

  setUsuario(usuario : Usuario){
      this.bilheteBolao.usuarioSessao = usuario;
      this.bilheteBolao.usuario       = usuario;
  }

  setStatusBilhete(statusBilhete : string){
      this.bilheteBolao.statusBilhete = statusBilhete;
  }

  setBilheteSimulacao(bilhete: Bilhete, usuarioFinalizacao: Usuario){
    this.bilheteBolao         = bilhete;
    this.bilheteBolao.usuario = usuarioFinalizacao;
  }

  removeApostaPartida(partida: EventoBolao){
    if(partida){
      for (let i = 0; i < this.bilheteBolao.listaApostas.length; i++) {
          if(this.bilheteBolao.listaApostas[i].evento == `${partida.timeCasa.nome} x ${partida.timeFora.nome}`){
            this.bilheteBolao.listaApostas.splice(i, 1);
          }
      }
    }
  }

  statusBilhete(status: string): string{
    let retorno : string = "";

    switch(status){
      case 'EM_ABERTO':{ retorno = "Em Aberto"}; break;
      case 'CANCELADO_PELO_ADMINISTRADOR': { retorno = "Cancelado"}; break;
      case 'CONCLUIDO': {retorno = "Concluído"}; break;
    }

    return retorno;
  }

  getImagemTime(regiao : string, time: string): string {
      regiao = this.util.removeAcento(regiao);
      time   = this.util.removeAcento(time);

      return `${SERVICE}/${this.classe}/imagemEscudo/${regiao}/${time}`
  }

  getImagemRegraBolao(): string{
    return `${SERVICE}/${this.classe}/imagemRegraBolao`
  }

  verificarAposta(partida: EventoBolao, escolha: string): boolean{
    let resultado = false;

    for (let aposta of this.bilheteBolao.listaApostas){
      if(aposta.escolha == escolha && aposta.evento == `${partida.timeCasa.nome} x ${partida.timeFora.nome}`){
        resultado = true
      }
    }

    return resultado
  }

}

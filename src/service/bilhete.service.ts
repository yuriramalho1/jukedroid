import { Injectable } from "@angular/core"

import { Bilhete } from "../model/bilhete.model";
import { Aposta } from "../model/aposta.model";
import { Banca } from "../model/banca.model";
import { Partida } from "../model/partida.model";
import { PartidaAoVivo } from '../model/partida-aovivo.model';
import { Http } from "@angular/http";
import { SERVICE } from "./app.api";
import { ID_BANCA } from "./app.api";
import { Usuario } from "../model/usuario.model";
import { SocialSharing } from "@ionic-native/social-sharing";
import { Lancamento } from "../model/lancamento.model";
import { BancaService } from "./banca.service";
import { ConfiguracaoService } from "./configuracao.service";

@Injectable()
export class BilheteService{
    classe : string = 'banca'
    private bilhete : Bilhete
    private usuario : Usuario;
    public banca   : Banca = new Banca();

    filtroUsuario  : string = ''
    filtroNumero   : string = ''
    filtroStatus   : string = ''
    filtroTipo     : string = ''
    filtroCodigo   : number = undefined

    constructor(protected http: Http, private socialSharing: SocialSharing, private bancaService : BancaService,
                public configService: ConfiguracaoService) {
      this.bancaService.getBancaAtual().then(banca =>{
        if(banca){
          this.banca = banca;
        }
      });
    }

    setUsuario(usuario : Usuario){
        this.bilhete.usuarioSessao = usuario
        this.bilhete.usuario = usuario
    }

    setStatusBilhete(statusBilhete : string){
        this.bilhete.statusBilhete = statusBilhete;
    }

    setCliente(cliente : Usuario){
        this.bilhete.cliente = cliente
    }

    setNomeCliente(nome : string){
        this.bilhete.clienteNome = nome
    }

    setBilhete(bilhete : Bilhete){
      this.bilhete = bilhete;
    }

    salvarBilhete(){
      let bancaAtual : Banca = new Banca();
      bancaAtual.id = ID_BANCA;
      this.bilhete.banca = bancaAtual;

        return this.http.post(`${SERVICE}/${this.classe}/salvarBilhete`, JSON.stringify(this.bilhete))
            .toPromise()
            .then(res => <any>res.json())
            .then(data => {
                return data
            })
    }

    compartilharSimulacao(bilhete: Bilhete){
      this.socialSharing.share((bilhete.banca.nome ? bilhete.banca.nome : '') + ' Simulação: '+ bilhete.id, '', '','').then(() => {
          // Success!
        }).catch(() => {
          // Error!
        });
    }

    compartilharLink(bilhete: Bilhete){
      this.socialSharing.share((bilhete.banca.nome ? bilhete.banca.nome : '') + ' Link do Bilhete:', '', '',"http://i3esportes.com/puleApuracao?mainPule=" + String(bilhete.id)).then(() => {
          // Success!
        }).catch(() => {
          // Error!
        });
    }

    getBilhetesByUsuario(usuario : Usuario, dataInicio, dataFinal : string){
        return this.http.post(`${SERVICE}/${this.classe}/getBilhetesByUsuario`, JSON.stringify(usuario) + '</>' + dataInicio + '</>' + dataFinal)
            .toPromise()
            .then(res => <Bilhete[]>res.json())
            .then(data => {
                return data
            })
    }

    getBilheteById(id : number){
        return this.http.post(`${SERVICE}/${this.classe}/getBilheteById`, id)
            .toPromise()
            .then(res => <Bilhete>res.json())
            .then(data => {
                return data
            })
    }

    getBilhetesByExemplo(bilheteExemplo : Bilhete){
        return this.http.post(`${SERVICE}/${this.classe}/getBilhetesByExemplo`, JSON.stringify(bilheteExemplo))
            .toPromise()
            .then(res => <Bilhete[]>res.json())
            .then(data => {
                return data
            })
    }

    getBilhetesSimulados(idBilhete : number = 0){
        return this.http.post(`${SERVICE}/${this.classe}/getBilhetesSimulados`, (String(ID_BANCA) + ';' + String(idBilhete)))
            .toPromise()
            .then(res => <Bilhete[]>res.json())
            .then(data => {
                return data
            })
    }

    lancamentoManual(lancamento : Lancamento){
        return this.http.post(`${SERVICE}/${this.classe}/lancamentoManual`, JSON.stringify(lancamento))
            .toPromise()
            .then(res => <boolean>res.json())
            .then(data => {
                return data
            })
    }

    getBilhetesPendentes(){
        return this.http.post(`${SERVICE}/${this.classe}/getBilhetesPendentes`, ID_BANCA)
            .toPromise()
            .then(res => <Bilhete[]>res.json())
            .then(data => {
                return data
            })
    }

    getTodosBilhetes(dataInical, dataFinal : string){
        return this.http.post(`${SERVICE}/${this.classe}/getTodosBilhetes`, (String(ID_BANCA) + '</>' + String(dataInical) + '</>' + String(dataFinal)))
            .toPromise()
            .then(res => <Bilhete[]>res.json())
            .then(data => {
                return data
            })
    }

    getApostaBilhete(bilhete : Bilhete){
        return this.http.post(`${SERVICE}/${this.classe}/getApostaBilhete`, JSON.stringify(bilhete))
            .toPromise()
            .then(res => <Aposta[]>res.json())
            .then(data => {
                return data
            })
    }

    finalizarBilhete(bilhete : Bilhete){
      let bancaAtual = new Banca();
      bancaAtual.id = ID_BANCA;

      bilhete.banca = bancaAtual;
        return this.http.post(`${SERVICE}/${this.classe}/finalizarBilhete`, JSON.stringify(bilhete))
            .toPromise()
            .then(res => <Bilhete>res.json())
            .then(data => {
                return data
            })
    }

    finalizarTodos(bilhetes : Bilhete[]){
        return this.http.post(`${SERVICE}/${this.classe}/finalizarTodosBilhetes`, JSON.stringify(bilhetes))
            .toPromise()
            .then(res => <Bilhete[]>res.json())
            .then(data => {
                return data
            })
    }

    cancelarBilhete(bilhete : Bilhete, usuario : Usuario){
        return this.http.post(`${SERVICE}/${this.classe}/cancelarBilhete`, (JSON.stringify(bilhete) + '</>' + JSON.stringify(usuario)))
            .toPromise()
            .then(res => <Bilhete>res.json())
            .then(data => {
                return data
            })
    }

    getBilhete() : Bilhete{
        if (this.bilhete == undefined){
            this.bilhete = new Bilhete()
        }

        if (this.bilhete.listaApostas == undefined){
            this.bilhete.listaApostas = []
        }

        return this.bilhete;
    }

    addAposta(aposta : Aposta){
        this.getBilhete().listaApostas.push(aposta);

        this.getCotacao();
        this.validaBilhete();
    }

    verificarPartida(partida : Partida) : boolean{
        let resultado = false

        for(let aposta of this.bilhete.listaApostas){
          if(aposta.partida){
            if(aposta.partida.id == partida.id){
                resultado = true
            }
          }
        }

        return resultado
    }

    verificarPartidaAoVivo(partidaAoVivo : PartidaAoVivo) : boolean{
        let resultado = false

        for(let aposta of this.bilhete.listaApostas){
          if(aposta.partidaAoVivo){
            if(aposta.partidaAoVivo.eventId == partidaAoVivo.eventId){
                resultado = true
            }
          }
        }

        return resultado
    }

    verificarAposta(partida : Partida, escolha : number, semEmpate? :boolean) : boolean{
        let resultado = false;

        if(semEmpate && escolha == 1){
          escolha = 2;
        }

        for (let aposta of this.bilhete.listaApostas){
          if(aposta.partida){
            if (aposta.partida.id == partida.id && aposta.escolha == partida.timeCasa && escolha == 0){
              resultado = true
            }

            if (aposta.partida.id == partida.id && aposta.escolha == "Empate" && escolha == 1){
              resultado = true
            }

            if (aposta.partida.id == partida.id && aposta.escolha == partida.timeFora && escolha == 2){
              resultado = true
            }
          }
        }

        return resultado
    }

    verificarApostaMaisOpcoes(partida : Partida, escolha : string) : boolean{
        let resultado = false

        for (let aposta of this.bilhete.listaApostas){
          if(aposta.partida){
            if (aposta.partida.id == partida.id && aposta.escolha == escolha){
              resultado = true
            }
          }
        }

        return resultado
    }

    verificarApostaMaisOpcoesAoVivo(partida : PartidaAoVivo,  escolha: string, tipoAposta : string) : boolean{
      let resultado = false;

      for(let aposta of this.bilhete.listaApostas){
        if(aposta.partidaAoVivo){
          if(aposta.partidaAoVivo.eventId == partida.eventId && aposta.escolha == escolha && aposta.tipoAposta == tipoAposta){
            resultado = true;
          }
        }
      }

      return resultado;
    }

    verificarApostaAoVivo(partidaAoVivo : PartidaAoVivo, escolha : number, tipoAposta : string) : boolean{
        let resultado = false

        for (let aposta of this.bilhete.listaApostas){
            if(aposta.partidaAoVivo){
              if (aposta.partidaAoVivo.eventId == partidaAoVivo.eventId && aposta.escolha == partidaAoVivo.event.Player1 && escolha == 0 && aposta.tipoAposta == tipoAposta){
                resultado = true
              }
              if (aposta.partidaAoVivo.eventId == partidaAoVivo.eventId && aposta.escolha == "X" && escolha == 1 && aposta.tipoAposta == tipoAposta){
                resultado = true
              }
              if (aposta.partidaAoVivo.eventId == partidaAoVivo.eventId && aposta.escolha == partidaAoVivo.event.Player2 && escolha == 2 && aposta.tipoAposta == tipoAposta){
                resultado = true
              }
            }
          }

        return resultado
    }

    public removeAposta(aposta : Aposta){
        let index = this.bilhete.listaApostas.indexOf(aposta, 0)

        if (index >= 0){
          this.bilhete.listaApostas.splice(index,1)
        }

        this.getCotacao();
        this.validaBilhete();
    }

    public removeApostaPorPartida(partida : Partida, escolha : number, semEmpate? : boolean){
        let aposta = this.getAposta(partida,escolha,semEmpate)

        this.removeAposta(aposta)
    }

    public removeApostaPorPartidaAoVivo(partidaAoVivo : PartidaAoVivo, escolha : number){
        let aposta = this.getApostaAoVivo(partidaAoVivo,escolha)

        this.removeAposta(aposta)
    }

    public removeApostaPorPartidaMaisOpcoes(partida : Partida, escolha : string){
        let aposta = this.getApostaMaisOpcoes(partida,escolha)

        this.removeAposta(aposta)
    }

    public removeApostaPorPartidaMaisOpcoesAoVivo(partida : PartidaAoVivo, escolha : string){
        let aposta = this.getApostaMaisOpcoesAoVivo(partida,escolha)

        this.removeAposta(aposta)
    }

    getAposta(partida : Partida, escolha : number, semEmpate? : boolean) : Aposta{
        let resultado : Aposta;

        if(semEmpate && escolha == 1){
          escolha = 2;
        }

        for (let aposta of this.bilhete.listaApostas){
            if (aposta.partida.id == partida.id && aposta.escolha == partida.timeCasa && escolha == 0){
              resultado = aposta
            }
            if (aposta.partida.id == partida.id && aposta.escolha == "Empate" && escolha == 1){
              resultado = aposta
            }
            if (aposta.partida.id == partida.id && aposta.escolha == partida.timeFora && escolha == 2){
              resultado = aposta
            }
          }

        return resultado
    }

    getApostaAoVivo(partidaAoVivo : PartidaAoVivo, escolha : number) : Aposta{
        let resultado : Aposta

        for (let aposta of this.bilhete.listaApostas){
            if (aposta.partidaAoVivo.eventId == partidaAoVivo.eventId && aposta.escolha == partidaAoVivo.event.Player1 && escolha == 0){
              resultado = aposta
            }
            if (aposta.partidaAoVivo.eventId == partidaAoVivo.eventId && aposta.escolha == "X" && escolha == 1){
              resultado = aposta
            }
            if (aposta.partidaAoVivo.eventId == partidaAoVivo.eventId && aposta.escolha == partidaAoVivo.event.Player2 && escolha == 2){
              resultado = aposta
            }
          }

        return resultado
    }

    getApostaMaisOpcoes(partida : Partida, escolha : string) : Aposta{
        let resultado : Aposta

        for (let aposta of this.bilhete.listaApostas){
            if (aposta.partida.id == partida.id && aposta.escolha == escolha){
              resultado = aposta
            }
          }

        return resultado
    }

    getApostaMaisOpcoesAoVivo(partida : PartidaAoVivo, escolha : string) : Aposta{
        let resultado : Aposta

        for (let aposta of this.bilhete.listaApostas){
            if (aposta.partidaAoVivo.eventId == partida.eventId && aposta.escolha == escolha){
              resultado = aposta
            }
        }

        return resultado
    }

    limparBilhete(){
        this.bilhete = new Bilhete()
        this.getBilhete()
    }

    public shareComprovante(bilhete : Bilhete){
        this.socialSharing.share('', '', `${SERVICE}/banca/image/${bilhete.id}`,'').then(() => {
            // Success!
          }).catch(() => {
            // Error!
          });
    }

    imprimirJogosDoDia(){
        return this.http.post(`${SERVICE}/${this.classe}/imprimirJogosDoDia`, '')
            .toPromise()
            .then(res => <Number[]>res.json())
            .then(data => {
                return data
            })
    }

    downloadImagemBilhete(bilhete: Bilhete){
      window.open(`${SERVICE}/banca/downloadImage/${bilhete.id}`);
    }

    getCotacao(): number {
      let cotacao: number = 0

      for (let aposta of this.bilhete.listaApostas) {
        if (cotacao == 0) {
          cotacao = aposta.cotacaoAposta
        } else {
          cotacao *= aposta.cotacaoAposta
        }
      }
      if(this.usuario && cotacao > this.configService.configuracaoPrincipal.limiteCotacao){
        cotacao = this.configService.configuracaoPrincipal.limiteCotacao;
      }
      this.bilhete.cotacaoTotal = cotacao
      this.bilhete.valorPossivelRetorno = (this.bilhete.valor * cotacao);

      return cotacao
    }

    validaBilhete(){
      let premioMaximo = this.getCotacao() * (this.bilhete.valor);

      if (premioMaximo > this.configService.configuracaoPrincipal.premioMaxCupom){
        premioMaximo = this.configService.configuracaoPrincipal.premioMaxCupom;
      }

      this.bilhete.valorPossivelRetorno = premioMaximo;
    }

    tipoPartidaBilhete(tipoPartida: string): string{
      let retorno : string = "";

      switch(tipoPartida){
        case 'PRE_JOGO'   :{ retorno = "Pré Jogo"}; break;
        case 'AO_VIVO'    :{ retorno = "Ao Vivo"}; break;
        case 'ACUMULADAO' :{ retorno = "Acumuladão"}; break;
        case 'BOLAO'      :{ retorno = "Bolão"}; break;
      }

      return retorno;
    }

    tipoBilhete(bilhete : Bilhete, css? : boolean) : string{
      let retorno : string = "";

      if(bilhete.statusBilhete == 'CANCELADO'){
        retorno = "Bilhete Cancelado";
      }

      switch(bilhete.tipoBilhete){
        case "BILHETE_PERDEDEDOR":{ retorno = "Bilhete Perdedor"; break;}
        case "BILHETE_CANCELADO" :{ retorno = "Bilhete Cancelado"; break;}
        case "BILHETE_VENCEDOR"  :{ retorno = "Bilhete Vencedor"; break;}
        default:{
          break;
        }
      }

      if(css){
        switch(bilhete.tipoBilhete){
          case "BILHETE_PERDEDEDOR":{ retorno = "vermelho"; break;}
          case "BILHETE_CANCELADO" :{ retorno = "azul"; break};
          case "BILHETE_VENCEDOR"  :{ retorno = "verde";break};
          default:{
            break;
          }
        }

        if(bilhete.statusBilhete == 'CANCELADO'){
          retorno = "azul";
        }
      }

      return retorno;
    }
}

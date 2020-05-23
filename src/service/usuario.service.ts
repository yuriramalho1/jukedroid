import { Injectable } from "@angular/core"
import { Usuario } from "../model/usuario.model"
import { Conta } from "../model/conta.model"
import { UsuarioComissao } from "../model/usuario-comissao.model"
import { GerenteCambista } from "../model/gerente-cambista.model"
import { CambistaCliente } from "../model/cambista-cliente.model"
import { Http } from "@angular/http"
import { ConfiguracaoService } from "./configuracao.service";

import { SERVICE } from './app.api'
import { ID_BANCA } from "./app.api";

@Injectable()
export class UsuarioService{
    public usuario: Usuario
    private classe : string = 'usuario'

    public versao : string = "2.6.1"

    constructor(protected http: Http, public configService: ConfiguracaoService) {
      this.usuario    = new Usuario();
      this.usuario.id = 0;
    }

    verificaVersao(){
        return this.http.post(`${SERVICE}/${this.classe}/verificaVersao`, this.versao + '</>' + String(ID_BANCA))
            .toPromise()
            .then(res => <boolean>res.json())
            .then(data => {
                return data
            })
    }

    existeEmail(usuario : Usuario){
        return this.http.post(`${SERVICE}/${this.classe}/existeEmail`, JSON.stringify(usuario))
            .toPromise()
            .then(res => <boolean>res.json())
            .then(data => {
                return data
            })
    }

    existeLogin(usuario : Usuario){
        return this.http.post(`${SERVICE}/${this.classe}/existeLogin`, JSON.stringify(usuario))
            .toPromise()
            .then(res => <boolean>res.json())
            .then(data => {
                return data
            })
    }

    existeCpf(usuario : Usuario){
        return this.http.post(`${SERVICE}/${this.classe}/existeCpf`, JSON.stringify(usuario))
            .toPromise()
            .then(res => <boolean>res.json())
            .then(data => {
                return data
            })
    }

    login(usuario: Usuario) {
        return this.http.post(`${SERVICE}/${this.classe}/login`, JSON.stringify(usuario))
            .toPromise()
            .then(res => <Usuario>res.json())
            .then(data => {
                this.usuario = data
                return data
            })
    }

    isAdmin(): boolean {
        if (this.usuario != undefined && this.usuario.usuarioAdministrador) {
            return true
        } else {
            return false
        }
    }

    visualizarFutebol(): boolean {
        if (this.usuario != undefined && !this.usuario.visualizaFutebol) {
            return false
        } else {
            return true
        }
    }

    visualizarBolao(): boolean {
        if (this.usuario != undefined && !this.usuario.visualizaBolao) {
            return false
        } else {
            return true
        }
    }

    visualizarAoVivo(): boolean {
        if (this.usuario != undefined && !this.usuario.visualizaAoVivo) {
            return false
        } else {
            return true
        }
    }

    visualizarTenis(): boolean {
        if (this.usuario != undefined && !this.usuario.visualizaTenis) {
            return false
        } else {
            return true
        }
    }

    visualizarCombate(): boolean {
        if (this.usuario != undefined && !this.usuario.visualizaCombate) {
            return false
        } else {
            return true
        }
    }

    visualizarNBA(): boolean {
        if (this.usuario != undefined && !this.usuario.visualizaNBA) {
            return false
        } else {
            return true
        }
    }

    isNotCliente() : boolean{
        if (this.usuario == undefined || this.usuario.tipoUsuario == 'CLIENTE'){
          return false
        } else{
          return true
        }
      }

    getAllClientes(){
        return this.http.post(`${SERVICE}/${this.classe}/getAllClientes`, ID_BANCA)
            .toPromise()
            .then(res => <Usuario[]>res.json())
            .then(data => {
                return data
            })
    }

    resetarSenha(usuario: Usuario){
        return this.http.post(`${SERVICE}/${this.classe}/resetarSenha`, usuario.id)
            .toPromise()
            .then(res => <Usuario[]>res.json())
            .then(data => {
                return data
            })
    }

    desativarUsuario(usuario: Usuario){
        return this.http.post(`${SERVICE}/${this.classe}/desativarUser`, usuario.id)
            .toPromise()
            .then(res => <Usuario[]>res.json())
            .then(data => {
                return data
            })
    }

    getAll(){
        return this.http.post(`${SERVICE}/${this.classe}/getAll`, ID_BANCA)
            .toPromise()
            .then(res => <Usuario[]>res.json())
            .then(data => {
                return data
            })
    }

    getCambistasGerente(idGerente : number){
        return this.http.post(`${SERVICE}/${this.classe}/getCambistasGerente`, idGerente)
            .toPromise()
            .then(res => <Usuario[]>res.json())
            .then(data => {
                return data
            })
    }

    getClientesCambista(idCambista : number){
      return this.http.post(`${SERVICE}/${this.classe}/getClientesCambista`, idCambista)
          .toPromise()
          .then(res => <Usuario[]>res.json())
          .then(data => {
              return data
          })
    }

    getCambistasSemGerente(){
      return this.http.post(`${SERVICE}/${this.classe}/getCambistasSemGerente`, ID_BANCA)
          .toPromise()
          .then(res => <Usuario[]>res.json())
          .then(data => {
              return data
          })
    }

    getClienteSemCambista(){
      return this.http.post(`${SERVICE}/${this.classe}/getClienteSemCambista`, ID_BANCA)
          .toPromise()
          .then(res => <Usuario[]>res.json())
          .then(data => {
              return data
          })
    }

    getTodosUsuarios(){
        return this.http.post(`${SERVICE}/${this.classe}/getTodosUsuarios`, ID_BANCA)
            .toPromise()
            .then(res => <Usuario[]>res.json())
            .then(data => {
                return data
            })
    }

    getUsuarioByTipo(tipoUsuario: string){
      return this.http.post(`${SERVICE}/${this.classe}/getUsuarioByTipo`, (String(ID_BANCA) + ';' + tipoUsuario))
        .toPromise()
        .then(res => <Usuario[]>res.json())
        .then(data => {
            return data
        })
    }

    getComissoesUsuario(idUsuario: number){
      return this.http.post(`${SERVICE}/${this.classe}/getComissoesUsuario`, idUsuario)
        .toPromise()
        .then(res => <UsuarioComissao[]>res.json())
        .then(data => {
            return data
        })
    }

    getUsuario(){
      let id : number = 0;

      if(this.usuario.id){
        id = this.usuario.id;
      }

      return this.http.post(`${SERVICE}/${this.classe}/getUsuarioById`, id)
          .toPromise()
          .then(res => <Usuario>res.json())
          .then(data => {
              this.usuario = data
              if(this.usuario.configuracao && this.usuario.configuracao.id > 0){
                this.configService.configuracaoPrincipal = this.usuario.configuracao;
              }
              return this.usuario
          })
    }

    getUsuarioById(usuario: Usuario){
      return this.http.post(`${SERVICE}/${this.classe}/getUsuarioById`, usuario.id)
          .toPromise()
          .then(res => <Usuario>res.json())
          .then(data => {
              return usuario
          })
    }

    salvar(usuario: Usuario) {
        return this.http.post(`${SERVICE}/${this.classe}/salvar`, JSON.stringify(usuario))
            .toPromise()
            .then(res => <Usuario>res.json())
            .then(data => {
                return data
            })
    }

    salvarCambistaGerente(gerenteCambista: GerenteCambista) {
        return this.http.post(`${SERVICE}/${this.classe}/salvarCambistaGerente`, JSON.stringify(gerenteCambista))
            .toPromise()
            .then(res => <Usuario>res.json())
            .then(data => {
                return data
            })
    }

    salvarCambistaCliente(cambistaCliente: CambistaCliente) {
        return this.http.post(`${SERVICE}/${this.classe}/salvarCambistaCliente`, JSON.stringify(cambistaCliente))
            .toPromise()
            .then(res => <Usuario>res.json())
            .then(data => {
                return data
            })
    }

    deletarCambistaCliente(cambistaCliente: CambistaCliente) {
        return this.http.post(`${SERVICE}/${this.classe}/deletarCambistaCliente`, JSON.stringify(cambistaCliente))
            .toPromise()
            .then(res => <CambistaCliente>res.json())
            .then(data => {
                return data
            })
    }

    deletarCambistaGerente(gerenteCambista: GerenteCambista) {
        return this.http.post(`${SERVICE}/${this.classe}/deletarCambistaGerente`, JSON.stringify(gerenteCambista))
            .toPromise()
            .then(res => <Usuario>res.json())
            .then(data => {
                return data
            })
    }

    salvarComissaoUsuario(listaComissoesJson : UsuarioComissao[], usuarioComissao: UsuarioComissao) {
        return this.http.post(`${SERVICE}/${this.classe}/salvarComissaoUsuario`, (JSON.stringify(listaComissoesJson) + '/' + JSON.stringify(usuarioComissao)))
            .toPromise()
            .then(res => <UsuarioComissao>res.json())
            .then(data => {
                return data
            })
    }

    deletarUsuarioComissao(listaComissoesJson : UsuarioComissao[], usuarioComissao: UsuarioComissao) {
        return this.http.post(`${SERVICE}/${this.classe}/deletarUsuarioComissao`, (JSON.stringify(listaComissoesJson) + '/' + JSON.stringify(usuarioComissao)))
            .toPromise()
            .then(res => <UsuarioComissao>res.json())
            .then(data => {
                return data
            })
    }

    atualizarSaldoCliente(conta : Conta, usuarioCambista : Usuario) {
        return this.http.post(`${SERVICE}/${this.classe}/atualizarSaldoCliente`, (JSON.stringify(conta) + '</>' + JSON.stringify(usuarioCambista)))
            .toPromise()
            .then(res => <Conta>res.json())
            .then(data => {
                return data
            })
    }
}

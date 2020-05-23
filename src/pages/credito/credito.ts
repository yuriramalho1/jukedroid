import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ViewController } from 'ionic-angular';
import { UsuarioService } from '../../service/usuario.service';
import { TransacaoService } from '../../service/transacao.service';
import { Lancamento } from '../../model/lancamento.model';
import { Usuario } from '../../model/usuario.model';

@IonicPage()
@Component({
  selector: 'page-credito',
  templateUrl: 'credito.html',
})
export class CreditoPage {

  lancamento           : Lancamento;
  usuarioTransferencia : Usuario;
  favorecidos          : Usuario[] = [];
  usuariosFav          : Usuario[] = [];
  descricaoLancamento  : any;
  filtro               : string = "Todos"

  usuarioCredito : Usuario;

  selectOptions = {
    cssClass: 'selectUsuarioFavorecido'
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private us : UsuarioService,
              public ts: TransacaoService, private alertCtrl: AlertController, private loadCtrl: LoadingController,
              private viewCtrl: ViewController) {
    this.initialize();

    this.usuarioCredito = this.navParams.get('usuarioCredito');

    if(this.usuarioCredito){
      this.lancamento.usuario = this.usuarioCredito;
    }
  }

  initialize(){
    this.lancamento                      = new Lancamento();
    this.usuarioTransferencia            = new Usuario();
    this.lancamento.usuarioTransferencia = new Usuario();
    this.lancamento.usuario              = new Usuario();

    this.usuarioTransferencia            = this.us.usuario;
    this.lancamento.usuarioTransferencia.id = this.usuarioTransferencia.id;

    this.ts.getDescricaoLancamentoMovimentoCreditoCambistaGerente(this.usuarioTransferencia.id).then(lista =>{
      this.descricaoLancamento = lista;
    });

    this.listaFavorecidos(this.usuarioTransferencia.tipoUsuario);

    let formCredito : any;
    formCredito = document.getElementById('formCredito');
    if(formCredito){
      formCredito.reset();
    }
  }

  listaFavorecidos(tipoUsuario : string){
    let load = this.loadCtrl.create();
    load.present();

    if(tipoUsuario == 'ADMINISTRADOR'){
      this.us.getTodosUsuarios().then(lista =>{
        this.favorecidos = lista.filter(function(item){
          if(item.tipoUsuario == 'GERENTE' || item.tipoUsuario == 'CAMBISTA'){
            return item;
          }
        });
        this.usuariosFav = this.favorecidos;
        load.dismiss();
      })
    }else if(tipoUsuario == 'GERENTE'){
      this.us.getCambistasGerente(this.usuarioTransferencia.id).then(lista =>{
        this.favorecidos = lista;
        this.usuariosFav = lista;
        load.dismiss();
      })
    }
  }

  descLancamento(desc: string): string{
    return this.ts.descricaoLancamento(desc);
  }


  salvarLancamento(){
    this.ts.addCredito(this.lancamento).then(retorno =>{
      let alert = this.alertCtrl.create({
        message: "Adição de crédito realizada com sucesso",
        cssClass: "alertSimulacao",
        buttons: ['OK']
      })

      alert.present();
      this.initialize();
    })
  }

  filterItems(ev: any) {
    let val = ev;

    if (val && val.trim() !== '' && val !== 'Todos') {
      this.favorecidos = this.usuariosFav.filter(function(item) {
        return item.tipoUsuario.toUpperCase().includes(val.toUpperCase());
      });
      console.log(this.favorecidos);
    }else{
      this.listaFavorecidos(this.us.usuario.tipoUsuario);
    }
  }

  voltar(){
    this.viewCtrl.dismiss()
  }
}

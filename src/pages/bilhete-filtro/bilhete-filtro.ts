import { BilheteService } from './../../service/bilhete.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Usuario } from '../../model/usuario.model';
import { Bilhete } from '../../model/bilhete.model';

/**
 * Generated class for the BilheteFiltroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bilhete-filtro',
  templateUrl: 'bilhete-filtro.html',
})
export class BilheteFiltroPage {

  tipoSelecionado : string = ''
  codigoSelecionado : number = undefined
  numeroSelecionado : string = ''
  statusSelecionado : string = ''
  usuarioSelecionado : string = ''

  usuario : Usuario
  usuarios : Usuario[]

  constructor(public navCtrl: NavController, public navParams: NavParams, private bs : BilheteService, public viewCtrl: ViewController) {
    this.usuario = navParams.get('usuario')
    this.usuarios = navParams.get('usuarios')
  }

  filtrar(){
    let bilheteExemplo   = new Bilhete;
    bilheteExemplo.id    = this.codigoSelecionado;
    bilheteExemplo.ativo = true;

    this.bs.getBilhetesByExemplo(bilheteExemplo).then(lista =>{
      this.viewCtrl.dismiss({bilhetesFiltrados: lista});
    })
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  limpar(){
    this.bs.filtroUsuario = ''
    this.bs.filtroNumero = ''
    this.bs.filtroStatus = ''
    this.bs.filtroTipo = ''
    this.bs.filtroCodigo = undefined

    this.viewCtrl.dismiss();
  }

}

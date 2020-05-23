import { ClienteSemCadastroPage } from './../cliente-sem-cadastro/cliente-sem-cadastro';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Usuario } from '../../model/usuario.model';
import { Bilhete } from '../../model/bilhete.model';
import { BilheteService } from '../../service/bilhete.service';

/**
 * Generated class for the ListaClientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lista-cliente',
  templateUrl: 'lista-cliente.html',
})
export class ListaClientePage {

  bilhete : Bilhete

  listaClientes : Usuario[]
  clientes : Usuario[]

  filtro : string = ''

  constructor(public navCtrl: NavController, public navParams: NavParams, public bs : BilheteService, public toastCtrl: ToastController, 
              public alertCtrl: AlertController) {
    this.listaClientes = navParams.get('clientes')
    this.bilhete = navParams.get('bilhete')
    this.filtraClientes()
  }

  filtraClientes(){
    this.clientes = []

    for (let cliente of this.listaClientes){
      if (cliente.nome.toLowerCase().includes(this.filtro.toLowerCase(),0)){
        this.clientes.push(cliente)
      }
    }

    this.clientes.sort(this.compare)
  }

  compare(a : Usuario,b : Usuario) {
    if (a.nome > b.nome)
      return 1;
    if (a.nome < b.nome)
      return -1;
    return 0;
  }

  selecionaCliente(cliente : Usuario){
    this.bs.setCliente(cliente)
    this.bs.setNomeCliente(cliente.nome)
    this.navCtrl.pop()

    /*this.bs.salvarBilhete().then(obj =>{ 
      if (obj != undefined && obj.id != undefined && obj.id > 0){
        this.bilhete = obj
        this.sucesso()
      } else{
        this.falha()
      }
    })*/
  }

  sucesso(){
    this.dialogShare()

    this.limparBilhete()
  }

  dialogShare() {
    let confirm = this.alertCtrl.create({
      title: 'Bilhete registrado com sucesso',
      message: 'Deseja compartilhar o comprovante do bilhete?',
      buttons: [
        {
          text: 'Não',
          handler: () => {

          }
        },
        {
          text: 'Compartilhar',
          handler: () => {
            console.log(this.bilhete.id)
            this.bs.shareComprovante(this.bilhete)
          }
        }
      ]
    });
    confirm.present();
  }

  falha(){
    let toast = this.toastCtrl.create({
      message: 'Ocorreu uma falha, favor contacte o suporte',
      duration: 2000
    });
    toast.present()
  }

  limparBilhete(){
    this.bs.limparBilhete()
    this.navCtrl.pop()
    this.navCtrl.pop()
  }

  clienteSemCadastro(){
    this.navCtrl.push(ClienteSemCadastroPage, {
      bilhete : this.bilhete
    })
  }

}

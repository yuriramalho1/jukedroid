import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ModalController, Platform } from 'ionic-angular';
import { Bilhete } from '../../model/bilhete.model';
import { ApostaBilhetePage } from '../aposta-bilhete/aposta-bilhete';
import { Usuario } from '../../model/usuario.model';
import { BilheteService } from '../../service/bilhete.service';
import { BilheteFiltroPage } from '../bilhete-filtro/bilhete-filtro';
import { UsuarioService } from '../../service/usuario.service';
import { PrinterProvider } from '../../providers/printer-provider';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-bilhetes-admin',
  templateUrl: 'bilhetes-admin.html',
})
export class BilhetesAdminPage {
  bilhete : Bilhete
  bilhetes : Bilhete[] = []
  bilhetesFiltro : Bilhete[] = [];
  bilhetesFiltrados : Bilhete[] = []
  usuario : Usuario;

  dataInicial : string;
  dataFinal   : string;

  filtroTipo : string = "Todos";

  constructor(public navCtrl: NavController, public navParams: NavParams, private bs : BilheteService, public alertCtrl: AlertController, private us : UsuarioService,
              public printer: PrinterProvider, public storage : Storage, public loadCtrl: LoadingController, public modalCtrl: ModalController, private plt: Platform) {
    let dataAtual = Date.now();
    this.dataInicial = new Date(dataAtual - (1000 * 60 * 60 * 24 * 1)).toISOString();
    this.dataFinal   = new Date(dataAtual).toISOString();

    this.buscarTodosBilhetes(this.dataInicial, this.dataFinal);
  }

  ionViewDidLeave(){
    this.bs.filtroUsuario = ''
    this.bs.filtroNumero = ''
    this.bs.filtroStatus = ''
    this.bs.filtroTipo = ''
  }

  ionViewDidEnter(){

  }

  statusFormatado(bilhete : Bilhete) : string{
    let resultado : string = bilhete.statusBilhete
    if (bilhete.statusBilhete == 'EM_ABERTO')
      resultado = "Em Aberto"
    if (bilhete.statusBilhete == 'CANCELADO')
      resultado = "Cancelado"
    if (bilhete.statusBilhete == 'FINALIZADO')
      resultado = "Finalizado"

    return resultado
  }

  verApostas(bilheteSelecionado : Bilhete){
    this.navCtrl.push(ApostaBilhetePage,{
      bilhete : bilheteSelecionado
    })
  }

  imprimirBilhete(bilhete){
    let alert = this.alertCtrl.create({
      title: "Compartilhar Bilhete",
      message: "Escolha como deseja Compartilhar o seu Bilhete.",
      cssClass: "alertCompeticoes",
      buttons: [{
        text: 'Compartilhar Imagem',
        handler: () =>{
          if(this.plt.is('android')){
            this.bs.shareComprovante(bilhete)
          }else{
            this.bs.downloadImagemBilhete(bilhete);
          }
        }
      },
      {
        text: 'Compartilhar Link',
        handler: () =>{
          if(this.plt.is('android')){
            this.bs.compartilharLink(bilhete)
          }else{
            this.bs.downloadImagemBilhete(bilhete);
          }
        }
      }]
    })

    alert.present();

  }

  printBilhete(bilhete){
    this.storage.get('impressora').then(impressora =>{
      this.bs.getApostaBilhete(bilhete).then(lista =>{
        bilhete.listaApostas = lista;
        this.printer.imprimirBilhete(impressora, bilhete);
      });
    });
  }

  cancelarBilhete(bilhete : Bilhete){
    let confirm = this.alertCtrl.create({
      title: 'Cancelar Bilhete',
      message: 'Deseja cancelar o bilhete selecionado?',
      buttons: [
        {
          text: 'Não',
          handler: () => {

          }
        },
        {
          text: 'Sim',
          handler: () => {
            this.us.getUsuario().then(usuario =>{
              this.bs.cancelarBilhete(bilhete, usuario).then(ok => {
                this.buscarTodosBilhetes(this.dataInicial, this.dataFinal);
              })
            })
          }
        }
      ]
    });
    confirm.present();
  }

  compare(a : Bilhete,b : Bilhete) {
    if (a.id < b.id)
      return 1;
    if (a.id > b.id)
      return -1;
    return 0;
  }

  buscarTodosBilhetes(dataInicial, dataFinal : string){
    dataInicial = new Date(dataInicial).toISOString();
    dataFinal   = new Date(dataFinal).toISOString();

    let load = this.loadCtrl.create();
    load.present();

    this.bs.getTodosBilhetes(dataInicial, dataFinal).then(lista => {
      this.bilhetes = lista
      this.bilhetes.sort(this.compare)

      this.bilhetesFiltrados = this.bilhetes

      if (this.bs.filtroUsuario != null && this.bs.filtroUsuario.length > 0){
        this.bilhetesFiltrados = []
        for (let bilhete of this.bilhetes){
          if (bilhete.usuario.login == this.bs.filtroUsuario){
            this.bilhetesFiltrados.push(bilhete)
          }
        }

        this.bilhetes = this.bilhetesFiltrados
      }

      if (this.bs.filtroNumero != null && this.bs.filtroNumero.length > 0){
        this.bilhetesFiltrados = []
        for (let bilhete of this.bilhetes){
          if (bilhete.numeroBilhete.includes(this.bs.filtroNumero)){
            this.bilhetesFiltrados.push(bilhete)
          }
        }

        this.bilhetes = this.bilhetesFiltrados
      }

      if (this.bs.filtroCodigo != null && this.bs.filtroCodigo  > 0){
        this.bilhetesFiltrados = []
        for (let bilhete of this.bilhetes){
          if (bilhete.id == this.bs.filtroCodigo){
            this.bilhetesFiltrados.push(bilhete)
          }
        }

        this.bilhetes = this.bilhetesFiltrados
      }

      if (this.bs.filtroStatus != null && this.bs.filtroStatus.length > 0){
        this.bilhetesFiltrados = []
        for (let bilhete of this.bilhetes){
          if (bilhete.statusBilhete == this.bs.filtroStatus){
            this.bilhetesFiltrados.push(bilhete)
          }
        }

        this.bilhetes = this.bilhetesFiltrados
      }

      if (this.bs.filtroTipo != null && this.bs.filtroTipo.length > 0){
        this.bilhetesFiltrados = []
        for (let bilhete of this.bilhetes){
          let dataString = bilhete.dataFormatada.substr(6,4) + '-' + bilhete.dataFormatada.substr(3,2) + '-' + bilhete.dataFormatada.substr(0,2)

          let data : Date = new Date(dataString)
          let diff = Math.abs(new Date().getTime() - data.getTime());
          let diffDays = Math.ceil(diff / (1000 * 3600 * 24));
          if (this.bs.filtroTipo == 'HOJE' && diffDays == 0){
            this.bilhetesFiltrados.push(bilhete)
          }
          if (this.bs.filtroTipo == '15_DIAS' && diffDays <= 15){
            this.bilhetesFiltrados.push(bilhete)
          }
          if (this.bs.filtroTipo == '30_DIAS' && diffDays <= 30){
            this.bilhetesFiltrados.push(bilhete)
          }
        }

        this.bilhetes = this.bilhetesFiltrados
      }
      this.bilhetesFiltro = this.bilhetes;
      load.dismiss();

    })
  }

  filterItems(ev: any, tipoBilhete : boolean) {
    let val = (tipoBilhete ? ev : ev.target.value);
    if (val && val.trim() !== '' && val != "Todos") {
      if(tipoBilhete){
        let bilheteService = this.bs;
        this.bilhetes = this.bilhetesFiltro.filter(function(item) {
          return bilheteService.tipoBilhete(item).toLowerCase().includes(val.toLowerCase());
        });
      }else{
        this.bilhetes = this.bilhetesFiltro.filter(function(item) {
          return item.usuario.nome.toLowerCase().includes(val.toLowerCase());
        });
      }
    }else{
      this.buscarTodosBilhetes(this.dataInicial, this.dataFinal);
    }
  }

}

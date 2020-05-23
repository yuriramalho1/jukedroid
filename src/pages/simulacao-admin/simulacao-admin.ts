import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController, LoadingController } from 'ionic-angular';
import { BilheteService } from '../../service/bilhete.service';
import { UsuarioService } from '../../service/usuario.service';
import { Bilhete } from '../../model/bilhete.model';
import { ApostaBilhetePage } from '../aposta-bilhete/aposta-bilhete';
import { BilhetePage } from '../bilhete/bilhete';
import { BolaoService } from '../../service/bolao.service';
import { BilheteBolaoPage } from '../bilhete-bolao/bilhete-bolao';

@IonicPage()
@Component({
  selector: 'page-simulacao-admin',
  templateUrl: 'simulacao-admin.html',
})
export class SimulacaoAdminPage {
  simulacoes : Bilhete[] = [];
  id         : number;
  constructor(public navCtrl: NavController, public navParams: NavParams,public bs : BilheteService,
              public us: UsuarioService, public alertCtrl: AlertController, public modalCtrl : ModalController,
              public loadCtrl: LoadingController, private bolaoService: BolaoService) {
  }

  verApostas(bilheteSelecionado : Bilhete){
    this.navCtrl.push(ApostaBilhetePage,{
      bilhete : bilheteSelecionado
    })
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

  buscarSimulacao(idSimulacao){
    if(idSimulacao == ''){
      if(this.us.isAdmin()){
        idSimulacao = 0;
      }else{
        idSimulacao = '';
      }
    }

    let load = this.loadCtrl.create();
    load.present();
    this.bs.getBilhetesSimulados(idSimulacao).then(simulacoes =>{
      this.simulacoes = simulacoes;
      load.dismiss();

      if(simulacoes.length == 0){
        let alert = this.alertCtrl.create({
          title: "Simulação não encontrada",
          message: "Número de simulação não existente.",
          cssClass: "alertCompeticoes",
          buttons: ['OK']
        })

        alert.present();
      }
    });
  }


  cancelarBilhete(bilhete : Bilhete){
    let confirm = this.alertCtrl.create({
      title: 'Cancelar Simulação',
      message: 'Deseja cancelar a simulação selecionada?',
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
                this.bs.getBilhetesSimulados(bilhete.id).then(simulacoes =>{this.simulacoes = simulacoes});
              })
            })
          }
        }
      ]
    });
    confirm.present();
  }

  finalizarSimulacao(bilhete : Bilhete){
    this.bs.getApostaBilhete(bilhete).then(lista =>{
      bilhete.listaApostas = lista;

      let confirm = this.alertCtrl.create({
        title: 'Concluir Simulação',
        message: 'Deseja prosseguir com a simulação selecionada?',
        buttons: [
          {
            text: 'Não',
            handler: () => {

            }
          },
          {
            text: 'Sim',
            handler: () => {
              if(bilhete.tipoPartida != 'ACUMULADAO' && bilhete.tipoPartida != 'BOLAO'){
                this.finalizarSimulacaoPreJogo(bilhete)
              }else{
                this.finalizarSimulacaoBolao(bilhete);
              }
            }
          }
        ]
      });
      confirm.present();
    });
  }

  finalizarSimulacaoPreJogo(bilhete: Bilhete){
    this.bs.setBilhete(bilhete);
    let modal = this.modalCtrl.create(BilhetePage, {
      finalizandoSimulacao : true,
    });
    modal.onDidDismiss(data =>{
      this.bs.getBilhetesSimulados(bilhete.id).then(simulacoes =>{this.simulacoes = simulacoes});
    });
    modal.present();
  }

  finalizarSimulacaoBolao(bilhete: Bilhete){
    this.bolaoService.setBilheteSimulacao(bilhete, this.us.usuario);

    let modal = this.modalCtrl.create(BilheteBolaoPage);
    modal.onDidDismiss(data =>{
      this.bs.getBilhetesSimulados(bilhete.id).then(simulacoes =>{this.simulacoes = simulacoes});
    });
    modal.present();
  }

  ionViewDidLeave(){
    //Zerar os bilhetes caso  o usuário desista de completar a simulação.
    let bilhete = new Bilhete();
    this.bs.setBilhete(bilhete);
  }

}

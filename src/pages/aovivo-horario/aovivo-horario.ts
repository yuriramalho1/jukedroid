import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, AlertController } from 'ionic-angular';
import { PartidaAoVivo } from '../../model/partida-aovivo.model';
import { AoVivoService } from '../../service/aovivo.service';

@IonicPage()
@Component({
  selector: 'page-aovivo-horario',
  templateUrl: 'aovivo-horario.html',
})
export class AovivoHorarioPage {

  partida : PartidaAoVivo;

  data    : string;
  horario : string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController,
              private avservice : AoVivoService, private loadCtrl: LoadingController, private alertCtrl: AlertController ) {
    this.partida = this.navParams.get('partida');
    this.data    = new Date().toISOString();
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  editarHorario(){
    let data =  new Intl.DateTimeFormat('pt-BR').format(new Date(this.data)).substr(0, 10);
    let load = this.loadCtrl.create();
    load.present();

    this.avservice.editarHorarioPartida(this.partida.eventId, data, this.horario).then(retorno =>{
      let alert = this.alertCtrl.create({
        title: '',
        message: 'Horário da Partida Ajustado com Sucesso!',
        cssClass: 'alertCompeticoes',
        buttons: ['OK']
      });

      alert.present();
      load.dismiss();
    }).catch(erro =>{
      load.dismiss();  
    })
  }
}

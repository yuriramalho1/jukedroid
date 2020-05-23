import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BancaService } from '../../service/banca.service';
import { Chart } from "chart.js";

@IonicPage()
@Component({
  selector: 'page-jogo-binario',
  templateUrl: 'jogo-binario.html',
})
export class JogoBinarioPage {
  public tipoLista      : string = '0';
  public tipoListaTurno : string = '1';

  @ViewChild("barCanvas") barCanvas: ElementRef;

  private barChart: Chart;

  public timer: number;
  public timerExibir: string;

  public valor: number;
  public valorPossivelRetorno: number;
  public ladoEscolhido: string = '';
  public cotacaoEscolhida: number;

  public nomeCliente: string;

  public readonly cotacaoVerde: number    = 1.7;
  public readonly cotacaoVermelho: number = 1.7;

  dataInicio : Date = new Date();
  dataFim    : Date = new Date();

  constructor(public navCtrl: NavController, public navParams: NavParams, public bancaService: BancaService) {
    
  }

  ionViewDidLoad(){
    this.barChart = new Chart(this.barCanvas.nativeElement,{
      type: 'bar',
      data: {
        labels: ["Palmeiras", "Flamengo"],
        datasets: [
          {
            data: [0, 0],
            backgroundColor: [
              "rgba(58, 218, 63, 0.3)",
              "rgba(218, 58, 58, 0.3)"
            ],
            borderColor: [
              "rgba(58, 218, 63, 1)",
              "rgba(218, 58, 58, 1)",
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        legend:{
          display: false
        },
        scales: {
          yAxes: [
            {
              ticks: {
                min: 0,
                max: 100,
                beginAtZero: true
              }
            }
          ]
        }
      }
    })

    this.countDown(0, 10);
  }

  countDown(horas:number, minutos: number){
    this.timerExibir = String(horas) + ':' + String(minutos) + ':00';
    this.timer = (horas * 60) + minutos;
    this.timer = this.timer * 60;

    let max = this.timer;
    let inflar : number = 0;

    let interval = setInterval(() => {
      

      var h = Math.floor(this.timer / 3600);
      var m = Math.floor(this.timer % 3600 / 60);
      var s = Math.floor(this.timer % 3600 % 60);

      let horas    = (h < 10 ? '0'+h : h);
      let minutos  = (m < 10 ? '0'+m : m);
      let segundos = (s < 10 ? '0'+s : s);

      this.timerExibir = `${horas}:${minutos}:${segundos}`;

      this.timer--;
      inflar++;

      this.barChart.data.datasets[0].data = [(inflar / max * 100), (inflar / max * 100)];
      this.barChart.update();

      if (this.timer === 0) {
        clearInterval(interval);
        //TO-DO CONSULTA DOS TOTAIS CORRETOS
      }
    }, 1000);
  }

  escolhe(lado: string){
    switch(lado){
      case 'palmeiras': {
        this.valorPossivelRetorno = this.valor * this.cotacaoVerde; 
        this.ladoEscolhido = lado;
        this.cotacaoEscolhida = this.cotacaoVerde;
        break;
      }
      case 'flamengo': {
        this.valorPossivelRetorno = this.valor * this.cotacaoVermelho; 
        this.ladoEscolhido = lado;
        this.cotacaoEscolhida = this.cotacaoVermelho;
        break;
      }
    }
  }
}



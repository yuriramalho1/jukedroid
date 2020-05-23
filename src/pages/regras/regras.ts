import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-regras',
  templateUrl: 'regras.html',
})
export class RegrasPage {
  listaRegras: string[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public viewCtrl: ViewController) {
    this.listaRegras = [
      "1 – Proibido para menores de 18 anos.",
      "2 – Prêmios: Até 1.500,00 (mil e quinhentos reais) serão pagos em até 24 horas. Premios superiores a 1.500,00 podem levar até 72 horas para serem pagos;",
      "3 – Jogos Válidos durante os 90 minutos oficiais (primeiro tempo, segundo tempo e extras destes por paralizações);",
      "4 – Jogos adiados, transferidos ou não iniciados: Qualquer partida que não tiver sido dado o “ponta pé inicial” independente de motivo o bilhete permanecera válido caso este jogo tenha sido remarcado para o mesmo dia e o bilhete tenha sido feito antes do horário oficial. Jogos adiados, transferidos ou não iniciados que tenham sido remarcados para outro dia o jogo será retirado do bilhete e deverá ser realizada uma nova operação.",
      "4.1 - Em bilhetes “casados” onde existam mais de 1 (um) jogo e este jogo em questão for remarcado para o mesmo dia este jogo permanecerá válido no bilhete. Caso seja remarcado para outro dia, este jogo será retirado do bilhete e a taxa será reajustada entre os demais jogos.",
      "4.2 – Partidas iniciadas mas interrompida durante o jogo:",
      "1° tempo: Caso a partida tenha sido interrompida durante o primeiro tempo independente do resultado neste tempo o jogo será retirado do bilhete. Em bilhetes com “resultado no 1° tempo” valera a mesma decisão, o bilhete será cancelado ou em bilhetes casados valera o item 4.1 presente neste site.",
      "2° tempo: Caso a partida tenha sido interrompida durante o segundo tempo independente do resultado neste tempo valera o resultado até o momento em que a partida foi interrompida. Em bilhetes com “resultado no 2° tempo” valera a mesma decisão.",
      "4.3 Todos os bilhetes são válidos durante os 90 minutos principais do jogo e seus respectivos acréscimos por paralizações. Não temos opções de operações por prorrogações extras ou pênaltis.",
      "5 – Cadastro de jogos com horários errados: O jukedroid  recomenda a seus clientes que não realizem operações em jogos com horários diferentes aos oficiais, independente do motivo, se um jogo é mostrado em nosso site com início às 18:00 e teve seu início as 17:30 ou terá seu início as 18:30 em horário oficial este se tornara invalido e cancelado ou se casado com outros jogos válidos apenas este será retirado do bilhete.",
      "6 – Jogos com nomes de times invertidos: Em partidas onde o visitante esteja como casa ou o contrário o jogo será invalidado e cancelado ou se casado com outros jogos válidos apenas este será retirado do bilhete. Ex.: Jogo Oficial Palmeiras x Corinthians (certo) e no site mostre Corinthians x Palmeiras (errado).",
      "7 – Cotações invertidas, erradas ou desatualizadas: Jogo com taxas erradas serão invalidados e cancelados ou se casado com outros jogos válidos apenas este será retirado do bilhete. Todas as cotações são bastante idênticas independente do site, exemplo, bet365, sportingbet etc. O jukedroid  recomenda para seus clientes que não apostem em cotações surebet com diferença superior a 20%, pois em qualquer momento (antes ou após a partida), o erro poderá ser detectado e o jukedroid  se reserva ao direito de cancelar as referidas apostas ou não, referente a esse jogo!",
      "8 – Partidas duplicadas: Caso seja encontrado em nosso site a mesma partida em campos separados uma delas será retirada do bilhete caso casado e valera apenas uma das opções. Ex.: Vasco x Flamengo no inicio do site e Vasco x Flamengo no meio do site. Independente da ordem sendo o mesmo jogo terá o mesmo resultado final portanto um será retirado.",
      "9 – O jukedroid  não possui filiação, patrocínio ou qualquer outro relacionamento com equipes desportivas, organizadores de eventos ou jogadores em exposição no seu site.",
      "10 - Realizando operações em nosso site, aplicativos ou com operadores ficara entendido que cliente tem conhecimento de todo o conteúdo presente nestas página."
    ]
  }

  ionViewDidLoad() {

  }

}

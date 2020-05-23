import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, ToastController } from 'ionic-angular';
import { BolaoRodadaPage } from '../bolao-rodada/bolao-rodada';
import { BolaoCadastroPage } from '../bolao-cadastro/bolao-cadastro';
import { Bolao } from '../../model/bolao.model';
import { BolaoService } from '../../service/bolao.service';
import { UsuarioService } from '../../service/usuario.service';
import { LoginPage } from '../login/login';
import { BolaoPalpitePage } from '../bolao-palpite/bolao-palpite';
import { BolaoVencedoresPage } from '../bolao-vencedores/bolao-vencedores';
import { Util } from '../../providers/util';

@IonicPage()
@Component({
  selector: 'page-bolao',
  templateUrl: 'bolao.html',
})
export class BolaoPage {
  tipoLista : string = '0';
  tipoBolao : string = 'ACUMULADAO';

  listaBolaoAtivo     : Bolao[] = [];
  listaBolaoEncerrado : Bolao[] = [];

  util : Util;

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController,
              public bolaoService: BolaoService, public us: UsuarioService, private alertCtrl: AlertController,
              private toastCtrl: ToastController) {
    this.util      = new Util();

    if(this.navParams.get('tipoBolao')){
      this.tipoBolao = this.navParams.get('tipoBolao');
    }

    this.consultarAcumuladao(this.tipoBolao, false);
    this.bolaoService.newBilhete();
  }

  toRodada(bolao: Bolao, encerrado? : boolean){
    let dataBolao = new Date();
    let hora    : number;
    let minutos : number

    dataBolao = this.util.toDate(bolao.dataFormatada.substr(0, 10));
    hora      = Number(bolao.dataFormatada.substr(14, 2));
    minutos   = Number(bolao.dataFormatada.substr(17, 2));

    dataBolao.setHours(hora);
    dataBolao.setMinutes(minutos);

    if(dataBolao > new Date() || encerrado){
      let modal = this.modalCtrl.create(BolaoRodadaPage, {
        rodada: bolao,
        encerrado: encerrado,
        tipoBolao: this.tipoBolao
      });

      modal.present();

      modal.onDidDismiss(retorno =>{
        this.bolaoService.newBilhete();

        if(retorno){
          this.consultarAcumuladao(this.tipoBolao, false);
        }
      })
    }else{
      let toast = this.toastCtrl.create({
        message: 'O ' + (this.tipoBolao == 'BOLAO' ? 'Bolão' : 'Acumuladão') + ' já está encerrado',
        duration: 2000,
        position: 'bottom'
      });

      toast.present();
    }
  }

  consultarAcumuladao(tipoBolao: string, encerrado?: boolean){
    this.bolaoService.getListaBolao(tipoBolao, encerrado).then(lista =>{
      if(encerrado){
        this.listaBolaoEncerrado = lista;
        return;
      }

      this.listaBolaoAtivo = lista;
    });
  }

  toCadastro(){
    this.navCtrl.push(LoginPage,{
      saiu: true,
      cadastrar: true
    })
  }

  toLogin(){
    this.navCtrl.push(LoginPage,{
      saiu: true,
      cadastrar: false
    })
  }

  toCadastroBolao(){
    let modal = this.modalCtrl.create(BolaoCadastroPage, {
      tipoBolao: this.tipoBolao
    });

    modal.present();

    modal.onDidDismiss(atualizarLista =>{
      //se houve algum cadastro atualiza a lista.
      if(atualizarLista){
        this.consultarAcumuladao(this.tipoBolao, false);
      }
    })
  }

  toEditarBolao(b: Bolao){
    let modal = this.modalCtrl.create(BolaoCadastroPage,{
      bolao: b
    });

    modal.present();

    modal.onDidDismiss(atualizarLista =>{
      //se houve alguma alteração atualiza a lista.
      if(atualizarLista){
        this.consultarAcumuladao(this.tipoBolao, false);
      }
    })
  }

  toPalpiteBolao(bolao: Bolao){
    let modal = this.modalCtrl.create(BolaoPalpitePage, {
      bolao: bolao
    });

    modal.present();
  }

  toVencedoresBolao(bolao: Bolao){
    let modal = this.modalCtrl.create(BolaoVencedoresPage, {
      bolao: bolao
    });

    modal.present();
  }

  desativarBolao(bolao: Bolao){

    let alert = this.alertCtrl.create({
      title: "Encerrar "+ (this.tipoBolao == 'BOLAO' ? 'Bolão' : 'Acumuladão'),
      message: "Deseja realmente encerrar este "+ (this.tipoBolao == 'BOLAO' ? 'Bolão?' : 'Acumuladão?'),
      buttons: [{
            text: 'Não',
            handler: () => {
              alert.dismiss;
            }
          },
          {
            text: 'Sim',
            handler: () => {
              this.bolaoService.desativarBolao(bolao).then(retorno =>{
                this.consultarAcumuladao(this.tipoBolao, false);
              }).catch(retorno=>{
                let toast = this.toastCtrl.create({
                  message: 'Falha ao encerrar ' +(this.tipoBolao == 'BOLAO' ? 'Bolão' : 'Acumuladão'),
                  duration: 3000,
                  position: 'bottom'
                });

                toast.present();
              })
            }
          }]
    });

    alert.present();
  }

  getImage(bolao : Bolao): string{
    //Caso seja Bolão
    if(this.tipoBolao == 'BOLAO'){
      let retorno = 'assets/imgs/trofeu-inativo2.png';

      if(bolao.statusBolao == 'CONCLUIDO'){
        retorno = 'assets/imgs/trofeu-ativo2.png';
      }

      return retorno;
    }

    //Caso seja Acumuladão
    let retorno = 'assets/imgs/trofeu-inativo.png';

    if(bolao.statusBolao == 'CONCLUIDO'){
      retorno = 'assets/imgs/trofeu-ativo.png';
    }
    return retorno;
  }

  getImageBolaoAtivo(): string{
    //Caso seja Bolão
    if(this.tipoBolao == 'BOLAO'){
      return 'assets/imgs/trofeu-ativo2.png';
    }

    //Caso seja Acumuladão
    return 'assets/imgs/trofeu-ativo.png';
  }

  premiarBolao(bolao: Bolao){
    let alert = this.alertCtrl.create({
      title: "Premiar " +(this.tipoBolao == 'BOLAO' ? 'Bolão' : 'Acumuladão'),
      message: "Deseja realmente premiar este " +(this.tipoBolao == 'BOLAO' ? 'Bolão?' : 'Acumuladão?'),
      buttons: [{
            text: 'Não',
            handler: () => {
              alert.dismiss;
            }
          },
          {
            text: 'Sim',
            handler: () => {
              this.bolaoService.premiarBolao(bolao).then(retorno =>{
                this.consultarAcumuladao(this.tipoBolao, false);
              }).catch(retorno=>{
                let toast = this.toastCtrl.create({
                  message: 'Falha ao premiar ' +(this.tipoBolao == 'BOLAO' ? 'Bolão' : 'Acumuladão'),
                  duration: 3000,
                  position: 'bottom'
                });

                toast.present();
              })
            }
          }]
    });

    alert.present();
  }
}

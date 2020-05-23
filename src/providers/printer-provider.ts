
import { Injectable } from '@angular/core';
import {AlertController, LoadingController} from 'ionic-angular';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { PrinterCommands } from './printer-commands';
import { Bilhete } from '../model/bilhete.model';
import { Banca } from '../model/banca.model';
import { BancaService } from '../service/banca.service';
import { Storage } from '@ionic/storage';

@Injectable()
export class PrinterProvider {
  banca : Banca;
  constructor(private btSerial:BluetoothSerial,private alertCtrl:AlertController, private loadCtrl: LoadingController,
              public  storage : Storage, public bs: BancaService) {
    this.bs.getBancaAtual().then(banca=>{
      this.banca = banca;
    })
  }

  searchBt(){
    return this.btSerial.list();
  }

  connectBT(address){
    return this.btSerial.connect(address);

  }

  listaDispositivos(){
    this.btSerial.enable().then(ativo =>{
      this.searchBt().then(lista =>{
          let alert = this.alertCtrl.create();

          for(let dispositivo of lista){
            alert.addInput({
              type: 'radio',
              label: dispositivo.name,
              value: dispositivo.address
            })
          }
          alert.addButton('Cancelar');
          alert.addButton({
            text: 'OK',
            handler: (data: any) => {
                console.log('Radio data:', data);
                this.storage.set('impressora',  data);
            }
          });
          alert.present();
      })
    });
  }

  print(address, data){
    let load = this.loadCtrl.create({
    content: 'Imprimindo...'
    });
    load.present();
    let btPrinter = this.connectBT(address).subscribe(status => {
                    console.log(status);
                    this.btSerial.write(this.noSpecialChars(data))
                      .then(printStatus => {
                        console.log(printStatus);
                        let alert = this.alertCtrl.create({
                          title: 'Impressão Concluída!',
                          buttons: ['OK']
                        });
                        load.dismiss();
                        alert.present().then(alertStatus =>{
                          btPrinter.unsubscribe();
                        });
                      })
                      .catch(error => {
                        console.log(error);
                        let alert = this.alertCtrl.create({
                          title: 'Houve um erro na impressão, tente novamente!',
                          buttons: ['OK']
                        });
                        load.dismiss();
                        alert.present();
                        btPrinter.unsubscribe();
                      });
                  },
                  error => {
                    console.log(error);
                    let alert = this.alertCtrl.create({
                      title: 'Erro ao encontrar dispositivo, na parte superior do menu conecte novamente a impressora!',
                      buttons: ['OK']
                    });
                    load.dismiss();
                    alert.present();
                  });
  }

  noSpecialChars(string) {
    var translate = {
        "à": "a",
        "á": "a",
        "â": "a",
        "ã": "a",
        "ä": "a",
        "å": "a",
        "æ": "a",
        "ç": "c",
        "è": "e",
        "é": "e",
        "ê": "e",
        "ë": "e",
        "ì": "i",
        "í": "i",
        "î": "i",
        "ï": "i",
        "ð": "d",
        "ñ": "n",
        "ò": "o",
        "ó": "o",
        "ô": "o",
        "õ": "o",
        "ö": "o",
        "ø": "o",
        "ù": "u",
        "ú": "u",
        "û": "u",
        "ü": "u",
        "ý": "y",
        "þ": "b",
        "ÿ": "y",
        "ŕ": "r",
        "À": "A",
        "Á": "A",
        "Â": "A",
        "Ã": "A",
        "Ä": "A",
        "Å": "A",
        "Æ": "A",
        "Ç": "C",
        "È": "E",
        "É": "E",
        "Ê": "E",
        "Ë": "E",
        "Ì": "I",
        "Í": "I",
        "Î": "I",
        "Ï": "I",
        "Ð": "D",
        "Ñ": "N",
        "Ò": "O",
        "Ó": "O",
        "Ô": "O",
        "Õ": "O",
        "Ö": "O",
        "Ø": "O",
        "Ù": "U",
        "Ú": "U",
        "Û": "U",
        "Ü": "U",
        "Ý": "Y",
        "Þ": "B",
        "Ÿ": "Y",
        "Ŕ": "R"
      },
      translate_re = /[àáâãäåæçèéêëìíîïðñòóôõöøùúûüýþßàáâãäåæçèéêëìíîïðñòóôõöøùúûýýþÿŕŕÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÝÝÞŸŔŔ]/gim;
    return (string.replace(translate_re, function (match) {
      return translate[match];
    }));
  }

  imprimirBilhete(address, bilhete: Bilhete){
    let funcoesBilhete = new Bilhete();
    let title          = bilhete.usuario.banca.nome;
    let subtitle       = "Bilhete"

    let data = '';
    data += PrinterCommands.HARDWARE.HW_INIT;
    //Título
    data += PrinterCommands.TEXT_FORMAT.TXT_4SQUARE;
    data += PrinterCommands.TEXT_FORMAT.TXT_ALIGN_CT;
    data += title.toUpperCase();
    data += PrinterCommands.EOL;
    data += PrinterCommands.EOL;
    //SubTítulo
    data += PrinterCommands.TEXT_FORMAT.TXT_ALIGN_CT;
    data += PrinterCommands.TEXT_FORMAT.TXT_NORMAL;
    data += subtitle;
    data += PrinterCommands.EOL;
    data += bilhete.numeroBilhete;
    data += PrinterCommands.EOL;
    data += this.tipoPartidaBilhete(bilhete.tipoPartida);
    data += PrinterCommands.EOL;
    data += PrinterCommands.HORIZONTAL_LINE.HR3_58MM;
    data += PrinterCommands.EOL;
    //Tipo da Aposta
    data += funcoesBilhete.descricaoAposta(bilhete);
    data += PrinterCommands.EOL;
    //Data
    data += PrinterCommands.TEXT_FORMAT.TXT_ALIGN_LT;
    data += 'Data da Impressão: ' + new Intl.DateTimeFormat('pt-BR').format(new Date());
    data += PrinterCommands.EOL;
    data += 'Cliente: ' + (bilhete.clienteNome != undefined ? bilhete.clienteNome : bilhete.usuario.nome);
    data += PrinterCommands.EOL;
    if(bilhete.clienteNome){
      data += 'Cambista: ' + bilhete.usuario.nome;
      data += PrinterCommands.EOL;
    }
    data += PrinterCommands.HORIZONTAL_LINE.HR3_58MM;
    data += PrinterCommands.EOL;
    //Headers
    data += funcoesBilhete.prepareHeaders(PrinterCommands.SPACE_22, 'Aposta') + 'Cotação';
    data += PrinterCommands.EOL;
    data += PrinterCommands.HORIZONTAL_LINE.HR3_58MM;
    data += PrinterCommands.EOL;

    //Apostas
    for(let aposta of bilhete.listaApostas){
      data += aposta.competicao + ' - ' + aposta.tipoCompeticao.replace('_', ' ').replace('_', ' ');
      data += PrinterCommands.EOL;
      data += aposta.evento;
      data += PrinterCommands.EOL;
      data += funcoesBilhete.prepareHeaders(PrinterCommands.SPACE_21, aposta.dataFormatada);
      data += PrinterCommands.EOL;
      data += aposta.tipoAposta;
      data += PrinterCommands.EOL;
      data += funcoesBilhete.prepareHeaders(PrinterCommands.SPACE_21, aposta.escolha) + String(aposta.cotacaoAposta);
      data += PrinterCommands.EOL;
      data += funcoesBilhete.prepareHeaders(PrinterCommands.SPACE_21, 'Status Aposta') + funcoesBilhete.statusAposta(aposta.statusAposta);
      data += PrinterCommands.EOL;
      data += PrinterCommands.HORIZONTAL_LINE.HR3_58MM;
      data += PrinterCommands.EOL;
    }

    //Totais
    data += funcoesBilhete.prepareHeaders(PrinterCommands.SPACE_21, 'COTAÇÃO TOTAL') + String(bilhete.cotacaoTotal);
    data += PrinterCommands.EOL;
    data += funcoesBilhete.prepareHeaders(PrinterCommands.SPACE_21, 'TOTAL APOSTADO') + String(bilhete.valor);
    data += PrinterCommands.EOL;
    data += funcoesBilhete.prepareHeaders(PrinterCommands.SPACE_21, 'POSSÍVEL RETORNO') + String(bilhete.valorPossivelRetorno);
    data += PrinterCommands.EOL;
    
    if(bilhete.valorPremioDois && bilhete.valorPremioDois > 0){
      data += funcoesBilhete.prepareHeaders(PrinterCommands.SPACE_21, 'SEGUNDO PRÊMIO') + String(bilhete.valorPremioDois);
      data += PrinterCommands.EOL;
    }

    if(bilhete.valorPremioTres && bilhete.valorPremioTres > 0){
      data += funcoesBilhete.prepareHeaders(PrinterCommands.SPACE_21, 'TERCEIRO PRÊMIO') + String(bilhete.valorPremioTres);
      data += PrinterCommands.EOL;
    }
    
    data += funcoesBilhete.prepareHeaders(PrinterCommands.SPACE_21, 'STATUS DO BILHETE') + funcoesBilhete.statusFormatado(bilhete);
    data += PrinterCommands.EOL;
    data += PrinterCommands.HORIZONTAL_LINE.HR3_58MM;
    data += PrinterCommands.EOL;

    //Footer
    if(bilhete.tipoPartida == 'ACUMULADAO'){
      data += "Se houver mais de um ganhador do acumuladão, o prêmio será dividido entre os ganhadores"
    }else{
      data += ((this.banca.mensagemFinalBilhete && this.banca.mensagemFinalBilhete.length > 0) ? this.banca.mensagemFinalBilhete : 'A Banca dá um prazo de até 72   horas para pagamento dos prêmios');
    }

    data += PrinterCommands.EOL;
    data += PrinterCommands.EOL;
    data += PrinterCommands.EOL;

    this.print(address, data);
  }

  tipoPartidaBilhete(tipoPartida: string): string{
    let retorno : string = "";

    switch(tipoPartida){
      case 'PRE_JOGO'   :{ retorno = "Pré Jogo"}; break;
      case 'AO_VIVO'    :{ retorno = "Ao Vivo"}; break;
      case 'ACUMULADAO' :{ retorno = "Acumuladão"}; break;
    }

    return retorno;
  }

}

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPageModule } from '../pages/login/login.module';
import { UsuarioService } from '../service/usuario.service';
import { BancaService } from '../service/banca.service';
import { HttpModule } from '@angular/http';
import { HomePageModule } from '../pages/home/home.module';
import { CompeticaoService } from '../service/competicao.service';
import { TenisService } from '../service/tenis.service';
import { PartidaService } from '../service/partida.service';
import { BilheteService } from '../service/bilhete.service';
import { TransacaoService } from '../service/transacao.service';
import { ContaService } from '../service/conta.service';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ApostaService } from '../service/aposta.service';
import { IonicStorageModule } from '@ionic/storage';
import { RankingService } from '../service/ranking.service';
import { CaixaPageModule } from '../pages/caixa/caixa.module';
import { MeuCaixaService } from '../service/meu-caixa.service';
import { NovidadeService } from '../service/novidade.service';
import { AoVivoService } from '../service/aovivo.service';
import { PrinterProvider } from '../providers/printer-provider';
import { ConfiguracaoService } from '../service/configuracao.service';
import { HomeSmPageModule } from '../pages/home-sm/home-sm.module';

import { BolaoService } from '../service/bolao.service';
import { IonicSelectableModule } from 'ionic-selectable';


@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    LoginPageModule,
    HomePageModule,
    CaixaPageModule,
    HomeSmPageModule,
    IonicSelectableModule,

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},

    FileTransfer,
    FileTransferObject,
    File,
    Camera,
    SocialSharing,
    BluetoothSerial,
    PrinterProvider,

    UsuarioService,
    CompeticaoService,
    TenisService,
    PartidaService,
    BilheteService,
    TransacaoService,
    ApostaService,
    RankingService,
    MeuCaixaService,
    ContaService,
    NovidadeService,
    BancaService,
    AoVivoService,
    ConfiguracaoService,
    BolaoService
  ]
})
export class AppModule {}

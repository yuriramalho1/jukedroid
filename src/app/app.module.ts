import { BolaoRegrasPageModule } from './../pages/bolao-regras/bolao-regras.module';
import { SuportePageModule } from '../pages/suporte/suporte.module';
import { ClienteSemCadastroPageModule } from './../pages/cliente-sem-cadastro/cliente-sem-cadastro.module';
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
import { CompeticaoPageModule } from '../pages/competicao/competicao.module';
import { PartidaService } from '../service/partida.service';
import { BilheteService } from '../service/bilhete.service';
import { BilhetePageModule } from '../pages/bilhete/bilhete.module';
import { TransacaoPageModule } from '../pages/transacao/transacao.module';
import { TransacaoService } from '../service/transacao.service';
import { ContaService } from '../service/conta.service';
import { MeusBilhetesPageModule } from '../pages/meus-bilhetes/meus-bilhetes.module';
import { ApostaBilhetePageModule } from '../pages/aposta-bilhete/aposta-bilhete.module';
import { ExtratoPageModule } from '../pages/extrato/extrato.module';
import { SaquePageModule } from '../pages/saque/saque.module';
import { SocialSharing } from '@ionic-native/social-sharing';
import { MaisOpcoesPageModule } from '../pages/mais-opcoes/mais-opcoes.module';
import { OpcaoCotacaoPageModule } from '../pages/opcao-cotacao/opcao-cotacao.module';
import { PerfilPageModule } from '../pages/perfil/perfil.module';
import { AlterarSenhaPageModule } from '../pages/alterar-senha/alterar-senha.module';
import { LancarResultadoPageModule } from '../pages/lancar-resultado/lancar-resultado.module';
import { ApostaService } from '../service/aposta.service';
import { SolicitacoesPageModule } from '../pages/solicitacoes/solicitacoes.module';
import { SolicitacaoComprovantePageModule } from '../pages/solicitacao-comprovante/solicitacao-comprovante.module';
import { BilhetesPendentesPageModule } from '../pages/bilhetes-pendentes/bilhetes-pendentes.module';
import { BilhetesPendentesApostasPageModule } from '../pages/bilhetes-pendentes-apostas/bilhetes-pendentes-apostas.module';
import { TransacoesPageModule } from '../pages/transacoes/transacoes.module';
import { BilhetesAdminPageModule } from '../pages/bilhetes-admin/bilhetes-admin.module';
import { IonicStorageModule } from '@ionic/storage';
import { ListaClientePageModule } from '../pages/lista-cliente/lista-cliente.module';
import { BilheteFiltroPageModule } from '../pages/bilhete-filtro/bilhete-filtro.module';
import { RankingPageModule } from '../pages/ranking/ranking.module';
import { RankingService } from '../service/ranking.service';
import { CaixaPageModule } from '../pages/caixa/caixa.module';
import { MeuCaixaService } from '../service/meu-caixa.service';
import { NovidadeService } from '../service/novidade.service';
import { AoVivoService } from '../service/aovivo.service';
import { LancamentoManualPageModule } from '../pages/lancamento-manual/lancamento-manual.module';
import { UsuariosPageModule } from '../pages/usuarios/usuarios.module';
import { UsuarioModalPageModule } from '../pages/usuario-modal/usuario-modal.module';
import { UsuarioExtratoPageModule } from '../pages/usuario-extrato/usuario-extrato.module';
import { RegrasPageModule } from '../pages/regras/regras.module';
import { BilheteSucessoPageModule } from '../pages/bilhete-sucesso/bilhete-sucesso.module';
import { NovidadesPageModule } from '../pages/novidades/novidades.module';
import { NovidadeModalPageModule } from '../pages/novidade-modal/novidade-modal.module';
import { ConfiguracoesBancaPageModule } from '../pages/configuracoes-banca/configuracoes-banca.module';
import { AovivoPageModule } from '../pages/aovivo/aovivo.module';
import { SimulacaoAdminPageModule } from '../pages/simulacao-admin/simulacao-admin.module';
import { PrinterProvider } from '../providers/printer-provider';
import { AovivoPartidaPageModule } from '../pages/aovivo-partida/aovivo-partida.module'
import { ConsultarBilhetePageModule} from '../pages/consultar-bilhete/consultar-bilhete.module'
import { GerentePageModule } from '../pages/gerente/gerente.module'
import { UsuarioCadastroPageModule } from '../pages/usuario-cadastro/usuario-cadastro.module';
import { UsuarioComissaoPageModule } from '../pages/usuario-comissao/usuario-comissao.module';
import { ConfiguracaoPageModule } from '../pages/configuracao/configuracao.module';
import { ConfiguracaoCadastroPageModule } from '../pages/configuracao-cadastro/configuracao-cadastro.module';
import { CaixaCambistaPageModule } from '../pages/caixa-cambista/caixa-cambista.module';
import { CaixaGerentePageModule } from '../pages/caixa-gerente/caixa-gerente.module';
import { ConfiguracaoService } from '../service/configuracao.service';
import { RankingPersonalizadoPageModule } from '../pages/ranking-personalizado/ranking-personalizado.module';
import { GerenciarAovivoPageModule } from '../pages/gerenciar-aovivo/gerenciar-aovivo.module';
import { HomeSmPageModule } from '../pages/home-sm/home-sm.module';
import { ClientesPageModule } from '../pages/clientes/clientes.module';
import { FaturaPageModule } from '../pages/fatura/fatura.module';
import { CreditoPageModule } from '../pages/credito/credito.module';
import { AovivoHorarioPageModule } from '../pages/aovivo-horario/aovivo-horario.module';
import { BolaoPageModule } from '../pages/bolao/bolao.module';
import { BolaoRodadaPageModule } from '../pages/bolao-rodada/bolao-rodada.module';
import { BolaoCadastroPageModule } from '../pages/bolao-cadastro/bolao-cadastro.module';
import { BolaoService } from '../service/bolao.service';
import { BilheteBolaoPageModule } from '../pages/bilhete-bolao/bilhete-bolao.module';
import { BolaoPalpitePageModule } from '../pages/bolao-palpite/bolao-palpite.module';
import { BolaoVencedoresPageModule } from '../pages/bolao-vencedores/bolao-vencedores.module';
import { IonicSelectableModule } from 'ionic-selectable';
import { JogoBinarioPageModule } from '../pages/jogo-binario/jogo-binario.module';

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
    CompeticaoPageModule,
    BilhetePageModule,
    TransacaoPageModule,
    MeusBilhetesPageModule,
    ApostaBilhetePageModule,
    ExtratoPageModule,
    SaquePageModule,
    MaisOpcoesPageModule,
    OpcaoCotacaoPageModule,
    PerfilPageModule,
    AlterarSenhaPageModule,
    LancarResultadoPageModule,
    SolicitacoesPageModule,
    SolicitacaoComprovantePageModule,
    BilhetesPendentesPageModule,
    BilhetesPendentesApostasPageModule,
    TransacoesPageModule,
    BilhetesAdminPageModule,
    ListaClientePageModule,
    ClienteSemCadastroPageModule,
    SuportePageModule,
    BilheteFiltroPageModule,
    RankingPageModule,
    CaixaPageModule,
    LancamentoManualPageModule,
    UsuariosPageModule,
    UsuarioModalPageModule,
    UsuarioExtratoPageModule,
    RegrasPageModule,
    BilheteSucessoPageModule,
    NovidadesPageModule,
    ConfiguracoesBancaPageModule,
    AovivoPageModule,
    AovivoPartidaPageModule,
    SimulacaoAdminPageModule,
    ConsultarBilhetePageModule,
    GerentePageModule,
    UsuarioCadastroPageModule,
    UsuarioComissaoPageModule,
    ConfiguracaoPageModule,
    ConfiguracaoCadastroPageModule,
    CaixaCambistaPageModule,
    CaixaGerentePageModule,
    RankingPersonalizadoPageModule,
    GerenciarAovivoPageModule,
    HomeSmPageModule,
    ClientesPageModule,
    FaturaPageModule,
    NovidadeModalPageModule,
    AovivoHorarioPageModule,
    CreditoPageModule,
    BolaoPageModule,
    BolaoRodadaPageModule,
    BolaoCadastroPageModule,
    BilheteBolaoPageModule,
    BolaoPalpitePageModule,
    BolaoVencedoresPageModule,
    BolaoRegrasPageModule,
    IonicSelectableModule,
    JogoBinarioPageModule
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

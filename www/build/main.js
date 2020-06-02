webpackJsonp([0],{

/***/ 123:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Bilhete; });
var Bilhete = /** @class */ (function () {
    function Bilhete() {
    }
    Bilhete.prototype.getCotacao = function () {
        var cotacao = 0;
        for (var _i = 0, _a = this.listaApostas; _i < _a.length; _i++) {
            var aposta = _a[_i];
            if (cotacao == 0) {
                cotacao = aposta.cotacaoAposta;
            }
            else {
                cotacao *= aposta.cotacaoAposta;
            }
        }
        this.cotacaoTotal = cotacao;
        return cotacao;
    };
    Bilhete.prototype.statusFormatado = function (bilhete) {
        var resultado = this.statusBilhete;
        if (this.statusBilhete == 'EM_ABERTO' || bilhete.statusBilhete == 'EM_ABERTO')
            resultado = "Em Aberto";
        if (this.statusBilhete == 'CANCELADO' || bilhete.statusBilhete == 'CANCELADO')
            resultado = "Cancelado";
        if (this.statusBilhete == 'FINALIZADO' || bilhete.statusBilhete == 'FINALIZADO')
            resultado = "Finalizado";
        return resultado;
    };
    Bilhete.prototype.statusAposta = function (statusAposta) {
        var resultado;
        if (statusAposta == 'NAO_APURADA')
            resultado = "Não Apurada";
        else if (statusAposta == 'PERDEDORA')
            resultado = "Perdedora";
        else if (statusAposta == 'CANCELADA')
            resultado = "Cancelada";
        else if (statusAposta == 'VENCEDORA')
            resultado = "Vencedora";
        return resultado;
    };
    Bilhete.prototype.descricaoAposta = function (bilhete) {
        var resultado = '';
        if (this.tipoAposta == 'APOSTA_SIMPLES' || bilhete.tipoAposta == 'APOSTA_SIMPLES') {
            resultado = "Aposta Simples";
        }
        else if (this.tipoAposta == 'APOSTA_MULTIPLA_DOIS' || bilhete.tipoAposta == 'APOSTA_MULTIPLA_DOIS') {
            resultado = "Aposta Multipla 2";
        }
        else if (this.tipoAposta == 'APOSTA_MULTIPLA_TRES' || bilhete.tipoAposta == 'APOSTA_MULTIPLA_TRES') {
            resultado = "Aposta Multipla 3";
        }
        else if (this.tipoAposta == 'APOSTA_MULTIPLA_MAIS_QUATRO' || bilhete.tipoAposta == 'APOSTA_MULTIPLA_MAIS_QUATRO') {
            resultado = "Aposta Multipla +4";
        }
        return resultado;
    };
    Bilhete.prototype.prepareHeaders = function (espacos, texto) {
        var resultado;
        resultado = texto + espacos.substr(0, (espacos.length - texto.length));
        return resultado;
    };
    return Bilhete;
}());

//# sourceMappingURL=bilhete.model.js.map

/***/ }),

/***/ 125:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MeuCaixaService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_api__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MeuCaixaService = /** @class */ (function () {
    function MeuCaixaService(http) {
        this.http = http;
        this.exibeRanking = true;
        this.classe = 'banca';
    }
    MeuCaixaService.prototype.getMeuCaixa = function (idUsuario, tipoUsuario, dataInicial, dataFinal) {
        var jsonComDatas = '';
        if (dataInicial && dataFinal) {
            jsonComDatas = '</>' + dataInicial + '</>' + dataFinal;
        }
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_api__["c" /* SERVICE */] + "/" + this.classe + "/getMeuCaixa", (String(__WEBPACK_IMPORTED_MODULE_2__app_api__["a" /* ID_BANCA */]) + '</>' + String(idUsuario) + '</>' + tipoUsuario + jsonComDatas))
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    MeuCaixaService.prototype.fecharCaixa = function () {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_api__["c" /* SERVICE */] + "/" + this.classe + "/fecharCaixa", __WEBPACK_IMPORTED_MODULE_2__app_api__["a" /* ID_BANCA */])
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    MeuCaixaService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], MeuCaixaService);
    return MeuCaixaService;
}());

//# sourceMappingURL=meu-caixa.service.js.map

/***/ }),

/***/ 126:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_competicao_service__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_tenis_service__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_bilhete_service__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__service_usuario_service__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__service_ranking_service__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__service_banca_service__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__service_configuracao_service__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__service_partida_service__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_file__ = __webpack_require__(228);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, modalCtrl, competicaoService, bs, us, rk, alertCtrl, navParams, tenisService, bancaService, configService, loadCtrl, toastCtrl, ps, file) {
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.competicaoService = competicaoService;
        this.bs = bs;
        this.us = us;
        this.rk = rk;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.tenisService = tenisService;
        this.bancaService = bancaService;
        this.configService = configService;
        this.loadCtrl = loadCtrl;
        this.toastCtrl = toastCtrl;
        this.ps = ps;
        this.file = file;
    }
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"E:\Ambiente Ionic\jukedroid\src\pages\home\home.html"*/'<ion-content>\n  <ion-slides pager>\n    <ion-slide class="imgSlide">\n      <img src="assets/imgs/CAPA_1.jpg" style="height: 50vh;" />\n    </ion-slide>\n    <ion-slide class="imgSlide">\n      <img src="assets/imgs/CAPA_2.jpg" style="height: 50vh;" />\n    </ion-slide>\n    <ion-slide class="imgSlide">\n      <img src="assets/imgs/CAPA_3.jpg" style="height: 50vh;" />\n    </ion-slide>\n  </ion-slides>\n</ion-content>\n\n\n'/*ion-inline-end:"E:\Ambiente Ionic\jukedroid\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */], __WEBPACK_IMPORTED_MODULE_2__service_competicao_service__["a" /* CompeticaoService */],
            __WEBPACK_IMPORTED_MODULE_4__service_bilhete_service__["a" /* BilheteService */], __WEBPACK_IMPORTED_MODULE_5__service_usuario_service__["a" /* UsuarioService */], __WEBPACK_IMPORTED_MODULE_6__service_ranking_service__["a" /* RankingService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__service_tenis_service__["a" /* TenisService */], __WEBPACK_IMPORTED_MODULE_7__service_banca_service__["a" /* BancaService */],
            __WEBPACK_IMPORTED_MODULE_8__service_configuracao_service__["a" /* ConfiguracaoService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_9__service_partida_service__["a" /* PartidaService */], __WEBPACK_IMPORTED_MODULE_10__ionic_native_file__["a" /* File */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 127:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RankingService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_api__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var RankingService = /** @class */ (function () {
    function RankingService(http) {
        this.http = http;
        this.exibeRanking = true;
        this.classe = 'usuario';
    }
    RankingService.prototype.getRanking = function () {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_api__["c" /* SERVICE */] + "/" + this.classe + "/getRanking", __WEBPACK_IMPORTED_MODULE_2__app_api__["a" /* ID_BANCA */])
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    RankingService.prototype.getRankingImage = function (tipoCategoria) {
        return __WEBPACK_IMPORTED_MODULE_2__app_api__["c" /* SERVICE */] + "/premiacao/getRankingImage/" + __WEBPACK_IMPORTED_MODULE_2__app_api__["a" /* ID_BANCA */] + "/" + tipoCategoria;
    };
    RankingService.prototype.getTodasPremiacoes = function () {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_api__["c" /* SERVICE */] + "/premiacao/getTodasPremiacoes", __WEBPACK_IMPORTED_MODULE_2__app_api__["a" /* ID_BANCA */])
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    RankingService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], RankingService);
    return RankingService;
}());

//# sourceMappingURL=ranking.service.js.map

/***/ }),

/***/ 172:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 172;

/***/ }),

/***/ 217:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/caixa/caixa.module": [
		218
	],
	"../pages/home-sm/home-sm.module": [
		224
	],
	"../pages/login/login.module": [
		230
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 217;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 218:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CaixaPageModule", function() { return CaixaPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__caixa__ = __webpack_require__(392);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CaixaPageModule = /** @class */ (function () {
    function CaixaPageModule() {
    }
    CaixaPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__caixa__["a" /* CaixaPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__caixa__["a" /* CaixaPage */]),
            ],
        })
    ], CaixaPageModule);
    return CaixaPageModule;
}());

//# sourceMappingURL=caixa.module.js.map

/***/ }),

/***/ 223:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Usuario; });
var Usuario = /** @class */ (function () {
    function Usuario() {
    }
    return Usuario;
}());

//# sourceMappingURL=usuario.model.js.map

/***/ }),

/***/ 224:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeSmPageModule", function() { return HomeSmPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_sm__ = __webpack_require__(399);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var HomeSmPageModule = /** @class */ (function () {
    function HomeSmPageModule() {
    }
    HomeSmPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__home_sm__["a" /* HomeSmPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__home_sm__["a" /* HomeSmPage */]),
            ],
        })
    ], HomeSmPageModule);
    return HomeSmPageModule;
}());

//# sourceMappingURL=home-sm.module.js.map

/***/ }),

/***/ 225:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_usuario_service__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__model_usuario_model__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__model_banca_model__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_js_sha256__ = __webpack_require__(400);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_js_sha256___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_js_sha256__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_storage__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__service_app_api__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__service_banca_service__ = __webpack_require__(48);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};












var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, navParams, usuarioService, toastCtrl, storage, alertCtrl, loadingCtrl, plt, bancaService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.usuarioService = usuarioService;
        this.toastCtrl = toastCtrl;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.plt = plt;
        this.bancaService = bancaService;
        this.cadastrar = false;
        this.entrar = false;
        this.inicio = true;
        this.login = '';
        this.senha = '';
        this.mensagem = '';
        this.DECIMAL_SEPARATOR = ".";
        this.GROUP_SEPARATOR = ",";
        this.existeLogin = false;
        this.lembrar = false;
        this.recuperarSenhaLink = __WEBPACK_IMPORTED_MODULE_8__service_app_api__["b" /* RECUPERAR_SENHA */];
        this.loader = undefined;
        this.mensagem = '';
        if (this.navParams.get('cadastrar') == undefined) {
            this.storage.get('login').then(function (val) {
                if (val != undefined) {
                    _this.login = val;
                    _this.clickInicioLogin();
                }
            });
            this.storage.get('lembrar').then(function (lembrar) {
                _this.lembrar = lembrar;
                if (lembrar) {
                    _this.reLogin(_this.navParams.get('saiu'));
                }
            });
        }
        else if (this.navParams.get('cadastrar')) {
            this.clickInicioCadastrar();
        }
        else {
            this.clickInicioLogin();
        }
    }
    LoginPage.prototype.clickInicioCadastrar = function () {
        this.cadastrar = true;
        this.entrar = false;
        this.inicio = false;
    };
    LoginPage.prototype.clickInicioLogin = function () {
        this.cadastrar = false;
        this.entrar = true;
        this.inicio = false;
    };
    LoginPage.prototype.clickInicioEntrar = function () {
        this.cadastrar = false;
        this.entrar = true;
        this.inicio = false;
    };
    LoginPage.prototype.clickVoltar = function () {
        var _this = this;
        this.usuarioService.verificaVersao().then(function (aceitavel) {
            if (!aceitavel) {
                if (_this.plt.is('android')) {
                    _this.versaoInvalida();
                }
            }
            else {
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
            }
        });
    };
    LoginPage.prototype.clickEntrar = function (event) {
        var _this = this;
        var usuario = new __WEBPACK_IMPORTED_MODULE_4__model_usuario_model__["a" /* Usuario */]();
        usuario.login = this.login;
        usuario.senha = Object(__WEBPACK_IMPORTED_MODULE_6_js_sha256__["sha256"])(this.senha);
        this.usuarioService.verificaVersao().then(function (aceitavel) {
            if (aceitavel) {
                _this.usuarioService.login(usuario).then(function (usuario) {
                    if (usuario != undefined && usuario.id > 0 && usuario.banca.id == __WEBPACK_IMPORTED_MODULE_8__service_app_api__["a" /* ID_BANCA */]) {
                        _this.storage.set('login', usuario.login);
                        if (_this.lembrar) {
                            _this.storage.set('lembrar', _this.lembrar);
                            _this.storage.set('senha', Object(__WEBPACK_IMPORTED_MODULE_6_js_sha256__["sha256"])(_this.senha));
                        }
                    }
                    else {
                        _this.usuarioService.usuario = new __WEBPACK_IMPORTED_MODULE_4__model_usuario_model__["a" /* Usuario */]();
                        _this.senha = '';
                        _this.mensagem = 'Login e/ou senha inválido(a)';
                    }
                });
            }
            else {
                if (_this.plt.is('android')) {
                    _this.versaoInvalida();
                }
            }
        });
        return true;
    };
    LoginPage.prototype.reLogin = function (saiu) {
        var _this = this;
        if (!saiu) {
            var usuario_1 = new __WEBPACK_IMPORTED_MODULE_4__model_usuario_model__["a" /* Usuario */]();
            this.storage.get('login').then(function (login) {
                usuario_1.login = login;
            });
            this.storage.get('senha').then(function (senha) {
                usuario_1.senha = senha;
                _this.usuarioService.verificaVersao().then(function (aceitavel) {
                    if (aceitavel) {
                        _this.usuarioService.login(usuario_1).then(function (usuario) {
                            if (usuario != undefined && usuario.id > 0 && usuario.banca.id == __WEBPACK_IMPORTED_MODULE_8__service_app_api__["a" /* ID_BANCA */]) {
                                if (_this.bancaService.banca.focoBolao && !_this.bancaService.banca.focoFutebol) {
                                }
                                else {
                                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
                                }
                            }
                            else {
                                console.log('Login inválido');
                                _this.mensagem = 'Login e/ou senha inválido(a)';
                            }
                        });
                    }
                    else {
                        if (_this.plt.is('android')) {
                            _this.versaoInvalida();
                        }
                    }
                });
            });
        }
    };
    LoginPage.prototype.clickCadastrar = function () {
        var _this = this;
        if (this.cadastroNome && this.cadastroLogin && this.cadastroSenha && this.cadastroConfirmacao) {
            if ((this.cadastroSenha != "" && this.cadastroConfirmacao != "") &&
                (this.cadastroSenha === this.cadastroConfirmacao)) {
                var usuario = new __WEBPACK_IMPORTED_MODULE_4__model_usuario_model__["a" /* Usuario */]();
                usuario.nome = this.cadastroNome;
                usuario.login = this.cadastroLogin;
                usuario.senha = this.cadastroSenha;
                usuario.tipoUsuario = 'CLIENTE';
                var banca = new __WEBPACK_IMPORTED_MODULE_5__model_banca_model__["a" /* Banca */]();
                banca.id = __WEBPACK_IMPORTED_MODULE_8__service_app_api__["a" /* ID_BANCA */];
                usuario.banca = banca;
                this.presentLoading();
                this.usuarioService.salvar(usuario).then(function (obj) {
                    if (obj != undefined && obj.id > 0) {
                        _this.cadastroNome = "";
                        _this.cadastroLogin = "";
                        _this.cadastroSenha = "";
                        _this.cadastroConfirmacao = "";
                        _this.clickVoltar();
                        _this.loader.dismissAll();
                        _this.dialogCadastrado();
                    }
                    else {
                        _this.presentToast("Já existe um usuário com o login e/ou e-mail informado");
                    }
                });
            }
            else {
                this.presentToast("A confirmação difere da senha digitada");
            }
        }
        else {
            this.presentToast("Todos os campos são obrigatórios");
        }
    };
    LoginPage.prototype.dialogCadastrado = function () {
        var confirm = this.alertCtrl.create({
            title: 'Cadastro',
            message: 'Cadastro realizado com sucesso!',
            buttons: [
                {
                    text: 'Ok',
                    handler: function () {
                    }
                }
            ]
        });
        confirm.present();
    };
    LoginPage.prototype.presentLoading = function () {
        this.loader = this.loadingCtrl.create({
            content: "Aguarde..."
        });
        this.loader.present();
    };
    LoginPage.prototype.versaoInvalida = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            enableBackdropDismiss: false,
            title: 'Atualização disponível',
            cssClass: 'alertVersao',
            subTitle: "Seu aplicativo est\u00E1 desatualizado. Todas as funcionalidades foram bloqueadas baixer a vers\u00E3o mais nova do aplicativo para utilizar todos os recursos.\n      \n\n      Vers\u00E3o atual: " + this.usuarioService.versao,
            buttons: [{
                    text: 'Baixar',
                    handler: function () {
                        window.open((_this.bancaService.banca.baixarPorLinkComum ? _this.bancaService.banca.linkDownload : _this.bancaService.banca.linkDownloadAlternativo));
                    }
                }]
        });
        alert.present();
    };
    LoginPage.prototype.presentToast = function (msg) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'bottom'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    LoginPage.prototype.formatFone = function (valString) {
        if (!valString) {
            return '';
        }
        var val = valString.toString();
        var parts = this.unFormat(val).split(this.DECIMAL_SEPARATOR);
        this.pureResult = parts;
        if (parts[0].length === 11) {
            this.maskedId = this.fone_mask(parts[0]);
            return this.maskedId;
        }
    };
    LoginPage.prototype.unFormat = function (val) {
        if (!val) {
            return '';
        }
        val = val.replace(/\D/g, '');
        val = val.replace('(', '');
        val = val.replace(')', '');
        val = val.replace(' ', '');
        val = val.replace('-', '');
        if (this.GROUP_SEPARATOR === ',') {
            return val.replace(/,/g, '');
        }
        else {
            return val.replace(/\./g, '');
        }
    };
    ;
    LoginPage.prototype.fone_mask = function (v) {
        v = v.replace(/\D/g, ''); //Remove tudo o que não é dígito
        v = v.replace(/(\d{2})(\d)/, '($1)$2'); //Coloca um ponto entre o terceiro e o quarto dígitos
        v = v.replace(/(\d{5})(\d)/, '$1-$2'); //Coloca um ponto entre o terceiro e o quarto dígitos
        //de novo (para o segundo bloco de números)
        return v;
    };
    LoginPage.prototype.verificaLogin = function () {
        var _this = this;
        var usuario = new __WEBPACK_IMPORTED_MODULE_4__model_usuario_model__["a" /* Usuario */]();
        var banca = new __WEBPACK_IMPORTED_MODULE_5__model_banca_model__["a" /* Banca */]();
        banca.id = __WEBPACK_IMPORTED_MODULE_8__service_app_api__["a" /* ID_BANCA */];
        usuario.banca = banca;
        usuario.login = this.cadastroLogin;
        usuario.id = 0;
        this.usuarioService.existeLogin(usuario).then(function (existe) { return _this.existeLogin = existe; });
    };
    LoginPage.prototype.validaForm = function () {
        var resultado = true;
        if (this.existeLogin) {
            resultado = false;
        }
        return resultado;
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"E:\Ambiente Ionic\jukedroid\src\pages\login\login.html"*/'<ion-content>\n\n</ion-content>\n'/*ion-inline-end:"E:\Ambiente Ionic\jukedroid\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__service_usuario_service__["a" /* UsuarioService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_7__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_9__service_banca_service__["a" /* BancaService */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 226:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Util; });
var Util = /** @class */ (function () {
    function Util() {
    }
    Util.prototype.toCamelCase = function (str) {
        return (" " + str).toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, function (match, chr) {
            return chr.toUpperCase();
        });
    };
    Util.prototype.toDate = function (dateStr) {
        var _a = dateStr.split("/"), day = _a[0], month = _a[1], year = _a[2];
        return new Date(year, month - 1, day);
    };
    Util.prototype.removeAcento = function (text) {
        if (text) {
            text = text.toLowerCase();
            text = text.replace(new RegExp('[ÁÀÂÃ]', 'gi'), 'a');
            text = text.replace(new RegExp('[ÉÈÊ]', 'gi'), 'e');
            text = text.replace(new RegExp('[ÍÌÎ]', 'gi'), 'i');
            text = text.replace(new RegExp('[ÓÒÔÕ]', 'gi'), 'o');
            text = text.replace(new RegExp('[ÚÙÛ]', 'gi'), 'u');
            text = text.replace(new RegExp('[Ç]', 'gi'), 'c');
        }
        return text;
    };
    return Util;
}());

//# sourceMappingURL=util.js.map

/***/ }),

/***/ 227:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TenisService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_api__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TenisService = /** @class */ (function () {
    function TenisService(http) {
        this.http = http;
        this.classe = 'tenis';
    }
    TenisService.prototype.listaCompeticoesPorTipo = function (tipoCompeticao) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_api__["c" /* SERVICE */] + "/" + this.classe + "/competicoesPorTipo", tipoCompeticao)
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    TenisService.prototype.listaJogosDoDia = function () {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_api__["c" /* SERVICE */] + "/" + this.classe + "/jogosDoDia", '')
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    TenisService.prototype.isAtualizando = function () {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_api__["c" /* SERVICE */] + "/" + this.classe + "/isAtualizandoTenis", '')
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    TenisService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], TenisService);
    return TenisService;
}());

//# sourceMappingURL=tenis.service.js.map

/***/ }),

/***/ 230:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginPageModule", function() { return LoginPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login__ = __webpack_require__(225);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var LoginPageModule = /** @class */ (function () {
    function LoginPageModule() {
    }
    LoginPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__login__["a" /* LoginPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__login__["a" /* LoginPage */]),
            ]
        })
    ], LoginPageModule);
    return LoginPageModule;
}());

//# sourceMappingURL=login.module.js.map

/***/ }),

/***/ 272:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TransacaoService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_api__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TransacaoService = /** @class */ (function () {
    function TransacaoService(http) {
        this.http = http;
        this.classe = 'banca';
    }
    TransacaoService.prototype.salvarTransacao = function (transacao) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_api__["c" /* SERVICE */] + "/" + this.classe + "/salvarTransacao", JSON.stringify(transacao))
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    TransacaoService.prototype.addCredito = function (lancamento) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_api__["c" /* SERVICE */] + "/" + this.classe + "/addCredito", JSON.stringify(lancamento))
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    TransacaoService.prototype.getDescricaoLancamentoMovimentoCreditoCambistaGerente = function (idUsuario) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_api__["c" /* SERVICE */] + "/" + this.classe + "/tipoDescricaoLancamentoMovimentoCreditoCambistaGerente", idUsuario)
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    TransacaoService.prototype.upload = function (formData) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_api__["c" /* SERVICE */] + "/" + this.classe + "/uploadTransacaoImagem", formData)
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) { return data; });
    };
    TransacaoService.prototype.getImage = function (id) {
        return __WEBPACK_IMPORTED_MODULE_2__app_api__["c" /* SERVICE */] + "/" + this.classe + "/transacaoImage/" + id;
    };
    TransacaoService.prototype.getExtrato = function (usuario) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_api__["c" /* SERVICE */] + "/" + this.classe + "/getExtrato", usuario.id)
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    TransacaoService.prototype.getTransacoes = function () {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_api__["c" /* SERVICE */] + "/" + this.classe + "/getTransacoes", __WEBPACK_IMPORTED_MODULE_2__app_api__["a" /* ID_BANCA */])
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    TransacaoService.prototype.getTransacoesPendentes = function () {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_api__["c" /* SERVICE */] + "/" + this.classe + "/getTransacoesPendentes", __WEBPACK_IMPORTED_MODULE_2__app_api__["a" /* ID_BANCA */])
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    TransacaoService.prototype.atualizaTransacoes = function (transacoes) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_api__["c" /* SERVICE */] + "/" + this.classe + "/atualizaTransacoes", JSON.stringify(transacoes))
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    TransacaoService.prototype.descricaoLancamento = function (chave) {
        var retorno = '';
        switch (chave) {
            case "DEPOSITO_CLIENTE": {
                retorno = "Depósito do Cliente";
                break;
            }
            case "CREDITO_CAMBISTA": {
                retorno = "Crédito no Saldo do Cambista/Gerente";
                break;
            }
            case "SAQUE_CLIENTE": {
                retorno = "Saque do Cliente";
                break;
            }
            case "BILHETE": {
                retorno = "Bilhete";
                break;
            }
            case "PAGAMENTO_CLIENTE": {
                retorno = "Pagamento ao Cliente";
                break;
            }
            case "CANCELAMENTO_BILHETE": {
                retorno = "Cancelamento do Bilhete";
                break;
            }
            case "DEBITO": {
                retorno = "Débito";
                break;
            }
            case "CREDITO": {
                retorno = "Crédito";
                break;
            }
            case "SAQUE_BANCA": {
                retorno = "Saque da Banca";
                break;
            }
            case "REPOSICAO_CAMBISTA": {
                retorno = "Reposição de Crédito para o Cambista";
                break;
            }
            case "REPOSICAO_GERENTE": {
                retorno = "Reposição de Crédito para o Gerente";
                break;
            }
            case "REPOSICAO_BANCA": {
                retorno = "Reposição de Crédito para a Banca";
                break;
            }
            case "DEBITO_CAMBISTA": {
                retorno = "Débito no Saldo do Cambista/Gerente";
                break;
            }
        }
        return retorno;
    };
    TransacaoService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], TransacaoService);
    return TransacaoService;
}());

//# sourceMappingURL=transacao.service.js.map

/***/ }),

/***/ 273:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PrinterProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_bluetooth_serial__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__printer_commands__ = __webpack_require__(423);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__model_bilhete_model__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__service_banca_service__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(63);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var PrinterProvider = /** @class */ (function () {
    function PrinterProvider(btSerial, alertCtrl, loadCtrl, storage, bs) {
        var _this = this;
        this.btSerial = btSerial;
        this.alertCtrl = alertCtrl;
        this.loadCtrl = loadCtrl;
        this.storage = storage;
        this.bs = bs;
        this.bs.getBancaAtual().then(function (banca) {
            _this.banca = banca;
        });
    }
    PrinterProvider.prototype.searchBt = function () {
        return this.btSerial.list();
    };
    PrinterProvider.prototype.connectBT = function (address) {
        return this.btSerial.connect(address);
    };
    PrinterProvider.prototype.listaDispositivos = function () {
        var _this = this;
        this.btSerial.enable().then(function (ativo) {
            _this.searchBt().then(function (lista) {
                var alert = _this.alertCtrl.create();
                for (var _i = 0, lista_1 = lista; _i < lista_1.length; _i++) {
                    var dispositivo = lista_1[_i];
                    alert.addInput({
                        type: 'radio',
                        label: dispositivo.name,
                        value: dispositivo.address
                    });
                }
                alert.addButton('Cancelar');
                alert.addButton({
                    text: 'OK',
                    handler: function (data) {
                        console.log('Radio data:', data);
                        _this.storage.set('impressora', data);
                    }
                });
                alert.present();
            });
        });
    };
    PrinterProvider.prototype.print = function (address, data) {
        var _this = this;
        var load = this.loadCtrl.create({
            content: 'Imprimindo...'
        });
        load.present();
        var btPrinter = this.connectBT(address).subscribe(function (status) {
            console.log(status);
            _this.btSerial.write(_this.noSpecialChars(data))
                .then(function (printStatus) {
                console.log(printStatus);
                var alert = _this.alertCtrl.create({
                    title: 'Impressão Concluída!',
                    buttons: ['OK']
                });
                load.dismiss();
                alert.present().then(function (alertStatus) {
                    btPrinter.unsubscribe();
                });
            })
                .catch(function (error) {
                console.log(error);
                var alert = _this.alertCtrl.create({
                    title: 'Houve um erro na impressão, tente novamente!',
                    buttons: ['OK']
                });
                load.dismiss();
                alert.present();
                btPrinter.unsubscribe();
            });
        }, function (error) {
            console.log(error);
            var alert = _this.alertCtrl.create({
                title: 'Erro ao encontrar dispositivo, na parte superior do menu conecte novamente a impressora!',
                buttons: ['OK']
            });
            load.dismiss();
            alert.present();
        });
    };
    PrinterProvider.prototype.noSpecialChars = function (string) {
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
        }, translate_re = /[àáâãäåæçèéêëìíîïðñòóôõöøùúûüýþßàáâãäåæçèéêëìíîïðñòóôõöøùúûýýþÿŕŕÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝÞßÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÝÝÞŸŔŔ]/gim;
        return (string.replace(translate_re, function (match) {
            return translate[match];
        }));
    };
    PrinterProvider.prototype.imprimirBilhete = function (address, bilhete) {
        var funcoesBilhete = new __WEBPACK_IMPORTED_MODULE_4__model_bilhete_model__["a" /* Bilhete */]();
        var title = bilhete.usuario.banca.nome;
        var subtitle = "Bilhete";
        var data = '';
        data += __WEBPACK_IMPORTED_MODULE_3__printer_commands__["a" /* PrinterCommands */].HARDWARE.HW_INIT;
        //Título
        data += __WEBPACK_IMPORTED_MODULE_3__printer_commands__["a" /* PrinterCommands */].TEXT_FORMAT.TXT_4SQUARE;
        data += __WEBPACK_IMPORTED_MODULE_3__printer_commands__["a" /* PrinterCommands */].TEXT_FORMAT.TXT_ALIGN_CT;
        data += title.toUpperCase();
        data += __WEBPACK_IMPORTED_MODULE_3__printer_commands__["a" /* PrinterCommands */].EOL;
        data += __WEBPACK_IMPORTED_MODULE_3__printer_commands__["a" /* PrinterCommands */].EOL;
        //SubTítulo
        data += __WEBPACK_IMPORTED_MODULE_3__printer_commands__["a" /* PrinterCommands */].TEXT_FORMAT.TXT_ALIGN_CT;
        data += __WEBPACK_IMPORTED_MODULE_3__printer_commands__["a" /* PrinterCommands */].TEXT_FORMAT.TXT_NORMAL;
        data += subtitle;
        data += __WEBPACK_IMPORTED_MODULE_3__printer_commands__["a" /* PrinterCommands */].EOL;
        data += bilhete.numeroBilhete;
        data += __WEBPACK_IMPORTED_MODULE_3__printer_commands__["a" /* PrinterCommands */].EOL;
        data += this.tipoPartidaBilhete(bilhete.tipoPartida);
        data += __WEBPACK_IMPORTED_MODULE_3__printer_commands__["a" /* PrinterCommands */].EOL;
        data += __WEBPACK_IMPORTED_MODULE_3__printer_commands__["a" /* PrinterCommands */].HORIZONTAL_LINE.HR3_58MM;
        data += __WEBPACK_IMPORTED_MODULE_3__printer_commands__["a" /* PrinterCommands */].EOL;
        //Tipo da Aposta
        data += funcoesBilhete.descricaoAposta(bilhete);
        data += __WEBPACK_IMPORTED_MODULE_3__printer_commands__["a" /* PrinterCommands */].EOL;
        //Data
        data += __WEBPACK_IMPORTED_MODULE_3__printer_commands__["a" /* PrinterCommands */].TEXT_FORMAT.TXT_ALIGN_LT;
        data += 'Data da Impressão: ' + new Intl.DateTimeFormat('pt-BR').format(new Date());
        data += __WEBPACK_IMPORTED_MODULE_3__printer_commands__["a" /* PrinterCommands */].EOL;
        data += 'Cliente: ' + (bilhete.clienteNome != undefined ? bilhete.clienteNome : bilhete.usuario.nome);
        data += __WEBPACK_IMPORTED_MODULE_3__printer_commands__["a" /* PrinterCommands */].EOL;
        if (bilhete.clienteNome) {
            data += 'Cambista: ' + bilhete.usuario.nome;
            data += __WEBPACK_IMPORTED_MODULE_3__printer_commands__["a" /* PrinterCommands */].EOL;
        }
        data += __WEBPACK_IMPORTED_MODULE_3__printer_commands__["a" /* PrinterCommands */].HORIZONTAL_LINE.HR3_58MM;
        data += __WEBPACK_IMPORTED_MODULE_3__printer_commands__["a" /* PrinterCommands */].EOL;
        //Headers
        data += funcoesBilhete.prepareHeaders(__WEBPACK_IMPORTED_MODULE_3__printer_commands__["a" /* PrinterCommands */].SPACE_22, 'Aposta') + 'Cotação';
        data += __WEBPACK_IMPORTED_MODULE_3__printer_commands__["a" /* PrinterCommands */].EOL;
        data += __WEBPACK_IMPORTED_MODULE_3__printer_commands__["a" /* PrinterCommands */].HORIZONTAL_LINE.HR3_58MM;
        data += __WEBPACK_IMPORTED_MODULE_3__printer_commands__["a" /* PrinterCommands */].EOL;
        //Apostas
        for (var _i = 0, _a = bilhete.listaApostas; _i < _a.length; _i++) {
            var aposta = _a[_i];
            data += aposta.competicao + ' - ' + aposta.tipoCompeticao.replace('_', ' ').replace('_', ' ');
            data += __WEBPACK_IMPORTED_MODULE_3__printer_commands__["a" /* PrinterCommands */].EOL;
            data += aposta.evento;
            data += __WEBPACK_IMPORTED_MODULE_3__printer_commands__["a" /* PrinterCommands */].EOL;
            data += funcoesBilhete.prepareHeaders(__WEBPACK_IMPORTED_MODULE_3__printer_commands__["a" /* PrinterCommands */].SPACE_21, aposta.dataFormatada);
            data += __WEBPACK_IMPORTED_MODULE_3__printer_commands__["a" /* PrinterCommands */].EOL;
            data += aposta.tipoAposta;
            data += __WEBPACK_IMPORTED_MODULE_3__printer_commands__["a" /* PrinterCommands */].EOL;
            data += funcoesBilhete.prepareHeaders(__WEBPACK_IMPORTED_MODULE_3__printer_commands__["a" /* PrinterCommands */].SPACE_21, aposta.escolha) + String(aposta.cotacaoAposta);
            data += __WEBPACK_IMPORTED_MODULE_3__printer_commands__["a" /* PrinterCommands */].EOL;
            data += funcoesBilhete.prepareHeaders(__WEBPACK_IMPORTED_MODULE_3__printer_commands__["a" /* PrinterCommands */].SPACE_21, 'Status Aposta') + funcoesBilhete.statusAposta(aposta.statusAposta);
            data += __WEBPACK_IMPORTED_MODULE_3__printer_commands__["a" /* PrinterCommands */].EOL;
            data += __WEBPACK_IMPORTED_MODULE_3__printer_commands__["a" /* PrinterCommands */].HORIZONTAL_LINE.HR3_58MM;
            data += __WEBPACK_IMPORTED_MODULE_3__printer_commands__["a" /* PrinterCommands */].EOL;
        }
        //Totais
        data += funcoesBilhete.prepareHeaders(__WEBPACK_IMPORTED_MODULE_3__printer_commands__["a" /* PrinterCommands */].SPACE_21, 'COTAÇÃO TOTAL') + String(bilhete.cotacaoTotal);
        data += __WEBPACK_IMPORTED_MODULE_3__printer_commands__["a" /* PrinterCommands */].EOL;
        data += funcoesBilhete.prepareHeaders(__WEBPACK_IMPORTED_MODULE_3__printer_commands__["a" /* PrinterCommands */].SPACE_21, 'TOTAL APOSTADO') + String(bilhete.valor);
        data += __WEBPACK_IMPORTED_MODULE_3__printer_commands__["a" /* PrinterCommands */].EOL;
        data += funcoesBilhete.prepareHeaders(__WEBPACK_IMPORTED_MODULE_3__printer_commands__["a" /* PrinterCommands */].SPACE_21, 'POSSÍVEL RETORNO') + String(bilhete.valorPossivelRetorno);
        data += __WEBPACK_IMPORTED_MODULE_3__printer_commands__["a" /* PrinterCommands */].EOL;
        if (bilhete.valorPremioDois && bilhete.valorPremioDois > 0) {
            data += funcoesBilhete.prepareHeaders(__WEBPACK_IMPORTED_MODULE_3__printer_commands__["a" /* PrinterCommands */].SPACE_21, 'SEGUNDO PRÊMIO') + String(bilhete.valorPremioDois);
            data += __WEBPACK_IMPORTED_MODULE_3__printer_commands__["a" /* PrinterCommands */].EOL;
        }
        if (bilhete.valorPremioTres && bilhete.valorPremioTres > 0) {
            data += funcoesBilhete.prepareHeaders(__WEBPACK_IMPORTED_MODULE_3__printer_commands__["a" /* PrinterCommands */].SPACE_21, 'TERCEIRO PRÊMIO') + String(bilhete.valorPremioTres);
            data += __WEBPACK_IMPORTED_MODULE_3__printer_commands__["a" /* PrinterCommands */].EOL;
        }
        data += funcoesBilhete.prepareHeaders(__WEBPACK_IMPORTED_MODULE_3__printer_commands__["a" /* PrinterCommands */].SPACE_21, 'STATUS DO BILHETE') + funcoesBilhete.statusFormatado(bilhete);
        data += __WEBPACK_IMPORTED_MODULE_3__printer_commands__["a" /* PrinterCommands */].EOL;
        data += __WEBPACK_IMPORTED_MODULE_3__printer_commands__["a" /* PrinterCommands */].HORIZONTAL_LINE.HR3_58MM;
        data += __WEBPACK_IMPORTED_MODULE_3__printer_commands__["a" /* PrinterCommands */].EOL;
        //Footer
        if (bilhete.tipoPartida == 'ACUMULADAO') {
            data += "Se houver mais de um ganhador do acumuladão, o prêmio será dividido entre os ganhadores";
        }
        else {
            data += ((this.banca.mensagemFinalBilhete && this.banca.mensagemFinalBilhete.length > 0) ? this.banca.mensagemFinalBilhete : 'A Banca dá um prazo de até 72   horas para pagamento dos prêmios');
        }
        data += __WEBPACK_IMPORTED_MODULE_3__printer_commands__["a" /* PrinterCommands */].EOL;
        data += __WEBPACK_IMPORTED_MODULE_3__printer_commands__["a" /* PrinterCommands */].EOL;
        data += __WEBPACK_IMPORTED_MODULE_3__printer_commands__["a" /* PrinterCommands */].EOL;
        this.print(address, data);
    };
    PrinterProvider.prototype.tipoPartidaBilhete = function (tipoPartida) {
        var retorno = "";
        switch (tipoPartida) {
            case 'PRE_JOGO':
                {
                    retorno = "Pré Jogo";
                }
                ;
                break;
            case 'AO_VIVO':
                {
                    retorno = "Ao Vivo";
                }
                ;
                break;
            case 'ACUMULADAO':
                {
                    retorno = "Acumuladão";
                }
                ;
                break;
        }
        return retorno;
    };
    PrinterProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ionic_native_bluetooth_serial__["a" /* BluetoothSerial */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_5__service_banca_service__["a" /* BancaService */]])
    ], PrinterProvider);
    return PrinterProvider;
}());

//# sourceMappingURL=printer-provider.js.map

/***/ }),

/***/ 275:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NovidadeService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_api__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var NovidadeService = /** @class */ (function () {
    function NovidadeService(http, storage) {
        this.http = http;
        this.storage = storage;
        this.classe = 'banca';
    }
    NovidadeService.prototype.getNovidades = function () {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__app_api__["c" /* SERVICE */] + "/" + this.classe + "/getNovidades", __WEBPACK_IMPORTED_MODULE_3__app_api__["a" /* ID_BANCA */])
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    NovidadeService.prototype.getImage = function (id) {
        return __WEBPACK_IMPORTED_MODULE_3__app_api__["c" /* SERVICE */] + "/" + this.classe + "/novidadeImage/" + id;
    };
    NovidadeService.prototype.getNovidadesNaoVisualizadas = function () {
        var _this = this;
        var retorno = 0;
        return this.getNovidades().then(function (lista) {
            return _this.storage.get('notificacoesVisualizadas').then(function (visualizadas) {
                if (visualizadas) {
                    for (var i = 0; i < lista.length; i++) {
                        if (visualizadas[i] == undefined) {
                            retorno++;
                        }
                        if (visualizadas[i] != undefined && lista[i].id != visualizadas[i].id) {
                            retorno++;
                        }
                        ;
                    }
                }
                else {
                    retorno = lista.length;
                }
                _this.novidadesNaoVisualizadas = retorno;
            }).then(function (retorno) { return _this.novidadesNaoVisualizadas; });
        }).then(function (retorno) { return _this.novidadesNaoVisualizadas; });
    };
    NovidadeService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
    ], NovidadeService);
    return NovidadeService;
}());

//# sourceMappingURL=novidade.service.js.map

/***/ }),

/***/ 367:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(372);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 372:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(422);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_file_transfer__ = __webpack_require__(424);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_file__ = __webpack_require__(228);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__ = __webpack_require__(425);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_bluetooth_serial__ = __webpack_require__(274);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_status_bar__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_splash_screen__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_login_login_module__ = __webpack_require__(230);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__service_usuario_service__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__service_banca_service__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__angular_http__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_home_home_module__ = __webpack_require__(426);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__service_competicao_service__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__service_tenis_service__ = __webpack_require__(227);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__service_partida_service__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__service_bilhete_service__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__service_transacao_service__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__service_conta_service__ = __webpack_require__(427);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ionic_native_social_sharing__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__service_aposta_service__ = __webpack_require__(428);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ionic_storage__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__service_ranking_service__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_caixa_caixa_module__ = __webpack_require__(218);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__service_meu_caixa_service__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__service_novidade_service__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__service_aovivo_service__ = __webpack_require__(429);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__providers_printer_provider__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__service_configuracao_service__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_home_sm_home_sm_module__ = __webpack_require__(224);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__service_bolao_service__ = __webpack_require__(430);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33_ionic_selectable__ = __webpack_require__(431);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


































var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_13__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/caixa/caixa.module#CaixaPageModule', name: 'CaixaPage', segment: 'caixa', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/home-sm/home-sm.module#HomeSmPageModule', name: 'HomeSmPage', segment: 'home-sm', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_23__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_10__pages_login_login_module__["LoginPageModule"],
                __WEBPACK_IMPORTED_MODULE_14__pages_home_home_module__["a" /* HomePageModule */],
                __WEBPACK_IMPORTED_MODULE_25__pages_caixa_caixa_module__["CaixaPageModule"],
                __WEBPACK_IMPORTED_MODULE_31__pages_home_sm_home_sm_module__["HomeSmPageModule"],
                __WEBPACK_IMPORTED_MODULE_33_ionic_selectable__["a" /* IonicSelectableModule */],
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_file_transfer__["a" /* FileTransfer */],
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_file_transfer__["b" /* FileTransferObject */],
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_file__["a" /* File */],
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_21__ionic_native_social_sharing__["a" /* SocialSharing */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_bluetooth_serial__["a" /* BluetoothSerial */],
                __WEBPACK_IMPORTED_MODULE_29__providers_printer_provider__["a" /* PrinterProvider */],
                __WEBPACK_IMPORTED_MODULE_11__service_usuario_service__["a" /* UsuarioService */],
                __WEBPACK_IMPORTED_MODULE_15__service_competicao_service__["a" /* CompeticaoService */],
                __WEBPACK_IMPORTED_MODULE_16__service_tenis_service__["a" /* TenisService */],
                __WEBPACK_IMPORTED_MODULE_17__service_partida_service__["a" /* PartidaService */],
                __WEBPACK_IMPORTED_MODULE_18__service_bilhete_service__["a" /* BilheteService */],
                __WEBPACK_IMPORTED_MODULE_19__service_transacao_service__["a" /* TransacaoService */],
                __WEBPACK_IMPORTED_MODULE_22__service_aposta_service__["a" /* ApostaService */],
                __WEBPACK_IMPORTED_MODULE_24__service_ranking_service__["a" /* RankingService */],
                __WEBPACK_IMPORTED_MODULE_26__service_meu_caixa_service__["a" /* MeuCaixaService */],
                __WEBPACK_IMPORTED_MODULE_20__service_conta_service__["a" /* ContaService */],
                __WEBPACK_IMPORTED_MODULE_27__service_novidade_service__["a" /* NovidadeService */],
                __WEBPACK_IMPORTED_MODULE_12__service_banca_service__["a" /* BancaService */],
                __WEBPACK_IMPORTED_MODULE_28__service_aovivo_service__["a" /* AoVivoService */],
                __WEBPACK_IMPORTED_MODULE_30__service_configuracao_service__["a" /* ConfiguracaoService */],
                __WEBPACK_IMPORTED_MODULE_32__service_bolao_service__["a" /* BolaoService */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 392:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CaixaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_bilhete_service__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__service_meu_caixa_service__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_usuario_service__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__service_app_api__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var CaixaPage = /** @class */ (function () {
    function CaixaPage(navCtrl, navParams, viewCtrl, bs, mcs, modalCtrl, alertCtrl, us, loadCtrl, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.bs = bs;
        this.mcs = mcs;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.us = us;
        this.loadCtrl = loadCtrl;
        this.toastCtrl = toastCtrl;
        this.tipo = 0;
        this.visibleEntradaAberto = false;
        this.visibleEntradaFinalizado = false;
        this.visibleAdmins = false;
        this.visibleGerentes = false;
        this.visibleCambistas = false;
        this.visibleCambSemGerente = false;
        this.visibleClientes = false;
        this.visibleEntradaTotal = false;
        this.visibleTodasEntradas = false;
        this.visibleTodasSaidas = false;
        this.bilhete = bs.getBilhete();
        this.meuCaixa = navParams.get('meuCaixa');
        this.tipo = navParams.get('tipo');
        this.isModal = navParams.get('isModal');
        this.prepareValores();
        if (this.tipo == 1) {
            this.titulo = 'Caixa(Apuração) da Banca';
        }
        else {
            this.titulo = (this.isModal ? 'Caixa (Apuração) ' + this.meuCaixa.usuario.nome : 'Caixa (Apuração)');
        }
    }
    CaixaPage.prototype.voltar = function () {
        this.viewCtrl.dismiss();
    };
    CaixaPage.prototype.statusTotal = function () {
        var retorno;
        if (this.meuCaixa.totalLiquido == 0) {
            retorno = 'azul';
        }
        else if (this.meuCaixa.totalLiquido > 0) {
            retorno = 'verde';
        }
        else if (this.meuCaixa.totalLiquido < 0) {
            retorno = 'vermelho';
        }
        return retorno;
    };
    CaixaPage.prototype.consultaCaixa = function (dataInicial, dataFinal) {
        var _this = this;
        var load = this.loadCtrl.create();
        load.present();
        dataInicial = new Date(dataInicial).toISOString();
        dataFinal = new Date(dataFinal).toISOString();
        this.mcs.getMeuCaixa(this.us.usuario.id, this.us.usuario.tipoUsuario, dataInicial, dataFinal).then(function (meuCaixa) {
            _this.meuCaixa = meuCaixa;
            _this.prepareValores();
            load.dismiss();
        });
    };
    CaixaPage.prototype.detalhaSaldo = function () {
        if (this.tipo == 0) {
            return;
        }
        var alert = this.alertCtrl.create({
            title: "Detalhamento do Saldo Atual",
            message: "<p>Total de Entradas: " + String(this.totalEntrada.toFixed(2)) + '<br/>' +
                "Total de Saídas: " + String(this.saida.toFixed(2)) + '<br/>' +
                "Total de Comissões: " + String(this.comissao.toFixed(2)) + '<br/>' +
                "Saldo Atual: " + String(this.totalEntrada.toFixed(2)) + ' - ' + String(this.saida.toFixed(2)) + ' - ' + String(this.comissao.toFixed(2)) + ' = ' + String(this.saldoAtual.toFixed(2)) + '<br/>' +
                "Total de Bilhetes Em Aberto: " + String(this.meuCaixa.totalBilhetesVencedoresEmAberto.toFixed(2)) + '<br/>' +
                '<br/>' +
                "Saldo Atual Com Bilhetes Vencedores Em Aberto: " + String(this.saldoAtual.toFixed(2)) + ' - ' + String(this.meuCaixa.totalBilhetesVencedoresEmAberto.toFixed(2)) + ' = ' +
                String(this.meuCaixa.saldoAtualComBilhetesVencedoresEmAberto.toFixed(2)) + '</p>',
            cssClass: "alertSaldo",
            buttons: ['OK']
        });
        alert.present();
    };
    CaixaPage.prototype.prepareValores = function () {
        this.lancamento = this.meuCaixa.totalLancamento;
        this.saida = this.meuCaixa.totalSaida;
        this.comissao = this.meuCaixa.totalComissao;
        this.saldoAtual = (this.tipo == 1 ? this.meuCaixa.saldoAtualComBilhetesVencedoresEmAberto : this.meuCaixa.saldoAtual);
        this.saldoAnterior = this.meuCaixa.saldoAnterior;
        this.liquido = this.meuCaixa.totalLiquido;
        switch (this.meuCaixa.usuario.tipoUsuario) {
            case "GERENTE": {
                this.entrada = this.meuCaixa.totalEntradaFinalizadoGerente;
                this.entradaEmAberto = this.meuCaixa.totalEntradaEmAbertoGerente;
                break;
            }
            case "CAMBISTA": {
                this.entrada = this.meuCaixa.totalEntradaFinalizadoCambista;
                this.entradaEmAberto = this.meuCaixa.totalEntradaEmAbertoCambista;
                break;
            }
            case "ADMINISTRADOR": {
                this.bilhetesCancelados = this.meuCaixa.totalEntradaCanceladoCliente;
                this.entrada = this.meuCaixa.totalEntradaFinalizadoGeral;
                this.entradaEmAberto = this.meuCaixa.totalEntradaEmAbertoGeral;
                this.entradaAbertoGerente = this.meuCaixa.totalEntradaEmAbertoGerente;
                this.entradaAbertoCambista = this.meuCaixa.totalEntradaEmAbertoCambista;
                this.entradaAbertoCliente = this.meuCaixa.totalEntradaEmAbertoCliente;
                this.entradaAbertoAdministrador = this.meuCaixa.totalEntradaFinalizadoAdministrador;
                this.entradaGerente = this.meuCaixa.totalEntradaFinalizadoGerente;
                this.entradaCambista = this.meuCaixa.totalEntradaFinalizadoCambista;
                this.entradaCliente = this.meuCaixa.totalEntradaFinalizadoCliente;
                this.entradaDeposito = this.meuCaixa.totalEntradaDeposito;
                this.entradaAdministrador = this.meuCaixa.totalEntradaFinalizadoAdministrador;
                this.totalEntrada = this.meuCaixa.totalGeralEntrada;
                this.totalCreditoClientes = this.meuCaixa.saldoTotalCreditoCliente;
                break;
            }
        }
        if (__WEBPACK_IMPORTED_MODULE_5__service_app_api__["a" /* ID_BANCA */] == 1 && this.tipo == 0) {
            this.meuCaixa.totalLiquido = (this.meuCaixa.totalLiquido * (-1));
        }
    };
    CaixaPage.prototype.fecharCaixa = function () {
        var _this = this;
        var load = this.loadCtrl.create();
        load.present();
        var alert = this.alertCtrl.create({
            title: "Fechar Caixa",
            message: "Deseja realmente fechar esse Caixa e inicar um novo Caixa?",
            buttons: [{
                    text: 'Cancelar',
                    handler: function () {
                        alert.dismiss;
                        load.dismiss();
                    }
                },
                {
                    text: 'Confirmar',
                    handler: function () {
                        _this.mcs.fecharCaixa().then(function (caixa) {
                            _this.meuCaixa = caixa;
                            _this.prepareValores();
                            var toastMsg = _this.toastCtrl.create({
                                message: "Caixa fechado com sucesso!",
                                duration: 3000
                            });
                            toastMsg.present();
                        }).catch(function (erro) {
                            load.dismiss();
                            var toastMsg = _this.toastCtrl.create({
                                message: "Erro ao fechar o caixa.",
                                duration: 3000
                            });
                            toastMsg.present();
                        });
                    }
                }]
        });
        alert.present();
    };
    CaixaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-caixa',template:/*ion-inline-start:"E:\Ambiente Ionic\jukedroid\src\pages\caixa\caixa.html"*/'<ion-header>\n    <ion-navbar>\n      <button ion-button menuToggle *ngIf="!isModal">\n        <ion-icon name="menu"></ion-icon>\n      </button>\n      <ion-buttons start *ngIf="isModal">\n        <button ion-button (click)="voltar()" color="botaoVoltar">Voltar</button>\n      </ion-buttons>\n      <ion-title>{{titulo}}</ion-title>\n    </ion-navbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-card>\n      <ion-card-header>\n        Período do Caixa\n      </ion-card-header>\n      <ion-card-content style="padding: 0;">\n        <ion-grid style="padding-top: 0; padding-bottom: 0;">\n          <ion-row>\n            <ion-item col-5>\n              <ion-label stacked>Data Inicial</ion-label>\n              <ion-datetime color="primary" displayFormat="DD/MM/YYYY" [(ngModel)]="dataInicial" name="dataInicial" placeholder="__/__/____" style="padding: 5px 0px"></ion-datetime>\n            </ion-item>\n\n            <ion-item col-5>\n              <ion-label stacked>Data Final</ion-label>\n              <ion-datetime color="primary" displayFormat="DD/MM/YYYY" [(ngModel)]="dataFinal" name="dataFinal" placeholder="__/__/____" style="padding: 5px 0px"></ion-datetime>\n            </ion-item>\n\n            <button ion-button icon-only small outline style="margin: auto; font-size: 17px; color: #5b5b5b; border: none;" (click)="consultaCaixa(dataInicial, dataFinal)"><ion-icon name="search"></ion-icon></button>\n          </ion-row>\n        </ion-grid>\n      </ion-card-content>\n    </ion-card>\n\n    <ion-card>\n      <ion-card-content>\n        <ion-grid>\n          <ion-row class="aposta-row">\n            <ion-col col-7 class="aposta-title">Total de Bilhetes</ion-col>\n            <ion-col col-5 class="aposta-description">{{meuCaixa.totalBilhetes || 0}}</ion-col>\n          </ion-row>\n        </ion-grid>\n      </ion-card-content>\n    </ion-card>\n\n    <ion-card *ngIf="tipo == 1">\n      <ion-card-header>\n        <ion-grid>\n          <ion-row class="aposta-row text-azul">\n            <ion-col col-7>\n              <b style="white-space: normal">Total de Entrada(Valor Apostado)</b>\n            </ion-col>\n            <ion-col col-4>\n              <b>{{totalEntrada || 0 | currency : \'BRL\'}}</b>\n            </ion-col>\n            <ion-col col-1 class="aposta-description" (click)="visibleTodasEntradas = !visibleTodasEntradas">\n              <ion-icon name="{{visibleTodasEntradas ? \'arrow-dropup\' : \'arrow-dropdown\'}}" style="width: 100%; text-align: center;"></ion-icon>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n      </ion-card-header>\n      <ion-card-content *ngIf="visibleTodasEntradas">\n        <ion-card>\n          <ion-card-content>\n            <ion-grid>\n              <ion-row class="aposta-row text-azul">\n                <ion-col col-8>\n                  <b>Total Entrada Depósito</b><br/>\n                </ion-col>\n                <ion-col col-4 class="aposta-description">{{totalEntradaDeposito || 0 | currency : \'BRL\'}}</ion-col>\n              </ion-row>\n            </ion-grid>\n          </ion-card-content>\n        </ion-card>\n\n        <ion-card>\n          <ion-card-header>\n            <ion-grid>\n              <ion-row>\n                <ion-col col-11>\n                  <b>Entrada(Em Aberto)</b><br/>\n                  <span style="font-size: 11px">(Clique nos valores azuis para detalhar)</span>\n                </ion-col>\n                <ion-col col-1 (click)="visibleEntradaAberto = !visibleEntradaAberto;">\n                  <ion-icon name="{{visibleEntradaAberto ? \'arrow-dropup\' : \'arrow-dropdown\'}}"></ion-icon>\n                </ion-col>\n              </ion-row>\n            </ion-grid>\n          </ion-card-header>\n          <ion-card-content *ngIf="visibleEntradaAberto">\n            <ion-grid>\n              <ion-row class="aposta-row">\n                <ion-col col-8 class="aposta-title">Administrador</ion-col>\n                <ion-col col-4 class="aposta-description" style="color: #4a8bfc">{{entradaAbertoAdministrador || 0 | currency : \'BRL\'}}</ion-col>\n              </ion-row>\n              <ion-row class="aposta-row">\n                <ion-col col-8 class="aposta-title">Gerente</ion-col>\n                <ion-col col-4 class="aposta-description" style="color: #4a8bfc">{{entradaAbertoGerente || 0 | currency : \'BRL\'}}</ion-col>\n              </ion-row>\n              <ion-row class="aposta-row">\n                <ion-col col-8 class="aposta-title">Cambista</ion-col>\n                <ion-col col-4 class="aposta-description" style="color: #4a8bfc">{{entradaAbertoCambista || 0 | currency : \'BRL\'}}</ion-col>\n              </ion-row>\n              <ion-row class="aposta-row">\n                <ion-col col-8 class="aposta-title">Cliente</ion-col>\n                <ion-col col-4 class="aposta-description" style="color: #4a8bfc">{{entradaAbertoCliente || 0 | currency : \'BRL\'}}</ion-col>\n              </ion-row>\n            </ion-grid>\n          </ion-card-content>\n        </ion-card>\n\n        <ion-card>\n          <ion-card-header>\n            <ion-grid>\n              <ion-row>\n                <ion-col col-11>\n                  <b>Entrada(Finalizado)</b><br/>\n                  <span style="font-size: 11px">(Clique nos valores azuis para detalhar)</span>\n                </ion-col>\n                <ion-col col-1 (click)="visibleEntradaFinalizado = !visibleEntradaFinalizado;">\n                  <ion-icon name="{{visibleEntradaFinalizado ? \'arrow-dropup\' : \'arrow-dropdown\'}}"></ion-icon>\n                </ion-col>\n              </ion-row>\n            </ion-grid>\n          </ion-card-header>\n          <ion-card-content *ngIf="visibleEntradaFinalizado">\n            <ion-grid>\n              <ion-row class="aposta-row">\n                <ion-col col-8 class="aposta-title">Administrador</ion-col>\n                <ion-col col-4 class="aposta-description" style="color: #4a8bfc">{{entradaAdministrador || 0 | currency : \'BRL\'}}</ion-col>\n              </ion-row>\n              <ion-row class="aposta-row">\n                <ion-col col-8 class="aposta-title">Gerente</ion-col>\n                <ion-col col-4 class="aposta-description" style="color: #4a8bfc">{{entradaGerente || 0 | currency : \'BRL\'}}</ion-col>\n              </ion-row>\n              <ion-row class="aposta-row">\n                <ion-col col-8 class="aposta-title">Cambista</ion-col>\n                <ion-col col-4 class="aposta-description" style="color: #4a8bfc">{{entradaCambista || 0 | currency : \'BRL\'}}</ion-col>\n              </ion-row>\n              <ion-row class="aposta-row">\n                <ion-col col-8 class="aposta-title">Cliente</ion-col>\n                <ion-col col-4 class="aposta-description" style="color: #4a8bfc">{{entradaCliente || 0 | currency : \'BRL\'}}</ion-col>\n              </ion-row>\n            </ion-grid>\n          </ion-card-content>\n        </ion-card>\n      </ion-card-content>\n    </ion-card>\n\n    <ion-card *ngIf="tipo == 0">\n      <ion-card-header>\n        <ion-grid>\n          <ion-row class="text-azul">\n            <ion-col col-7>\n              <b style="white-space: normal">Entrada(Valor Apostado)</b>\n            </ion-col>\n            <ion-col col-4>\n              {{(entradaEmAberto + entrada) || 0 | currency : \'BRL\'}}\n            </ion-col>\n            <ion-col col-1 (click)="visibleEntradaTotal = !visibleEntradaTotal;">\n              <ion-icon name="{{visibleEntradaTotal ? \'arrow-dropup\' : \'arrow-dropdown\'}}" style="width: 100%; text-align: center;"></ion-icon>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n      </ion-card-header>\n      <ion-card-content *ngIf="visibleEntradaTotal">\n        <ion-grid class="text-azul">\n          <ion-row class="aposta-row text-azul">\n            <ion-col col-8 class="aposta-title">Entrada(Em Aberto)</ion-col>\n            <ion-col col-4 class="aposta-description">{{entradaEmAberto || 0 | currency : \'BRL\'}}</ion-col>\n          </ion-row>\n          <ion-row class="aposta-row text-azul">\n            <ion-col col-8 class="aposta-title">Entrada(Finalizado)</ion-col>\n            <ion-col col-4 class="aposta-description">{{entrada || 0 | currency : \'BRL\'}}</ion-col>\n          </ion-row>\n        </ion-grid>\n      </ion-card-content>\n    </ion-card>\n\n    <ion-card *ngIf="tipo == 1">\n      <ion-card-header>\n        <ion-grid>\n          <ion-row class="aposta-row text-vermelho">\n            <ion-col col-7>\n              <b>Total de Saídas</b>\n            </ion-col>\n            <ion-col col-4>\n              <b>{{meuCaixa.totalSaida || 0 | currency : \'BRL\'}}</b>\n            </ion-col>\n            <ion-col col-1 class="aposta-description" (click)="visibleTodasSaidas = !visibleTodasSaidas">\n              <ion-icon name="{{visibleTodasSaidas ? \'arrow-dropup\' : \'arrow-dropdown\'}}" style="width: 100%; text-align: center;"></ion-icon>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n      </ion-card-header>\n      <ion-card-content *ngIf="visibleTodasSaidas">\n\n        <ion-card>\n          <ion-card-content>\n            <ion-grid>\n              <ion-row class="aposta-row text-vermelho">\n                <ion-col col-8 class="aposta-title">Premiações</ion-col>\n                <ion-col col-4 class="aposta-description" (click)="detalhaPremiacoes(meuCaixa)" style="color: #4a8bfc">{{meuCaixa.totalPagamentoCliente || 0 | currency : \'BRL\'}}</ion-col>\n              </ion-row>\n            </ion-grid>\n          </ion-card-content>\n        </ion-card>\n\n        <ion-card>\n          <ion-card-content>\n            <ion-grid>\n              <ion-row class="text-vermelho">\n                <ion-col col-8>\n                  <b>Total de Comissões</b>\n                </ion-col>\n                <ion-col col-4 class="aposta-description">{{comissao || 0 | currency : \'BRL\'}}</ion-col>\n              </ion-row>\n            </ion-grid>\n          </ion-card-content>\n        </ion-card>\n\n        <ion-card>\n          <ion-card-content>\n            <ion-grid>\n              <ion-row class="aposta-row text-vermelho">\n                <ion-col col-8 class="aposta-title">Total de Saques</ion-col>\n                <ion-col col-4 class="aposta-description">{{meuCaixa.totalSaqueBanca || 0 | currency : \'BRL\'}}</ion-col>\n              </ion-row>\n            </ion-grid>\n          </ion-card-content>\n        </ion-card>\n\n      </ion-card-content>\n    </ion-card>\n\n    <ion-card *ngIf="tipo == 0">\n      <ion-card-content>\n        <ion-grid>\n          <ion-row class="text-roxo">\n            <ion-col col-8>\n              <b>Premiação</b>\n            </ion-col>\n            <ion-col col-4 class="aposta-description">{{meuCaixa.totalSaida || 0 | currency : \'BRL\'}}</ion-col>\n          </ion-row>\n        </ion-grid>\n      </ion-card-content>\n    </ion-card>\n\n    <ion-card *ngIf="tipo == 0">\n      <ion-card-content>\n        <ion-grid>\n          <ion-row class="text-verde">\n            <ion-col col-8>\n              <b>Comissões</b>\n            </ion-col>\n            <ion-col col-4 class="aposta-description">{{comissao || 0 | currency : \'BRL\'}}</ion-col>\n          </ion-row>\n        </ion-grid>\n      </ion-card-content>\n    </ion-card>\n\n    <ion-card *ngIf="tipo == 1 && meuCaixa.resumoAdministradores.length > 0">\n      <ion-card-header>\n        <ion-grid>\n          <ion-row>\n            <ion-col col-11>\n              <b>Administradores</b>\n            </ion-col>\n            <ion-col col-1 (click)="visibleAdmins = !visibleAdmins;">\n              <ion-icon name="{{visibleAdmins ? \'arrow-dropup\' : \'arrow-dropdown\'}}"></ion-icon>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n      </ion-card-header>\n      <ion-card-content *ngIf="visibleAdmins">\n        <ion-grid>\n          <ion-row class="aposta-row">\n            <ion-col col-8 class="aposta-title"><ion-label>Nome</ion-label></ion-col>\n            <ion-col col-4 class="aposta-title"><ion-label>Saldo Atual</ion-label></ion-col>\n          </ion-row>\n          <ion-row class="aposta-row" *ngFor="let resumoAdmin of meuCaixa.resumoAdministradores">\n            <ion-col col-8 class="aposta-description">{{resumoAdmin.usuario.nome}}</ion-col>\n            <ion-col col-4 class="aposta-description">{{resumoAdmin.saldoAtual || 0 | currency : \'BRL\'}}</ion-col>\n          </ion-row>\n        </ion-grid>\n      </ion-card-content>\n    </ion-card>\n\n    <ion-card *ngIf="tipo == 1 && meuCaixa.resumoGerentes.length > 0">\n      <ion-card-header>\n        <ion-grid>\n          <ion-row>\n            <ion-col col-11>\n              <b>Gerentes</b><br/>\n              <span style="font-size: 11px">(Clique nos valores azuis para detalhar)</span>\n            </ion-col>\n            <ion-col col-1 (click)="visibleGerentes = !visibleGerentes;">\n              <ion-icon name="{{visibleGerentes ? \'arrow-dropup\' : \'arrow-dropdown\'}}"></ion-icon>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n      </ion-card-header>\n      <ion-card-content *ngIf="visibleGerentes">\n        <ion-grid>\n          <ion-row class="aposta-row" style="font-size: 13px;">\n            <ion-col col-4 class="aposta-title"><ion-label>Entrada Total</ion-label></ion-col>\n            <ion-col col-4 class="aposta-title"><ion-label>Comissão</ion-label></ion-col>\n            <ion-col col-4 class="aposta-title"><ion-label>Saldo Atual</ion-label></ion-col>\n          </ion-row>\n          <ion-row class="aposta-row cardGerente" *ngFor="let resumoGerente of meuCaixa.resumoGerentes">\n            <ion-col col-12 class="aposta-description">{{resumoGerente.usuario.nome}}</ion-col>\n            <ion-col col-4 class="aposta-description">{{resumoGerente.totalGeralEntrada || 0 | currency : \'BRL\'}}</ion-col>\n            <ion-col col-4 class="aposta-description">{{resumoGerente.totalComissao || 0 | currency : \'BRL\'}}</ion-col>\n            <ion-col col-4 class="aposta-description" (click)="detalhaGerente(resumoGerente)" style="color: #4a8bfc">{{resumoGerente.saldoAtual || 0 | currency : \'BRL\'}}</ion-col>\n          </ion-row>\n        </ion-grid>\n      </ion-card-content>\n    </ion-card>\n\n    <ion-card *ngIf="tipo == 0 && meuCaixa.usuario.tipoUsuario == \'GERENTE\' && meuCaixa.resumoCambistas.length > 0">\n      <ion-card-header>\n        <ion-grid>\n          <ion-row>\n            <ion-col col-11>\n              <b>Cambistas</b><br/>\n              <span style="font-size: 11px">(Clique nos valores azuis para detalhar)</span>\n            </ion-col>\n            <ion-col col-1 (click)="visibleCambistas = !visibleCambistas;">\n              <ion-icon name="{{visibleCambistas ? \'arrow-dropup\' : \'arrow-dropdown\'}}"></ion-icon>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n      </ion-card-header>\n      <ion-card-content *ngIf="visibleCambistas">\n        <ion-grid>\n          <ion-row class="aposta-row" style="font-size: 13px;">\n            <ion-col col-4 class="aposta-title"><ion-label>Nome</ion-label></ion-col>\n            <ion-col col-4 class="aposta-title"><ion-label>Entrada Total</ion-label></ion-col>\n            <ion-col col-4 class="aposta-title"><ion-label>Comissão</ion-label></ion-col>\n          </ion-row>\n          <ion-row class="aposta-row" *ngFor="let resumoCambista of meuCaixa.resumoCambistas">\n            <ion-col col-4 class="aposta-description">{{resumoCambista.usuario.nome}}</ion-col>\n            <ion-col col-4 class="aposta-description">{{resumoCambista.totalGeralEntrada || 0 | currency : \'BRL\'}}</ion-col>\n            <ion-col col-4 class="aposta-description" (click)="detalhaCambista(resumoCambista)" style="color: #4a8bfc">{{resumoCambista.totalComissao || 0 | currency : \'BRL\'}}</ion-col>\n          </ion-row>\n        </ion-grid>\n      </ion-card-content>\n    </ion-card>\n\n    <ion-card *ngIf="tipo == 1 && meuCaixa.resumoCambistas.length > 0">\n      <ion-card-header>\n        <ion-grid>\n          <ion-row>\n            <ion-col col-11>\n              <b>Cambistas (Sem Gerente)</b><br/>\n              <span style="font-size: 11px">(Clique nos valores azuis para detalhar)</span>\n            </ion-col>\n            <ion-col col-1 (click)="visibleCambSemGerente = !visibleCambSemGerente;">\n              <ion-icon name="{{visibleCambSemGerente ? \'arrow-dropup\' : \'arrow-dropdown\'}}"></ion-icon>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n      </ion-card-header>\n      <ion-card-content *ngIf="visibleCambSemGerente">\n        <ion-grid>\n          <ion-row class="aposta-row" style="font-size: 13px;">\n            <ion-col col-4 class="aposta-title"><ion-label>Nome</ion-label></ion-col>\n            <ion-col col-4 class="aposta-title"><ion-label>Entrada Total</ion-label></ion-col>\n            <ion-col col-4 class="aposta-title"><ion-label>Comissão</ion-label></ion-col>\n          </ion-row>\n          <ion-row class="aposta-row" *ngFor="let resumoCambista of meuCaixa.resumoCambistas">\n            <ion-col col-4 class="aposta-description">{{resumoCambista.usuario.nome}}</ion-col>\n            <ion-col col-4 class="aposta-description">{{resumoCambista.totalGeralEntrada || 0 | currency : \'BRL\'}}</ion-col>\n            <ion-col col-4 class="aposta-description" (click)="detalhaCambista(resumoCambista)" style="color: #4a8bfc">{{resumoCambista.totalComissao || 0 | currency : \'BRL\'}}</ion-col>\n          </ion-row>\n        </ion-grid>\n      </ion-card-content>\n    </ion-card>\n\n    <ion-card *ngIf="tipo == 1 && meuCaixa.resumoClientes.length > 0" >\n      <ion-card-header>\n        <ion-grid>\n          <ion-row>\n            <ion-col col-11>\n              <b>Clientes</b>\n            </ion-col>\n            <ion-col col-1 (click)="visibleClientes = !visibleClientes;">\n              <ion-icon name="{{visibleClientes ? \'arrow-dropup\' : \'arrow-dropdown\'}}"></ion-icon>\n            </ion-col>\n          </ion-row>\n        </ion-grid>\n      </ion-card-header>\n      <ion-card-content *ngIf="visibleClientes">\n        <ion-grid>\n          <ion-row class="aposta-row">\n            <ion-col col-8 class="aposta-title" style="margin: auto;"><ion-label>Nome</ion-label></ion-col>\n            <ion-col col-4 class="aposta-title"><ion-label style="white-space: normal; text-align:center;">Total Entrada</ion-label></ion-col>\n          </ion-row>\n          <ion-row class="aposta-row" *ngFor="let resumoCliente of meuCaixa.resumoClientes">\n            <ion-col col-8 class="aposta-description">{{resumoCliente.usuario.nome}}</ion-col>\n            <ion-col col-4 class="aposta-description" style="white-space: normal; text-align:center;">{{(resumoCliente.totalEntradaFinalizadoCliente + resumoCliente.totalEntradaEmAbertoCliente) || 0 | currency : \'BRL\'}}</ion-col>\n          </ion-row>\n        </ion-grid>\n      </ion-card-content>\n    </ion-card>\n\n    <ion-card>\n      <ion-card-content>\n        <ion-grid class="legendas">\n          <ion-row>\n            <ion-col col-1 class="legenda vermelho">&nbsp;</ion-col>\n            <ion-col col-3>Negativo</ion-col>\n            <ion-col col-1 class="legenda verde">&nbsp;</ion-col>\n            <ion-col col-3>Positivo</ion-col>\n            <ion-col col-1 class="legenda azul">&nbsp;</ion-col>\n            <ion-col col-3>Normal</ion-col>\n          </ion-row>\n        </ion-grid>\n      </ion-card-content>\n    </ion-card>\n\n    <ion-grid>\n      <ion-row>\n        <ion-col col-12>\n          <button ion-button full block [color]="statusTotal()" (click)="detalhaSaldo()">Líquido: {{meuCaixa.totalLiquido || 0 | currency : \'BRL\'}}</button>\n        </ion-col>\n      </ion-row>\n\n      <ion-row>\n        <ion-col col-12>\n          <button ion-button full block color="danger" (click)="fecharCaixa()">Fechar Caixa</button>\n        </ion-col>\n      </ion-row>\n    </ion-grid>\n\n  </ion-content>\n'/*ion-inline-end:"E:\Ambiente Ionic\jukedroid\src\pages\caixa\caixa.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["p" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__service_bilhete_service__["a" /* BilheteService */], __WEBPACK_IMPORTED_MODULE_3__service_meu_caixa_service__["a" /* MeuCaixaService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_4__service_usuario_service__["a" /* UsuarioService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */]])
    ], CaixaPage);
    return CaixaPage;
}());

//# sourceMappingURL=caixa.js.map

/***/ }),

/***/ 399:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeSmPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__service_partida_service__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__service_bilhete_service__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__service_competicao_service__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__service_usuario_service__ = __webpack_require__(49);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var HomeSmPage = /** @class */ (function () {
    function HomeSmPage(navCtrl, navParams, partidaService, bs, toastCtrl, ps, cs, loadCtrl, modalCtrl, us) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.partidaService = partidaService;
        this.bs = bs;
        this.toastCtrl = toastCtrl;
        this.ps = ps;
        this.cs = cs;
        this.loadCtrl = loadCtrl;
        this.modalCtrl = modalCtrl;
        this.us = us;
    }
    HomeSmPage.prototype.toLogin = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */], {
            saiu: true,
            cadastrar: false
        });
    };
    HomeSmPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home-sm',template:/*ion-inline-start:"E:\Ambiente Ionic\jukedroid\src\pages\home-sm\home-sm.html"*/'\n\n\n<ion-content padding>\n  \n</ion-content>\n\n'/*ion-inline-end:"E:\Ambiente Ionic\jukedroid\src\pages\home-sm\home-sm.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__service_partida_service__["a" /* PartidaService */], __WEBPACK_IMPORTED_MODULE_4__service_bilhete_service__["a" /* BilheteService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["o" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__service_partida_service__["a" /* PartidaService */], __WEBPACK_IMPORTED_MODULE_5__service_competicao_service__["a" /* CompeticaoService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */], __WEBPACK_IMPORTED_MODULE_6__service_usuario_service__["a" /* UsuarioService */]])
    ], HomeSmPage);
    return HomeSmPage;
}());

//# sourceMappingURL=home-sm.js.map

/***/ }),

/***/ 422:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__service_usuario_service__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__service_bilhete_service__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__service_transacao_service__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__service_ranking_service__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__service_meu_caixa_service__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__providers_printer_provider__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__service_competicao_service__ = __webpack_require__(83);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__service_partida_service__ = __webpack_require__(82);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__service_novidade_service__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__service_banca_service__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__service_app_api__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

















var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen, us, ts, rk, modalCtrl, mcs, printer, bs, competicaoService, ps, storage, ns, loadCtrl, bancaService, alertCtrl) {
        // this.bancaService.getBancaAtual().then(banca =>{
        //   this.rankingPersonalizado = banca.rankingPersonalizado;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.us = us;
        this.ts = ts;
        this.rk = rk;
        this.modalCtrl = modalCtrl;
        this.mcs = mcs;
        this.printer = printer;
        this.bs = bs;
        this.competicaoService = competicaoService;
        this.ps = ps;
        this.storage = storage;
        this.ns = ns;
        this.loadCtrl = loadCtrl;
        this.bancaService = bancaService;
        this.alertCtrl = alertCtrl;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */];
        this.id_banca = __WEBPACK_IMPORTED_MODULE_16__service_app_api__["a" /* ID_BANCA */];
        //this.storage.get('login').then(login =>{
        // this.storage.get('senha').then(senha =>{
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */];
        //   if(login && senha){
        //     this.rootPage = LoginPage;
        //   }
        //  });
        // });
        //  })
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"E:\Ambiente Ionic\jukedroid\src\app\app.html"*/'<ion-menu [content]="content"> \n<ion-content>\n\n \n</ion-content>\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n'/*ion-inline-end:"E:\Ambiente Ionic\jukedroid\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_6__service_usuario_service__["a" /* UsuarioService */],
            __WEBPACK_IMPORTED_MODULE_8__service_transacao_service__["a" /* TransacaoService */], __WEBPACK_IMPORTED_MODULE_9__service_ranking_service__["a" /* RankingService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* ModalController */], __WEBPACK_IMPORTED_MODULE_10__service_meu_caixa_service__["a" /* MeuCaixaService */],
            __WEBPACK_IMPORTED_MODULE_11__providers_printer_provider__["a" /* PrinterProvider */], __WEBPACK_IMPORTED_MODULE_7__service_bilhete_service__["a" /* BilheteService */], __WEBPACK_IMPORTED_MODULE_12__service_competicao_service__["a" /* CompeticaoService */], __WEBPACK_IMPORTED_MODULE_13__service_partida_service__["a" /* PartidaService */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_14__service_novidade_service__["a" /* NovidadeService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_15__service_banca_service__["a" /* BancaService */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 423:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PrinterCommands; });
var PrinterCommands = {
    LF: '\x0a',
    ESC: '\x1b',
    FS: '\x1c',
    GS: '\x1d',
    US: '\x1f',
    FF: '\x0c',
    DLE: '\x10',
    DC1: '\x11',
    DC4: '\x14',
    EOT: '\x04',
    NUL: '\x00',
    EOL: '\n',
    TXT_BOLD_ON: '\x1b\x45\x01',
    TXT_BOLD_OFF: '\x1b\x45\x00',
    SPACE_21: '                     ',
    SPACE_22: '                      ',
    HORIZONTAL_LINE: {
        HR_58MM: '================================',
        HR2_58MM: '********************************',
        HR3_58MM: '--------------------------------'
    },
    FEED_CONTROL_SEQUENCES: {
        CTL_LF: '\x0a',
        CTL_FF: '\x0c',
        CTL_CR: '\x0d',
        CTL_HT: '\x09',
        CTL_VT: '\x0b',
    },
    LINE_SPACING: {
        LS_DEFAULT: '\x1b\x32',
        LS_SET: '\x1b\x33'
    },
    HARDWARE: {
        HW_INIT: '\x1b\x40',
        HW_SELECT: '\x1b\x3d\x01',
        HW_RESET: '\x1b\x3f\x0a\x00',
    },
    CASH_DRAWER: {
        CD_KICK_2: '\x1b\x70\x00',
        CD_KICK_5: '\x1b\x70\x01',
    },
    MARGINS: {
        BOTTOM: '\x1b\x4f',
        LEFT: '\x1b\x6c',
        RIGHT: '\x1b\x51',
    },
    PAPER: {
        PAPER_FULL_CUT: '\x1d\x56\x00',
        PAPER_PART_CUT: '\x1d\x56\x01',
        PAPER_CUT_A: '\x1d\x56\x41',
        PAPER_CUT_B: '\x1d\x56\x42',
    },
    TEXT_FORMAT: {
        TXT_NORMAL: '\x1b\x21\x00',
        TXT_2HEIGHT: '\x1b\x21\x10',
        TXT_2WIDTH: '\x1b\x21\x20',
        TXT_4SQUARE: '\x1b\x21\x30',
        TXT_CUSTOM_SIZE: function (width, height) {
            var widthDec = (width - 1) * 16;
            var heightDec = height - 1;
            var sizeDec = widthDec + heightDec;
            return '\x1d\x21' + String.fromCharCode(sizeDec);
        },
        TXT_HEIGHT: {
            1: '\x00',
            2: '\x01',
            3: '\x02',
            4: '\x03',
            5: '\x04',
            6: '\x05',
            7: '\x06',
            8: '\x07'
        },
        TXT_WIDTH: {
            1: '\x00',
            2: '\x10',
            3: '\x20',
            4: '\x30',
            5: '\x40',
            6: '\x50',
            7: '\x60',
            8: '\x70'
        },
        TXT_UNDERL_OFF: '\x1b\x2d\x00',
        TXT_UNDERL_ON: '\x1b\x2d\x01',
        TXT_UNDERL2_ON: '\x1b\x2d\x02',
        TXT_ITALIC_OFF: '\x1b\x35',
        TXT_ITALIC_ON: '\x1b\x34',
        TXT_FONT_A: '\x1b\x4d\x00',
        TXT_FONT_B: '\x1b\x4d\x01',
        TXT_FONT_C: '\x1b\x4d\x02',
        TXT_ALIGN_LT: '\x1b\x61\x00',
        TXT_ALIGN_CT: '\x1b\x61\x01',
        TXT_ALIGN_RT: '\x1b\x61\x02',
    }
};
//# sourceMappingURL=printer-commands.js.map

/***/ }),

/***/ 426:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home__ = __webpack_require__(126);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var HomePageModule = /** @class */ (function () {
    function HomePageModule() {
    }
    HomePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__home__["a" /* HomePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__home__["a" /* HomePage */]),
            ]
        })
    ], HomePageModule);
    return HomePageModule;
}());

//# sourceMappingURL=home.module.js.map

/***/ }),

/***/ 427:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContaService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_api__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ContaService = /** @class */ (function () {
    function ContaService(http) {
        this.http = http;
        this.classe = 'conta';
    }
    ContaService.prototype.atualizarSaldo = function (conta) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_api__["c" /* SERVICE */] + "/" + this.classe + "/atualizarSaldo", JSON.stringify(conta))
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    ContaService.prototype.atualizarConta = function (conta) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_api__["c" /* SERVICE */] + "/" + this.classe + "/atualizarConta", JSON.stringify(conta))
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    ContaService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], ContaService);
    return ContaService;
}());

//# sourceMappingURL=conta.service.js.map

/***/ }),

/***/ 428:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApostaService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_api__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ApostaService = /** @class */ (function () {
    function ApostaService(http) {
        this.http = http;
        this.classe = 'banca';
    }
    ApostaService.prototype.getApostasNaoApuradas = function () {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_api__["c" /* SERVICE */] + "/" + this.classe + "/getApostasNaoApuradas", '')
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    ApostaService.prototype.atualizaApostas = function (apostas) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_api__["c" /* SERVICE */] + "/" + this.classe + "/atualizaApostas", JSON.stringify(apostas))
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    ApostaService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], ApostaService);
    return ApostaService;
}());

//# sourceMappingURL=aposta.service.js.map

/***/ }),

/***/ 429:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AoVivoService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_api__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AoVivoService = /** @class */ (function () {
    function AoVivoService(http) {
        this.http = http;
        this.classe = 'futebol';
        this.partidas = [];
        this.partidasAtualizadas = [];
    }
    AoVivoService.prototype.getPartidasAoVivo = function () {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_api__["c" /* SERVICE */] + "/" + this.classe + "/futebolAoVivo", __WEBPACK_IMPORTED_MODULE_2__app_api__["a" /* ID_BANCA */])
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    AoVivoService.prototype.isEmpty = function (obj) {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                return false;
        }
        return true;
    };
    AoVivoService.prototype.getPartidas = function () {
        var _this = this;
        this.req = setInterval(function () {
            _this.getPartidasAoVivo().then(function (partidas) {
                if (partidas.length > 0 && !_this.isEmpty(partidas[0].event)) {
                    _this.partidas = partidas;
                }
            });
        }, 2000);
    };
    AoVivoService.prototype.getPartida = function (eventId) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_api__["c" /* SERVICE */] + "/" + this.classe + "/partidaAoVivo", String(__WEBPACK_IMPORTED_MODULE_2__app_api__["a" /* ID_BANCA */]) + '</>' + eventId)
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    AoVivoService.prototype.habilitarDesabilitarPartida = function (eventId) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_api__["c" /* SERVICE */] + "/" + this.classe + "/habilitarDesabilitarPartida", (eventId + ';' + String(__WEBPACK_IMPORTED_MODULE_2__app_api__["a" /* ID_BANCA */])))
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    AoVivoService.prototype.editarHorarioPartida = function (eventId, data, horario) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_api__["c" /* SERVICE */] + "/" + this.classe + "/editarHorarioPartida", JSON.stringify(eventId + '</>' + String(data) + '</>' + String(horario)))
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    AoVivoService.prototype.validaBilheteAoVivo = function (bilhete) {
        var retorno = false;
        this.listaAtualizada = [];
        if (bilhete.listaApostas.length > 0) {
            for (var _i = 0, _a = this.partidasAtualizadas; _i < _a.length; _i++) {
                var partida = _a[_i];
                if (!partida.event.Markets) {
                    partida.event.Markets = [];
                    partida.event.Markets.push(partida.event.MainMarket);
                }
                for (var i = 0; i < bilhete.listaApostas.length; i++) {
                    for (var _b = 0, _c = partida.event.Markets; _b < _c.length; _b++) {
                        var market = _c[_b];
                        for (var _d = 0, _e = market.Results; _d < _e.length; _d++) {
                            var result = _e[_d];
                            if (bilhete.listaApostas[i].partidaAoVivo) {
                                if (result.Id == bilhete.listaApostas[i].result.Id) {
                                    if (result.Visible) {
                                        bilhete.listaApostas[i].oddsDesatualizado = false;
                                        if (result.Odds != bilhete.listaApostas[i].result.Odds) {
                                            bilhete.listaApostas[i].oddsDesatualizado = true;
                                            retorno = true;
                                            bilhete.listaApostas[i].oddsAtualizado = result.Odds;
                                        }
                                        this.listaAtualizada.push(bilhete.listaApostas[i]);
                                    }
                                    else {
                                        bilhete.listaApostas[i].result.Visible = false;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if (bilhete.listaApostas.length != this.listaAtualizada.length) {
            retorno = true;
        }
        return retorno;
    };
    AoVivoService.prototype.atualizaResultsBilhete = function (bilhete) {
        if (bilhete.listaApostas.length != this.listaAtualizada.length) {
            bilhete.listaApostas = this.listaAtualizada;
        }
        if (bilhete.listaApostas.length > 0) {
            for (var _i = 0, _a = this.partidasAtualizadas; _i < _a.length; _i++) {
                var partida = _a[_i];
                if (!partida.event.Markets) {
                    partida.event.Markets = [];
                    partida.event.Markets.push(partida.event.MainMarket);
                }
                for (var _b = 0, _c = partida.event.Markets; _b < _c.length; _b++) {
                    var market = _c[_b];
                    for (var _d = 0, _e = market.Results; _d < _e.length; _d++) {
                        var result = _e[_d];
                        for (var i = 0; i < bilhete.listaApostas.length; i++) {
                            if (bilhete.listaApostas[i].partidaAoVivo) {
                                if (result.Id == bilhete.listaApostas[i].result.Id && result.Visible) {
                                    bilhete.listaApostas[i].result.Odds = result.Odds;
                                    bilhete.listaApostas[i].oddsAtualizado = result.Odds;
                                    bilhete.listaApostas[i].oddsDesatualizado = false;
                                    bilhete.listaApostas[i].cotacaoAposta = result.Odds;
                                }
                            }
                        }
                    }
                }
            }
        }
        this.ultimaTentativa = new Date();
    };
    AoVivoService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], AoVivoService);
    return AoVivoService;
}());

//# sourceMappingURL=aovivo.service.js.map

/***/ }),

/***/ 430:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BolaoService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_api__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model_bilhete_model__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__model_banca_model__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_util__ = __webpack_require__(226);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var BolaoService = /** @class */ (function () {
    function BolaoService(http) {
        this.http = http;
        this.classe = 'bolao';
        this.bilheteBolao = new __WEBPACK_IMPORTED_MODULE_3__model_bilhete_model__["a" /* Bilhete */]();
        this.util = new __WEBPACK_IMPORTED_MODULE_5__providers_util__["a" /* Util */]();
    }
    BolaoService.prototype.todosTimes = function () {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_api__["c" /* SERVICE */] + "/" + this.classe + "/todosTimes", '')
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    BolaoService.prototype.cadastrarBolao = function (bolao) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_api__["c" /* SERVICE */] + "/" + this.classe + "/cadastrarBolao", JSON.stringify(bolao))
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    BolaoService.prototype.desativarBolao = function (bolao) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_api__["c" /* SERVICE */] + "/" + this.classe + "/desativarBolao", JSON.stringify(bolao))
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    BolaoService.prototype.cadastrarBilheteBolao = function () {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_api__["c" /* SERVICE */] + "/" + this.classe + "/cadastrarBilheteBolao", JSON.stringify(this.bilheteBolao))
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    BolaoService.prototype.premiarBolao = function (bolao) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_api__["c" /* SERVICE */] + "/" + this.classe + "/premiarBolao", JSON.stringify(bolao))
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    BolaoService.prototype.getListaBolao = function (tipoBolao, encerrado) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_api__["c" /* SERVICE */] + "/" + this.classe + "/getListaBolao", JSON.stringify(tipoBolao) + '</>' + JSON.stringify(encerrado) + '</>' + __WEBPACK_IMPORTED_MODULE_2__app_api__["a" /* ID_BANCA */])
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    BolaoService.prototype.getPalpiteBolao = function (bolao) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_api__["c" /* SERVICE */] + "/" + this.classe + "/getPalpiteBolao", JSON.stringify(bolao))
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    BolaoService.prototype.getVencedoresBolao = function (bolao) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_api__["c" /* SERVICE */] + "/" + this.classe + "/getVencedoresBolao", JSON.stringify(bolao))
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    BolaoService.prototype.getBilheteBolao = function () {
        if (this.bilheteBolao.listaApostas == undefined) {
            this.bilheteBolao.listaApostas = [];
        }
        return this.bilheteBolao;
    };
    BolaoService.prototype.newBilhete = function () {
        this.bilheteBolao = new __WEBPACK_IMPORTED_MODULE_3__model_bilhete_model__["a" /* Bilhete */]();
        this.bilheteBolao.banca = new __WEBPACK_IMPORTED_MODULE_4__model_banca_model__["a" /* Banca */]();
        this.bilheteBolao.banca.id = __WEBPACK_IMPORTED_MODULE_2__app_api__["a" /* ID_BANCA */];
    };
    BolaoService.prototype.setPossivelRetorno = function (premio, valorBilhete) {
        this.bilheteBolao.valorPossivelRetorno = premio;
        this.bilheteBolao.valor = valorBilhete;
    };
    BolaoService.prototype.setPremiosMultiplos = function (premio2, premio3) {
        this.bilheteBolao.valorPremioDois = premio2;
        this.bilheteBolao.valorPremioTres = premio3;
    };
    BolaoService.prototype.setBilheteBolao = function (bolao) {
        this.bilheteBolao.bolao = bolao;
    };
    BolaoService.prototype.setCliente = function (cliente) {
        this.bilheteBolao.cliente = cliente;
    };
    BolaoService.prototype.setNomeCliente = function (nome) {
        this.bilheteBolao.clienteNome = nome;
    };
    BolaoService.prototype.setUsuario = function (usuario) {
        this.bilheteBolao.usuarioSessao = usuario;
        this.bilheteBolao.usuario = usuario;
    };
    BolaoService.prototype.setStatusBilhete = function (statusBilhete) {
        this.bilheteBolao.statusBilhete = statusBilhete;
    };
    BolaoService.prototype.setBilheteSimulacao = function (bilhete, usuarioFinalizacao) {
        this.bilheteBolao = bilhete;
        this.bilheteBolao.usuario = usuarioFinalizacao;
    };
    BolaoService.prototype.removeApostaPartida = function (partida) {
        if (partida) {
            for (var i = 0; i < this.bilheteBolao.listaApostas.length; i++) {
                if (this.bilheteBolao.listaApostas[i].evento == partida.timeCasa.nome + " x " + partida.timeFora.nome) {
                    this.bilheteBolao.listaApostas.splice(i, 1);
                }
            }
        }
    };
    BolaoService.prototype.statusBilhete = function (status) {
        var retorno = "";
        switch (status) {
            case 'EM_ABERTO':
                {
                    retorno = "Em Aberto";
                }
                ;
                break;
            case 'CANCELADO_PELO_ADMINISTRADOR':
                {
                    retorno = "Cancelado";
                }
                ;
                break;
            case 'CONCLUIDO':
                {
                    retorno = "Concluído";
                }
                ;
                break;
        }
        return retorno;
    };
    BolaoService.prototype.getImagemTime = function (regiao, time) {
        regiao = this.util.removeAcento(regiao);
        time = this.util.removeAcento(time);
        return __WEBPACK_IMPORTED_MODULE_2__app_api__["c" /* SERVICE */] + "/" + this.classe + "/imagemEscudo/" + regiao + "/" + time;
    };
    BolaoService.prototype.getImagemRegraBolao = function () {
        return __WEBPACK_IMPORTED_MODULE_2__app_api__["c" /* SERVICE */] + "/" + this.classe + "/imagemRegraBolao";
    };
    BolaoService.prototype.verificarAposta = function (partida, escolha) {
        var resultado = false;
        for (var _i = 0, _a = this.bilheteBolao.listaApostas; _i < _a.length; _i++) {
            var aposta = _a[_i];
            if (aposta.escolha == escolha && aposta.evento == partida.timeCasa.nome + " x " + partida.timeFora.nome) {
                resultado = true;
            }
        }
        return resultado;
    };
    BolaoService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], BolaoService);
    return BolaoService;
}());

//# sourceMappingURL=bolao.service.js.map

/***/ }),

/***/ 48:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BancaService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_api__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model_banca_model__ = __webpack_require__(62);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var BancaService = /** @class */ (function () {
    function BancaService(http) {
        var _this = this;
        this.http = http;
        this.classe = 'banca';
        this.banca = new __WEBPACK_IMPORTED_MODULE_3__model_banca_model__["a" /* Banca */]();
        this.getBancaAtual().then(function (banca) {
            _this.banca = banca;
        });
    }
    BancaService.prototype.atualizarConfigBanca = function (banca) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_api__["c" /* SERVICE */] + "/" + this.classe + "/atualizarConfigBanca", JSON.stringify(banca))
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    BancaService.prototype.getBancaAtual = function () {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_api__["c" /* SERVICE */] + "/" + this.classe + "/getBancaAtual", __WEBPACK_IMPORTED_MODULE_2__app_api__["a" /* ID_BANCA */])
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    BancaService.prototype.isAtualizandoBanca = function () {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_api__["c" /* SERVICE */] + "/" + this.classe + "/isAtualizandoBanca", __WEBPACK_IMPORTED_MODULE_2__app_api__["a" /* ID_BANCA */])
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    BancaService.prototype.isSuspenderAoVivo = function () {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_api__["c" /* SERVICE */] + "/" + this.classe + "/isSuspenderAoVivo", __WEBPACK_IMPORTED_MODULE_2__app_api__["a" /* ID_BANCA */])
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    BancaService.prototype.getTodosTiposMovimentacaoFinanceira = function () {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_api__["c" /* SERVICE */] + "/" + this.classe + "/getTodosTiposMovimentacaoFinanceira", '')
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    BancaService.prototype.getMovimentacaoFinanceira = function (usuario, dataInicio, dataFinal) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_api__["c" /* SERVICE */] + "/" + this.classe + "/getTodosTiposMovimentacaoFinanceira", JSON.stringify(usuario.id) + '</>' + dataInicio + '</>' + dataFinal)
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    BancaService.prototype.tipoMovimentacaoFinanceira = function (tipo, css, icon) {
        var retorno;
        switch (tipo) {
            case "CREDITO": {
                retorno = "Crédito";
                break;
            }
            case "DEBITO": {
                retorno = "Débito";
                break;
            }
            case "DEBITO_BILHETE": {
                retorno = "Débito - Aposta Realizada";
                break;
            }
            case "CREDITO_BILHETE_VENCEDOR": {
                retorno = "Crédito - Aposta Vencedora";
                break;
            }
            case "CREDITO_BILHETE_CANCELADO": {
                retorno = "Crédito - Bilhete Cancelado";
                break;
            }
        }
        if (css) {
            switch (tipo) {
                case "CREDITO": {
                    retorno = "verde";
                    break;
                }
                case "DEBITO": {
                    retorno = "vermelho";
                    break;
                }
                case "DEBITO_BILHETE": {
                    retorno = "vermelho";
                    break;
                }
                case "CREDITO_BILHETE_VENCEDOR": {
                    retorno = "verde";
                    break;
                }
                case "CREDITO_BILHETE_CANCELADO": {
                    retorno = "laranja";
                    break;
                }
            }
        }
        if (icon) {
            switch (tipo) {
                case "CREDITO": {
                    retorno = "fa-arrow-circle-up";
                    break;
                }
                case "DEBITO": {
                    retorno = "fa-arrow-circle-down";
                    break;
                }
                case "DEBITO_BILHETE": {
                    retorno = "fa-arrow-circle-down";
                    break;
                }
                case "CREDITO_BILHETE_VENCEDOR": {
                    retorno = "fa-arrow-circle-up";
                    break;
                }
                case "CREDITO_BILHETE_CANCELADO": {
                    retorno = "fa-arrow-circle-down";
                    break;
                }
            }
        }
        return retorno;
    };
    BancaService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], BancaService);
    return BancaService;
}());

//# sourceMappingURL=banca.service.js.map

/***/ }),

/***/ 49:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UsuarioService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_usuario_model__ = __webpack_require__(223);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__configuracao_service__ = __webpack_require__(81);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_api__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var UsuarioService = /** @class */ (function () {
    function UsuarioService(http, configService) {
        this.http = http;
        this.configService = configService;
        this.classe = 'usuario';
        this.versao = "2.6.1";
        this.usuario = new __WEBPACK_IMPORTED_MODULE_1__model_usuario_model__["a" /* Usuario */]();
        this.usuario.id = 0;
    }
    UsuarioService.prototype.verificaVersao = function () {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__app_api__["c" /* SERVICE */] + "/" + this.classe + "/verificaVersao", this.versao + '</>' + String(__WEBPACK_IMPORTED_MODULE_4__app_api__["a" /* ID_BANCA */]))
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    UsuarioService.prototype.existeEmail = function (usuario) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__app_api__["c" /* SERVICE */] + "/" + this.classe + "/existeEmail", JSON.stringify(usuario))
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    UsuarioService.prototype.existeLogin = function (usuario) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__app_api__["c" /* SERVICE */] + "/" + this.classe + "/existeLogin", JSON.stringify(usuario))
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    UsuarioService.prototype.existeCpf = function (usuario) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__app_api__["c" /* SERVICE */] + "/" + this.classe + "/existeCpf", JSON.stringify(usuario))
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    UsuarioService.prototype.login = function (usuario) {
        var _this = this;
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__app_api__["c" /* SERVICE */] + "/" + this.classe + "/login", JSON.stringify(usuario))
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            _this.usuario = data;
            return data;
        });
    };
    UsuarioService.prototype.isAdmin = function () {
        if (this.usuario != undefined && this.usuario.usuarioAdministrador) {
            return true;
        }
        else {
            return false;
        }
    };
    UsuarioService.prototype.visualizarFutebol = function () {
        if (this.usuario != undefined && !this.usuario.visualizaFutebol) {
            return false;
        }
        else {
            return true;
        }
    };
    UsuarioService.prototype.visualizarBolao = function () {
        if (this.usuario != undefined && !this.usuario.visualizaBolao) {
            return false;
        }
        else {
            return true;
        }
    };
    UsuarioService.prototype.visualizarAoVivo = function () {
        if (this.usuario != undefined && !this.usuario.visualizaAoVivo) {
            return false;
        }
        else {
            return true;
        }
    };
    UsuarioService.prototype.visualizarTenis = function () {
        if (this.usuario != undefined && !this.usuario.visualizaTenis) {
            return false;
        }
        else {
            return true;
        }
    };
    UsuarioService.prototype.visualizarCombate = function () {
        if (this.usuario != undefined && !this.usuario.visualizaCombate) {
            return false;
        }
        else {
            return true;
        }
    };
    UsuarioService.prototype.visualizarNBA = function () {
        if (this.usuario != undefined && !this.usuario.visualizaNBA) {
            return false;
        }
        else {
            return true;
        }
    };
    UsuarioService.prototype.isNotCliente = function () {
        if (this.usuario == undefined || this.usuario.tipoUsuario == 'CLIENTE') {
            return false;
        }
        else {
            return true;
        }
    };
    UsuarioService.prototype.getAllClientes = function () {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__app_api__["c" /* SERVICE */] + "/" + this.classe + "/getAllClientes", __WEBPACK_IMPORTED_MODULE_4__app_api__["a" /* ID_BANCA */])
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    UsuarioService.prototype.resetarSenha = function (usuario) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__app_api__["c" /* SERVICE */] + "/" + this.classe + "/resetarSenha", usuario.id)
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    UsuarioService.prototype.desativarUsuario = function (usuario) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__app_api__["c" /* SERVICE */] + "/" + this.classe + "/desativarUser", usuario.id)
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    UsuarioService.prototype.getAll = function () {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__app_api__["c" /* SERVICE */] + "/" + this.classe + "/getAll", __WEBPACK_IMPORTED_MODULE_4__app_api__["a" /* ID_BANCA */])
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    UsuarioService.prototype.getCambistasGerente = function (idGerente) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__app_api__["c" /* SERVICE */] + "/" + this.classe + "/getCambistasGerente", idGerente)
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    UsuarioService.prototype.getClientesCambista = function (idCambista) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__app_api__["c" /* SERVICE */] + "/" + this.classe + "/getClientesCambista", idCambista)
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    UsuarioService.prototype.getCambistasSemGerente = function () {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__app_api__["c" /* SERVICE */] + "/" + this.classe + "/getCambistasSemGerente", __WEBPACK_IMPORTED_MODULE_4__app_api__["a" /* ID_BANCA */])
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    UsuarioService.prototype.getClienteSemCambista = function () {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__app_api__["c" /* SERVICE */] + "/" + this.classe + "/getClienteSemCambista", __WEBPACK_IMPORTED_MODULE_4__app_api__["a" /* ID_BANCA */])
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    UsuarioService.prototype.getTodosUsuarios = function () {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__app_api__["c" /* SERVICE */] + "/" + this.classe + "/getTodosUsuarios", __WEBPACK_IMPORTED_MODULE_4__app_api__["a" /* ID_BANCA */])
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    UsuarioService.prototype.getUsuarioByTipo = function (tipoUsuario) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__app_api__["c" /* SERVICE */] + "/" + this.classe + "/getUsuarioByTipo", (String(__WEBPACK_IMPORTED_MODULE_4__app_api__["a" /* ID_BANCA */]) + ';' + tipoUsuario))
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    UsuarioService.prototype.getComissoesUsuario = function (idUsuario) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__app_api__["c" /* SERVICE */] + "/" + this.classe + "/getComissoesUsuario", idUsuario)
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    UsuarioService.prototype.getUsuario = function () {
        var _this = this;
        var id = 0;
        if (this.usuario.id) {
            id = this.usuario.id;
        }
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__app_api__["c" /* SERVICE */] + "/" + this.classe + "/getUsuarioById", id)
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            _this.usuario = data;
            if (_this.usuario.configuracao && _this.usuario.configuracao.id > 0) {
                _this.configService.configuracaoPrincipal = _this.usuario.configuracao;
            }
            return _this.usuario;
        });
    };
    UsuarioService.prototype.getUsuarioById = function (usuario) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__app_api__["c" /* SERVICE */] + "/" + this.classe + "/getUsuarioById", usuario.id)
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return usuario;
        });
    };
    UsuarioService.prototype.salvar = function (usuario) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__app_api__["c" /* SERVICE */] + "/" + this.classe + "/salvar", JSON.stringify(usuario))
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    UsuarioService.prototype.salvarCambistaGerente = function (gerenteCambista) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__app_api__["c" /* SERVICE */] + "/" + this.classe + "/salvarCambistaGerente", JSON.stringify(gerenteCambista))
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    UsuarioService.prototype.salvarCambistaCliente = function (cambistaCliente) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__app_api__["c" /* SERVICE */] + "/" + this.classe + "/salvarCambistaCliente", JSON.stringify(cambistaCliente))
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    UsuarioService.prototype.deletarCambistaCliente = function (cambistaCliente) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__app_api__["c" /* SERVICE */] + "/" + this.classe + "/deletarCambistaCliente", JSON.stringify(cambistaCliente))
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    UsuarioService.prototype.deletarCambistaGerente = function (gerenteCambista) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__app_api__["c" /* SERVICE */] + "/" + this.classe + "/deletarCambistaGerente", JSON.stringify(gerenteCambista))
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    UsuarioService.prototype.salvarComissaoUsuario = function (listaComissoesJson, usuarioComissao) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__app_api__["c" /* SERVICE */] + "/" + this.classe + "/salvarComissaoUsuario", (JSON.stringify(listaComissoesJson) + '/' + JSON.stringify(usuarioComissao)))
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    UsuarioService.prototype.deletarUsuarioComissao = function (listaComissoesJson, usuarioComissao) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__app_api__["c" /* SERVICE */] + "/" + this.classe + "/deletarUsuarioComissao", (JSON.stringify(listaComissoesJson) + '/' + JSON.stringify(usuarioComissao)))
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    UsuarioService.prototype.atualizarSaldoCliente = function (conta, usuarioCambista) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__app_api__["c" /* SERVICE */] + "/" + this.classe + "/atualizarSaldoCliente", (JSON.stringify(conta) + '</>' + JSON.stringify(usuarioCambista)))
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    UsuarioService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_3__configuracao_service__["a" /* ConfiguracaoService */]])
    ], UsuarioService);
    return UsuarioService;
}());

//# sourceMappingURL=usuario.service.js.map

/***/ }),

/***/ 61:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BilheteService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_bilhete_model__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model_banca_model__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_api__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_social_sharing__ = __webpack_require__(219);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__banca_service__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__configuracao_service__ = __webpack_require__(81);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var BilheteService = /** @class */ (function () {
    function BilheteService(http, socialSharing, bancaService, configService) {
        var _this = this;
        this.http = http;
        this.socialSharing = socialSharing;
        this.bancaService = bancaService;
        this.configService = configService;
        this.classe = 'banca';
        this.banca = new __WEBPACK_IMPORTED_MODULE_2__model_banca_model__["a" /* Banca */]();
        this.filtroUsuario = '';
        this.filtroNumero = '';
        this.filtroStatus = '';
        this.filtroTipo = '';
        this.filtroCodigo = undefined;
        this.bancaService.getBancaAtual().then(function (banca) {
            if (banca) {
                _this.banca = banca;
            }
        });
    }
    BilheteService.prototype.setUsuario = function (usuario) {
        this.bilhete.usuarioSessao = usuario;
        this.bilhete.usuario = usuario;
    };
    BilheteService.prototype.setStatusBilhete = function (statusBilhete) {
        this.bilhete.statusBilhete = statusBilhete;
    };
    BilheteService.prototype.setCliente = function (cliente) {
        this.bilhete.cliente = cliente;
    };
    BilheteService.prototype.setNomeCliente = function (nome) {
        this.bilhete.clienteNome = nome;
    };
    BilheteService.prototype.setBilhete = function (bilhete) {
        this.bilhete = bilhete;
    };
    BilheteService.prototype.salvarBilhete = function () {
        var bancaAtual = new __WEBPACK_IMPORTED_MODULE_2__model_banca_model__["a" /* Banca */]();
        bancaAtual.id = __WEBPACK_IMPORTED_MODULE_4__app_api__["a" /* ID_BANCA */];
        this.bilhete.banca = bancaAtual;
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__app_api__["c" /* SERVICE */] + "/" + this.classe + "/salvarBilhete", JSON.stringify(this.bilhete))
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    BilheteService.prototype.compartilharSimulacao = function (bilhete) {
        this.socialSharing.share((bilhete.banca.nome ? bilhete.banca.nome : '') + ' Simulação: ' + bilhete.id, '', '', '').then(function () {
            // Success!
        }).catch(function () {
            // Error!
        });
    };
    BilheteService.prototype.compartilharLink = function (bilhete) {
        this.socialSharing.share((bilhete.banca.nome ? bilhete.banca.nome : '') + ' Link do Bilhete:', '', '', "http://i3esportes.com/puleApuracao?mainPule=" + String(bilhete.id)).then(function () {
            // Success!
        }).catch(function () {
            // Error!
        });
    };
    BilheteService.prototype.getBilhetesByUsuario = function (usuario, dataInicio, dataFinal) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__app_api__["c" /* SERVICE */] + "/" + this.classe + "/getBilhetesByUsuario", JSON.stringify(usuario) + '</>' + dataInicio + '</>' + dataFinal)
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    BilheteService.prototype.getBilheteById = function (id) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__app_api__["c" /* SERVICE */] + "/" + this.classe + "/getBilheteById", id)
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    BilheteService.prototype.getBilhetesByExemplo = function (bilheteExemplo) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__app_api__["c" /* SERVICE */] + "/" + this.classe + "/getBilhetesByExemplo", JSON.stringify(bilheteExemplo))
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    BilheteService.prototype.getBilhetesSimulados = function (idBilhete) {
        if (idBilhete === void 0) { idBilhete = 0; }
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__app_api__["c" /* SERVICE */] + "/" + this.classe + "/getBilhetesSimulados", (String(__WEBPACK_IMPORTED_MODULE_4__app_api__["a" /* ID_BANCA */]) + ';' + String(idBilhete)))
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    BilheteService.prototype.lancamentoManual = function (lancamento) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__app_api__["c" /* SERVICE */] + "/" + this.classe + "/lancamentoManual", JSON.stringify(lancamento))
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    BilheteService.prototype.getBilhetesPendentes = function () {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__app_api__["c" /* SERVICE */] + "/" + this.classe + "/getBilhetesPendentes", __WEBPACK_IMPORTED_MODULE_4__app_api__["a" /* ID_BANCA */])
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    BilheteService.prototype.getTodosBilhetes = function (dataInical, dataFinal) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__app_api__["c" /* SERVICE */] + "/" + this.classe + "/getTodosBilhetes", (String(__WEBPACK_IMPORTED_MODULE_4__app_api__["a" /* ID_BANCA */]) + '</>' + String(dataInical) + '</>' + String(dataFinal)))
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    BilheteService.prototype.getApostaBilhete = function (bilhete) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__app_api__["c" /* SERVICE */] + "/" + this.classe + "/getApostaBilhete", JSON.stringify(bilhete))
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    BilheteService.prototype.finalizarBilhete = function (bilhete) {
        var bancaAtual = new __WEBPACK_IMPORTED_MODULE_2__model_banca_model__["a" /* Banca */]();
        bancaAtual.id = __WEBPACK_IMPORTED_MODULE_4__app_api__["a" /* ID_BANCA */];
        bilhete.banca = bancaAtual;
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__app_api__["c" /* SERVICE */] + "/" + this.classe + "/finalizarBilhete", JSON.stringify(bilhete))
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    BilheteService.prototype.finalizarTodos = function (bilhetes) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__app_api__["c" /* SERVICE */] + "/" + this.classe + "/finalizarTodosBilhetes", JSON.stringify(bilhetes))
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    BilheteService.prototype.cancelarBilhete = function (bilhete, usuario) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__app_api__["c" /* SERVICE */] + "/" + this.classe + "/cancelarBilhete", (JSON.stringify(bilhete) + '</>' + JSON.stringify(usuario)))
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    BilheteService.prototype.getBilhete = function () {
        if (this.bilhete == undefined) {
            this.bilhete = new __WEBPACK_IMPORTED_MODULE_1__model_bilhete_model__["a" /* Bilhete */]();
        }
        if (this.bilhete.listaApostas == undefined) {
            this.bilhete.listaApostas = [];
        }
        return this.bilhete;
    };
    BilheteService.prototype.addAposta = function (aposta) {
        this.getBilhete().listaApostas.push(aposta);
        this.getCotacao();
        this.validaBilhete();
    };
    BilheteService.prototype.verificarPartida = function (partida) {
        var resultado = false;
        for (var _i = 0, _a = this.bilhete.listaApostas; _i < _a.length; _i++) {
            var aposta = _a[_i];
            if (aposta.partida) {
                if (aposta.partida.id == partida.id) {
                    resultado = true;
                }
            }
        }
        return resultado;
    };
    BilheteService.prototype.verificarPartidaAoVivo = function (partidaAoVivo) {
        var resultado = false;
        for (var _i = 0, _a = this.bilhete.listaApostas; _i < _a.length; _i++) {
            var aposta = _a[_i];
            if (aposta.partidaAoVivo) {
                if (aposta.partidaAoVivo.eventId == partidaAoVivo.eventId) {
                    resultado = true;
                }
            }
        }
        return resultado;
    };
    BilheteService.prototype.verificarAposta = function (partida, escolha, semEmpate) {
        var resultado = false;
        if (semEmpate && escolha == 1) {
            escolha = 2;
        }
        for (var _i = 0, _a = this.bilhete.listaApostas; _i < _a.length; _i++) {
            var aposta = _a[_i];
            if (aposta.partida) {
                if (aposta.partida.id == partida.id && aposta.escolha == partida.timeCasa && escolha == 0) {
                    resultado = true;
                }
                if (aposta.partida.id == partida.id && aposta.escolha == "Empate" && escolha == 1) {
                    resultado = true;
                }
                if (aposta.partida.id == partida.id && aposta.escolha == partida.timeFora && escolha == 2) {
                    resultado = true;
                }
            }
        }
        return resultado;
    };
    BilheteService.prototype.verificarApostaMaisOpcoes = function (partida, escolha) {
        var resultado = false;
        for (var _i = 0, _a = this.bilhete.listaApostas; _i < _a.length; _i++) {
            var aposta = _a[_i];
            if (aposta.partida) {
                if (aposta.partida.id == partida.id && aposta.escolha == escolha) {
                    resultado = true;
                }
            }
        }
        return resultado;
    };
    BilheteService.prototype.verificarApostaMaisOpcoesAoVivo = function (partida, escolha, tipoAposta) {
        var resultado = false;
        for (var _i = 0, _a = this.bilhete.listaApostas; _i < _a.length; _i++) {
            var aposta = _a[_i];
            if (aposta.partidaAoVivo) {
                if (aposta.partidaAoVivo.eventId == partida.eventId && aposta.escolha == escolha && aposta.tipoAposta == tipoAposta) {
                    resultado = true;
                }
            }
        }
        return resultado;
    };
    BilheteService.prototype.verificarApostaAoVivo = function (partidaAoVivo, escolha, tipoAposta) {
        var resultado = false;
        for (var _i = 0, _a = this.bilhete.listaApostas; _i < _a.length; _i++) {
            var aposta = _a[_i];
            if (aposta.partidaAoVivo) {
                if (aposta.partidaAoVivo.eventId == partidaAoVivo.eventId && aposta.escolha == partidaAoVivo.event.Player1 && escolha == 0 && aposta.tipoAposta == tipoAposta) {
                    resultado = true;
                }
                if (aposta.partidaAoVivo.eventId == partidaAoVivo.eventId && aposta.escolha == "X" && escolha == 1 && aposta.tipoAposta == tipoAposta) {
                    resultado = true;
                }
                if (aposta.partidaAoVivo.eventId == partidaAoVivo.eventId && aposta.escolha == partidaAoVivo.event.Player2 && escolha == 2 && aposta.tipoAposta == tipoAposta) {
                    resultado = true;
                }
            }
        }
        return resultado;
    };
    BilheteService.prototype.removeAposta = function (aposta) {
        var index = this.bilhete.listaApostas.indexOf(aposta, 0);
        if (index >= 0) {
            this.bilhete.listaApostas.splice(index, 1);
        }
        this.getCotacao();
        this.validaBilhete();
    };
    BilheteService.prototype.removeApostaPorPartida = function (partida, escolha, semEmpate) {
        var aposta = this.getAposta(partida, escolha, semEmpate);
        this.removeAposta(aposta);
    };
    BilheteService.prototype.removeApostaPorPartidaAoVivo = function (partidaAoVivo, escolha) {
        var aposta = this.getApostaAoVivo(partidaAoVivo, escolha);
        this.removeAposta(aposta);
    };
    BilheteService.prototype.removeApostaPorPartidaMaisOpcoes = function (partida, escolha) {
        var aposta = this.getApostaMaisOpcoes(partida, escolha);
        this.removeAposta(aposta);
    };
    BilheteService.prototype.removeApostaPorPartidaMaisOpcoesAoVivo = function (partida, escolha) {
        var aposta = this.getApostaMaisOpcoesAoVivo(partida, escolha);
        this.removeAposta(aposta);
    };
    BilheteService.prototype.getAposta = function (partida, escolha, semEmpate) {
        var resultado;
        if (semEmpate && escolha == 1) {
            escolha = 2;
        }
        for (var _i = 0, _a = this.bilhete.listaApostas; _i < _a.length; _i++) {
            var aposta = _a[_i];
            if (aposta.partida.id == partida.id && aposta.escolha == partida.timeCasa && escolha == 0) {
                resultado = aposta;
            }
            if (aposta.partida.id == partida.id && aposta.escolha == "Empate" && escolha == 1) {
                resultado = aposta;
            }
            if (aposta.partida.id == partida.id && aposta.escolha == partida.timeFora && escolha == 2) {
                resultado = aposta;
            }
        }
        return resultado;
    };
    BilheteService.prototype.getApostaAoVivo = function (partidaAoVivo, escolha) {
        var resultado;
        for (var _i = 0, _a = this.bilhete.listaApostas; _i < _a.length; _i++) {
            var aposta = _a[_i];
            if (aposta.partidaAoVivo.eventId == partidaAoVivo.eventId && aposta.escolha == partidaAoVivo.event.Player1 && escolha == 0) {
                resultado = aposta;
            }
            if (aposta.partidaAoVivo.eventId == partidaAoVivo.eventId && aposta.escolha == "X" && escolha == 1) {
                resultado = aposta;
            }
            if (aposta.partidaAoVivo.eventId == partidaAoVivo.eventId && aposta.escolha == partidaAoVivo.event.Player2 && escolha == 2) {
                resultado = aposta;
            }
        }
        return resultado;
    };
    BilheteService.prototype.getApostaMaisOpcoes = function (partida, escolha) {
        var resultado;
        for (var _i = 0, _a = this.bilhete.listaApostas; _i < _a.length; _i++) {
            var aposta = _a[_i];
            if (aposta.partida.id == partida.id && aposta.escolha == escolha) {
                resultado = aposta;
            }
        }
        return resultado;
    };
    BilheteService.prototype.getApostaMaisOpcoesAoVivo = function (partida, escolha) {
        var resultado;
        for (var _i = 0, _a = this.bilhete.listaApostas; _i < _a.length; _i++) {
            var aposta = _a[_i];
            if (aposta.partidaAoVivo.eventId == partida.eventId && aposta.escolha == escolha) {
                resultado = aposta;
            }
        }
        return resultado;
    };
    BilheteService.prototype.limparBilhete = function () {
        this.bilhete = new __WEBPACK_IMPORTED_MODULE_1__model_bilhete_model__["a" /* Bilhete */]();
        this.getBilhete();
    };
    BilheteService.prototype.shareComprovante = function (bilhete) {
        this.socialSharing.share('', '', __WEBPACK_IMPORTED_MODULE_4__app_api__["c" /* SERVICE */] + "/banca/image/" + bilhete.id, '').then(function () {
            // Success!
        }).catch(function () {
            // Error!
        });
    };
    BilheteService.prototype.imprimirJogosDoDia = function () {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_4__app_api__["c" /* SERVICE */] + "/" + this.classe + "/imprimirJogosDoDia", '')
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    BilheteService.prototype.downloadImagemBilhete = function (bilhete) {
        window.open(__WEBPACK_IMPORTED_MODULE_4__app_api__["c" /* SERVICE */] + "/banca/downloadImage/" + bilhete.id);
    };
    BilheteService.prototype.getCotacao = function () {
        var cotacao = 0;
        for (var _i = 0, _a = this.bilhete.listaApostas; _i < _a.length; _i++) {
            var aposta = _a[_i];
            if (cotacao == 0) {
                cotacao = aposta.cotacaoAposta;
            }
            else {
                cotacao *= aposta.cotacaoAposta;
            }
        }
        if (this.usuario && cotacao > this.configService.configuracaoPrincipal.limiteCotacao) {
            cotacao = this.configService.configuracaoPrincipal.limiteCotacao;
        }
        this.bilhete.cotacaoTotal = cotacao;
        this.bilhete.valorPossivelRetorno = (this.bilhete.valor * cotacao);
        return cotacao;
    };
    BilheteService.prototype.validaBilhete = function () {
        var premioMaximo = this.getCotacao() * (this.bilhete.valor);
        if (premioMaximo > this.configService.configuracaoPrincipal.premioMaxCupom) {
            premioMaximo = this.configService.configuracaoPrincipal.premioMaxCupom;
        }
        this.bilhete.valorPossivelRetorno = premioMaximo;
    };
    BilheteService.prototype.tipoPartidaBilhete = function (tipoPartida) {
        var retorno = "";
        switch (tipoPartida) {
            case 'PRE_JOGO':
                {
                    retorno = "Pré Jogo";
                }
                ;
                break;
            case 'AO_VIVO':
                {
                    retorno = "Ao Vivo";
                }
                ;
                break;
            case 'ACUMULADAO':
                {
                    retorno = "Acumuladão";
                }
                ;
                break;
            case 'BOLAO':
                {
                    retorno = "Bolão";
                }
                ;
                break;
        }
        return retorno;
    };
    BilheteService.prototype.tipoBilhete = function (bilhete, css) {
        var retorno = "";
        if (bilhete.statusBilhete == 'CANCELADO') {
            retorno = "Bilhete Cancelado";
        }
        switch (bilhete.tipoBilhete) {
            case "BILHETE_PERDEDEDOR": {
                retorno = "Bilhete Perdedor";
                break;
            }
            case "BILHETE_CANCELADO": {
                retorno = "Bilhete Cancelado";
                break;
            }
            case "BILHETE_VENCEDOR": {
                retorno = "Bilhete Vencedor";
                break;
            }
            default: {
                break;
            }
        }
        if (css) {
            switch (bilhete.tipoBilhete) {
                case "BILHETE_PERDEDEDOR": {
                    retorno = "vermelho";
                    break;
                }
                case "BILHETE_CANCELADO":
                    {
                        retorno = "azul";
                        break;
                    }
                    ;
                case "BILHETE_VENCEDOR":
                    {
                        retorno = "verde";
                        break;
                    }
                    ;
                default: {
                    break;
                }
            }
            if (bilhete.statusBilhete == 'CANCELADO') {
                retorno = "azul";
            }
        }
        return retorno;
    };
    BilheteService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_5__ionic_native_social_sharing__["a" /* SocialSharing */], __WEBPACK_IMPORTED_MODULE_6__banca_service__["a" /* BancaService */],
            __WEBPACK_IMPORTED_MODULE_7__configuracao_service__["a" /* ConfiguracaoService */]])
    ], BilheteService);
    return BilheteService;
}());

//# sourceMappingURL=bilhete.service.js.map

/***/ }),

/***/ 62:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Banca; });
var Banca = /** @class */ (function () {
    function Banca() {
        this.recadastrarPartidas = false;
        this.recadastrarOpcaoCotacao = false;
        this.desativarCampeonatosVazios = false;
        this.enviarEmailMarketing = false;
        this.porcentagemOdds = 0;
        this.limiteCotacao = 0;
        this.tempoLimiteCancelamentoBilhete = 0;
        this.valorPadraoBilheteAcumuladaoBolao = 0;
    }
    return Banca;
}());

//# sourceMappingURL=banca.model.js.map

/***/ }),

/***/ 81:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfiguracaoService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_banca_model__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_api__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ConfiguracaoService = /** @class */ (function () {
    function ConfiguracaoService(http) {
        this.http = http;
        this.classe = 'configuracao';
    }
    ConfiguracaoService.prototype.salvar = function (configuracao) {
        if (!configuracao.banca || configuracao.banca.id == 0) {
            var banca = new __WEBPACK_IMPORTED_MODULE_1__model_banca_model__["a" /* Banca */]();
            banca.id = __WEBPACK_IMPORTED_MODULE_3__app_api__["a" /* ID_BANCA */];
            configuracao.banca = banca;
        }
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__app_api__["c" /* SERVICE */] + "/" + this.classe + "/salvar", JSON.stringify(configuracao))
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    ConfiguracaoService.prototype.excluir = function (configuracao) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__app_api__["c" /* SERVICE */] + "/" + this.classe + "/excluir", JSON.stringify(configuracao))
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    ConfiguracaoService.prototype.getTodasConfig = function () {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__app_api__["c" /* SERVICE */] + "/" + this.classe + "/getTodasConfig", __WEBPACK_IMPORTED_MODULE_3__app_api__["a" /* ID_BANCA */])
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    ConfiguracaoService.prototype.getUsuariosConfig = function (config) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__app_api__["c" /* SERVICE */] + "/" + this.classe + "/getUsuariosConfig", JSON.stringify(config))
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    ConfiguracaoService.prototype.salvarUsuariosConfig = function (listaUsuario) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__app_api__["c" /* SERVICE */] + "/" + this.classe + "/salvarUsuariosConfig", JSON.stringify(listaUsuario))
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    ConfiguracaoService.prototype.getConfiguracaoPadrao = function () {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_3__app_api__["c" /* SERVICE */] + "/" + this.classe + "/getConfiguracaoPadrao", __WEBPACK_IMPORTED_MODULE_3__app_api__["a" /* ID_BANCA */])
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    ConfiguracaoService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */]])
    ], ConfiguracaoService);
    return ConfiguracaoService;
}());

//# sourceMappingURL=configuracao.service.js.map

/***/ }),

/***/ 82:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PartidaService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_api__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PartidaService = /** @class */ (function () {
    function PartidaService(http) {
        this.http = http;
        this.classe = 'futebol';
    }
    PartidaService.prototype.listaPartidaPorCompeticao = function (idCompeticao, usuario) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_api__["c" /* SERVICE */] + "/" + this.classe + "/partidasPorCompeticao", String(idCompeticao) + '</>' + JSON.stringify(usuario.id))
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    PartidaService.prototype.maisOpcoesPorPartida = function (partida, usuario) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_api__["c" /* SERVICE */] + "/" + this.classe + "/maisOpcoesPorPartida", String(partida.id) + '</>' + JSON.stringify(usuario.id) + '</>' + String(__WEBPACK_IMPORTED_MODULE_2__app_api__["a" /* ID_BANCA */]))
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    PartidaService.prototype.melhoresCotacoes = function (usuario) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_api__["c" /* SERVICE */] + "/" + this.classe + "/melhoresCotacoes", JSON.stringify(usuario.id))
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    PartidaService.prototype.todasPartidas = function (usuario) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_api__["c" /* SERVICE */] + "/" + this.classe + "/todasPartidas", JSON.stringify(usuario.id))
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    PartidaService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], PartidaService);
    return PartidaService;
}());

//# sourceMappingURL=partida.service.js.map

/***/ }),

/***/ 83:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CompeticaoService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_api__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_util__ = __webpack_require__(226);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CompeticaoService = /** @class */ (function () {
    function CompeticaoService(http) {
        this.http = http;
        this.classe = 'futebol';
        this.util = new __WEBPACK_IMPORTED_MODULE_3__providers_util__["a" /* Util */]();
    }
    CompeticaoService.prototype.listaCompeticoesPorTipo = function (tipoCompeticao) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_api__["c" /* SERVICE */] + "/" + this.classe + "/competicoesPorTipo", tipoCompeticao)
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    CompeticaoService.prototype.listaTodasCompeticoes = function () {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_api__["c" /* SERVICE */] + "/" + this.classe + "/competicoesPorTipoGeral", __WEBPACK_IMPORTED_MODULE_2__app_api__["a" /* ID_BANCA */])
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    CompeticaoService.prototype.listaJogosDoDia = function () {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_api__["c" /* SERVICE */] + "/" + this.classe + "/jogosDoDia", '')
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    CompeticaoService.prototype.getRegiao = function () {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_api__["c" /* SERVICE */] + "/" + this.classe + "/getRegiao", __WEBPACK_IMPORTED_MODULE_2__app_api__["a" /* ID_BANCA */])
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    CompeticaoService.prototype.isAtualizando = function () {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_api__["c" /* SERVICE */] + "/" + this.classe + "/isAtualizando", '')
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    CompeticaoService.prototype.jogosDoDiaPorCompeticao = function (usuario, competicao) {
        return this.http.post(__WEBPACK_IMPORTED_MODULE_2__app_api__["c" /* SERVICE */] + "/" + this.classe + "/jogosDoDiaPorCompeticao", JSON.stringify(competicao) + '</>' + JSON.stringify(usuario.id))
            .toPromise()
            .then(function (res) { return res.json(); })
            .then(function (data) {
            return data;
        });
    };
    CompeticaoService.prototype.prepareJogosDoDia = function (partidas) {
        var competicaoJogosDia = [];
        var ultimaCompeticao;
        for (var _i = 0, partidas_1 = partidas; _i < partidas_1.length; _i++) {
            var partida = partidas_1[_i];
            if (partida.competicao.descricao != ultimaCompeticao) {
                competicaoJogosDia.push(partida.competicao);
                if (!competicaoJogosDia[competicaoJogosDia.length - 1].listaPartidas) {
                    competicaoJogosDia[competicaoJogosDia.length - 1].listaPartidas = [];
                }
                competicaoJogosDia[competicaoJogosDia.length - 1].listaPartidas.push(partida);
            }
            else {
                competicaoJogosDia[competicaoJogosDia.length - 1].listaPartidas.push(partida);
            }
            ultimaCompeticao = partida.competicao.descricao;
        }
        return competicaoJogosDia;
    };
    CompeticaoService.prototype.getImagemRegiao = function (regiao) {
        if (regiao) {
            regiao = this.util.removeAcento(regiao);
            regiao = regiao.replace(/ /gi, "-");
        }
        return __WEBPACK_IMPORTED_MODULE_2__app_api__["c" /* SERVICE */] + "/" + this.classe + "/imagemRegiao/" + regiao;
    };
    CompeticaoService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], CompeticaoService);
    return CompeticaoService;
}());

//# sourceMappingURL=competicao.service.js.map

/***/ }),

/***/ 9:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ID_BANCA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return SERVICE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return RECUPERAR_SENHA; });
var ID_BANCA = 33;
// YURE
//export const SERVICE = 'http://192.168.0.11:8080/ws'
//YAN
//export const SERVICE = 'http://192.168.0.18:8080/ws'
// BASE REAL
var SERVICE = 'http://191.252.102.85/ws';
//export const RECUPERAR_SENHA = 'http://i3esportes.com/recuperarSenhaUsuario?mainParam='+ID_BANCA;
//BROWSER
//export const SERVICE         = 'https://www.i3esportes.com/ws'
var RECUPERAR_SENHA = 'http://i3esportes.com/recuperarSenhaUsuario?mainParam=' + String(ID_BANCA);
//# sourceMappingURL=app.api.js.map

/***/ })

},[367]);
//# sourceMappingURL=main.js.map
import { Partida } from './partida.model'

export class PartidaAoVivo{
  id                          : number;
  dataPartida                 : Date;
  timeCasa                    : string;
  timeFora                    : string;
  eventId                     : string;
  sportId                     : string;
  leagueId                    : string;
  marketId                    : string;
  comboPrevention             : string;
  partida                     : Partida;
  event                       : Event;
  parametroPartidaAoVivoBanca : any;
}

export class Result{
  Id                   : number;
  Name                 : string;
  Self                 : string;
  Visible              : Boolean;
  Odds                 : number;
  GameTemplateId       : number;
  selecionado          : boolean;
  additionalProperties : any;
}

export class Sport{
  Id                   : number;
  Name                 : string;
  additionalProperties : any;
}

export class League{
  Id                   : number;
  Name                 : string;
  additionalProperties : any;
}

export class Region{
  Id                   : number;
  Name                 : string;
  Displayed            : Boolean;
  additionalProperties : any;
}

export class MainMarket{
  Id                   : number;
  Results              : Result[] = [];
  Name                 : string;
  Self                 : string;
  Visible              : Boolean;
  GameTemplateId       : number;
  IsMainBook           : Boolean;
  MarketOrder          : number;
  IsExt                : Boolean;
  IsMain               : Boolean;
  ResultOrder          : number;
  OpenDate             : string;
  additionalProperties : any;
  esconder             : boolean;
}

export class Market{
  Id                   : number;
  Results              : Result[] = [];
  Name                 : string;
  Self                 : string;
  Visible              : Boolean;
  GameTemplateId       : number;
  IsMainBook           : Boolean;
  MarketOrder          : number;
  IsExt                : Boolean;
  IsMain               : Boolean;
  ResultOrder          : number;
  OpenDate             : string;
  additionalProperties : any;
  esconder             : boolean;
}

export class Counter{
  Id                   : number;
  PeriodId             : number;
  Value                : number;
  Visible              : Boolean;
  additionalProperties : any;
}

export class Team{
  Counters             : Counter[] = [];
  additionalProperties : any;
  countValue           : number = 0;
}

export class PenaltiesControl{
  Id                   : string;
  Visible              : Boolean;
  Team1                : Team;
  Team2                : Team;
  additionalProperties : any;
}

export class Corners{
  Id                   : string;
  Visible              : number;
  Team1                : Team;
  Team2                : Team;
  additionalProperties : any;
}

export class Card{
  Id                   : string;
  Visible              : number;
  Team1                : Team;
  Team2                : Team;
  additionalProperties : any;
}

export class Offsides{
  Id                   : string;
  Visible              : number;
  Team1                : Team;
  Team2                : Team;
  additionalProperties : any;
}

export class ThrowIns{
  Id                   : string;
  Visible              : number;
  Team1                : Team;
  Team2                : Team;
  additionalProperties : any;
}

export class Penalties{
  Id                   : string;
  Visible              : number;
  Team1                : Team;
  Team2                : Team;
  additionalProperties : any;
}

export class Substitutions{
  Id                   : string;
  Visible              : number;
  Team1                : Team;
  Team2                : Team;
  additionalProperties : any;
}

export class GoalKicks{
  Id                   : string;
  Visible              : number;
  Team1                : Team;
  Team2                : Team;
  additionalProperties : any;
}

export class FreeKicks{
  Id                   : string;
  Visible              : number;
  Team1                : Team;
  Team2                : Team;
  additionalProperties : any;
}

export class Timer{
  Visible              : number;
  Running              : number;
  Action               : Date;
  Seconds              : number;
  ReferenceDate        : number;
  additionalProperties : any;
}

export class Player{
  Id                   : string;
  Visible              : number;
  TeamName             : string;
  ShirtColor           : string;
  ShortsColor          : string;
  additionalProperties : any;
}

export class PlayerInfo{
  ColorsAvailable      : number;
  Players              : Player[] = [];
  additionalProperties : any;
}

export class Score{
  Id                   : string;
  Visible              : number;
  Team1                : Team;
  Team2                : Team;
  additionalProperties : any;
}

export class BookieTicker{
  Visible              : number;
  Value                : string;
  additionalProperties : any;
}

export class Period{
  Id                   : number;
  Visible              : number;
  ParentPeriod         : number;
  additionalProperties : any;
}

export class ScoreBoard{
  PenaltiesControl     : PenaltiesControl;
  Corners              : Corners;
  RedCards             : Card;
  YellowCards          : Card;
  Offsides             : Offsides;
  Throwins             : ThrowIns;
  Penalties            : Penalties;
  Substitutions        : Substitutions;
  GoalKicks            : GoalKicks;
  FreeKicks            : FreeKicks;
  Timer                : Timer;
  PlayerInfo           : PlayerInfo;
  Score                : Score;
  EventId              : number;
  UpdateId             : string;
  SportId              : number;
  Name                 : string;
  Messages             : any;
  BookieTicker         : BookieTicker;
  Period               : Period;
  additionalProperties : any;
}

export class Stream{
  Id                   : string;
  StreamType           : string;
  Source               : string;
  Status               : string;
  additionalProperties : any;
}

export class RunningBall{
  BwinEventId          : number;
  MatchSimulationId    : string;
  additionalProperties : any;
}

export class Event{
  Id                   : number;
  Name                 : string;
  Self                 : string;
  sport                : Sport;
  league               : League;
  Player1              : string;
  Player2              : string;
  Region               : Region;
  MainMarket           : MainMarket;
  Markets              : Market[] = [];
  MarketCount          : any;
  Date                 : Date;
  OpenDate             : string;
  Scoreboard           : ScoreBoard;
  FormattedDate        : any;
  BetRadarId           : number;
  Streams              : Stream[] = [];
  IsPreMatch           : Boolean;
  RunningBall          : RunningBall;
  groupId              : number;
  liveType             : any;
  additionalProperties : any;
  scoreTeam1           : number;
  scoreTeam2           : number;
  tempoPartida         : string;
  statusTime           : string;
}

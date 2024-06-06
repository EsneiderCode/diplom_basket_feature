export type Status = "firstFive" | "bench";

export interface Player {
  id: string;
  content: string;
  status: Status;
  first_name?: string;
  last_name?: string;
  middle_name?: string;
  number: number;
  team_id: number;
}

export interface User {
  email: string;
  access_token: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  id: number;
  teams: [];
  user: {
    id: number;
  };
}

export interface Team {
  name: string;
  id: string;
  user_id: number;
  players: [];
}

export interface Game {
  id: string;
  date: string;
  team_a: string;
  team_b: string;
  user_id: string;
  game_name: string;
}

export interface PlayerTeam {
  number: number;
  name: string;
  first_name?: string;
  last_name?: string;
  middle_name?: string;
  id: number;
  team_id: number;
}

export interface TeamInfo {
  id: string;
  name: string;
}

export interface StartAttack {
  id: number;
  abbreviate: string;
  description: string;
  s_abbreviate: string;
}

export interface Time {
  id: number;
  time: string;
}

export interface TimeType {
  id: number;
  time_type: number;
}

export interface AttackType {
  id: number;
  abbreviate: string;
  description: string;
  s_abbreviate: string;
}

export interface LossOption {
  id: number;
  abbreviate: string;
  description: string;
  s_abbreviate: string;
}

export interface PlayType {
  id: number;
  abbreviate: string;
  description: string;
  s_abbreviate: string;
}

export interface FoulOption {
  id: number;
  abbreviate: string;
  description: string;
  s_abbreviate: string;
}

export interface ThrowType {
  id: number;
  abbreviate: string;
  description: string;
  s_abbreviate: string;
}

export interface ResultAttackI {
  id: number;
  abbreviate: string;
  description: string;
  s_abbreviate: string;
}

export interface OptionsI {
  time: Time[];
  startAttack: StartAttack[];
  timeType: TimeType[];
  attackType: AttackType[];
  foul: FoulOption[];
  loss: LossOption[];
  playType: PlayType[];
  throwType: ThrowType[];
  resultAttack: ResultAttackI[];
}

export const options: OptionsI = {
  time: [
    { id: 0, time: "1" },
    { id: 1, time: "2" },
    { id: 2, time: "3" },
    { id: 3, time: "4" },
    { id: 4, time: "ОТ" },
  ],
  startAttack: [
    {
      id: 0,
      abbreviate: "SELECTION_IN_DEFENCE",
      description: "подбор в защите",
      s_abbreviate: "dr",
    },
    {
      id: 1,
      abbreviate: "INTERCEPTION",
      description: "перехват",
      s_abbreviate: "st",
    },
    {
      id: 2,
      abbreviate: "LIVE_BALL",
      description: "после забитого живой мяч",
      s_abbreviate: "bl",
    },
    {
      id: 3,
      abbreviate: "DEAD_BALL",
      description: "ввод мертвого мяча в игру",
      s_abbreviate: "in",
    },
    {
      id: 4,
      abbreviate: "SELECTION_IN_ATTACK",
      description: "подбор в нападении",
      s_abbreviate: "or",
    },
  ],
  timeType: [
    { id: 0, time_type: 14 },
    { id: 1, time_type: 24 },
  ],
  attackType: [
    {
      id: 0,
      abbreviate: "QUICK_BREAKAWAY",
      description: "быстрый отрыв",
      s_abbreviate: "fb",
    },
    {
      id: 1,
      abbreviate: "EARLY_ATTACK",
      description: "раннее нападение",
      s_abbreviate: "sb",
    },
    {
      id: 2,
      abbreviate: "SECOND_CHANCE_ATTACK",
      description: "атака 2 шанса",
      s_abbreviate: "sc",
    },
    {
      id: 3,
      abbreviate: "POSITIONAL_ATTACK",
      description: "позиционное нападение",
      s_abbreviate: "so",
    },
    {
      id: 4,
      abbreviate: "BREAKING_PRESSURE",
      description: "против прессинга",
      s_abbreviate: "po",
    },
    {
      id: 5,
      abbreviate: "BREAKING_ZONE",
      description: "против зоны",
      s_abbreviate: "zo",
    },
  ],
  foul: [
    {
      id: 0,
      abbreviate: "SHOT_1",
      description: "1 бросок",
      s_abbreviate: "f1",
    },
    {
      id: 1,
      abbreviate: "SHOT_2",
      description: "2 броска",
      s_abbreviate: "f2",
    },
    {
      id: 2,
      abbreviate: "SHOT_3",
      description: "3 броска",
      s_abbreviate: "f3",
    },
    {
      id: 3,
      abbreviate: "NOT_PUNCHY",
      description: "непробивной",
      s_abbreviate: "f",
    },
  ],
  loss: [
    {
      id: 0,
      abbreviate: "PASS_LOSS",
      description: "Пас-потеря",
      s_abbreviate: "tp",
    },
    {
      id: 1,
      abbreviate: "TECHNICAL_LOSS",
      description: "Техническая потеря",
      s_abbreviate: "tt",
    },
    {
      id: 2,
      abbreviate: "FOUL_IN_ATTACK",
      description: "Фол в нападении",
      s_abbreviate: "of",
    },
    {
      id: 3,
      abbreviate: "TACTICAL_LOSS",
      description: "Тактическая потеря",
      s_abbreviate: "tct",
    },
  ],
  playType: [
    { id: 0, abbreviate: "DRIVES", description: "Drives", s_abbreviate: "dr" },
    {
      id: 1,
      abbreviate: "ISOLATION",
      description: "Isolation",
      s_abbreviate: "tr",
    },
    {
      id: 2,
      abbreviate: "TRANSITION",
      description: "Transition",
      s_abbreviate: "is",
    },
    {
      id: 3,
      abbreviate: "CATCH_SHOOT",
      description: "Catch&shoot",
      s_abbreviate: "cs",
    },
    {
      id: 4,
      abbreviate: "PULL_UP",
      description: "Pull up",
      s_abbreviate: "pup",
    },
    {
      id: 5,
      abbreviate: "POST_UP",
      description: "Post up",
      s_abbreviate: "pop",
    },
    {
      id: 6,
      abbreviate: "PNR_HANDLER",
      description: "PnR Handler",
      s_abbreviate: "prh",
    },
    {
      id: 7,
      abbreviate: "PNR_ROLLER",
      description: "PnR Roller",
      s_abbreviate: "prr",
    },
    { id: 8, abbreviate: "CUTS", description: "Cuts", s_abbreviate: "cu" },
    {
      id: 9,
      abbreviate: "OFF_SCREEN",
      description: "Off Screen",
      s_abbreviate: "os",
    },
    {
      id: 10,
      abbreviate: "HAND_OFF",
      description: "Hand Off",
      s_abbreviate: "ho",
    },
  ],
  throwType: [
    { id: 0, abbreviate: "entry", description: "Попадание", s_abbreviate: "s" },
    { id: 1, abbreviate: "miss", description: "Промах", s_abbreviate: "m" },
  ],
  resultAttack: [
    { id: 0, abbreviate: "FOUL", description: "Фол", s_abbreviate: "fl" },
    { id: 1, abbreviate: "SHOT", description: "Бросок", s_abbreviate: "sh" },
    { id: 2, abbreviate: "loss", description: "Потеря", s_abbreviate: "ls" },
  ],
};

export interface CreateAction {
  game_id: string;
  team_id: string;
  index: number;
  created_at: string;
  quater: number;
  playersOnField: Player[];
  typeOfPossession: string;
  possessions: Player[];
  timeType: number;
  time: number;
  attackType: string;
  result: string;
  playType: string;
  zone: number;
  shotResult: string;
  assist: string;
  foulType: string;
  techFoulTeam: string;
  techFoulPlayer: string;
  techFoulRes: string;
  foulResult: number;
  lossType: string;
}

export interface Action {
  game_id: string;
  team_id: string;
  index: number;
  created_at: string;
  quater: number | null;
  typeOfPossession: string;
  playersOnField: PlayerTeam[];
  possessions: PlayerTeam[];
  timeType: string | null;
  time: number;
  attackType: string;
  result: string;
  playType: string | null;
  zone: number;
  shotResult: string | null;
  assist: string;
  foulType: string | null;
  techFoulTeam: string;
  techFoulPlayer: string;
  techFoulRes: string;
  foulResult: number;
  lossType: string | null;
  id: string;
}

export interface ActionTableDiagramI {
  index: number;
  quater: number | string;
  playersOnField: PlayerTeam[];
  typeOfPossession: string;
  possessions: PlayerTeam[];
  timeType: number | string;
  time: number | string;
  attackType: string;
  playType: string;
  zone: number | string;
  assist: string;
  foulType: number | string;
  foulResult: number | string;
  lossType: string | null;
  shotResult: string | null;
}

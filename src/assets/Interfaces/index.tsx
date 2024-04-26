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
  team_a: Team;
  team_b: Team;
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
}

export interface LossOption {
  id: number;
  abbreviate: string;
  description: string;
}

export interface PlayType {
  id: number;
  abbreviate: string;
  description: string;
}

export interface FoulOption {
  id: number;
  abbreviate: string;
  description: string;
}

export interface ThrowType {
  id: number;
  abbreviate: string;
  description: string;
}

export interface ResultAttackI {
  id: number;
  abbreviate: string;
  description: string;
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

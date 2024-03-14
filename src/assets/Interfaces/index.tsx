export type Status = "firstFive" | "bench";

export interface Player {
  id: number;
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
  first_name: string;
  last_name: string;
  middle_name: string;
  id: number;
  teams: [];
}

export interface Team {
  name: string;
  id: number;
  user_id: number;
  players: [];
}

export interface Game {
  date: string;
  id: number;
  team_a: {
    name: string;
    id: number;
    user_id: number;
    players: [];
  };
  team_a_id: number;
  team_b: {
    name: string;
    id: number;
    user_id: number;
    players: [];
  };
  team_b_id: number;
  user_id: number;
}

export interface PlayerTeam {
  number: number;
  first_name?: string;
  last_name?: string;
  middle_name?: string;
  id: number;
  team_id: number;
}

export interface TeamInfo {
  id: number;
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

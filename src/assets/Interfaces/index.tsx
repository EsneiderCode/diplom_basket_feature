export type Status = "firstFive" | "bench";

export interface Player {
  id: number;
  content: string;
  status: Status;
}

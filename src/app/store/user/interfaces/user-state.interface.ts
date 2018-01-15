export interface UserState {
  username: string;
  resources: { id: number; amount: number }[];
  buildings: number[];
}
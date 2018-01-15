export interface UserDto {
  username: string;
  resources: { id: number; amount: number }[];
  buildings: number[];
}
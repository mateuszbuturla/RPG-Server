import { Player } from '../../player/player.class';

export interface IPlayerKeyPressData {
  inputId: 'right' | 'left' | 'up' | 'down';
  state: boolean;
}

export interface IPlayerRes {
  id: string;
  x: number;
  y: number;
}

export interface IPlayerData {
  [key: string]: Player;
}

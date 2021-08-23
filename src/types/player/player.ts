import { Player } from '../../player/player.class';
import { AnimationType } from '../common/animation';
import { IMoveDirection, IPosition } from '../common/common';

export interface IPlayerKeyPressData {
  inputId: 'right' | 'left' | 'up' | 'down';
  state: boolean;
}

export interface IPlayerRes {
  id: string;
  position: IPosition;
  moveDirection: IMoveDirection;
  health: number;
}

export interface IPlayerData {
  [key: string]: Player;
}

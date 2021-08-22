import * as socketio from 'socket.io';
import { Entity } from '../baseClasses/Entity';
import { AnimationType } from '../types/common/animation';
import { IMoveDirection } from '../types/common/common';
import { IPlayerKeyPressData } from '../types/player';

export class Player extends Entity {
  pressingRight: boolean = false;
  pressingLeft: boolean = false;
  pressingUp: boolean = false;
  pressingDown: boolean = false;
  moveDirection: IMoveDirection = { x: 0, y: 0 };

  constructor(id: string) {
    super();
    this.id = id;
  }

  onKeyPress(data: IPlayerKeyPressData): void {
    if (data.inputId === 'left') this.pressingLeft = data.state;
    else if (data.inputId === 'right') this.pressingRight = data.state;
    else if (data.inputId === 'up') this.pressingUp = data.state;
    else if (data.inputId === 'down') this.pressingDown = data.state;
    this.updateMoveDirection(data);
    this.update();
  }

  update(): void {
    this.updateSpd();
    super.update();
    this.pressingDown = false;
    this.pressingLeft = false;
    this.pressingRight = false;
    this.pressingUp = false;
  }

  updateSpd = (): void => {
    if (this.pressingRight) {
      this.spdX = this.maxSpd;
    } else if (this.pressingLeft) {
      this.spdX = -this.maxSpd;
    } else {
      this.spdX = 0;
    }

    if (this.pressingUp) {
      this.spdY = this.maxSpd;
    } else if (this.pressingDown) {
      this.spdY = -this.maxSpd;
    } else {
      this.spdY = 0;
    }
  };

  updateMoveDirection(data: IPlayerKeyPressData): void {
    if (data.inputId === 'left') this.moveDirection.x = data.state ? -1 : 0;
    if (data.inputId === 'right') this.moveDirection.x = data.state ? 1 : 0;
    if (data.inputId === 'up') this.moveDirection.y = data.state ? 1 : 0;
    if (data.inputId === 'down') this.moveDirection.y = data.state ? -1 : 0;
  }
}

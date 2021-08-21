import * as socketio from 'socket.io';
import { Entity } from '../baseClasses/Entity';
import { IPlayerKeyPressData } from '../types/player';

export class Player extends Entity {
  socket: socketio.Socket;
  pressingRight: boolean = false;
  pressingLeft: boolean = false;
  pressingUp: boolean = false;
  pressingDown: boolean = false;

  constructor(socket: socketio.Socket) {
    super();
    this.socket = socket;
  }

  onKeyPress(data: IPlayerKeyPressData): void {
    if (data.inputId === 'left') this.pressingLeft = data.state;
    else if (data.inputId === 'right') this.pressingRight = data.state;
    else if (data.inputId === 'up') this.pressingUp = data.state;
    else if (data.inputId === 'down') this.pressingDown = data.state;
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
    if (this.pressingRight) this.spdX = this.maxSpd;
    else if (this.pressingLeft) this.spdX = -this.maxSpd;
    else this.spdX = 0;

    if (this.pressingUp) this.spdY = this.maxSpd;
    else if (this.pressingDown) this.spdY = -this.maxSpd;
    else this.spdY = 0;
  };
}

import * as socketio from 'socket.io';
import { Player } from './player.class';
import { IPlayerKeyPressData } from '../types/player';

export class PlayerModule {
  io: socketio.Server;
  socket: socketio.Socket;
  player: Player;

  constructor(io: socketio.Server, socket: socketio.Socket, player: Player) {
    this.io = io;
    this.socket = socket;
    this.player = player;
    this.init();
  }

  init(): void {
    this.socket.on('keyPress', (data: IPlayerKeyPressData) => {
      this.player.onKeyPress(data);
    });
    this.socket.on('keyRelese', (data: IPlayerKeyPressData) => {
      this.player.onKeyPress(data);
    });
  }
}

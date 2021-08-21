import * as socketio from 'socket.io';
import { Player } from './player.class';

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
    this.socket.on('keyPress', (data: any) => {
      this.player.onKeyPress(data);
    });

    setInterval(() => {
      let pack: any[] = [];
      Object.keys((global as any).playerList).forEach(function (key) {
        const player = (global as any).playerList[key];
        pack.push({
          id: player.socket.id,
          x: player.x,
          y: player.y,
        });
      });
      this.io.emit('newPositions', { players: pack });
    }, 1000 / 30);
  }
}

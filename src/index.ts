import express, { Express, Request, Response } from 'express';
import * as http from 'http';
import * as socketio from 'socket.io';
import { Player } from './player/player.class';
import { PlayerModule } from './player/player.module';
import { IPlayerData, IPlayerRes } from './types/player';

const port: number = parseInt(process.env.PORT || '3000', 10);
const dev: boolean = process.env.NODE_ENV !== 'production';

const app: Express = express();
const server: http.Server = http.createServer(app);
const io: socketio.Server = new socketio.Server();

io.attach(server, {
  cors: {
    origin: `http://localhost:${port}`,
    methods: ['GET', 'POST'],
    allowedHeaders: ['my-custom-header', 'Access-Control-Allow-Origin'],
    credentials: true,
  },
});

let playerList: any = {};
let socketList: any = {};

io.on('connection', (socket: socketio.Socket) => {
  console.log('New player connected');
  const player = new Player(socket.id);

  socketList[socket.id] = socket;
  playerList[socket.id] = player;
  const playerModule = new PlayerModule(io, socket, player);

  socket.on('disconnect', function () {
    delete socketList[socket.id];
    delete playerList[socket.id];
  });
});

setInterval(() => {
  let pack: IPlayerRes[] = [];
  Object.keys(playerList).forEach(function (key) {
    const player = playerList[key];
    pack.push({
      id: player.id,
      position: {
        x: player.x,
        y: player.y,
      },
      moveDirection: player.moveDirection,
      health: player.health,
    });
  });
  // console.log(pack);
  io.emit('newPositions', { players: pack });
}, 1000 / 30);

server.listen(port, () => {
  console.log(`> Ready on http://localhost:${port}`);
});

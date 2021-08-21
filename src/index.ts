import express, { Express, Request, Response } from 'express';
import * as http from 'http';
import * as socketio from 'socket.io';
import { Player } from './player/player.class';
import { PlayerModule } from './player/player.module';
import { IPlayerData } from './types/player';

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

(global as any).playerList = {};
(global as any).socketList = {};

io.on('connection', (socket: socketio.Socket) => {
  console.log('New player connected');
  const player = new Player(socket);

  (global as any).socketList[socket.id] = socket;
  (global as any).playerList[socket.id] = player;
  const playerModule = new PlayerModule(io, socket, player);

  socket.on('disconnect', function () {
    delete (global as any).socketList[socket.id];
    delete (global as any).playerList[socket.id];
  });
});

server.listen(port, () => {
  console.log(`> Ready on http://localhost:${port}`);
});

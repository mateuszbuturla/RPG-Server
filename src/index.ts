import express, { Express, Request, Response } from 'express';
import * as http from 'http';
import * as socketio from 'socket.io';

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

io.on('connection', (socket: socketio.Socket) => {
  console.log('connection');
});

server.listen(port, () => {
  console.log(`> Ready on http://localhost:${port}`);
});

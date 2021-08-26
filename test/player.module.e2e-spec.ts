import { IPlayerRes } from './../src/types/player/player';
import { io, Socket } from 'socket.io-client';
import { Player } from '../src/player/player.class';

describe('player module e2e test', function () {
  let socket: Socket;
  let thisPlayer: any;

  beforeEach((done: any) => {
    socket = io('http://localhost:3000');
    socket.on('connect', function () {
      console.log('worked...');
      done();
    });
    socket.on('disconnect', function () {
      console.log('disconnected...');
    });
  });

  afterEach((done) => {
    if (socket.connected) {
      console.log('disconnecting...');
      socket.disconnect();
    } else {
      console.log('no connection to break...');
    }
    done();
  });

  test('should return position of all players', (done) => {
    socket.on('newPositions', (arg) => {
      thisPlayer = arg.players.find(
        (player: IPlayerRes) => player.id === socket.id,
      );
      expect(arg).toEqual(
        expect.objectContaining({
          players: expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(String),
              position: {
                x: expect.any(Number),
                y: expect.any(Number),
              },
              moveDirection: {
                x: expect.any(Number),
                y: expect.any(Number),
              },
            }),
          ]),
        }),
      );
      done();
    });
  });

  test('should decrease health by 10', (done) => {
    const damage = 10;
    const testPlayer = new Player('test2');
    socket.emit('takeDamage', damage);
    socket.on('newPositions', (arg) => {
      thisPlayer = arg.players.find(
        (player: IPlayerRes) => player.id === socket.id,
      );
      expect(thisPlayer).toEqual(
        expect.objectContaining({ health: testPlayer.health - damage }),
      );
      done();
    });
  });
});

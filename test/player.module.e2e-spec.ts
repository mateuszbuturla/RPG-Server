import { io, Socket } from 'socket.io-client';

describe('player module e2e test', function () {
  let socket: Socket;

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
});

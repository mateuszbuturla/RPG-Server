import { Player } from './player.class';

const defaultValue: any = {
  id: 'test',
  x: 250,
  y: 250,
  spdX: 0,
  spdY: 0,
  maxSpd: 1,
  pressingRight: false,
  pressingLeft: false,
  pressingUp: false,
  pressingDown: false,
  moveDirection: { x: 0, y: 0 },
};

describe('player class test', function () {
  let player: Player;

  beforeAll(() => {
    player = new Player('test');
  });

  afterEach(() => {
    Object.keys(defaultValue).forEach((key: string) => {
      if (defaultValue[key] !== undefined) {
        if (key in player) {
          // @ts-ignore
          player[key] = defaultValue[key];
        }
      }
    });
  });

  it('should be define with values', () => {
    expect(player).toEqual(
      expect.objectContaining({
        id: 'test',
        x: 250,
        y: 250,
        spdX: 0,
        spdY: 0,
        maxSpd: 1,
        pressingRight: false,
        pressingLeft: false,
        pressingUp: false,
        pressingDown: false,
        moveDirection: { x: 0, y: 0 },
      }),
    );
  });

  it('should change x property by -1', () => {
    player.onKeyPress({ inputId: 'left', state: true });
    expect(player).toEqual(expect.objectContaining({ x: defaultValue.x - 1 }));
  });

  it('should change x property by 1', () => {
    player.onKeyPress({ inputId: 'right', state: true });
    expect(player).toEqual(expect.objectContaining({ x: defaultValue.x + 1 }));
  });

  it('should change y property by -1', () => {
    player.onKeyPress({ inputId: 'down', state: true });
    expect(player).toEqual(expect.objectContaining({ y: defaultValue.y - 1 }));
  });

  it('should change y property by 1', () => {
    player.onKeyPress({ inputId: 'up', state: true });
    expect(player).toEqual(expect.objectContaining({ y: defaultValue.y + 1 }));
  });

  it('should change moveDirection property', () => {
    player.updateMoveDirection({ inputId: 'right', state: true });
    expect(player).toEqual(
      expect.objectContaining({
        moveDirection: expect.objectContaining({ x: 1 }),
      }),
    );
    player.updateMoveDirection({ inputId: 'right', state: false });

    expect(player).toEqual(
      expect.objectContaining({
        moveDirection: expect.objectContaining({ x: 0 }),
      }),
    );
  });
});

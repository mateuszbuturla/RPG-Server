import { Entity } from './Entity';

const defaultValue: any = {
  id: 'test',
  x: 250,
  y: 250,
  spdX: 0,
  spdY: 0,
  maxSpd: 1,
  health: 100,
  maxHealth: 100,
};

describe('entity class test', function () {
  let entity: Entity;

  beforeAll(() => {
    entity = new Entity('test');
  });

  afterEach(() => {
    Object.keys(defaultValue).forEach((key: string) => {
      if (defaultValue[key] !== undefined) {
        if (key in entity) {
          // @ts-ignore
          entity[key] = defaultValue[key];
        }
      }
    });
  });

  it('should be define with values', () => {
    expect(entity).toEqual(
      expect.objectContaining({
        id: 'test',
        x: 250,
        y: 250,
        spdX: 0,
        spdY: 0,
        maxSpd: 1,
        health: 100,
        maxHealth: 100,
      }),
    );
  });

  it('should decrease health by 10', () => {
    const damage: number = 10;
    entity.onDamageTaken(damage);
    expect(entity).toEqual(
      expect.objectContaining({ health: defaultValue.health - damage }),
    );
  });
});

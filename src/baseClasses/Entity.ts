export class Entity {
  id: string = '';
  x: number = 250;
  y: number = 250;
  spdX: number = 0;
  spdY: number = 0;
  maxSpd: number = 1;
  health: number;
  maxHealth: number = 100;

  constructor(id: string) {
    this.id = id;
    this.health = this.maxHealth;
  }

  update(): void {
    this.updatePosition();
  }

  updatePosition(): void {
    this.x += this.spdX;
    this.y += this.spdY;
  }

  onDamageTaken(damage: number): void {
    console.log('test22');
    this.health -= damage;
  }
}

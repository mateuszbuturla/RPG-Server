export class Entity {
  id: string = '';
  x: number = 250;
  y: number = 250;
  spdX: number = 0;
  spdY: number = 0;
  maxSpd: number = 1;

  update(): void {
    this.updatePosition();
  }

  updatePosition(): void {
    this.x += this.spdX;
    this.y += this.spdY;
  }
}

import {world} from "../index.js";
import World from "./World.js";

export default class Human {
  constructor(props = {}) {
    const {
      name,
      eyes,
      age = 0,
      weight = 3,
      birthDay = World.getCurrentTime(),
      x,
      y,
      velocityX,
      velocityY,
    } = props;

    this.name = name;
    this.age = age;
    this.weight = weight;
    this.eyes = eyes;
    this.birthDay = birthDay;
    this.deatDate = Math.floor(100 - (Math.random() * (21 - 1) + 1));

    this.x = x; // ?? Math.random() * w;
    this.y = y; // ?? Math.random() * h;
    this.velocityX = velocityX ?? getSpeed();
    this.velocityY = velocityY ?? getSpeed();
  }

  grow() {
    const rules = [
      this.age === 6 && this.weight !== 5,
      this.age === 12 && this.weight !== 7,
      this.age === 18 && this.weight !== 9,
    ];
    const isGrow = rules.some((bool) => bool);

    if (isGrow) {
      this.weight += 2;
    }
  }

  updateAge(idx) {
    if (this.age === this.deatDate) {
      this.funeralBureau(idx);
    }

    this.age = World.getCurrentTime() - this.birthDay;
  }

  funeralBureau(idx) {
    world.timeToHeaven.call(world, idx);
  }

  position(w, h) {
    (this.x + this.velocityX > w && this.velocityX > 0) ||
    (this.x + this.velocityX < 0 && this.velocityX < 0)
      ? (this.velocityX *= -1)
      : this.velocityX;
    (this.y + this.velocityY > h && this.velocityY > 0) ||
    (this.y + this.velocityY < 0 && this.velocityY < 0)
      ? (this.velocityY *= -1)
      : this.velocityY;

    this.x += this.velocityX;
    this.y += this.velocityY;
  }

  reDraw() {
    const context = World.context;

    context.beginPath();
    context.arc(this.x, this.y, this.weight, 0, Math.PI * 2);
    context.closePath();
    context.fillStyle = this.eyes;
    context.fill();
  }
}

function getSpeed() {
  return Math.random() * (0.5 * 10) - 0.5;
}

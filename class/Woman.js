import { world } from '../index.js';
import Human from './Human.js';
import Man from './Man.js';
import names from '../data/names.js';

const { femaleNames, maleNames } = names;

export default class Woman extends Human {
  constructor(props) {
    super(props);

    const { maxChildren } = props;
    this.gender = 'female';
    this.maxChildren = maxChildren ?? Math.floor(Math.random() * (4 - 1) + 1);
    this.children = [];
  }

  produceOffspring(fatherEyes) {
    if (this.children.length === this.maxChildren) {
      return;
    }

    const gender = identifyGender();
    const name = createName(gender);
    const eyes = createEyesColor(fatherEyes, this.eyes);

    const mapa = { female: Woman, male: Man };
    const child = new mapa[gender]({ name, eyes, x: this.x, y: this.y });

    this.children.push(child);
    world.updatePopulation.call(world, child);
  }
}

function identifyGender() {
  return Math.random() > 0.4 ? 'female' : 'male';
}

function createName(gender) {
  const mapa = { female: femaleNames, male: maleNames };

  return mapa[gender][Math.floor(Math.random() * (mapa[gender].length - 1)) + 1];
}

function createEyesColor(father, mother) {
  const rRegex = /^rgb\((\d+),(\d+),(\d+)\)$/;
  const f = father.match(rRegex) ?? [0, 53, 204, 255];
  const m = mother.match(rRegex) ?? [0, 255, 0, 51];

  return `rgb(${mergerColors(f[1], m[1])}, ${mergerColors(f[2], m[2])}, ${mergerColors(f[3], m[3])})`;
}

function mergerColors(a, b) {
  const color = Math.random() > 0.8 ? generateRgb() : Math.floor((parseFloat(a) + parseFloat(b)) / 2);

  return color > 20 ? color : generateRgb();
}

function generateRgb() {
  return Math.floor(Math.random() * (254 - 1) + 1);
}

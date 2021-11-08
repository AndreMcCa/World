import Human from './Human.js';

export default class Man extends Human {
  constructor(props = {}) {
    super(props);
    this.gender = 'male';
  }

  seduce(human) {
    if (this.age < 18 || this.age > 60) {
      return;
    }

    if (human.gender === 'female' && human.age >= 18 && human.age <= 60) {
      if (Math.random() < 0.3) {
        human.produceOffspring(this.eyes);
      }
    }
  }
}

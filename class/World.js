export default class World {
  static BIG_BANG = Date.now();
  static context = null;

  static getCurrentTime() {
    return Math.floor((Date.now() - this.BIG_BANG) / 100 / 10);
  }

  constructor({population = [], context}) {
    this.constructor.context = context;
    this.population = population;
    this.totalPeople = 2;
  }

  get context() {
    return this.constructor.context;
  }

  set context(ctx) {
    this.constructor.context = ctx;
  }

  updatePopulation(human) {
    this.population.push(human);
    this.totalPeople += 1;
  }

  timeToHeaven(idx) {
    this.population.splice(idx, 1);
  }
}

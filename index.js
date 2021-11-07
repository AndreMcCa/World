import World from "./class/World.js";
import Man from "./class/Man.js";
import Woman from "./class/Woman.js";

// ========= Canvas ========= >

const canvas = document.createElement("canvas");
const context = canvas.getContext("2d");

document.body.prepend(canvas);

let w = (canvas.width = innerWidth);
let h = (canvas.height = innerHeight);

window.addEventListener("resize", () => {
  w = canvas.width = innerWidth;
  h = canvas.height = innerHeight;
});

// ========= Init ========= >

const defaultOptions = {
  population: [
    new Woman({
      name: "Eva",
      eyes: "rgb(255,0,102)",
      age: 18,
      weight: 9,
      maxChildren: 5,
      birthDay: -18,
      deatDate: 100 - Math.floor(Math.random() * (10 - 1) + 1),
      x: w / 2 + 150,
      y: h / 2 + 150,
      velocityX: -1,
      velocityY: -1,
    }),
    new Man({
      name: "Adam",
      eyes: "rgb(102,0,255)",
      age: 18,
      weight: 9,
      birthDay: -18,
      deatDate: 100 - Math.floor(Math.random() * (10 - 1) + 1),
      x: w / 2 - 150,
      y: h / 2 - 150,
      velocityX: 1,
      velocityY: 1,
    }),
  ],
  context,
};

export const world = new World(defaultOptions);
loop();

function showStatus() {
  const population = world.population.length;
  const year = World.getCurrentTime();
  const total = world.totalPeople;

  context.font = "20px sans-serif";
  context.textAlign = "right";
  context.fillStyle = "rgb(255,0,21)";
  context.fillText(`People: ${population}`, innerWidth - 20, 50);

  context.font = "20px sans-serif";
  context.textAlign = "right";
  context.fillStyle = "rgb(255,0,21)";
  context.fillText(`Year: ${year}`, innerWidth - 20, 80);

  context.font = "20px sans-serif";
  context.textAlign = "right";
  context.fillStyle = "rgb(0,0,0)";
  context.fillText(`Total: ${total}`, innerWidth - 20, 110);
}

function loop() {
  reDrawBackgroun();
  reDrawHumans();
  reDrawLines();
  showStatus();

  window.requestAnimationFrame(loop);
}

// ============================= >

function reDrawBackgroun() {
  context.fillStyle = "#c9e9ff";
  context.fillRect(0, 0, w, h);
}

function reDrawHumans() {
  world.population.forEach((human, idx) => {
    human.position(w, h);
    human.reDraw();
    human.updateAge(idx);
    human.grow();
  });
}

function reDrawLines() {
  const {population} = world;
  const quantityPeople = population.length;

  for (let i = 0; i < quantityPeople; i += 1) {
    for (let j = 0; j < quantityPeople; j += 1) {
      const x1 = population[i].x;
      const y1 = population[i].y;
      const x2 = population[j].x;
      const y2 = population[j].y;
      const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)); //  растояние по формуле диагонали

      if (distance < 100 && distance !== 0) {
        population[i].seduce?.(population[j]);

        context.lineWidth = 0.5;
        context.strokeStyle = `${population[i].eyes}`;
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
      }
    }
  }
}

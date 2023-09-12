const startTime = Date.now();
let lastCheck = Date.now();
let gen = 0;

class Chicken {
  constructor(x, y) {
    this.brain = ml5.neuralNetwork({
      inputs: ["xpos", "ypos", "clumpDist"],
      outputs: [
        "left",
        "right",
        "up",
        "down",
        "diagUpLeft",
        "diagUpRight",
        "diagDownLeft",
        "diagDownRight",
      ],
      task: "classification",
      noTraining: true,
    });
    this.brain.mutate(1);
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 10;
    this.color = "white";
    this.score = 0;
    this.chickenClumpDist = 0;
    this.lastMove = "up";
  }

  nextMove() {
    let classification = this.brain.classify({
      xpos: this.x,
      ypos: this.y,
      clumpDist: this.clumpDist,
    });
    console.log(this.lastMove)
    while (classification == this.lastMove) {
      classification = this.brain.classify({
        xpos: this.x,
        ypos: this.y,
        clumpDist: this.clumpDist,
      });
    }
    console.log(classification)
    this.lastMove = classification;
    console.log(this.lastMove)
    return classification;
  }

  checkBounds() {
    this.x = constrain(this.x, 0, window.innerWidth * 0.8 - this.width);
    this.y = constrain(this.y, 0, 600 - this.width);
  }

  moveLeft() {
    this.x -= 10;
    this.checkBounds();
  }

  moveRight() {
    this.x += 10;
    this.checkBounds();
  }

  moveUp() {
    this.y -= 10;
    this.checkBounds();
  }

  moveDown() {
    this.y += 10;
    this.checkBounds();
  }

  diagUpLeft() {
    this.y -= 10;
    this.x -= 10;
    this.checkBounds();
  }

  diagUpRight() {
    this.y -= 10;
    this.x += 10;
    this.checkBounds();
  }

  diagDownLeft() {
    this.y += 10;
    this.x -= 10;
    this.checkBounds();
  }

  diagDownRight() {
    this.y += 10;
    this.x += 10;
    this.checkBounds();
  }

  draw() {
    fill(this.color);
    rect(this.x, this.y, this.width, this.height);
  }
}

class Fox {
  constructor(x, y) {
    this.brain = ml5.neuralNetwork({
      inputs: ["xpos", "ypos", "chickenDist", "clumpDist"],
      outputs: [
        "left",
        "right",
        "up",
        "down",
        "diagUpLeft",
        "diagUpRight",
        "diagDownLeft",
        "diagDownRight",
      ],
      task: "classification",
      noTraining: true,
    });
    this.brain.mutate(1);
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 10;
    this.color = "orange";
    this.score = 0;
    this.chickenDist = 100;
    this.clumpDist = 10;
    this.lastMove ="up";
  }

  nextMove() {
    return 
  }

  nextMove() {
    let classification = this.brain.classify({
      xpos: this.x,
      ypos: this.y,
      chickenDist: this.chickenDist,
      clumpDist: this.clumpDist,
    });
    while (classification == this.lastMove) {
      classification = this.brain.classify({
        xpos: this.x,
        ypos: this.y,
        chickenDist: this.chickenDist,
        clumpDist: this.clumpDist,
      });
    }
    this.lastMove = classification;
    return classification;
  }

  checkBounds() {
    this.x = constrain(this.x, 0, window.innerWidth * 0.8 - this.width);
    this.y = constrain(this.y, 0, 600 - this.width);
  }

  moveLeft() {
    this.x -= 10;
    this.checkBounds();
  }

  moveRight() {
    this.x += 10;
    this.checkBounds();
  }

  moveUp() {
    this.y -= 10;
    this.checkBounds();
  }

  moveDown() {
    this.y += 10;
    this.checkBounds();
  }

  diagUpLeft() {
    this.y -= 10;
    this.x -= 10;
    this.checkBounds();
  }

  diagUpRight() {
    this.y -= 10;
    this.x += 10;
    this.checkBounds();
  }

  diagDownLeft() {
    this.y += 10;
    this.x -= 10;
    this.checkBounds();
  }

  diagDownRight() {
    this.y += 10;
    this.x += 10;
    this.checkBounds();
  }

  draw() {
    fill(this.color);
    rect(this.x, this.y, this.width, this.height);
  }
}

let chickens = [];
let dead_chickens = [];
let foxes = [];

for (var i = 0; i < 40; i++) {
  chickens.push(
    new Chicken(randInt(0, window.innerWidth * 0.8), randInt(0, 600))
  );
}

for (var i = 0; i < 20; i++) {
  foxes.push(new Fox(randInt(0, window.innerWidth * 0.8), randInt(0, 600)));
}

function setup() {
  createCanvas(window.innerWidth * 0.8, 600);
}

function draw() {
  document.getElementById("gen").innerHTML = gen;
  background("#CDFF33");

  chickens.forEach((i) => {
    let action = i.nextMove();
    action.then((r) => {
      value = r[0].label;
      if (value == "left") {
        i.moveLeft();
      }
      if (value == "right") {
        i.moveRight();
      }
      if (value == "up") {
        i.moveUp();
      }
      if (value == "down") {
        i.moveDown();
      }
      if (value == "diagUpLeft") {
        i.diagUpLeft();
      }
      if (value == "diagUpRight") {
        i.diagUpRight();
      }
      if (value == "diagDownLeft") {
        i.diagDownLeft();
      }
      if (value == "diagDownRight") {
        i.diagDownRight();
      }
    });
  });

  foxes.forEach((i) => {
    let action = i.nextMove();
    action.then((r) => {
      value = r[0].label;
      if (value == "left") {
        i.moveLeft();
      }
      if (value == "right") {
        i.moveRight();
      }
      if (value == "up") {
        i.moveUp();
      }
      if (value == "down") {
        i.moveDown();
      }
      if (value == "diagUpLeft") {
        i.diagUpLeft();
      }
      if (value == "diagUpRight") {
        i.diagUpRight();
      }
      if (value == "diagDownLeft") {
        i.diagDownLeft();
      }
      if (value == "diagDownRight") {
        i.diagDownRight();
      }
    });
  });

  for (var i = 0; i < chickens.length; i++) {
    const currentTime = Date.now();
    const elapsedTime = 0.1 * Math.floor((currentTime - startTime) / 10000);
    chickens[i].score += elapsedTime;
  }

  for (var i = 0; i < chickens.length; i++) {
    for (var j = 0; j < foxes.length; j++) {
      if (checkCollision(chickens[i], foxes[j])) {
        // if collide
        dead_chickens.push(chickens[i]);
        chickens.splice(i, 1); // remove chicken
        foxes[j].score += 100; // up the foxes score
        break;
      }
    }
  }

  // closest chicken
  for (var i = 0; i < foxes.length; i++) {
    let chickenDist = 1000;
    for (var j = 0; j < chickens.length; j++) {
      var dist = getDistance(
        foxes[i].x,
        foxes[i].y,
        chickens[j].x,
        chickens[j].y
      );
      if (chickenDist > dist) {
        chickenDist = dist;
      }
    }
    foxes[i].chickenDist = dist;
    //console.log(`Fox${i} closest chicken distance: ${dist}`);
  }

  // clump check for foxes
  for (var i = 0; i < foxes.length; i++) {
    let foxDist = 1000;
    for (var j = 0; j < foxes.length; j++) {
      var dist = getDistance(foxes[i].x, foxes[i].y, foxes[j].x, foxes[j].y);
      if (foxDist > dist) {
        foxDist = dist;
      }
    }
    foxes[i].clumpDist = dist;
  }

  //clump penalty
  for (var i = 0; i < foxes.length; i++) {
    if (foxes[i].clumpDist < 15) {
      //console.log("fox too close!")
      foxes[i].score -= 100;
    }
  }

  // clump check for foxes
  for (var i = 0; i < chickens.length; i++) {
    let chickenClumpDist = 1000;
    for (var j = 0; j < chickens.length; j++) {
      var dist = getDistance(
        chickens[i].x,
        chickens[i].y,
        chickens[j].x,
        chickens[j].y
      );
      if (chickenClumpDist > dist) {
        chickenClumpDist = dist;
      }
    }
    chickens[i].chickenClumpDist = dist;
    //console.log(`Chicken${i} clump distance: ${dist}`);
  }

  //clump penalty
  for (var i = 0; i < chickens.length; i++) {
    if (chickens[i].clumpDist > 15) {
      console.log("chicken clump!");
      chickens[i].score -= 100;
    }
  }

  // Check for collisions between chickens
  for (var i = 0; i < chickens.length; i++) {
    for (var j = i + 1; j < chickens.length; j++) {
      if (checkCollision(chickens[i], chickens[j])) {
        // chickens get sent to center
        chickens[i].x = randInt(200, 400)
        chickens[j].x = randInt(200, 400)
        chickens[i].y = randInt(200, 400)
        chickens[j].y = randInt(200, 400)
      }
    }
  }

  // Check for collisions between foxes
  for (var i = 0; i < foxes.length; i++) {
    for (var j = i + 1; j < foxes.length; j++) {
      if (checkCollision(foxes[i], foxes[j])) {
        // foxes get to center
        foxes[i].x = randInt(200, 400)
        foxes[j].x = randInt(200, 400)
        foxes[i].y = randInt(200, 400)
        foxes[j].y = randInt(200, 400)
      }
    }
  }

  for (var i = 0; i < chickens.length; i++) {
    chickens[i].draw();
  }
  for (var i = 0; i < foxes.length; i++) {
    foxes[i].draw();
  }

  console.log(`Best Chicken: ${bestScore(chickens)}`);
  console.log(`Best Fox: ${bestScore(foxes)}`);

  var now = new Date().getTime();
  if (now - lastCheck > 20000 || chickens.length == 0) {
    // end gen if its gone on too long
    for (var i = 0; i < chickens.length; i++) {
      dead_chickens.push(chickens[i]);
      chickens.splice(i, 1); // remove chicken
      break;
    }
    generate();
    lastCheck = now;
  }
}

function generate() {
  // chickens
  chickens = [];
  gen++;
  dead_chickens.sort((a, b) => {
    return b.score - a.score;
  });
  let a_chick = dead_chickens[0]; // best chicken
  let b_chick = dead_chickens[1]; // second best chicken
  let c_chick = a_chick.brain.crossover(b_chick.brain);

  for (let i = 0; i < 40; i++) {
    c_chick.mutate(0.05);
    let temp_chick = new Chicken(
      randInt(0, window.innerWidth * 0.8),
      randInt(0, 600)
    );
    temp_chick.brain = c_chick;
    chickens.push(temp_chick);
  }
  // foxes
  gen += 0;
  foxes.sort((a, b) => {
    return b.score - a.score;
  });
  let a_foxes = foxes[0]; // best chicken
  let b_foxes = foxes[1]; // second best chicken
  let c_foxes = a_foxes.brain.crossover(b_foxes.brain);

  foxes = [];
  for (let i = 0; i < 20; i++) {
    c_foxes.mutate(0.05);
    let temp_foxes = new Fox(
      randInt(0, window.innerWidth * 0.8),
      randInt(0, 600)
    );
    temp_foxes.brain = c_foxes;
    foxes.push(temp_foxes);
  }
}

// utility functions

function bestScore(animal) {
  bigScore = 0;
  for (var i = 0; i < animal.length; i++) {
    if (animal[i].score > bigScore) {
      bigScore = animal[i].score;
    }
  }
  return bigScore;
}

function checkCollision(obj1, obj2) {
  return intersects(obj1, obj2);
}

function intersects(obj1, obj2) {
  var x1 = obj1.x;
  var y1 = obj1.y;
  var w1 = obj1.width;
  var h1 = obj1.height;

  var x2 = obj2.x;
  var y2 = obj2.y;
  var w2 = obj2.width;
  var h2 = obj2.height;

  return x1 < x2 + w2 && x2 < x1 + w1 && y1 < y2 + h2 && y2 < y1 + h1;
}

function randInt(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getDistance(x1, y1, x2, y2) {
  // Get the difference between the x-coordinates.
  let dx = x2 - x1;

  // Get the difference between the y-coordinates.
  let dy = y2 - y1;

  // Calculate the distance using the Pythagorean theorem.
  return Math.sqrt(dx * dx + dy * dy);
}

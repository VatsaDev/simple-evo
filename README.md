# ML-chase
### Chickens hunted by Foxes, powered by Machine Learning

#### How does it work
Made with ML5.js and p5.js, this is a basic Neural Net evolved by picking the two best specimens of each group, crossover and mutation.

Very Basic functionality,
 - Neural Net Inputs:
  - x position
  - y position
  - distance from nearest chicken
 - Neural Net Outputs:
  - directions(left, right, up, down)
  - diagnol directions
 - added penalties for clump, collision randomness

The main parts of the code are: 
 - The Neural net, the actual brain, a classifier type

```js
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
    ...
   }
   ```
 - The actual move choice classification
  ```js
    classification = this.brain.classify({
         xpos: this.x,
         ypos: this.y,
         clumpDist: this.clumpDist,
       });
  ```
 - The Generation Choice
 ```js
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
 
 ```

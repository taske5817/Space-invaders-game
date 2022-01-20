//Set constant for F
const F = 70;

//Preloads the rocket and city image
function preload() {
  img = loadImage("rocket.jpg");
  img2 = loadImage("city.png");
  img3 = loadImage("explosion.png")
}

//Sets up everything
function setup() {
  //creates the canvas
  createCanvas(windowWidth, windowHeight);
  //sets framerate
  frameRate(50);
  //sets things to proper modes
  angleMode(DEGREES);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  //Variables for the x and y coordinates for the circles
  h = 0;
  w = random(width + 1);
  //Variables for the x and y coordinates for the squares
  h2 = 0;
  w2 = random(width + 1);
  //Variable for mouse pressed
  variable = 0;
  //variables for x and y coordinates for the projectiles
  shotx = 0;
  shoty = 0;
  //variable for the score
  score = 0;
  //variable for the amount of power
  power = 0;
  //variables for the timer
  starttime = 0;
  timer = 0;
  //speed of the objects
  speed1 = 5;
  speed2 = 2;
  //variables for the ability
  powerup = 0;
  multishot = 0;
  //variable for pausing
  pause = 0;
  //timers for explosion
  starttime2 = 0;
  timer2 = 0;
  asteroidX = 0;
  asteroidY = 0;
}

//active when mouse is pressed 
function mousePressed() {
  //checks if game is paused or ended
  if (pause == 0) {
    //sets the coords for the projectiles
    shotx = mouseX;
    shoty = mouseY;
    //shows mouse is pressed
    variable += 1;
    //resets the multishot height
    multishot = 0;
  }
}

//Does everything else
function draw() {
  if (pause == 0) {
    spaceshipx = mouseX;
    spaceshipy = mouseY;
  }

  //sets the background
  background(0);
  //creates the falling circles, colors them, and resets the color for everything else
  fill(128, 128, 128);
  ellipse(w, h, 50);
  fill(255);
  //sets the imageMode and creates the city at the bottom of the screen
  imageMode(CORNERS);
  image(img2, 0, 7 * height / 8, width, height);
  //sets imagemode and create the spaceship that follows the mouse.
  imageMode(CENTER)
  image(img, spaceshipx, spaceshipy, 60, 30);
  //draws my name in the bottom of the screen
  stroke(0, 0, 0);
  strokeWeight(6);
  text("Created by Ethan Tasker", 17 * width / 20, 17 * width / 20);
  strokeWeight(0);
  //moves the circles down
  h += speed1;
  //moves the projectiles up
  shoty -= 20;

  //Creates squares if the score is higher than 10
  if (score >= 10) {
    //Makes the squares move down
    h2 += speed2;
    //create the squares
    fill(102, 102, 153);
    rect(w2, h2, 50, 50);
    fill(255);
  }

  //When a object touchs the bottom of the screen, the game ends
  if (h >= height || h2 >= height) {
    //resets background
    background(0, 0, 0);
    //writes "game over" in the middle of the screen
    text("GAME OVER: DOUBLE CLICK TO PLAY AGAIN", width / 2, height / 2);
    //pauses everything
    pause = 1;
    power = 0;
    //resets speed
    speed1 = 5;
    speed2 = 2;
  }

  //Creates the projectiles when mouse is pressed
  if (variable >= 1 && pause == 0) {
    //changes strokeweight and stroke color of the projectiles
    strokeWeight(5);
    stroke(255, 0, 0);
    //Creates the projectiles
    rect(shotx, shoty - 10, 10, 50);
    //resets the strokeweight and color
    strokeWeight(0);
    stroke(255);
  }

  //Checks if a normal projectile hits a circle
  if (shotx >= w - 50 && shotx <= w + 50 && shoty >= h - 50 && shoty <= h + 50) {
    //starts timers for explosions
    asteroidX = w;
    asteroidY = h;
    starttime2 = 0;
    timer2 = 1;
    //resets the circle
    h = 0;
    w = random(width + 1);
    //resets the mouse clicked variable
    variable = 0;
    //resets the projectile
    shotx = 0;
    shoty = 0;
    //adds 1 to the score
    score += 1;
    //adds power if you have less then the max amount
    if (power <= 90) {
      power += 10;
    }
  }

  //Creates the scoreboard and changes the color
  fill(255);
  text("Score: " + score, width / 20, height / 20);

  //Checks if a normal projectile hits a square
  if (shotx >= w2 - 50 && shotx <= w2 + 50 && shoty >= h2 - 50 && shoty <= h2 + 50) {
    //starts timer for explosion
    asteroidX = w2;
    asteroidY = h2;
    starttime2 = 0;
    timer2 = 1;
    //resets the square
    h2 = 0;
    w2 = random(width + 1);
    //resets the variable for mouse pressed
    variable = 0;
    //resets the projectile
    shotx = 0;
    shoty = 0;
    //adds 1 to the score
    score += 1;
    //adds power if you have less than the max amount
    if (power <= 90) {
      power += 10;
    }
  }

  //Creates the power bar and fills it in
  rect(19 * width / 20, height / 2, 20, 100);
  fill(0, 0, 255);
  rect(19 * width / 20, height / 2, 20, power);
  fill(255)

  //checks if you press the F key
  if (keyIsDown(F)) {
    //checks if you have enough power
    if (power == 100) {
      //resets power
      power = 0;
      //starts the timer
      timer = 1;
      //sets variable for multiple shots
      powerup = 1;
    }
  }

  //Checks if powerup is active
  if (variable >= 1 && powerup == 1) {
    //Makes two shots, one on each side of the original
    strokeWeight(5);
    stroke(255, 0, 0);
    rect(shotx - multishot, shoty - 10, 10, 50);
    rect(shotx + multishot, shoty - 10, 10, 50);
    strokeWeight(0);
    stroke(255);
    //Makes these shots move diagonally
    multishot += 5;

    //Checks if the left projectile hits a circle
    if (shotx - multishot >= w - 50 && shotx - multishot <= w + 50 && shoty >= h - 50 && shoty <= h + 50) {
      //starts timer for explosion
      asteroidX = w;
      asteroidY = h;
      starttime2 = 0;
      timer2 = 1;
      //resets circle
      h = 0;
      w = random(width + 1);
      //resets variable for mouse pressed
      variable = 0;
      //resets projectiles
      shotx = 0;
      shoty = 0;
      //adds 1 to the score
      score += 1;
      //adds power if you have less than the max amount
      if (power <= 90) {
        power += 10;
      }
    }

    //Checks if left projectile hits a square
    if (shotx - multishot >= w2 - 50 && shotx - multishot <= w2 + 50 && shoty >= h2 - 50 && shoty <= h2 + 50) {
      //starts timer for explosions
      asteroidX = w2;
      asteroidY = h2;
      starttime2 = 0;
      timer2 = 1;
      //resets the square
      h2 = 0;
      w2 = random(width + 1);
      //resets the variable for mouse pressed
      variable = 0;
      //resets the projectiles
      shotx = 0;
      shoty = 0;
      //adds 1 to the score
      score += 1;
      //adds power if you have less than the max amount
      if (power <= 90) {
        power += 10;
      }
    }

    //Checks if the right projectile hits a circle
    if (shotx + multishot >= w - 50 && shotx + multishot <= w + 50 && shoty >= h - 50 && shoty <= h + 50) {
      //starts timer for explosions
      asteroidX = w;
      asteroidY = h;
      starttime2 = 0;
      timer2 = 1;
      //resets the circle
      h = 0;
      w = random(width + 1);
      //resets the variable for mouse pressed
      variable = 0;
      //resets the projectiles
      shotx = 0;
      shoty = 0;
      //adds 1 to the score
      score += 1;
      //adds power if you have less than the max amount
      if (power <= 90) {
        power += 10;
      }
    }

    //Checks if the right projectile hits a square
    if (shotx + multishot >= w2 - 50 && shotx + multishot <= w2 + 50 && shoty >= h2 - 50 && shoty <= h2 + 50) {
      //starts timer for explosions
      asteroidX = w;
      asteroidY = h;
      starttime2 = 0;
      timer2 = 1;
      //resets the square
      h2 = 0;
      w2 = random(width + 1);
      //reset the variable for mouse pressed
      variable = 0;
      //reset the projectiles
      shotx = 0;
      shoty = 0;
      //adds 1 to the score
      score += 1;
      //adds power if you have less than the max amount
      if (power <= 90) {
        power += 10;
      }
    }
  }

  //Ends the timer
  if (starttime >= 250) {
    //resets the timer
    starttime = 0;
    timer = 0;
    //resets powerup
    powerup = 0;
  }

  //This is the actual timer
  starttime += timer

  //Speeds up the game if you get over 50 points
  if (score >= 50) {
    speed1 = 10
    speed2 = 4
  }

  //shows how to use powerup
  if (power == 100) {
    text("PRESS F FOR POWERUP", width / 2, height / 2);
  }

  //timer for explosion
  starttime2 += timer2;
  //the explosions
  if (starttime2 >= 1) {
    imageMode(CENTER);
    image(img3, asteroidX, asteroidY, 75, 75);
  }
  if (starttime2 >= 25) {
    starttime2 = 0;
    timer2 = 0;
  }
}

//Restarts the game when double clicked if game is over
function doubleClicked() {
  //checks that game is over
  if (pause == 1) {
    //unpauses game
    pause = 0;
    //resets score
    score = 0;
    //resets power and powerup
    power = 0;
    powerup = 0;
    //resets the objects
    h = 0;
    h2 = 0;
  }
}
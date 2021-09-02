// declaring variables
var score = 0;
var gun,bluebubble,redbubble, bullet, backBoard;
var bubbleImg, bulletImg, gunImg, blastImg, backBoardImg;
var redBubbleGroup, bulletGroup;

var life = 3;
var score = 0;
var gameState = 1;

// function preload
function preload() {

  // loading images
  gunImg = loadImage("gun1.png");
  blastImg = loadImage("blast.png");
  bulletImg = loadImage("bullet1.png");
  blueBubbleImg = loadImage("waterBubble.png");
  redBubbleImg = loadImage("redbubble.png");
  backBoardImg = loadImage("back.jpg");

}

// setup function
function setup() {

  // creating a canvas
  createCanvas(800, 800);

  // creading sprites, adding images and seetting scale
  backBoard = createSprite(50, width/2, 100,height);
  backBoard.addImage(backBoardImg);
  
  gun = createSprite(100, height/2, 50,50);
  gun.addImage(gunImg);
  gun.scale = 0.2;

  // creating sprites
  bulletGroup = createGroup();   
  blueBubbleGroup = createGroup();   
  redBubbleGroup = createGroup();   

  // creating elements
  heading = createElement("h1");
  scoreboard = createElement("h1");

}

// function draw
function draw() {

  // background
  background("#BDA297");

  // setting heading, style and position
  heading.html("Life: "+life);
  heading.style('color:red'); 
  heading.position(150,20);

  // setting scoreboard, style and position
  scoreboard.html("Score: "+score);
  scoreboard.style('color:red'); 
  scoreboard.position(width-200,20);

  // if statements
  if(gameState === 1) {

    // code to move the gun along with mouse in y axis
    gun.y = mouseY;

    // frameCounts
    if (frameCount % 80 === 0) {

      drawblueBubble();

    }

    if (frameCount % 100 === 0) {

      drawredBubble();

    }

    // code to shootBullet when clicked on space
    if(keyDown("space")) {

      shootBullet();

    }

    if (blueBubbleGroup.collide(backBoard)) {

      handleGameover(blueBubbleGroup);

    }

    if (redBubbleGroup.collide(backBoard)) {

      handleGameover(redBubbleGroup);

    }
    
    if(blueBubbleGroup.collide(bulletGroup)) {

      handleBubbleCollision(blueBubbleGroup);

    }

    if(redBubbleGroup.collide(bulletGroup)) {

      handleBubbleCollision(redBubbleGroup);

    }

    // drawing the sprites
    drawSprites();

  }
    
}

// function drawblueBubble
function drawblueBubble(){

  bluebubble = createSprite(800,random(20, 780), 40, 40);
  bluebubble.addImage(blueBubbleImg);
  bluebubble.scale = 0.1;
  bluebubble.velocityX = -8;
  bluebubble.lifetime = 400;
  blueBubbleGroup.add(bluebubble);

}

// function drawredBubble
function drawredBubble(){

  redbubble = createSprite(800, random(20, 780), 40, 40);
  redbubble.addImage(redBubbleImg);
  redbubble.scale = 0.1;
  redbubble.velocityX = -8;
  redbubble.lifetime = 400;
  redBubbleGroup.add(redbubble);

}

// shootBullet function
function shootBullet(){

  bullet = createSprite(150, width / 2, 50, 20);
  bullet.y = gun.y - 20;
  bullet.addImage(bulletImg);
  bullet.scale = 0.12;
  bullet.velocityX = 7;
  bulletGroup.add(bullet);

}

// function handleBubbleCollision
function handleBubbleCollision(bubbleGroup){

  // if statement
    if (life > 0) {

       score = score + 1;

    }

    blast = createSprite(bullet.x + 60, bullet.y, 50, 50);
    blast.addImage(blastImg);
    blast.scale = 0.3;
    blast.life = 20;
    bulletGroup.destroyEach();
    bubbleGroup.destroyEach();

}

// handleGameOver function
function handleGameover(bubbleGroup){

  // decreasing life
    life = life - 1;

    // destroying bubbleGroup
    bubbleGroup.destroyEach();

    // if statement
    if (life === 0) {

      gameState = 2;

      // sweetalert
      swal({

        title: `Game Over`,
        text: "Oops you loose...!!!",
        text: "Your Score is " + score,
        imageUrl:
          "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
        imageSize: "100x100",
        confirmButtonText: "Thanks For Playing"

      });
      
    }
  
}
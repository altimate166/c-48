var player, playerImg;
var bgImg,bg;
var bridgeImg;
var bridge1, bridge2, bridge3;
var invisColider;
var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;
var enemy1, enemy1Img, enemy1G;
var gameOverImg, gameOver;
var coinG,coinImg,coin;
var bridgeG, bridge;
var gOSound, gameSound;
var score = 0;
var coin;
var min =100;
var max = 1000;
var nobata,nImg;
var bridges;
var gameSound;
var pearlImg,pearl;
var winImg,win;
function preload(){
 bgImg = loadImage("assets/sky.png");
 bridgeImg = loadImage("assets/R.png");
 enemy1Img = loadImage("assets/Enemy1.png");
 gameOverImg = loadImage("assets/GameOver.jpg");
 coinImg = loadImage("assets/coin.png");
 playerImg = loadImage("assets/player.png");
 gOSound = loadSound("assets/gameOver.wav");
 gameSound = loadSound("epic_battle_music_1-6275.mp3");
 pearlImg = loadImage("assets/ruby.png");
 winImg = loadImage("assets/OIP.jpg");
 
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  coinG= new Group();
  bridges = new Group();
  enemy1G = new Group();

  bg = createSprite(width/2,10);
  bg.addImage(bgImg);
  bg.velocityY = 4
  bg.scale = 2.5;

  player = createSprite(1200,490,50,50);
  player.debug = true;
  player.scale = 0.1;
  player.addImage(playerImg);

  
  bridge2 = createSprite(1200,600,50,50);
  bridge2.addImage(bridgeImg);
  bridge2.scale = 0.15;
  bridge2.debug = true;
  bridge2.setCollider("rectangle",0,0,2200,300)
  
  bridge3 = createSprite(100,400,50,50);
  bridge3.addImage(bridgeImg);
  bridge3.scale = 0.15;
  bridge3.debug = true;
  bridge3.setCollider("rectangle",0,0,2200,300);
  invisColider = createSprite(500,640,10,10);
  invisColider.debug = true;
  invisColider.setCollider("rectangle",0,0,3000,30);

  pearl = createSprite(100,350,50,50);
  pearl.addImage(pearlImg);
  pearl.scale = 0.15;

  
  score = 0;
  
  gameOver = createSprite(100,250);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;
  gameOver.visible = false;

  win = createSprite(650,300);
  win.addImage(winImg);
  win.scale = 3;
  win.visible = false;
}

function draw() { 
  if(gameState === PLAY){

  
  background(0);
 
  createBridge();
  player.collide(bridge2);
  player.collide(bridge3);
  
 
  player.collide(invisColider);

  if(bg.y > height ){
    bg.y = height/2;
  }
  if(keyDown("LEFT_ARROW")){
    player.x = player.x-15;
  }
  if(keyDown("RIGHT_ARROW")){
    player.x = player.x+15;
  }
  
  if(player.y >= 400 && keyWentDown("space") ){
    player.velocityY = -10;
    
  }
  //createCoin();
 
  player.velocityY = player.velocityY + 0.5;
  if(player.isTouching(coinG,coinTouch)){
   
    score = score + 1;
  }

  
  if(enemy1G.isTouching(player)){
    gameState = END;
  }
  if(invisColider.isTouching(player)){
    gameState = END;
  }
   
  if(player.isTouching(pearl)){
    gameState = WIN;
  }

  
  
 
}else if(gameState === END){
  gameOver.x=camera.position.x;
  gameOver.visible = true;
 } else if(gameState === WIN){
  pearl.destroy();
  win.visible = true;

 }
 
  
  drawSprites();
  textSize(23);
  fill("white");
  text("Score = "+ score,1250,70)
  
}



  function createBridge(){
    if(frameCount %120 === 0){
      bridge1 = createSprite(Math.round(random(900,100)),200,10,10);
      bridge1.velocityY = 2;
      bridge1.scale = 0.16;
      bridge1.addImage(bridgeImg);
      bridge1.debug = true;
      bridge1.setCollider("rectangle",0,0,2300,300);
      bridges.add(bridge1);
      coin = createSprite(1000,500);
      coin.x = bridge1.x + 100;
      coin.y = 150;
      coin.addImage(coinImg);
      coin.scale=0.1;
      coin.velocityY = 2;
      coinG.add(coin);
      enemy1 = createSprite(500,445,10,10);
      enemy1.addImage(enemy1Img);
      enemy1.scale = 0.1;
      enemy1.x = bridge1.x;
      enemy1.y = 150;
      enemy1.velocityY = 2;
      enemy1G.add(enemy1);
     
    }
    player.collide(bridges);
  }

function coinTouch(player,coin){
  coin.destroy();
}


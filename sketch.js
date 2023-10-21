var towerImg, tower;
var gameState = "play"
var doorImg,door,doorsGroup;
var climber, climberImg, climberGroup;
var invblock,invGroup;
var ghost, ghostImg
var ghoststanding
function preload(){
  towerImg = loadImage("./tower.png");
    doorImg = loadImage("./door.png");
  climberImg = loadImage("./climber.png");
  ghostImg = loadImage("./ghost-jumping.png")
  ghoststanding = loadImage("./ghost-standing.png")
}

function setup(){
  createCanvas(600,600);
  doorsGroup = new Group();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  climberGroup = new Group();
  invGroup = new Group();
  ghost = createSprite(300,300)
  ghost.addImage(ghostImg)
  ghost.scale = 0.4
}

function draw(){
  background(200);
  if (gameState == "play"){
    if(tower.y > 400){
      tower.y = 300
    }
    
    if(keyDown ("space")){
      ghost.velocityY = -10
    }
    if(keyDown("left")){
      ghost.x -= 2
    }
    if(keyDown("right")){
      ghost.x += 2
    }
    ghost.velocityY += 0.9

    if(ghost.isTouching(climberGroup)){
      ghost.velocityY = 0
     }
    if(ghost.isTouching (invGroup)|| ghost.y>600){
      gameState = "end"
    }
    
    spawnDoors();
    drawSprites();
  }
  if( gameState == "end"){
    background("black")
    textAlign(CENTER)
    textSize(25)
    fill ("white")
    text("Game Over",300,300)
  }
  }
  




function spawnDoors() {
// escreva aqui o código para gerar as portas na torre
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);

 
    
    door.x = Math.round(random(120,400));
    var climber = createSprite(door.x,0);
    var invblock = createSprite(door.x,5,climber.width,5)
    door.depth = ghost.depth -1
    climber.depth = ghost.depth -1
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invblock.velocityY = 1
   invblock.visible = false
    //atribua lifetime à variável
    door.lifetime = 800;
   climber.lifetime = 800;
    invblock.lifetime = 800
    //adiciona cada porta ao grupo
    doorsGroup.add(door);
   climberGroup.add(climber);
   invGroup.add(invblock)
  }
}


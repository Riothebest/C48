const Engine = Matter.Engine;
const Bodies = Matter.Bodies;
const World = Matter.World;

var myEngine, myWorld;
var player, playerImg, playerKickImg;
var dustbin, dustbinImg;
var edges , wall;
var flying = true;
var bottleImg , bottle;
var ground, shelf;
var score = 0;
var sensorer, bottlecopy;
var glassBottle =[], glassBottleImg;
var position = 1200;
var count = 0;
var backgroundImg, screen;
var speed = 0;
var kicker= 0;
var invisibleBlock;

function preload()
{
  playerImg = loadImage("./assets/player.png");
  dustbinImg = loadImage("./assets/dustbin.png");
  bottleImg = loadImage("./assets/waterBottle.png");
  playerKickImg = loadImage("./assets/playerKick.png");
  backgroundImg = loadImage("./assets/background.jpg")
}
function setup() {
  
  createCanvas(windowWidth, windowHeight);
  
  myEngine = Engine.create();
  myWorld = myEngine.world;

  player = createSprite(100,height-100);
  player.addImage(playerImg);
  player.scale = 0.25

  dustbin = createSprite(width-250,height-100);
  dustbin.addImage(dustbinImg);
  dustbin.scale = 0.5;
  dustbin.velocityX = 3;
  

  invisibleBlock = createSprite(dustbin.x,height-200,150,10);
  invisibleBlock.visible =  false;

  edges = createEdgeSprites();
  wall = createSprite(width/2,height,5,150);
  wall.visible = false;

  bottle = new Bottle(400,1,100,100);

  var ground_options ={
    isStatic : true,
  }
  ground = Bodies.rectangle(width/2,height,width,20,ground_options);
  World.add(myWorld,ground);
  shelf = Bodies.rectangle(width-400,200,width/4+100,5,ground_options);
  World.add(myWorld,shelf);

}

function draw() {
  background(backgroundImg,backgroundImg,backgroundImg);  
  

  invisibleBlock.x = dustbin.x;
  Engine.update(myEngine);

  if(dustbin.isTouching(edges[1]))
  {
    dustbin.velocityX = -3-speed;
  }
  if(dustbin.isTouching(wall))
  {
    dustbin.velocityX = 3+speed;
  }
  if(bottle !=null){
    if(bottle.kicked)
    {
    if(collide(bottle.body,invisibleBlock))
    {
      score += 10;
      flying = true;
      position +=50
      glassBottle[count] = new GlassBottle(position,1,50,80);
      count +=1;
      speed += 2;
      kicker+=0.1;
    }
  }
  }
 if(glassBottle !=null)
 {
   for(var i=0;i<glassBottle.length;i++)
   {
  glassBottle[i].display();
   }

 }
 //console.log(score)
 if(bottle != null)
 {
  if(bottle.body.position.x>width)
  {
   World.remove(myWorld,bottle.body);
   bottle = null;
  }
 }
if(score=== 120)
{
  completed();
  bottle.lifetime = -1
}
 if(bottle === null)
 {
  bottle = new Bottle(400,1,100,100);
 }

 if(bottle != null)
 {
   
   var d = dist(bottle.body.position.x,bottle.body.position.y,ground.position.x,ground.position.y)
   if(d<=100)
   {
     flying = false;
   }
   bottle.lifetime -= 1;
  bottle.display();
  if(bottle.lifetime === 0)
  {
    World.remove(myWorld,bottle.body);
    bottle = null;
  }
   
 }

 if(keyWentDown("space"))
 {
   player.addImage(playerKickImg)

 }
 if(keyWentUp("space"))
 {
   player.addImage(playerImg);
 }
  drawSprites();
  push();
  textSize(40)
  fill("red")
  text("Score: "+score,200,200)
 pop();
  rectMode(CENTER)
  rect(shelf.position.x,shelf.position.y,width/4+100,5);
}
function keyPressed()
{
  if(keyCode === 32)
  {
    //if(flying == false)
    if(bottle != null && !bottle.kicked){

    Matter.Body.applyForce(bottle.body,bottle.body.position,{x:0.5+kicker,y:-0.5+kicker});
    bottle.kicked = true;
    flying=false;
    }
  }
}
function collide(body,sprite)
{
  if(body!=null)
  {
    var d = dist(body.position.x,body.position.y,sprite.x,sprite.y);
    if(d <= 120)
    {
      World.remove(myWorld,body);
      bottle = null;
      return true;
      
    }
    else{
      return false;
    }
  }
}
function completed()
{
  swal(
    {
        title: "You Win !!!!",
        text: "Thanks for Playing !",
        imageUrl:
        "./assets/waterBottle.png",
      imageSize: "100x100",
        confirmButtonText: "Play Again"

    },
       
       function(isConfirm)
       {
            if(isConfirm)
            {
                location.reload();
            }
       }
    
    );
}
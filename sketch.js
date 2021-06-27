//Create variables here
var database,happyDog,dog,sadDog,foodS,foodStock;
var count =0;
function preload()
{
	happyDog= loadImage ("images/dogImg.png")
  sadDog= loadImage ("images/dogImg1.png")
}

function setup() {
	createCanvas(500, 500);

  dog= createSprite (250,300);
  dog.addImage(happyDog);
  dog.scale=0.2;

  database = firebase.database();

  foodStock = database.ref('food')
  foodStock.on("value", readStock);
  
}


function draw() {  
background (46,139,87);

if (keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(happyDog);
  count=count - 1;
}

if(keyWentUp(UP_ARROW)&& count > 0){
  dog.addImage(happyDog);
}

if(keyCode === "r"){
  database.ref("food").update({food:20})
}

  drawSprites();
  //add styles here
  textSize(20);
  fill("white");
  text("Press UP_ARROW to feed drago milk?",100,50);
  text("Food Remaining: " + foodS,150,200);
}
  function readStock(data){
    foodS = data.val();
  }

  function writeStock(x){
    if (x <= 0){
      x=0;
    }else {
      x=x-1;
    }
    database.ref("/").update({
      food:x
    })
  }




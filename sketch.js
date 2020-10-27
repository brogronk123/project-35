var dog, happyDog, dogImage, happyDogImage;
var foodS, foodStock;
var database;

function preload()
{
  dogImage = loadImage("images/Dog.png");
  happyDogImage = loadImage("images/happydog.png");
}

function setup() {
  database = firebase.database();
  foodStock = database.ref('Food');
  foodStock.on("value",readStock,showError);
	createCanvas(500, 500);
  dog = createSprite(250,250,50,50);
  dog.scale = 0.5;
  dog.addImage(dogImage);
}


function draw() {  

  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS-1);
    dog.addImage(happyDogImage);
  }
  if(keyWentDown(DOWN_ARROW)){
    writeStock(foodS+1);
    dog.addImage(dogImage);
  }
  drawSprites();
  textSize(20);
  stroke("white");
  fill("white");
  text("Click up arrow to feed down arrow to buy more food",10,50);
  text("Food remaining: "+foodS,1,100);
  //add styles here

}
function readStock(data){
  foodS = data.val();
}
function writeStock(x){
  database.ref('/').set({
    Food:x
  })
}
function showError(){
  console.log("Error in writing to the database")
}



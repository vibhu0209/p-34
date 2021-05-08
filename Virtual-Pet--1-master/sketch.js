//Create variables here
var dog, happyDogImg,dogImg;
var database;
var foodS, foodStock;

function preload()
{
	happyDogImg = loadImage("images/dogImg.png");
  dogImg = loadImage("images/dogImg1.png");
  
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();

  dog = createSprite(250,350,150,150);
  dog.addImage(dogImg);
  dog.scale = 0.15

  foodStock = database.ref('food');
  foodStock.on("value",readStock);
}

function draw() {  
  background(46, 139, 87);
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }
  drawSprites();
  //add styles here
  fill(255)
  stroke(0)
  textSize(13);
  text("Note : press Up arrow key to feed your dog some milk", 130,20);
  text("Food remaining:" + foodS,170,210)
}

function readStock(data){
  foodS = data.val();
}

function writeStock(foodS){

  if(foodS <= 0){
    foodS = 0
  }
  else{
    foodS = foodS - 1;
  }

database.ref('/').update({
  food:foodS
});

}





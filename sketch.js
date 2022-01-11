var arco, arcoImg, flecha, flechaImg;
var balaoAzul, balaoAzulImg, balaoVerde, balaoVerdeImg, balaoRosa, balaoRosaImg,
balaoVerm, balaoVermImg;
var fundo, fundoImg;
var pontos = 0, quadro,quadroImg, fim, fimImg;
var vidas = 5, coraçao, coraçaoImg;
var baloesB, baloesG, baloesP, baloesR;
var estado = "jogo";

function preload(){
  fundoImg = loadImage("background0.png");
  arcoImg = loadImage("bow0.png");
  flechaImg = loadImage("arrow0.png");
  balaoAzulImg = loadImage("blue_balloon0.png");
  balaoVerdeImg = loadImage("green_balloon0.png");
  balaoRosaImg = loadImage("pink_balloon0.png");
  balaoVermImg = loadImage("red_balloon0.png");
  coraçaoImg = loadImage("coraçao.png");
  quadroImg = loadImage("quadro de pontos.png");
  fimImg = loadImage("fim de jogo.png");
}

function setup(){
  createCanvas(400, 400);

  fundo = createSprite(200, 200, 400, 400);
  fundo.addImage(fundoImg);

  arco = createSprite(370, 200, 20, 40);
  arco.addImage(arcoImg);

  flecha = createSprite(350,200,60,5);
  flecha.addImage(flechaImg);
  flecha.scale = 0.3;
  //flecha.debug = true;
  flecha.setCollider("circle", -110,0,10);

  coraçao = createSprite(300,15,10,10);
  coraçao.addImage(coraçaoImg);
  coraçao.scale = 0.05;

  quadro = createSprite(35,200,50,80);
  quadro.addImage(quadroImg);
  quadro.scale = 0.25;

  fim = createSprite(200,200,400,100);
  fim.addImage(fimImg);
  fim.scale = 0.5;
  fim.visible = false;

  baloesB = createGroup();
  baloesG = createGroup();
  baloesP = createGroup();
  baloesR = createGroup();
}

function draw(){
  background(0);
  drawSprites();

  textFont("Geórgian");
  textSize(20);
  stroke(0);
  strokeWeight(3);
  fill("white");
  text("pontos: " + pontos, 50, 20);
  text(vidas, 280,20);
  text("APERTE ESPAÇO PARA ATIRAR!", 50,380); 

  if(estado == "jogo"){
    arco.y = mouseY;
  }

  if(flecha.velocityX == 0){
    flecha.y = arco.y;
  }
  
  gerarBaloes();
  atirarFlechas();
  fimJogo();
}

function gerarBaloes(){
  if(frameCount % 80 == 0 && estado == "jogo"){
    balaoAzul = createSprite(Math.round(random(50,300)), 415, 20,20);
    balaoAzul.addImage(balaoAzulImg);
    balaoAzul.velocityY = -5;
    balaoAzul.scale = 0.05;
    balaoAzul.lifetime = 90;
    baloesB.add(balaoAzul);
    //balaoAzul.debug = true;
    balaoAzul.setCollider("circle", 0, 0, 200); 
  }

  if(frameCount % 100 == 0 && estado == "jogo"){
    balaoVerde = createSprite(Math.round(random(50,300)), 415, 20,20);
    balaoVerde.addImage(balaoVerdeImg);
    balaoVerde.velocityY = -5;
    balaoVerde.scale = 0.05;
    balaoVerde.lifetime = 90;
    baloesG.add(balaoVerde);
    //balaoVerde.debug = true;
    balaoVerde.setCollider("circle", 0, 0, 200);
  }

  if(frameCount % 120 == 0 && estado == "jogo"){
    balaoRosa = createSprite(Math.round(random(50,300)), 415, 20,20);
    balaoRosa.addImage(balaoRosaImg);
    balaoRosa.velocityY = -5;
    balaoRosa.scale = 0.7;
    balaoRosa.lifetime = 90;
    baloesP.add(balaoRosa);
    //balaoRosa.debug = true;
    balaoRosa.setCollider("circle", 0, 0, 15);
  }

  if(frameCount % 140 == 0 && estado == "jogo"){
    balaoVerm = createSprite(Math.round(random(50,300)), 415, 20,20);
    balaoVerm.addImage(balaoVermImg);
    balaoVerm.velocityY = -5;
    balaoVerm.scale = 0.05;
    balaoVerm.lifetime = 90;
    baloesR.add(balaoVerm);
    //balaoVerm.debug = true;
    balaoVerm.setCollider("circle", 0, 0, 200);
  }
}

function atirarFlechas(){
  if(keyDown("space") && estado == "jogo"){
    flecha.velocityX = -10;
    flecha.velocityY = flecha.velocityY + 1.5;
  }
  
  if(flecha.x < 0 && estado == "jogo"){
    flecha.x = 350;
    flecha.y = arco.y;
    flecha.velocityX = 0;
    flecha.velocityY = 0;
    vidas--;
  }

  if(flecha.isTouching(baloesB) && estado == "jogo"){
    flecha.x = 350;
    flecha.y = arco.y;
    flecha.velocityX = 0;
    flecha.velocityY = 0;
    pontos++;
    baloesB.destroyEach();
  }

  if(flecha.isTouching(baloesG) && estado == "jogo"){
    flecha.x = 350;
    flecha.y = arco.y;
    flecha.velocityX = 0;
    flecha.velocityY = 0;
    pontos = pontos + 3;
    baloesG.destroyEach();
  }

  if(flecha.isTouching(baloesP) && estado == "jogo"){
    flecha.x = 350;
    flecha.y = arco.y;
    flecha.velocityX = 0;
    flecha.velocityY = 0;
    pontos = pontos + 5;
    baloesP.destroyEach();
  }

  if(flecha.isTouching(baloesR) && estado == "jogo"){
    flecha.x = 350;
    flecha.y = arco.y;
    flecha.velocityX = 0;
    flecha.velocityY = 0;
    vidas++
    baloesR.destroyEach();
  }
}

function fimJogo(){
  if(vidas == 0){
    estado = "fim";
  }
  if(estado == "fim"){
    fim.visible = true;
  }
}

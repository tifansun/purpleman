function setup(){
    canvas = createCanvas(screen.width - 10, screen.height - 170);
    background("rgb(15, 15, 131)");
    purpleman = createSprite(300, 200, 60, 80);
    purpleman.addAnimation("caminar", purplemanCamina);
    purpleman.scale = 0.3;
    edges = createEdgeSprites();
}
function preload(){
   purplemanCamina =  loadAnimation("purpleman1.png","purpleman2.png","purpleman3.png","purpleman4.png");
}
function draw(){
    background("rgb(15, 15, 131)");
    if(keyDown("D") || keyDown(RIGHT_ARROW)){
        purpleman.velocityX = 5;
        purpleman.mirrorX(1)
    }else if(keyDown("A")|| keyDown(LEFT_ARROW)){
        purpleman.velocityX = -5;
        purpleman.mirrorX(-1)
    }else if(keyDown("W")|| keyDown(UP_ARROW)){
        purpleman.velocityY = -5;
    }else if(keyDown("S")|| keyDown(DOWN_ARROW)){
        purpleman.velocityY = 5;
    }else{
        purpleman.velocityX = 0;
        purpleman.velocityY = 0;
    }
    purpleman.bounceOff(edges[0]);
    purpleman.bounceOff(edges[2]);
    purpleman.bounceOff(edges[3]);
    if(purpleman.isTouching(edges[1])){
        purpleman.x = 0;
    }
    drawSprites();
}
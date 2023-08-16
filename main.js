manox = 0;
manoy = 0;
confianza = 0;
lineaIzquierda = 0;
lineaDerecha = 0;
function setup() {
    canvas = createCanvas(screen.width - 10, screen.height - 170);
    background("rgb(15, 15, 131)");
    video = createCapture(VIDEO);
    video.size(screen.width - 10, screen.height - 170);
    video.hide();
    purpleman = createSprite(300, 200, 60, 80);
    purpleman.addAnimation("caminar", purplemanCamina);
    purpleman.scale = 0.3;
    edges = createEdgeSprites();
    pose = ml5.poseNet(video, listo);
    pose.on("pose", recibirRespuesta);
    lineaIzquierda = ((screen.width - 10) / 2) - 150;
    lineaDerecha = ((screen.width - 10) / 2) + 150
}

function listo() {
    console.log("listo");
}

function recibirRespuesta(resultados) {
    if (resultados && resultados.length > 0) {
        manox = resultados[0].pose.rightWrist.x;
        manoy = resultados[0].pose.rightWrist.y;
        confianza = resultados[0].pose.rightWrist.confidence;
        console.log("x: " + manox + " ,y:" + manoy);
    }
}
function preload() {
    purplemanCamina = loadAnimation("purpleman1.png", "purpleman2.png", "purpleman3.png", "purpleman4.png");
}
function draw() {
    background("rgb(15, 15, 131)");
    stroke("lime")
    //line(lineaIzquierda, 0, lineaIzquierda, screen.height - 170)
    stroke("red")
    //line(lineaDerecha, 0, lineaDerecha, screen.height - 170)
    if (keyDown("D") || keyDown(RIGHT_ARROW) || ( manox < lineaIzquierda)) {
        purpleman.velocityX = 5;
        purpleman.mirrorX(1)
    } else if (keyDown("A") || keyDown(LEFT_ARROW) || (manox > lineaDerecha)) {
        purpleman.velocityX = -5;
        purpleman.mirrorX(-1)
    } else if (keyDown("W") || keyDown(UP_ARROW)) {
        purpleman.velocityY = -5;
    } else if (keyDown("S") || keyDown(DOWN_ARROW)) {
        purpleman.velocityY = 5;
    } else {
        purpleman.velocityX = 0;
        purpleman.velocityY = 0;
    }
    purpleman.bounceOff(edges[0]);
    purpleman.bounceOff(edges[2]);
    purpleman.bounceOff(edges[3]);
    if (purpleman.isTouching(edges[1])) {
        purpleman.x = 0;
    }
    drawSprites();
}
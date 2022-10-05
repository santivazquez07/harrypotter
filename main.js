sound = "";
left_wristX = 0;
right_wristX = 0;
left_wristY = 0;
right_wristY = 0;
visible_leftwrist = 0;
visible_rightwrist = 0;

function preload(){
    sound = loadSound("music.mp3");
}


function setup(){
    canvas = createCanvas(500, 450);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);
}

function draw(){
    image(video, 0, 0, 500, 450); 
    fill("#FF0000");
    stroke("#FF0000");
    if(visible_rightwrist > 0.2){
        circle(right_wristX, right_wristY, 50);
        if(right_wristY > 0 && right_wristY <= 100){
            document.getElementById("speed").innerHTML = "Velocidad = 0.5";
            sound.rate(0.5);
        }else if(right_wristY > 100 && right_wristY <= 250){
            document.getElementById("speed").innerHTML = "Velocidad = 1.0";
            sound.rate(1.0);
        }else if(right_wristY > 250 && right_wristY <= 350){
            document.getElementById("speed").innerHTML = "Velocidad = 1.5";
            sound.rate(1.5);
        }else if(right_wristY > 350 && right_wristY <= 450){
            document.getElementById("speed").innerHTML = "Velocidad = 2.0";
            sound.rate(2.0);
        }
    }

    if(visible_leftwrist > 0.2){
        circle(left_wristX, left_wristY, 50);
        number_leftY = Number(left_wristY);
        decimales = floor(number_leftY);
        volumen = decimales / 500;
        document.getElementById("volume").innerHTML = "Volumen es igual: " + volumen;
        sound.setVolume(volumen);
    }


  

}

function play(){
    sound.play();
    sound.setVolume(1.0);
    sound.rate(1.0);
}
function stop(){
    sound.pause();
}

function modelLoaded(){
    console.log("PoseNet se esta inicando");
}

function gotPoses(results){
    if (results.length > 0 ){
        console.log(results);
        visible_leftwrist = results[0].pose.keypoints[9].score;
        console.log("confianza visible" + visible_leftwrist);
        visible_rightwrist = results[0].pose.keypoints[10].score;
        console.log("confianza visible " + visible_rightwrist);
        left_wristX = results[0].pose.leftWrist.x;
        right_wristX = results[0].pose.rightWrist.x;
        left_wristY = results[0].pose.leftWrist.y;
        right_wristY = results[0].pose.rightWrist.y;
        console.log("cordenada de muñeca izquierda x" + left_wristX + " cordenada de muñeca izquierda y" + left_wristY );
        console.log("cordenada de muñeca derecha x" + right_wristX + " cordenada de muñeca derecha y" + right_wristY );
    }
}
let handpose;
var video;
let predictions = [];
let thumbX = 0;
let thumbY = 0;
let pinkyX = 0;
let pinkyY = 0;

const options = {
  flipHorizontal: true,
}
function setup() {
    createCanvas(600,600);
    video = createCapture(VIDEO);
    video.size(600,600)
    video.hide();

    handpose = ml5.handpose(video, options, modelReady);
    handpose.on("predict", gotPoses);
}

var listOfBenefits = ["Free 2 Credit Course!",
                      "Connect With Companies",
                      "Resume Building",
                      "Free food!"]

function draw() {
  background(50);
  //image(video, 0, 0, height, width);
  //drawKeypoints();
  let d = dist(thumbX, thumbY, pinkyX, pinkyY);
  fill(20,230,120);
  ellipse(thumbX, thumbY, d);
  // fill(255,0,0);
  // ellipse(thumbX,thumbY, 10);
  // ellipse(pinkyX, pinkyY, 10);

}

function modelReady() {
    console.log("model ready!");
}

function gotPoses(poses) {
    console.log(poses);
    if (poses.length > 0) {
      let tX = poses[0].landmarks[3][0]
      let tY = poses[0].landmarks[3][1]
      let pX = poses[0].landmarks[19][0]
      let pY = poses[0].landmarks[19][1]
      thumbX = lerp(thumbX, tX, 0.5);
      thumbY = lerp(thumbY, tY, 0.5);
      pinkyX = lerp(pinkyX, pX, 0.5);
      pinkyY = lerp(pinkyY, pY, 0.5);

    }
}

function drawKeypoints() {
    for (let i = 0; i < predictions.length; i += 1) {
      const prediction = predictions[i];
      for (let j = 0; j < prediction.landmarks.length; j += 1) {
        const keypoint = prediction.landmarks[j];
        fill(0, 255, 0);
        noStroke();
        ellipse(keypoint[0], keypoint[1], 10, 10);
      }
    }
  }
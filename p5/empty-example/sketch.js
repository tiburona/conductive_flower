var mic, fft

var startSize = 2
var stemHeight = 10;

function setup(){
  createCanvas(710, 400);

  // Create an Audio input
  mic = new p5.AudioIn();

  // start the Audio Input.
  // By default, it does not .connect() (to the computer speakers)
  mic.start();

  fft = new p5.FFT();
  fft.setInput(mic);
  peakDetect = new p5.PeakDetect(140, 20000);

}

// function draw() {
//   background(200);
//
//   // Get the overall volume (between 0 and 1.0)
//   var vol = mic.getLevel();
//   fill(127);
//   stroke(0);
//
//   // Draw an ellipse with height based on volume
//   var h = map(vol, 0, 1, height, 0);
//   ellipse(width/2, h - 25, 50, 50);
// }

 pitch_reached = false;

 function makeFlower(startingSize, startingWidth, startingHeight){
   translate(startingWidth, height-startingHeight);
   fill(204, 101, 192, 127);
   stroke(127, 63, 120);
   noStroke();
   var w = startingSize
   var h = startingSize * 4
   for (var i = 0; i < 10; i ++) {
     ellipse(0, 30, w, h);
     rotate(PI/5);
   }
 }

function draw(){
  background(255);
  var vol = mic.getLevel();
  stroke(0);
  stemHeight = stemHeight + vol;
  fill(34,139,34)
  rectMode(CORNERS);
  noStroke();
  rect(width/2-5, height, width/2+5, height-stemHeight);

  var spectrum = fft.analyze();
  peakDetect.update(fft)
  //console.log(peakDetect.isDetected)

 if ( peakDetect.isDetected ) {
   pitch_reached = true;

   startSize += 2
   // console.log("yay a peak")
   // //ellipse(width/2, height/2, 50, 50)
   // background(255);
   // makeFlower(startSize, stemHeight)
 }

 if (pitch_reached == true) {
   makeFlower(startSize, width/2, stemHeight+10);
 }
}


 // draw a flower.

 // function drawEllipse() {
 //   ellipse(width/2, height/2, 50, 50)
 // }

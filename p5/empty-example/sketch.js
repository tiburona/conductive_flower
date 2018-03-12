var mic, fft

var startSize = 2

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


 function makeFlower(startingSize, startingHeight){
   translate(280, 200);
   fill(204, 101, 192, 127);
   stroke(127, 63, 120);
   noStroke();
   var width = startingSize
   var height = startingSize * 4
   for (var i = 0; i < 10; i ++) {
     ellipse(0, 30, width, height);
     rotate(PI/5);
   }
 }

function draw(){

  var spectrum = fft.analyze();
  peakDetect.update(fft)
  //console.log(peakDetect.isDetected)


  // var vol = mic.getLevel()
  // console.log(vol)

 if ( peakDetect.isDetected ) {
   startSize += 2
   console.log("yay a peak")
   //ellipse(width/2, height/2, 50, 50)
   makeFlower(startSize, 100)
 }
}
 // draw a flower.

 function drawEllipse() {
   ellipse(width/2, height/2, 50, 50)
 }

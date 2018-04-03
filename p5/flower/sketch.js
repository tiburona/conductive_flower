var mic, fft

var startSize = 2
var stemHeight = 10;

function setup(){
  createCanvas(710, 600);


  mic = new p5.AudioIn();
  mic.start();

  fft = new p5.FFT();
  fft.setInput(mic);
  peakDetect = new p5.PeakDetect(140, 20000);

}

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

 function makeStem(stemHeight) {
   translate(0, -30)
   stroke(0);
   fill(34,139,34)
   rectMode(CORNERS);
   noStroke();
   rect(width/2-5, height, width/2+5, height-stemHeight);
 }

function draw(){
  background(255);
  var vol = mic.getLevel();
  stemHeight = stemHeight + vol;
  makeStem(stemHeight)
  var spectrum = fft.analyze();
  peakDetect.update(fft)

 if (peakDetect.isDetected) {
   pitch_reached = true;
   startSize += 2
 }

 if (pitch_reached == true) {
   makeFlower(startSize, width/2, stemHeight+40);
 }
}

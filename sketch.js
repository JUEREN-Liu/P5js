function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  Texture01();
  //Texture02();
  //Texture03();
  //Texture04();
}
//01
{
function Texture01(){
  let w = 20;
  let h = 40;

  let bgColor = color(220, 220, 200);
  let mainColor = color(30, 30, 180);
  let c = [bgColor, mainColor];

  noStroke();
  for (let i = 0; i <= width / w; i+= 1) {
    for (let j = 0; j <= height / h; j+= 1) {
      Unit01(i*w - w, j*h -h, w, h, c[(i % 2 + j) % 2], c[(i % 2 + j + 1) % 2]);
    }
  }

}

function Unit01(x, y, w, h, mainC, bgC){
  fill(mainC);
  let hOffset = h / 3;
  let center = x + w/2;
  quad(x, y, 
    center, y + hOffset,
    center, y + h + hOffset,
     x, y + h);
  quad(center, y + hOffset,
    x + w, y,
    x + w, y + h,
    center, y + h + hOffset);
  stroke(bgC);
  strokeWeight(1);
  line(center, y + hOffset -1,
    center, y + h + hOffset -1);
}
}

//02
{
  function Texture02(){
    let w = 80;
    let h = 16;
    for (let i = 0; i <= width / w + 5; i+= 1) {
      for (let j = 0; j <= height / h + 5; j+= 1) {
        Unit02(i*(w * 0.7) + (j) % 2 * (w * 0.35), j*h -h, w, h);
      }
    }
  }

  function Unit02(x,y,w,h){
    let mainColor = color(30, 30, 180);
    noFill();
    stroke(mainColor);
    strokeWeight(2);
    let lr = 250;
    let rr = 290;
    arc(x, y, w, w*2, radians(lr), radians(rr));
    arc(x, y, w * 0.9, w * 1.8, radians(lr+4), radians(rr-4) );
    arc(x, y, w * 0.5, w * 0.8, radians(lr-2), radians(rr+2));
  }
}

//03
{
  function Texture03(){
    let w = 40;
    let h = 20;
    for (let i = 0; i <= width / w + 2; i+= 1) {
      for (let j = 0; j <= height / h + 3; j+= 1) {
        Unit03(i*w - w + (j) % 2 * (w * 0.5), j*h -h, w, h);
      }
    }
  }

  function Unit03(x,y,w,h){
    let mainColor = color(30, 30, 180);
    noFill();
    stroke(mainColor);
    strokeWeight(2);
    arc(x, y, w, w, 0, radians(360));
  }
}

//04
{
  function Texture04(){
    let w = 40;
    noFill();
    stroke(color(30, 30, 180));
    strokeWeight(1.5);

    for (let i = 0; i < windowWidth; i+= w) {
      line(i, 0, i + windowHeight / 2, windowHeight);
      line(-i, 0, windowHeight / 2 - i, windowHeight);
      line(i, 0, i -windowHeight / 2, windowHeight);
    }
    for (let i = 0; i < windowHeight; i+= w) {
      line(0, i, windowWidth, i);
      for (let j = 0; j < windowWidth; j+= w) {
        Unit04_pus(j - (1 - (i/w) % 2) * (w / 2), i - (w / 3), w);
        Unit04_min(j - (1 - (i/w) % 2) * (w / 2), i + (w / 3), w);
      }
    }
  }

  function Unit04_pus(x,y, w){
    point(x, y);
    line(x, y - w*2/3, x, y);
    line(x- w/2, y + w/3, x, y);
    line(x+ w/2, y + w/3, x, y);
  }
  function Unit04_min(x,y, w){
    point(x, y);
    line(x, y + w*2/3, x, y);
    line(x- w/2, y - w/3, x, y);
    line(x+ w/2, y - w/3, x, y);
  }
}
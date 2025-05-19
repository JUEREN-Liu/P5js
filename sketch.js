function setup() {
  createCanvas(400, 400);
  
  //Texture01();
  //Texture02();
  //Texture03();
  //Texture04();
  //Texture05();
  Texture05();
}

function Mask(){
    rect(20,20, width-40 , height-40);
}

function draw() {
  
}
//01
{
function Texture01(){
  background(200);
  clip(Mask);
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
    background(200);
    clip(Mask);
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
    background(200);
    clip(Mask);
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
    background(200);
    clip(Mask);
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

//05
{
  function Texture05(){
    background(67, 67, 67);
    clip(Mask);
    fill(0);
    stroke(13,13,13);
    textSize(10);
    randomSeed(random(0,999));
    let r = random();
    let w = 20;
    let row = 2;
    let column = 2;
    let offsetX = 20;
    let offsetY = 20;
    
    for(let i = 0; i < width-(offsetX+40); i += w){
      for(let j = 0; j < height-(offsetX+40); j +=w){
        let mono = lerpColor(color(252,250,242), color(28), sq(i / (width - offsetX)));
        let c = color(0);
        switch((i/w)%column + (j/w)%row*column){
        case 0:
          c = lerpColor(color(208,16,76), color(255), sq(i / (width - offsetX)));
          break;
        case 1:
          c = lerpColor(color(102,50,124), color(255), i / (width - offsetX));
          break;
        case 2:
          c = lerpColor(color(87,42,63), color(255), sq(i / (width - offsetX)));
          break;
        case 3:
          c = lerpColor(color(134,193,102), color(255), i / (width - offsetX));
          break;
          default:
        }
        let v = abs(sin(i*j+r));
        if(v> 0.2){
          Unit05_0(i+offsetX, j+offsetY,w, w, mono);
        }
        if(v> 0.1 && v < 0.9){
          Unit05_1(i+offsetX, j+offsetY,w, w, c);
        }
        //text(r, i +offsetX, j+offsetY);
      }
    }
  }

  function Unit05_0(x,y,w, h, c){
    x *= 1.05;
    y *= 1.05;
    w *= 0.9;
    h *= 0.9;
    fill(c);
    triangle(x, y, x+w, y, x+w, y+h);
  }
  function Unit05_1(x,y,w, h, c){
    x *= 1.05;
    y *= 1.05;
    w *= 0.9;
    h *= 0.9;
    fill(c);
    triangle(x, y, x, y+h, x+w, y+h);
  }
}

//06
{
  function Texture06(){
    background(200);
    clip(Mask);
    fill(50);
    noStroke();
    textSize(7);
    let w = 20;
    let row = 2;
    let column = 2;
    let offsetX = 10;
    let offsetY = 20;
    for(let i = 0; i < width*2; i += w){
      for(let j = 0; j < height*2; j +=w){
        switch((i/w)%column+ (j/w)%row*column){
        case 0:
          Unit06_0(i+offsetX, j+offsetY,w, w);
          break;
        case 1:
          Unit06_1(i+offsetX, j+offsetY,w, w);
          break;
        case 2:
          Unit06_2(i+offsetX, j+offsetY,w, w);
          break;
        case 3:
          Unit06_3(i+offsetX, j+offsetY,w, w);
          break;
          default:
        }
        //text((i/w)%column+ (j/w)%row*column,i + w/2 +offsetX,j+ w/2+offsetY);
      }
    }
  }

  function Unit06_0(x,y,w, h){
    rect(x, y, w, h);
  }
  function Unit06_1(x,y,w, h){
    triangle(x, y, x+w/2, y, x, y+h/2);
    quad(x, y+h, x+w, y, x+w, y+h/2, x+w/2, y+h);
  }
  function Unit06_2(x,y,w, h){
    triangle(x+w/2, y+h, x+w, y+h/2, x+w, y+h);
    quad(x, y+h/2, x+w/2, y, x+w, y, x, y+h);
  }
  function Unit06_3(x,y,w, h){
    
  }
}
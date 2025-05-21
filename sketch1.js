function setup() {
  createCanvas(400, 400);
  Texture01_Setup();
}

function Mask(){
    rect(20,20, width-40 , height-40);
}

function draw() {
    Texture01();
}

//01
{
    function Texture01_Setup(){
        strokeWeight(2);
    }

    function Texture01(){
        background(60);
        clip(Mask);
        
        let unitH = height /15;
        let areaY = unitH * 1;
        let areaY1 = unitH * 3;
        let areaY2 = unitH * 7;
        let noiseLevel = height / 4;

        for(let i = 0; i < width; i++){
            nx = noise((i + frameCount + 999) * 0.004) * noiseLevel + areaY;
            nx1 = noise((i + frameCount * 1.3 + 9999) * 0.0075) * noiseLevel + areaY1;
            nx2 = (noise((i + frameCount * 4) * 0.017)-0.2) * 1.3 * noiseLevel + areaY2;
            
            for(let j = 0; j <= height; j++){
                if(j > nx2){
                    stroke(sq((j-areaY2)/(height-areaY2))*50 + 40);
                }
                else if(j > nx1){
                    stroke(sq((min(j, unitH * 10)-areaY1)/(unitH * 10-areaY1))*30 + 100);
                }
                else if(j > nx){
                    stroke(sq((j-areaY)/(areaY1-areaY))*10 + 175);
                }
                else{
                    stroke(200);
                }
                point(i,j);
            }
        }
    }
}
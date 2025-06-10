{
    function setup() {
    createCanvas(900, 900);
    Texture01_Setup();

    Texture01();
    }

    function Mask(){
        rect(20,20, width-40 , height-40);
    }

    function Texture01_Setup(){
        strokeWeight(2);
    }

    function Texture01(){
        background(255);
        //clip(Mask);
        size = 150;
        row = floor(width / size);
        column = floor(height / size);

        for(let i=0; i < column; i++){
            for(let j = 0; j < row; j++){
                faceData = new FaceData(size * j + size / 2, size * i + size / 2, size);
                face1 = new Face(faceData).DrawFace();
            }
        }
    }

    class FaceData{
        x = 0;
        y = 0;
        w = 0;
        faceWidth = 0.5;
        faceHeight = 0.9;
        faceCenterY = 0.5;

        eye_height_Para = 0.5;
        eye_width_Para = 0.5;
        eye_inSide_Para = 0.5;
        eye_tPoint_Para = 0.5;
        eye_tPoint1_Para = 0.3;
        eye_outSide_Para = 0.5;
        eye_bPoint_Para = 0.3;
        eye_bPoint1_Para = 0.5;

        eye_inSide_CP1 = 0.4;
        eye_inSide_CP2 = 0.5;
        eye_tPoint_CP1 = 0.6;
        eye_tPoint_CP2 = 0.5;
        eye_tPoint1_CP1 = 0.5;
        eye_tPoint1_CP2 = 0.0;
        eye_outSide_CP1 = 0.7;
        eye_outSide_CP2 = 0.0;
        eye_bPoint_CP1 = 0.5;
        eye_bPoint_CP2 = 0.5;
        eye_bPoint1_CP1 = 0.4;
        eye_bPoint1_CP2 = 0.5;
        eyelash_height = 0.5;

        pupil_CPX = 0.6;
        pupil_CPY = 0.6;
        pupilXoffset = 0.5;
        pupilYoffset = 0.5;
        pupilW = 0.5;
        pupilH = 0.5;

        earX = 0.5;
        earY = 0.5;

        noseY = 0.5;

        constructor(x, y, w){
            this.x = x;
            this.y = y;
            this.w = w;
            this.faceWidth = map(randomGaussian(this.faceWidth, 0.1), 0, 1, 0.6 , 0.8, true);
            this.faceCenterY = map(randomGaussian(this.faceCenterY, 0.1), 0, 1, 0.11 , 0.14, true);
            this.eye_height_Para = map(randomGaussian(this.eye_height_Para, 0.4), 0, 1, 0.06 , 0.18, true);
            
            this.eye_width_Para = constrain(randomGaussian(this.eye_width_Para, 0.2), 0 ,1);
            this.eye_inSide_Para = constrain(randomGaussian(this.eye_inSide_Para, 0.2), 0 , 1);
            this.eye_outSide_Para = constrain(randomGaussian(this.eye_outSide_Para, 0.2), pow(this.eye_width_Para, 2) * 0.2 , 1);
            this.eye_tPoint_Para = constrain(randomGaussian(this.eye_tPoint_Para, 0.2), (1-this.eye_inSide_Para) * 0.3 , 1);
            this.eye_tPoint1_Para = constrain(randomGaussian(this.eye_tPoint1_Para, 0.1), 0 , (1-this.eye_outSide_Para));
            this.eye_bPoint_Para = constrain(randomGaussian(this.eye_bPoint_Para, 0.1), 0 , 1);
            this.eye_bPoint1_Para = constrain(randomGaussian(this.eye_bPoint1_Para, 0.1), 0 , 1);
            
            this.eye_inSide_CP1 = constrain(randomGaussian(this.eye_inSide_CP1, 0.1), 0 , 1);
            this.eye_inSide_CP2 = constrain(randomGaussian(this.eye_inSide_CP2, 0.1), 0 , 1);
            this.eye_tPoint_CP1 = constrain(randomGaussian(this.eye_tPoint_CP1, 0.1), 0 , 1);
            this.eye_tPoint_CP2 = constrain(randomGaussian(this.eye_tPoint_CP2, 0.1), 0 , 1);
            this.eye_tPoint1_CP1 = constrain(randomGaussian(this.eye_tPoint1_CP1, 0.1), 0 , 1);
            this.eye_tPoint1_CP2 = constrain(randomGaussian(this.eye_tPoint1_CP2, 0.1), 0 , 1);
            this.eye_outSide_CP1 = constrain(randomGaussian(this.eye_outSide_CP1, 0.1), 0 , 1);
            this.eye_outSide_CP2 = constrain(randomGaussian(this.eye_outSide_CP2, 0.1), 0 , 1);
            this.eye_bPoint_CP1 = constrain(randomGaussian(this.eye_bPoint_CP1, 0.1), 0 , 1);
            this.eye_bPoint_CP2 = constrain(randomGaussian(this.eye_bPoint_CP2, 0.1), 0 , 1);
            this.eye_bPoint1_CP1 = constrain(randomGaussian(this.eye_bPoint1_CP1, 0.1), 0 , 1);
            this.eye_bPoint1_CP2 = constrain(randomGaussian(this.eye_bPoint1_CP2, 0.1), 0 , 1);
            
            this.eyelash_height = map(randomGaussian(this.eyelash_height, 0.3), 0 , 1, 0.02, 0.045, true);

            this.pupil_CPX = constrain(randomGaussian(this.pupil_CPX, 0.05), 0 , 1);
            this.pupil_CPY = constrain(randomGaussian(this.pupil_CPY, 0.1), 0 , 1);
            this.pupilXoffset = map(randomGaussian(this.pupilXoffset, 0.4), 0 , 1, 0.35, 0.45,true);
            this.pupilYoffset = map(randomGaussian(this.pupilYoffset, 0.4), 0 , 1, 0.45, 0.65, true);
            this.pupilW = map(randomGaussian(this.pupilW, 0.3), 0 , 1, 0.2 , 0.3, true);
            this.pupilH = map(randomGaussian(this.pupilH, 0.3), 0 , 1, 0.05, 0.09, true);
            this.eye_width_Para = map(this.eye_width_Para, 0 ,1 , 0.2 , 0.3, true);

            this.earX = map(randomGaussian(this.earX, 0.25), 0 ,1 , 0.11 , 0.14, true);
            this.earY = map(randomGaussian(this.earY, 0.25), 0 ,1 , 0.03 , 0.06, true);
            this.noseY = map(randomGaussian(this.noseY, 0.25), 0 ,1 , 0 , 0.05, true);
        }
    }

    class Face{
        x = 0;
        y = 0;
        w = 0;
        centerY = 0;
        faceWidth = 0;
        faceHeight = 0;
        faceData;
        constructor(faceData){
            this.faceData = faceData;
            this.x = faceData.x;
            this.y = faceData.y;
            this.w = faceData.w;
            this.faceWidth = this.w * faceData.faceWidth;
            this.faceHeight = this.w * faceData.faceHeight;
            this.centerY = this.y + this.faceHeight * this.faceHeight / this.w * faceData.faceCenterY;
        }

        DrawFace(){
            stroke(255, 0, 0);
            stroke(0);
            let faceBoundR = this.x+this.faceWidth/2;
            let faceBoundL = this.x-this.faceWidth/2;
            let faceBoundT = this.y-this.faceHeight/2;
            let faceBoundB = this.y+this.faceHeight/2;
            let EyebrowY = this.centerY - this.faceHeight * 0.1;
            let noseYoffest = (this.y + this.faceHeight / 2 - this.centerY) / 3;
            let mouseYoffest = noseYoffest * 2;
            let faceMostWidthPointY = min(EyebrowY, this.centerY - noseYoffest);
            let EyebrowOutPointXoffest = this.faceWidth/9 * 4;
            let EyeOutPointXofset = this.faceWidth/8*3;
            push();
            fill(255, 237, 229);
            let mandibleAngleXoffset = this.faceWidth / 8 * 2.4;//下顎骨
            let earX = curvePoint(faceBoundR, faceBoundR, this.x + mandibleAngleXoffset, this.x, 0.5);
            let earX1 = curvePoint(faceBoundR, earX, this.x + mandibleAngleXoffset, this.x, 0.75);
            this.DrawEars(earX - this.x, earX1 - this.x, this.centerY, this.centerY + (mouseYoffest + noseYoffest)/2);

            beginShape();
            vertex(faceBoundL, faceMostWidthPointY);
            bezierVertex(
                this.x-this.faceWidth*0.55, this.y-this.faceHeight*0.65, 
                this.x+this.faceWidth*0.55, this.y-this.faceHeight*0.65, 
                faceBoundR, faceMostWidthPointY);
            endShape();
            curveTightness(0.2);
            beginShape();
            this.DrawTestCurveVertex(faceBoundR, faceBoundT);
            this.DrawTestCurveVertex(faceBoundR, faceMostWidthPointY);
            
            //this.DrawTestCurveVertex(lerp(faceBoundR, this.x + mandibleAngleXoffset, 0.2), this.centerY + noseYoffest*0.5);
            this.DrawTestCurveVertex(this.x + mandibleAngleXoffset, this.centerY + mouseYoffest*0.99);
            this.DrawTestCurveVertex(this.x , this.y + this.faceHeight /2);
            this.DrawTestCurveVertex(this.x - mandibleAngleXoffset, this.centerY + mouseYoffest*0.99);
            //this.DrawTestCurveVertex(lerp(faceBoundL, this.x - mandibleAngleXoffset, 0.2), this.centerY + noseYoffest*0.5);
            this.DrawTestCurveVertex(faceBoundL, faceMostWidthPointY);
            this.DrawTestCurveVertex(faceBoundL, faceBoundT);
            endShape();
            ///*
            this.DrawEyes(this.x, this.centerY, this.faceWidth/4);
            //this.DrawEyebrow(this.x, EyebrowY, this.faceWidth/4.5);
            this.DrawNose(this.x, this.centerY + noseYoffest);
            //this.DrawMouse(this.x, this.centerY + mouseYoffest, this.faceWidth/4);
            
            //*/
            pop();
            
        }

        DrawTestCurveVertex(x,y){
            curveVertex(x,y);
            //this.TestPoint(x,y);
        }

        DrawEyes(x, y, s){
            push();
            this.DrawEyeType1(x, y, s);
            pop();
        }

        DrawEyeType1(x, y, s){
            let height = this.faceHeight * this.faceData.eye_height_Para;
            let width = this.faceWidth * this.faceData.eye_width_Para;
            let inSide = lerp(y + height / 2, y - height / 2, this.faceData.eye_inSide_Para);
            let tPoint = lerp(s/2, s/2 + width, this.faceData.eye_tPoint_Para);
            let tPoint1 = lerp(tPoint, s/2 + width, this.faceData.eye_tPoint1_Para);
            let outSide = lerp(y + height / 2, y - height / 2, this.faceData.eye_outSide_Para);
            let bPoint = lerp(s/2, s/2 + width, this.faceData.eye_bPoint_Para);
            let bPoint1 = lerp(bPoint, s/2 + width, this.faceData.eye_bPoint1_Para);

            let rL = x + s/2;
            let rR = rL + width;
            let lR = x - s/2;
            let lL = lR - width;
            let tY = y - height / 2;
            let bY = y + height / 2;

            let eyelashY = tY - this.faceHeight * this.faceData.eyelash_height;
            fill(55, 50, 50);
            stroke(40, 40, 80);
            let eyelashOffset = width * 0.15;
            for(let i = 0; i < 2; i++){
                beginShape();
                vertex(rL, inSide);
                this.TestDrawBezierVertex(
                    rL, inSide,
                    rL, lerp(inSide, tY, this.faceData.eye_inSide_CP1),
                    lerp(x+tPoint, rL, this.faceData.eye_tPoint_CP1), tY,
                    x+tPoint, tY);
                this.TestDrawBezierVertex(
                    x+tPoint, tY,
                    lerp(x+tPoint, x+tPoint1, this.faceData.eye_tPoint_CP2), tY,
                    lerp(x+tPoint1, x+tPoint, this.faceData.eye_tPoint1_CP1), tY,
                    x+tPoint1, tY);
                this.TestDrawBezierVertex(
                    x+tPoint1, tY,
                    lerp(x+tPoint1, rR, this.faceData.eye_tPoint1_CP2), tY,
                    lerp(x+tPoint1, rR, this.faceData.eye_outSide_CP1), tY,
                    rR, outSide);
                this.TestDrawBezierVertex(
                    rR, outSide,
                    rR, outSide,
                    rR+eyelashOffset, outSide,
                    rR+eyelashOffset, outSide);
                endShape();
                beginShape();
                vertex(rR+eyelashOffset, outSide);
                this.TestDrawBezierVertex(
                    rR+eyelashOffset, outSide,
                    lerp(x+tPoint1, rR, 1.2),lerp(outSide, eyelashY, 0.5),
                    lerp(x+tPoint1, rR, 0.66), lerp(outSide, eyelashY, 1),
                    lerp(x+tPoint1, rR, 0.1), lerp(outSide, eyelashY, 0.99));
                this.TestDrawBezierVertex(
                    lerp(x+tPoint1, rR, 0.1), lerp(outSide, eyelashY, 0.9),
                    lerp(x+tPoint1, rL, 0), eyelashY,
                    lerp(x+tPoint, x+tPoint1, 0.3), eyelashY,
                    lerp(x+tPoint, rL, 0.1), eyelashY);
                this.TestDrawBezierVertex(
                    lerp(x+tPoint, rL, 0.1), eyelashY,
                    lerp(x+tPoint, rL, 0.8), eyelashY,
                    rL, lerp(inSide, tY, this.faceData.eye_inSide_CP1),
                    rL, inSide);
                endShape();
                beginShape();
                let bezierX = bezierPoint(rR, rR, lerp(x+bPoint1, rR, this.faceData.eye_bPoint1_CP1), x+bPoint1, 0.5);
                let bezierY = bezierPoint(outSide, lerp(outSide, bY, this.faceData.eye_outSide_CP2), bY, bY, 0.5);
                vertex(rR, outSide);
                this.TestDrawBezierVertex(
                    rR, outSide,
                    rR,lerp(outSide, bY, this.faceData.eye_outSide_CP2),
                    bezierX, bezierY,
                    bezierX, bezierY);
                this.TestDrawBezierVertex(
                    bezierX, bezierY,
                    bezierX, bezierY,
                    rR+eyelashOffset, outSide,
                    rR+eyelashOffset, outSide);
                this.TestDrawBezierVertex(
                    rR+eyelashOffset, outSide,
                    rR+eyelashOffset, outSide,
                    rR, outSide,
                    rR, outSide);
                endShape();
                tPoint *= -1;
                tPoint1 *= -1;
                bPoint *= -1;
                bPoint1 *= -1;
                rL = x - s/2;
                rR = rL - width;
                eyelashOffset *= -1;
            }
            rL = x + s/2;
            rR = rL + width;

            //#region eyes
            beginClip();
            for(let i = 0; i < 2; i++){
                beginShape();
                vertex(rL, inSide);
                this.TestDrawBezierVertex(
                    rL, inSide,
                    rL, lerp(inSide, tY, this.faceData.eye_inSide_CP1),
                    lerp(x+tPoint, rL, this.faceData.eye_tPoint_CP1), tY,
                    x+tPoint, tY);
                this.TestDrawBezierVertex(
                    x+tPoint, tY,
                    lerp(x+tPoint, x+tPoint1, this.faceData.eye_tPoint_CP2), tY,
                    lerp(x+tPoint1, x+tPoint, this.faceData.eye_tPoint1_CP1), tY,
                    x+tPoint1, tY);
                this.TestDrawBezierVertex(
                    x+tPoint1, tY,
                    lerp(x+tPoint1, rR, this.faceData.eye_tPoint1_CP2), tY,
                    lerp(x+tPoint1, rR, this.faceData.eye_outSide_CP1), tY,
                    rR, outSide);
                endShape();
                beginShape();
                vertex(rR, outSide);
                this.TestDrawBezierVertex(
                    rR, outSide,
                    rR,lerp(outSide, bY, this.faceData.eye_outSide_CP2),
                    lerp(x+bPoint1, rR, this.faceData.eye_bPoint1_CP1), bY,
                    x+bPoint1, bY);
                this.TestDrawBezierVertex(
                    x+bPoint1, bY,
                    lerp(x+bPoint1, x+bPoint, this.faceData.eye_bPoint1_CP2), bY,
                    lerp(x+bPoint, x+bPoint1, this.faceData.eye_bPoint_CP1), bY,
                    x+bPoint, bY);
                this.TestDrawBezierVertex(
                    x+bPoint, bY,
                    lerp(rL, x+bPoint, this.faceData.eye_bPoint_CP2), bY,
                    rL, lerp(inSide, bY, this.faceData.eye_inSide_CP2),
                    rL, inSide);
                endShape();
                tPoint *= -1;
                tPoint1 *= -1;
                bPoint *= -1;
                bPoint1 *= -1;
                rL = x - s/2;
                rR = rL - width;
            }
            rL = x + s/2;
            rR = rL + width;
            endClip();
            //#endregion
            
            fill(255);
            noStroke();
            quad(rL, tY, rR, tY, rR, bY, rL, bY);
            quad(lR, tY, lL, tY, lL, bY, lR, bY);
            
            fill(55, 50, 50);
            stroke(40, 40, 80);
            strokeWeight(4);
            //瞳孔
            
            let pupilX = lerp(rL, rR, this.faceData.pupilXoffset);
            let pupilY = lerp(bY, tY, this.faceData.pupilYoffset);
            let pupilT = pupilY - this.faceData.pupilH * this.faceHeight;
            let pupilB = pupilY + this.faceData.pupilH * this.faceHeight;
            let pupilWidth = this.faceData.pupilW * width;
            
            for(let i = 0; i < 2; i++){
                beginShape();
                vertex(pupilX, pupilT);
                this.TestDrawBezierVertex(
                    pupilX, pupilT,
                    lerp(pupilX, pupilX + pupilWidth , this.faceData.pupil_CPX), pupilT,
                    pupilX + pupilWidth, lerp(pupilY, pupilT, this.faceData.pupil_CPY),
                    pupilX + pupilWidth, pupilY);
                this.TestDrawBezierVertex(
                    pupilX + pupilWidth, pupilY,
                    pupilX + pupilWidth, lerp(pupilY, pupilB, this.faceData.pupil_CPY),
                    lerp(pupilX, pupilX + pupilWidth, this.faceData.pupil_CPX), pupilB,
                    pupilX, pupilB);
                this.TestDrawBezierVertex(
                    pupilX, pupilB,
                    lerp(pupilX, pupilX - pupilWidth, this.faceData.pupil_CPX), pupilB,
                    pupilX - pupilWidth, lerp(pupilY, pupilB, this.faceData.pupil_CPY),
                    pupilX - pupilWidth, pupilY);
                this.TestDrawBezierVertex(
                    pupilX - pupilWidth, pupilY,
                    pupilX - pupilWidth, lerp(pupilY, pupilT, this.faceData.pupil_CPY),
                    lerp(pupilX, pupilX - pupilWidth, this.faceData.pupil_CPX), pupilT,
                    pupilX, pupilT);
                endShape();
                pupilX = lerp(lR, lL, this.faceData.pupilXoffset);
                pupilWidth *= -1;
            }
            
            pupilX = lerp(rL, rR, this.faceData.pupilXoffset);

            fill(60, 50, 50);
            stroke(30, 30, 40);
            strokeWeight(3);
            ellipse(lerp(rL, rR, this.faceData.pupilXoffset), lerp(bY, tY, this.faceData.pupilYoffset), pupilWidth*0.6, pupilWidth*0.6);
            ellipse(lerp(lR, lL, this.faceData.pupilXoffset), lerp(bY, tY, this.faceData.pupilYoffset), pupilWidth*0.6, pupilWidth*0.6);
        }

        TestDrawBezierVertex(x1, y1, x2, y2, x3, y3, x4, y4){
            bezierVertex(x2, y2, x3, y3, x4, y4);
            /*
            stroke(0);
            strokeWeight(5);
            point(x3, y3);
            point(x2, y2);

            stroke(255, 0, 0);
            point(x1, y1);
            point(x4, y4);

            noFill();
            stroke(0);
            strokeWeight(1);
            stroke(255, 0, 0);
            line(x1, y1, x2, y2);
            line(x3, y3, x4, y4);
            */
        }

        DrawEyebrow(x, y, s){
            this.TestPoint(x + s/2, y);
            this.TestPoint(x + s/2 + this.faceWidth / 3, y + 0);

            this.TestPoint(x - s/2, y);
            this.TestPoint(x - s/2 - this.faceWidth / 3, y + 0);
        }

        DrawNose(x, y){
            stroke(90, 50, 50);
            strokeWeight(2.5);
            point(x,y+this.faceHeight*this.faceData.noseY);
        }

        DrawMouse(x, y, s){
            this.TestPoint(x + s/2, y + 0);
            this.TestPoint(x - s/2, y + 0);
        }

        DrawEars(x1, x2, y1, y2){
            fill(255, 237, 229);
            for(let i =0; i < 2; i++){
                beginShape();
                curveTightness(0.0);
                this.DrawTestCurveVertex(this.x + x1, y1-this.faceHeight*0.02);
                this.DrawTestCurveVertex(this.x + x1, y1-this.faceHeight*0.02);
                this.DrawTestCurveVertex(this.x + x1*1.21, y1-this.faceHeight*this.faceData.earY);
                this.DrawTestCurveVertex(this.x + x1*1.25, y1+this.faceHeight*0.03);
                this.DrawTestCurveVertex(this.x + x1*1.1, y1+this.faceHeight*this.faceData.earX);
                this.DrawTestCurveVertex(this.x + x2, y2);
                this.DrawTestCurveVertex(this.x + x2, y2);
                this.DrawTestCurveVertex(this.x + x2, y2);
                x1*=-1;
                x2*=-1;
                endShape();
            }
        }

        TestPoint(x, y){
            stroke(0);
            strokeWeight(2);
            point(x,y);
        }
    }
}

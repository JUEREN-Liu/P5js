{
    function setup() {
    createCanvas(600, 600);
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
        faceData = new FaceData(300, 300, 500);
        face1 = new Face(faceData);
        face1.DrawFace();
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
            line(0, height/2, width, height/2);
            line(width /2, 0, width/2, height);
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
            //quad(faceBoundR, faceBoundT, faceBoundL, faceBoundT, faceBoundL, faceBoundB, faceBoundR, faceBoundB);
            push();
            fill(255, 237, 229);

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
            let mandibleAngleXoffset = this.faceWidth / 8 * 2.4;//下顎骨
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
            this.DrawEyebrow(this.x, EyebrowY, this.faceWidth/4.5);
            this.DrawNose(this.x, this.centerY + noseYoffest);
            this.DrawMouse(this.x, this.centerY + mouseYoffest, this.faceWidth/4);
            let earX = curvePoint(faceBoundR, faceBoundR, this.x + mandibleAngleXoffset, this.x, 0.5);
            let earX1 = curvePoint(faceBoundR, earX, this.x + mandibleAngleXoffset, this.x, 0.5);
            this.DrawEars(earX - this.x, earX1 - this.x, this.centerY, this.centerY + noseYoffest);
            //*/
            pop();
            
        }

        DrawTestCurveVertex(x,y){
            curveVertex(x,y);
            this.TestPoint(x,y);
        }

        DrawEyes(x, y, s){
            push();
            this.DrawEyeType1(x, y, s);
            pop();
        }

        DrawEyeType1(x, y, s){
            let height = this.faceHeight / 8;
            let width = this.faceWidth / 3.5;
            let inSide = lerp(y + height / 2, y - height / 2, 0.8);
            let tPoint = lerp(s/2, s/2 + width, 0.5);
            let tPoint1 = lerp(tPoint, s/2 + width, 0.0);
            let outSide = lerp(y + height / 2, y - height / 2, 0.8);
            let bPoint = lerp(s/2, s/2 + width, 0.2);
            let bPoint1 = lerp(bPoint, s/2 + width, 0.6);

            let rL = x + s/2;
            let rR = rL + width;
            let lR = x - s/2;
            let lL = lR - width;
            let tY = y - height / 2;
            let bY = y + height / 2;

            for(let i = 0; i < 2; i++){
                //TODO
            }
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
            ///*
            let pupilX = lerp(rL, rR, this.faceData.pupilXoffset);
            let pupilY = lerp(bY, tY, this.faceData.pupilYoffset);
            let pupilT = pupilY - this.faceData.pupilH * height /2;
            let pupilB = pupilY + this.faceData.pupilH * height /2;
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
            ellipse(lerp(rL, rR, this.faceData.pupilXoffset), lerp(bY, tY, this.faceData.pupilYoffset), pupilWidth*0.5, pupilWidth*0.5);
            ellipse(lerp(lR, lL, this.faceData.pupilXoffset), lerp(bY, tY, this.faceData.pupilYoffset), pupilWidth*0.5, pupilWidth*0.5);
            //*/
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
            this.TestPoint(x, y);
        }

        DrawMouse(x, y, s){
            this.TestPoint(x + s/2, y + 0);
            this.TestPoint(x - s/2, y + 0);
        }

        DrawEars(x1, x2, y, y1){
            this.TestPoint(this.x + x1, y + 0);
            this.TestPoint(this.x + x2, y1 + 0);
            this.TestPoint(this.x - x1, y + 0);
            this.TestPoint(this.x - x2, y1 + 0);
        }

        TestPoint(x, y){
            stroke(0);
            strokeWeight(2);
            point(x,y);
        }
    }

    class FaceData{
        x = 0;
        y = 0;
        w = 0;
        faceWidth = 0.7;
        faceHeight = 0.9;
        faceCenterY = 0.12;

        eye_inSide_CP1 = 0.4;
        eye_inSide_CP2 = 0.5;
        eye_tPoint_CP1 = 0.6;
        eye_tPoint_CP2 = 0.5;
        eye_tPoint1_CP1 = 0.5;
        eye_tPoint1_CP2 = 0.0;
        eye_outSide_CP1 = 0.9;
        eye_outSide_CP2 = 0.0;
        eye_bPoint_CP1 = 0.5;
        eye_bPoint_CP2 = 0.5;
        eye_bPoint1_CP1 = 0.4;
        eye_bPoint1_CP2 = 0.5;

        pupil_CPX = 0.6;
        pupil_CPY = 0.6;
        pupilXoffset = 0.37;
        pupilYoffset = 0.48;
        pupilW = 0.24;
        pupilH = 1.1;

        constructor(x, y, w){
            this.x = x;
            this.y = y;
            this.w = w;
        }
    }
}

{
    function setup() {
        createCanvas(900, 900);
        Texture01_Setup();

        Texture01();
        noLoop();
    }

    function Mask(){
        rect(20,20, width-40 , height-40);
    }

    function Texture01_Setup(){
        strokeWeight(2);
    }

    let faceDatas = [];
    let faces = [];
    function Texture01(){
        background(255);
        //clip(Mask);
        size = 150;
        row = floor(width / size);
        column = floor(height / size);
        //faceData = new FaceData(size+ size / 2, size + size / 2, size);
        for(let i=0; i < column; i++){
            faceDatas[i] = [];
            faces[i] = [];
            for(let j = 0; j < row; j++){
                faceDatas[i][j] = new FaceData(size * j + size / 2, size * i + size / 2, size);
                //faceData.SetPos(size * j + size / 2, size * i + size / 2, size);
                
                //faceData.RandomHair();
                //faceData.RandomEye();
                faces[i][j] = new Face(faceDatas[i][j]).DrawFace();
            }
        }
    }

    function draw(){
        let noiseLevel = width;
        let noiseScale = 0.2;
        
        if(frameCount % 60 != 0)
            return;
        for(let i = 0; i < 5; i ++){
            let nt = frameCount * noiseScale * (i+1) *13;

            let x = map(noise(nt), 0, 1, 0, width);
            let y = map(noise(nt + 10000), 0, 1, 0, height);
            
            SetReDrawPoint(round(x/size), round(y/size));
        }
    }

    function mousePressed() {
        let col = floor(mouseX / size);
        let rowIdx = floor(mouseY / size);
        SetReDrawPoint(col, rowIdx);
    }

    function SetReDrawPoint(col, rowIdx){
        if (col >= 0 && col < row && rowIdx >= 0 && rowIdx < column) {
            let neighbors = [];

            if (rowIdx > 0) neighbors.push(faceDatas[rowIdx - 1][col]);
            if (rowIdx < column - 1) neighbors.push(faceDatas[rowIdx + 1][col]);
            if (col > 0) neighbors.push(faceDatas[rowIdx][col - 1]);
            if (col < row - 1) neighbors.push(faceDatas[rowIdx][col + 1]);

            let avgData = averageFaceData(neighbors);
            if (avgData) {
                for (let key of Object.keys(avgData)) {
                    if (['x', 'y', 'w'].includes(key)) continue;
                    if (typeof avgData[key] === 'number') {
                        avgData[key] = lerp(faceDatas[rowIdx][col][key], avgData[key], 0.33);
                    }
                }
            }
            faceDatas[rowIdx][col] = new FaceData(size * col + size / 2, size * rowIdx + size / 2, size, avgData);
            faces[rowIdx][col] = new Face(faceDatas[rowIdx][col]).ReDraw();
        }
    }

    function averageFaceData(faceArray) {
        let avg = {};
        let count = faceArray.length;
        for (let key in faceArray[0]) {
            let sum = 0;
            let valid = true;
            
            for (let i = 0; i < count; i++) {
                
                if (typeof faceArray[i][key] === "number") {
                    sum += faceArray[i][key];
                } else {
                    valid = false;
                    break;
                }
            }
            if (valid) {
                avg[key] = sum / count;
            }
        }
        return avg;
    }


    class FaceData{
        x = 0;
        y = 0;
        w = 0;
        faceWidth = 0.5;
        faceHeight = 0.9;
        faceCenterY = 0.5;
        headCurveX = 0.5;
        headCurveY = 0.5;
        foreheadY = 0.5;
        hairPiece = 0.5;
        hairUnitWidth = 0.5;
        hairCross = 0.5;
        hairFlatness = 0.5;
        sideburnsY = 0.5;
        hairColor = color(65, 60, 60);
        hairLineColor = 55;
        
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

        eyebrow_W = 0.5;
        eyebrow_outSide = 0.5;
        eyebrow_inSide = 0.5;
        eyebrow_Ymax = 0.15;
        eyebrow_Ymin = 0.01;

        earX = 0.5;
        earY = 0.5;

        noseY = 0.5;

        mouseY = 0.5;
        mouseW = 0.5;

        constructor(x, y, w, data = null){
            this.x = x;
            this.y = y;
            this.w = w;
            
            if (data) {
                for (let key of Object.keys(data)) {
                    if (['x', 'y', 'w'].includes(key)) continue;
                    if (typeof data[key] === 'number') {
                        this[key] = data[key];
                    }
                }
            }
            else{
                this.RandomFace();
                this.RandomHair();
                this.RandomEye();
                this.RandomPupil();
                this.RandomEyebrow();
            }
        }

        mapRand(base, std, min, max){
            return map(randomGaussian(base, std), 0, 1, min, max, true);
        }

        constrainRand(base, std){
            return constrain(randomGaussian(base, std), 0, 1);
        }

        RandomFace(){
            this.faceWidth = this.mapRand(this.faceWidth, 0.1, 0.6 , 0.8);
            this.faceCenterY = this.mapRand(this.faceCenterY, 0.3, 0.11, 0.2);
            this.headCurveX = this.mapRand(this.headCurveX, 0.25, 0.51 , 0.58);
            this.headCurveY = this.mapRand(this.headCurveY, 0.25, 0.62 , 0.7);
            this.foreheadY = this.mapRand(this.foreheadY, 0.25, 0.3 , 0.4);
            this.earX = this.mapRand(this.earX, 0.25, 0.11 , 0.14);
            this.earY = this.mapRand(this.earY, 0.25, 0.03 , 0.06);
            this.noseY = this.mapRand(this.noseY, 0.25, 0 , 0.05);
            this.mouseY = this.mapRand(this.mouseY, 0.25, -0.02 , 0.03);
            this.mouseW = this.mapRand(this.mouseW, 0.3, 0.3 , 0.9);
        }

        RandomHair(){
            this.hairPiece = floor(this.mapRand(this.hairPiece, 0.25, 2 , 15));
            this.hairUnitWidth = this.mapRand(this.hairUnitWidth, 0.5, 0.01 , 0.2);
            this.hairCross = this.mapRand(this.hairCross, 0.3, 0.01 , 0.1);
            this.hairFlatness = this.constrainRand(this.hairFlatness, 0.3);
            this.sideburnsY = this.mapRand(this.sideburnsY, 0.3, 0, 3);
        }

        RandomEye(){
            this.eye_height_Para = this.mapRand(this.eye_height_Para, 0.4, 0.06 , 0.18);
            this.eye_width_Para = this.constrainRand(this.eye_width_Para, 0.2);
            this.eye_inSide_Para = this.constrainRand(this.eye_inSide_Para, 0.2);
            this.eye_outSide_Para = constrain(randomGaussian(this.eye_outSide_Para, 0.2), pow(this.eye_width_Para, 2) * 0.2 , 1);
            this.eye_tPoint_Para = constrain(randomGaussian(this.eye_tPoint_Para, 0.2), (1-this.eye_inSide_Para) * 0.3 , 1-(1-this.eye_outSide_Para)* 0.4);//1);
            this.eye_tPoint1_Para = constrain(randomGaussian(this.eye_tPoint1_Para, 0.25), 0 , 1-(1-this.eye_outSide_Para)* 0.7);
            this.eye_bPoint_Para = this.constrainRand(this.eye_bPoint_Para, 0.25);
            this.eye_bPoint1_Para = this.constrainRand(this.eye_bPoint1_Para, 0.1);
            this.eye_width_Para = map(this.eye_width_Para, 0 ,1 , 0.2 , 0.3, true);
            this.eye_inSide_CP1 = this.constrainRand(this.eye_inSide_CP1, 0.25);
            this.eye_inSide_CP2 = this.constrainRand(this.eye_inSide_CP2, 0.1);
            this.eye_tPoint_CP1 = this.constrainRand(this.eye_tPoint_CP1, 0.25);
            this.eye_tPoint_CP2 = this.constrainRand(this.eye_tPoint_CP2, 0.25);
            this.eye_tPoint1_CP1 = this.constrainRand(this.eye_tPoint1_CP1, 0.25);
            this.eye_tPoint1_CP2 = this.constrainRand(this.eye_tPoint1_CP2, 0.25);
            this.eye_outSide_CP1 = this.constrainRand(this.eye_outSide_CP1, 0.25);
            this.eye_outSide_CP2 = this.constrainRand(this.eye_outSide_CP2, 0.25);
            this.eye_bPoint_CP1 = this.constrainRand(this.eye_bPoint_CP1, 0.25);
            this.eye_bPoint_CP2 = this.constrainRand(this.eye_bPoint_CP2, 0.1);
            this.eye_bPoint1_CP1 = this.constrainRand(this.eye_bPoint1_CP1, 0.25);
            this.eye_bPoint1_CP2 = this.constrainRand(this.eye_bPoint1_CP2, 0.25);
            this.eyelash_height = this.mapRand(this.eyelash_height, 0.3, 0.02, 0.045);
        }

        RandomPupil(){
            this.pupil_CPX = this.constrainRand(this.pupil_CPX, 0.05);
            this.pupil_CPY = this.constrainRand(this.pupil_CPY, 0.1);
            this.pupilXoffset = this.mapRand(this.pupilXoffset, 0.4, 0.35, 0.45);
            this.pupilYoffset = this.mapRand(this.pupilYoffset, 0.4, 0.45, 0.65);
            this.pupilW = this.mapRand(this.pupilW, 0.3, 0.2 , 0.3);
            this.pupilH = this.mapRand(this.pupilH, 0.3, 0.05, 0.09);
        }

        RandomEyebrow(){
            this.eyebrow_W = this.mapRand(this.eyebrow_W, 0.35, 0.25, 0.33);
            this.eyebrow_outSide = this.mapRand(this.eyebrow_outSide, 0.25, this.eyebrow_Ymin, this.eyebrow_Ymax);
            this.eyebrow_inSide = this.mapRand(this.eyebrow_inSide, 0.25, this.eyebrow_Ymin, this.eyebrow_Ymax);
        }

        SetPos(x, y, w){
            this.x = x;
            this.y = y;
            this.w = w;
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
        faceBoundR;
        faceBoundL;
        faceBoundT;
        faceBoundB;
        constructor(faceData){
            this.faceData = faceData;
            this.x = faceData.x;
            this.y = faceData.y;
            this.w = faceData.w;
            this.faceWidth = this.w * faceData.faceWidth;
            this.faceHeight = this.w * faceData.faceHeight;
            this.centerY = this.y + this.faceHeight * this.faceHeight / this.w * faceData.faceCenterY;
        }

        ReDraw(){
            fill(255);
            noStroke();
            rect(this.x-this.w/2, this.y-this.w/2, this.w, this.w);
            this.DrawFace();
        }

        DrawFace(){
            stroke(0);
            this.faceBoundR = this.x+this.faceWidth/2;
            this.faceBoundL = this.x-this.faceWidth/2;
            this.faceBoundT = this.y-this.faceHeight/2;
            this.faceBoundB = this.y+this.faceHeight/2;
            
            let noseYoffest = (this.y + this.faceHeight / 2 - this.centerY) / 3;
            let mouseYoffest = noseYoffest * 2;
            let faceMostWidthPointY = min(this.centerY - this.faceHeight * 0.1, this.centerY - noseYoffest);
            let EyebrowOutPointXoffest = this.faceWidth/9 * 4;
            let EyeOutPointXofset = this.faceWidth/8*3;
            push();
            
            fill(255, 237, 229);
            let mandibleAngleXoffset = this.faceWidth / 8 * 2.4;//下顎骨
            let earX = curvePoint(this.faceBoundR, this.faceBoundR, this.x + mandibleAngleXoffset, this.x, 0.5);
            let earX1 = curvePoint(this.faceBoundR, earX, this.x + mandibleAngleXoffset, this.x, 0.75);
            this.DrawEars(earX - this.x, earX1 - this.x, this.centerY, this.centerY + (mouseYoffest + noseYoffest)/2);

            beginShape();//head
            fill(this.faceData.hairColor);
            vertex(this.faceBoundL, faceMostWidthPointY-1);
            this.TestDrawBezierVertex(
                this.faceBoundL, faceMostWidthPointY-1,
                this.x-this.faceWidth*this.faceData.headCurveX*random(1,1.09), this.y-this.faceHeight*this.faceData.headCurveY, 
                this.x+this.faceWidth*this.faceData.headCurveX*random(1,1.09), this.y-this.faceHeight*this.faceData.headCurveY,
                this.faceBoundR, faceMostWidthPointY-1);
            endShape();

            beginShape();//forehead
            fill(255, 237, 229);
            stroke(this.faceData.hairColor);
            vertex(this.faceBoundL, faceMostWidthPointY);
            this.TestDrawBezierVertex(
                this.faceBoundL, faceMostWidthPointY,
                lerp(this.faceBoundL,this.faceBoundR, 0.05), this.y-this.faceHeight*this.faceData.foreheadY, 
                lerp(this.faceBoundR,this.faceBoundL, 0.05), this.y-this.faceHeight*this.faceData.foreheadY, 
                this.faceBoundR, faceMostWidthPointY);
            endShape();

            curveTightness(0.2);
            beginShape();//face
            stroke(0);
            fill(255, 237, 229);
            this.DrawTestCurveVertex(this.faceBoundR, this.faceBoundT);
            this.DrawTestCurveVertex(this.faceBoundR, faceMostWidthPointY);
            
            this.DrawTestCurveVertex(this.x + mandibleAngleXoffset, this.centerY + mouseYoffest*0.99);
            this.DrawTestCurveVertex(this.x , this.y + this.faceHeight /2);
            this.DrawTestCurveVertex(this.x - mandibleAngleXoffset, this.centerY + mouseYoffest*0.99);
            this.DrawTestCurveVertex(this.faceBoundL, faceMostWidthPointY);
            this.DrawTestCurveVertex(this.faceBoundL, this.faceBoundT);
            endShape();

            beginShape();//鬢角
            stroke(this.faceData.hairColor);
            fill(this.faceData.hairColor);
            vertex(this.faceBoundL, faceMostWidthPointY);
            let hair_x1 = curvePoint(this.faceBoundL,this.faceBoundL,this.x - mandibleAngleXoffset,this.x, 0.4);
            let hair_y1 = curvePoint(this.faceBoundT,faceMostWidthPointY,this.centerY + mouseYoffest*0.99,this.y + this.faceHeight /2, 0.4);
            vertex(hair_x1, hair_y1);
            vertex(
                bezierPoint(this.faceBoundL,this.faceBoundL,this.faceBoundR,this.faceBoundR, 0.2),
                bezierPoint(faceMostWidthPointY,this.y-this.faceHeight*0.52,this.y-this.faceHeight*0.52,faceMostWidthPointY, 0.2)
            );
            endShape();
            beginShape();
            fill(this.faceData.hairColor);
            noStroke();
            vertex(this.faceBoundR, faceMostWidthPointY);
            let hair_x2 = curvePoint(this.faceBoundR,this.faceBoundR,this.x + mandibleAngleXoffset,this.x, 0.4);
            let hair_y2 = curvePoint(this.faceBoundT,faceMostWidthPointY,this.centerY + mouseYoffest*0.99,this.y + this.faceHeight /2, 0.4);
            vertex(hair_x2, hair_y2);
            vertex(
                bezierPoint(this.faceBoundR,this.faceBoundR,this.faceBoundL,this.faceBoundL, 0.2),
                bezierPoint(faceMostWidthPointY,this.y-this.faceHeight*0.52,this.y-this.faceHeight*0.52,faceMostWidthPointY, 0.2)
            );
            endShape();

            ///*
            this.DrawEyes(this.x, this.centerY, this.faceWidth/4);
            let EyebrowInside = this.centerY - this.faceHeight*(this.faceData.eye_height_Para + 2*this.faceData.eyelash_height + 2*this.faceData.eyebrow_inSide)/2;
            let EyebrowOutSide = this.centerY - this.faceHeight*(this.faceData.eye_height_Para + 2*this.faceData.eyelash_height + 2*this.faceData.eyebrow_outSide)/2;
            this.DrawNose(this.x, this.centerY + noseYoffest);
            this.DrawMouse(this.x, this.centerY + mouseYoffest, this.faceWidth/4);
            this.DrawHair(
                min(EyebrowInside, EyebrowOutSide),
                max(EyebrowInside, EyebrowOutSide),
                this.centerY - this.faceHeight*(this.faceData.eye_height_Para + 2*this.faceData.eyelash_height)/2,
                this.centerY + (this.faceHeight * this.faceData.eye_height_Para)/2,
                faceMostWidthPointY
            )
            this.DrawEyebrow(this.x, EyebrowInside, EyebrowOutSide, this.faceWidth/4.5);
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
            pupilWidth*=0.6;
            ellipse(lerp(rL, rR, this.faceData.pupilXoffset), lerp(bY, tY, this.faceData.pupilYoffset), pupilWidth, pupilWidth);
            ellipse(lerp(lR, lL, this.faceData.pupilXoffset), lerp(bY, tY, this.faceData.pupilYoffset), pupilWidth, pupilWidth);
            stroke(255);
            strokeWeight(pupilWidth*0.7);
            let hightlightY = lerp(this.centerY, bezierPoint(inSide,lerp(inSide, tY, this.faceData.eye_inSide_CP1),tY,tY, 0.5), 0.6);
            point(lerp(rL, rR, this.faceData.pupilXoffset)-pupilWidth, hightlightY);
            point(lerp(lR, lL, this.faceData.pupilXoffset)-pupilWidth, hightlightY);
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

        DrawEyebrow(x, y, y1, s){
            let insideX = s/2;
            let outsideX = insideX + this.faceWidth * this.faceData.eyebrow_W;
            let Xcontrol = lerp(insideX, insideX + this.faceWidth * this.faceData.eye_width_Para, this.faceData.eye_tPoint_Para*0.5);
            let Ycontrol = lerp(min(y, y1) - this.faceHeight * 0.02, (y+y1)/2 - this.faceHeight * 0.03, pow(norm(abs(y-y1), 0, (this.faceData.eyebrow_Ymax-this.faceData.eyebrow_Ymin)*this.faceHeight), 2));

            stroke(45);
            strokeWeight(2);
            noFill();
            for(let i = 0; i < 2; i++){
                bezier(
                x + insideX, y, 
                x + (insideX + outsideX)*1/3, Ycontrol,
                x + (insideX + outsideX)*2/3, Ycontrol,
                x + outsideX, y1);
                insideX *= -1;
                outsideX *= -1;
                Xcontrol *= -1;
            }
        }

        DrawNose(x, y){
            stroke(50, 20, 20);
            strokeWeight(2.5);
            point(x,y+this.faceHeight*this.faceData.noseY);
        }

        DrawMouse(x, y, s){
            s = s * 0.5 * this.faceData.mouseW;
            noFill();
            stroke(60, 30, 30);
            strokeWeight(2);
            point(x + s, y + 0);
            point(x - s, y + 0);

            strokeWeight(1.5);
            bezier(
                x + s, y, 
                lerp(x+s, x-s, 0.2), y+this.faceHeight * this.faceData.mouseY,
                lerp(x-s, x+s, 0.2), y+this.faceHeight * this.faceData.mouseY,
                x - s, y);
                
            stroke(255, 237, 229);
            strokeWeight(2);
            point(x, bezierPoint(y, y+this.faceHeight * this.faceData.mouseY, y+this.faceHeight * this.faceData.mouseY, y, 0.5));
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

        DrawHair(eyebrow1, eyebrow2, eye1, eye2, faceMostWidthPointY){
            let hairT_X = [];
            let hairT_Y = [];
            let hairB_X = [];
            let hairB_Y = [];

            for(let i = 0; i< this.faceData.hairPiece+3; i++){
                let r = constrain(randomGaussian(1/(this.faceData.hairPiece+2)*i, 0.02),0.2,0.8);
                let xP = bezierPoint(this.faceBoundL, this.faceBoundL, this.faceBoundR, this.faceBoundR, r);
                let yP = bezierPoint(
                    faceMostWidthPointY, 
                    this.y-this.faceHeight*lerp(this.faceData.foreheadY,this.faceData.headCurveY, 0.2), 
                    this.y-this.faceHeight*lerp(this.faceData.foreheadY,this.faceData.headCurveY, 0.2), 
                    faceMostWidthPointY, r);
                hairT_X.push(xP);
                hairT_Y.push(yP);
            }

            let sideX = random(0.1, 0.15);
            let sideY = this.faceData.sideburnsY;
            hairB_X.push(bezierPoint(
                lerp(this.faceBoundL, this.faceBoundR, 0.0), 
                lerp(this.faceBoundL, this.faceBoundR, 0.3), 
                lerp(this.faceBoundR, this.faceBoundL, 0.3), 
                lerp(this.faceBoundR, this.faceBoundL, 0.0), 
                sideX));
            hairB_Y.push(faceMostWidthPointY + sideY * this.faceHeight/8);
            for(let i = 0; i< this.faceData.hairPiece; i++){
                let r = constrain(randomGaussian(1/(this.faceData.hairPiece+1)*(i+1), this.faceData.hairCross),0,1);
                let xP = bezierPoint(
                    lerp(this.faceBoundL, this.faceBoundR, 0.0), 
                    lerp(this.faceBoundL, this.faceBoundR, 0.3), 
                    lerp(this.faceBoundR, this.faceBoundL, 0.3), 
                    lerp(this.faceBoundR, this.faceBoundL, 0.0), 
                    r);
                let rControlP = random(-1, 1);
                let rAnchorP = random(-1, 1);
                let yP = bezierPoint(
                    faceMostWidthPointY + rAnchorP * this.faceHeight/8,
                    faceMostWidthPointY + rControlP * this.faceHeight/8, 
                    faceMostWidthPointY + lerp(random(-1, 1), rControlP, this.faceData.hairFlatness*this.faceData.hairFlatness) * this.faceHeight/8, 
                    faceMostWidthPointY + lerp(random(-1, 1), rAnchorP, this.faceData.hairFlatness*this.faceData.hairFlatness) * this.faceHeight/8, 
                    r);
                hairB_X.push(xP);
                hairB_Y.push(yP);
            }
            hairB_X.push(bezierPoint(
                lerp(this.faceBoundR, this.faceBoundL, 0.0), 
                lerp(this.faceBoundR, this.faceBoundL, 0.3), 
                lerp(this.faceBoundL, this.faceBoundR, 0.3), 
                lerp(this.faceBoundL, this.faceBoundR, 0.0), 
                sideX));
            hairB_Y.push(faceMostWidthPointY + sideY * this.faceHeight/8);
            
            for(let i = 0; i< hairT_X.length-1; i++){
                if(i===0)
                    this.DrawSideHair(hairT_X[i], hairT_Y[i], hairT_X[i+1], hairT_Y[i+1], hairB_X[i], hairB_Y[i]);
                else if(i === hairT_X.length-2)
                    this.DrawSideHair(hairT_X[i+1], hairT_Y[i+1], hairT_X[i], hairT_Y[i], hairB_X[i], hairB_Y[i]);
                else
                    this.DarwUnitHair(hairT_X[i], hairT_Y[i], hairT_X[i+1], hairT_Y[i+1], hairB_X[i], hairB_Y[i]);
            }
        }

        DarwUnitHair(tx, ty, tx1, ty1, bx, by){
            fill(this.faceData.hairColor);
            stroke(this.faceData.hairLineColor);
            beginShape();
            vertex(tx, ty);
            this.TestDrawBezierVertex(
                tx, ty,
                tx+(tx-this.x)*0.2, lerp(ty, by, 0.3), 
                constrain(bx+(tx-this.x)*0.2, this.faceBoundL, this.faceBoundR), lerp(by, ty, 0.0), 
                bx, by);
            let w = random(0, this.faceData.hairUnitWidth);
            this.TestDrawBezierVertex(
                bx, by, 
                bx, by,
                min(bx+min(w*this.faceWidth, tx1 - tx), this.faceBoundR), by,
                min(bx+min(w*this.faceWidth, tx1 - tx), this.faceBoundR), by
                );
            this.TestDrawBezierVertex(
                min(bx+min(w*this.faceWidth, tx1 - tx), this.faceBoundR), by, 
                constrain(bx+min(w*this.faceWidth, tx1 - tx)+(tx1-this.x)*0.2, this.faceBoundL, this.faceBoundR), lerp(by, ty1, 0.3),
                constrain(tx1+(tx1-this.x)*0.2, this.faceBoundL, this.faceBoundR), lerp(ty1, by, 0.0),
                tx1, ty1
                );
            endShape();
        }

        DrawSideHair(tx, ty, tx1, ty1, bx, by){
            fill(this.faceData.hairColor);
            stroke(this.faceData.hairLineColor);
            beginShape();
            vertex(tx, ty);
            this.TestDrawBezierVertex(
                tx, ty,
                tx+(tx-this.x)*0.2, lerp(ty, by, 0.5),
                bx+(tx-this.x)*0.2, lerp(by, ty, 0.3), 
                bx, by);
            this.TestDrawBezierVertex(
                bx, by, 
                (tx+tx1)/2, lerp(by, ty1, 0.6),
                (tx+tx1)/2, lerp(ty1, by, 0.3),
                tx1, ty1
                );
            endShape();
        }
        
        TestPoint(x, y){
            stroke(255,0,0);
            strokeWeight(3);
            point(x,y);
        }
    }
}

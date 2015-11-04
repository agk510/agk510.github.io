function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
 
  fill('white');
  var i;  
  for (i = 0; i < 9; i++) {
  	ellipse(i * 50 + 50, 125, 50, 50);
  	ellipse (i * 50 + 50, 250, 50, 50);
  }

  var j;
  for (j = 0; j < 5; j++) {
  	ellipse(j * 50 + 50, 175, 50, 50);
    ellipse (j * 50 + 50, 300, 50, 50);
  }

  var k;
  for (k = 0; k < 12; k++) {
  	ellipse (k * 50 + 50, 375, 50, 50);
  }

  ellipse (50, 425, 50, 50); 


  var sec = second();
  var onesSec = sec % 10;
  var tensSec = Math.trunc(sec / 10);

   if (onesSec !== 0) {
     fill('red');
     ellipse(onesSec*50, 125, 50, 50);  
  }

  if (tensSec !== 0) {
    fill('black');
    ellipse(tensSec*50, 175, 50, 50);   
  }
 
  var minu = minute();
  var onesMin = minu % 10;
  var tensMin = Math.trunc(minu/10);
  
  if (onesMin !== 0) {
    fill('blue');
    ellipse(onesMin*50, 250, 50, 50);  
  }

  if (tensMin !== 0) {
    fill('black');
    ellipse(tensMin*50, 300, 50, 50);   
  }

  var hr = hour();
  var PM = false;
  var twelve = hr;
  
  if (hr < 12) {
    PM = false;
  }
  else {
    PM = true;
    twelve = hr - 12;
  }
  

  fill('yellow');
  ellipse(twelve*50, 375, 50, 50);
 
  if (PM) {
    fill('black');
    ellipse(50, 425, 50, 50);  
  }


}


// TO DO: add descriiptions of each global var
var table;
var edu = [];
var jobcat = [];
var salary = [];
var salbegin = [];
var jobtime = [];
var prevexp = [];
var race = [];
var age = [];
var gender = [];

var canvas;
var sectionWidth = 500;

function preload() {
    table = loadTable("http://agk510.github.io/finalproject/libraries/empdat.csv", "csv", "header"); // load source, parse when done
}

function setup() {
	  canvas = createCanvas(sectionWidth*6, 1200);
    canvas.position(0,80);
    
    var title = createDiv("<b>SAMPLE TITLE<b>");
    title.id("title");
    title.position("fixed"); // TO DO: keep playing with this to ensure the buttons appear
    
    // TO DO: create section titles to link buttons to 
    // var sec1 = createElement("h1", "Title of Section 1");
    // sec1.position(500,0);
    // sec1.id;
    
    ellipseMode(CENTER);
    textAlign(CENTER);
    parseSource();
}

function draw() {
    var bgcolor = '#e5f0ff'; // background strip color
    var Wcolor = '#80ccff'; // color representing women in all graphs/charts
    var Mcolor = '#006cff'; // color reporesenting men in all graphs/charts
		var sectionindex = 0;
		var	pieX = 150;
		var pieY = 600;
		var pieW = 200;
		var pieH = 200;
		var graphX = 50;
		var graphY = 700;
		var graphW = 50;
		var graphH = 200;
	
		
    // create white background stripe for contextual information section
    fill(255);
    noStroke();
    rect(0, 0, width, 300);
    
    // create blue background stripe for charts and graphs sections
    fill(bgcolor);
  	rect(0, 400, width, 400);
  	
  	// create white background stripe for additional info/explanation sections
  	fill(255);
  	rect(0, 800, width, 300);
    
    // new section for first dataset: overall gender breakdown
    push();
    translate(sectionWidth*sectionindex,0);
    sectionindex++;
   
   // calculate percentages of women and men in firm
    var men = countType(gender, 'Male');
    var women = countType(gender, 'Female');
    var percMen = men / (men + women);
    var percWomen = women / (men + women);

   	//draw pie chart to show overall gender breakdown in firm
   	noStroke();
   	fill(Wcolor);
   	arc(pieX, pieY, pieW, pieH, -HALF_PI, -HALF_PI + percWomen*TWO_PI, PIE);
   	text(nf(percWomen*100, 2, 1) + "% Women", pieX, pieY + pieH/2 + 20);
    fill(Mcolor);
    arc(pieX, pieY, pieW, pieH, -HALF_PI + percWomen*TWO_PI, -HALF_PI + percWomen*TWO_PI + percMen*TWO_PI, PIE);
  	text(nf(percMen*100, 2, 1) + "% Men", pieX, pieY + pieH/2 +40); // create div instead?
    
    pop();
    
    
    // new section for average salaries by gender
    push();
    translate(sectionWidth*sectionindex, 0);
    sectionindex++;
  
    //calculate average salary for each gender
    var womenSal = [];
    womenSal = getArray(salary, gender, "Female");
    var avgWomanSal = average(womenSal);
    var menSal = [];
    menSal = getArray(salary, gender, "Male");
    var avgManSal = average(menSal);
    
   	// draw bar graph for average salaries
    noStroke();
    fill(Wcolor);
    rect(graphX, graphY, graphW, -map(avgWomanSal, 0, 50000, 0, graphH));    
    text("Current salary (avg): $" + nf(avgWomanSal, 0, 2), graphX + 50, graphY + 20);
    fill(Mcolor);
    rect(graphX +70, graphY, graphW, -map(avgManSal, 0, 50000, 0, graphH));
    text("Current salary (avg): $" + nf(avgManSal, 0, 2), graphX + 50, graphY + 40);

      
   // calculate average beginning salary for each gender
    var begW = [];
    begW = getArray(salbegin, gender, "Female");
    var avgBegW = average(begW);
    var begM = [];
    begM = getArray(salbegin, gender, "Male");
    var avgBegM = average(begM);

    // draw bargraph for avg beginning salaries
    noStroke();
    fill(Wcolor);
    rect(sectionWidth/2 + graphX, graphY, graphW, -map(avgBegW, 0, 50000, 0, graphH));    
    text("Starting salary (avg): $" + nf(avgBegW, 0, 2), sectionWidth/2 + graphX + 50, graphY + 20);
    fill(Mcolor);
    rect(sectionWidth/2 + graphX + 70, graphY, graphW, -map(avgBegM, 0, 50000, 0, graphH));
    text("Starting salary (avg): $" + nf(avgBegM, 0, 2), sectionWidth/2 + graphX + 50, graphY + 40);
    
    pop();
 
    // new section for job categories
    push();
    translate(sectionWidth*sectionindex, 0);
    sectionindex++;

    // calculate percentages of men/women by job category
    var numWmanagers = countSubtype(gender, 'Female', jobcat, 'Manager');
    var numMmanagers = countSubtype(gender, 'Male', jobcat, 'Manager');
    var percMmanagers = numMmanagers / (numWmanagers + numMmanagers);
    var percWmanagers = numWmanagers / (numWmanagers + numMmanagers);

    var numWclerical = countSubtype(gender, 'Female', jobcat, 'Clerical');
    var numMclerical = countSubtype(gender, 'Male', jobcat, 'Clerical');
    var percWclerical = numWclerical / (numWclerical + numMclerical);
    var percMclerical = numMclerical / (numWclerical + numMclerical);
 
    var numWcustodial = countSubtype(gender, 'Female', jobcat, 'Custodial');
    var numMcustodial = countSubtype(gender, 'Male', jobcat, 'Custodial');
    var percWcustodial = numWcustodial / (numWcustodial + numMcustodial);
    var percMcustodial = numMcustodial / (numWcustodial + numMcustodial);

   // draw pie charts for men/women by job category
   noStroke();
   fill(Wcolor);
   arc(pieX pieY, pieW, pieH, -HALF_PI, -HALF_PI + percWmanagers*TWO_PI, PIE);
   text(nf(percWmanagers*100, 2, 1) + "% Female Managers", pieX, pieY + pieH/2 + 20);
   fill(Mcolor);
   arc(pieX, pieY, pieW, pieH, -HALF_PI + percWmanagers*TWO_PI, -HALF_PI + percWmanagers*TWO_PI + percMmanagers*TWO_PI, PIE);
   text(nf(percMmanagers*100, 2, 1) + "% Male Managers", pieX, pieY + pieH/2 + 40); // create div instead
    
   // fill(Wcolor);
   // arc(2*width/4, sectionWidth/2, sectionWidth/2, sectionWidth/2, -HALF_PI, -HALF_PI + percWclerical*TWO_PI, PIE);
   // text(nf(percWclerical*100, 2, 1) + "% Female Clericals", 2*width/4, sectionWidth - sectionWidth/4 + 20);
   // fill(Mcolor);
   // arc(2*width/4, sectionWidth/2, sectionWidth/2, sectionWidth/2, -HALF_PI + percWclerical*TWO_PI, -HALF_PI + percWclerical*TWO_PI + percMclerical*TWO_PI, PIE);
   // text(nf(percMclerical*100, 2, 1) + "% Male Clericals", 2*width/4, sectionWidth - sectionWidth/4+40); // create div instead

   // fill(Wcolor);
   // arc(3*width/4, sectionWidth/2, sectionWidth/2, sectionWidth/2, -HALF_PI, -HALF_PI + percWcustodial*TWO_PI, PIE);
   // text(nf(percWcustodial*100, 2, 1) + "% Female Custodials", 3*width/4, sectionWidth - sectionWidth/4 + 20);
   // fill(Mcolor);
   // arc(3*width/4, sectionWidth/2, sectionWidth/2, sectionWidth/2, -HALF_PI + percWcustodial*TWO_PI, -HALF_PI + percWcustodial*TWO_PI + percMcustodial*TWO_PI, PIE);
   // text(nf(percMcustodial*100, 2, 1) + "% Male Custodials", 3*width/4, sectionWidth - sectionWidth/4+40); // create div instead

   // pop();

   // // temporary section break -- take out when buttons become active
   // push();
   // translate(0, sectionWidth*sectionindex);
   // sectionindex++;
   // //noStroke();

   // //calculate avg salaries for men and women in different job categories
   // var Wmanagers = [];
   // Wmanagers = getArray(salary, gender, "Female", jobcat, "Manager");
   // var avgWmanager = average(Wmanagers); // average salary for female managers

   // var Mmanagers = [];
   // Mmanagers = getArray(salary, gender, "Male", jobcat, "Manager");
   // var avgMmanager = average(Mmanagers); // average salary for male managers

   // var Wclericals = [];
   // Wclericals = getArray(salary, gender, "Female", jobcat, "Clerical");
   // var avgWclerical = average(Wclericals); // average salaary for female clericals

   // var Mclericals = [];
   // Mclericals = getArray(salary, gender, "Female", jobcat, "Clerical");
   // var avgMclerical = average(Mclericals); // average salary for male clericals

   // var Wcustodials = [];
   // Wcustodials = getArray(salary, gender, "Female", jobcat, "Custodial");
   // var avgWcustodial = average(Wcustodials); // average salary for female custodials

   // var Mcustodials = [];
   // Mcustodials = getArray(salary, gender, "Male", jobcat, "Custodial");
   // var avgMcustodial = average(Mcustodials); // average salary for male custodials

    
   // // draw bar graphs for men/women salaries by job category
   // noStroke();
   // fill(Wcolor);
   // rect(width/4, sectionWidth-sectionWidth/4, 50, -map(avgWmanager, 0, 50000, 0, sectionWidth/2));    
   // text("Manager salary (avg): $" + nf(avgWmanager, 0, 2), width/4, sectionWidth-sectionWidth/4+20);
   // fill(Mcolor);
   // rect(width/4 + 70, sectionWidth-sectionWidth/4, 50, -map(avgMmanager, 0, 50000, 0, sectionWidth/2));
   // text("Manager salary (avg): $" + nf(avgMmanager, 0, 2), width/4, sectionWidth-sectionWidth/4+40);

   // fill(Wcolor);
   // rect(2*width/4, sectionWidth-sectionWidth/4, 50, -map(avgWclerical, 0, 50000, 0, sectionWidth/2));    
   // text("Clerical salary (avg): $" + nf(avgWclerical, 0, 2), 2*width/4, sectionWidth-sectionWidth/4+20);
   // fill(Mcolor);
   // rect(2*width/4 + 70, sectionWidth-sectionWidth/4, 50, -map(avgMclerical, 0, 50000, 0, sectionWidth/2));
   // text("Clerical salary (avg): $" + nf(avgMclerical, 0, 2), 2*width/4, sectionWidth-sectionWidth/4+40);

   // fill(Wcolor);
   // rect(3*width/4, sectionWidth-sectionWidth/4, 50, -map(avgWcustodial, 0, 50000, 0, sectionWidth/2));    
   // text("Custodial salary (avg): $" + nf(avgWcustodial, 0, 2), 3*width/4, sectionWidth-sectionWidth/4+20);
   // fill(Mcolor);
   // rect(3*width/4 + 70, sectionWidth-sectionWidth/4, 50, -map(avgMcustodial, 0, 50000, 0, sectionWidth/2));
   // text("Custodial salary (avg): $" + nf(avgMcustodial, 0, 2), 3*width/4, sectionWidth-sectionWidth/4+40);

   // pop();

   // //new section for race
   // push();
   // translate(0, sectionWidth*sectionindex);
   // sectionindex++;
   // //noStroke();
   // fill(255);
   // rect(0, 0, width, sectionWidth);
    
   // //calculate avg salaries for white vs. non-white men and women
   // var PoCwomen = [];
   // PoCwomen = getArray(salary, race, "Yes", gender, "Female");
   // var avgPoCw = average(PoCwomen); // average current salary for women of color
    
   // var PoCmen = [];
   // PoCmen = getArray(salary, race, "Yes", gender, "Male");
   // var avgPoCm = average(PoCmen); // average current salary for men of color

   // var whiteWomen = [];
   // whiteWomen = getArray(salary, race, "No", gender, "Female");
   // var avgwhiteW = average(whiteWomen); // average current salary for white women

   // var whiteMen = [];
   // whiteMen = getArray(salary, race, "No", gender, "Male");
   // avgwhiteM = average(whiteMen); //average current salary for white men

   // // draw bar graphs for men/women salaries by race
   // noStroke();
   // fill(Wcolor);
   // rect(width-width/2, sectionWidth-sectionWidth/4, 50, -map(avgPoCw, 0, 50000, 0, sectionWidth/2));    
   // text("Person of color salary (avg): $" + nf(avgPoCw, 0, 2), width-width/2, sectionWidth-sectionWidth/4+20);
   // fill(Mcolor);
   // rect(width-width/2+70, sectionWidth-sectionWidth/4, 50, -map(avgPoCm, 0, 50000, 0, sectionWidth/2));
   // text("Person of color salary (avg): $" + nf(avgPoCm, 0, 2), width-width/2, sectionWidth-sectionWidth/4+40);

   // noStroke();
   // fill(Wcolor);
   // rect(width-width/4, sectionWidth-sectionWidth/4, 50, -map(avgwhiteW, 0, 50000, 0, sectionWidth/2));    
   // text("White salary (avg): $" + nf(avgwhiteW, 0, 2), width-width/4, sectionWidth-sectionWidth/4+20);
   // fill(Mcolor);
   // rect(width-width/4+70, sectionWidth-sectionWidth/4, 50, -map(avgwhiteM, 0, 50000, 0, sectionWidth/2));
   // text("White salary (avg): $" + nf(avgwhiteM, 0, 2), width-width/4, sectionWidth-sectionWidth/4+40);

   // pop();


   // push();
   // translate(0, sectionWidth*sectionindex);
   // sectionindex++;
   // //noStroke();
   // fill(255);
   // rect(0, 0, width, sectionWidth);

	var maxSal;
	if (findmax(womenSal) > findmax(menSal))
		maxSal = findmax(womenSal);
	else
		maxSal = findmax(menSal);
	
	push();
	translate(900, 750);
	var eduW = [];
	eduW = getArray(edu, gender, "Female");
	var eduM = [];
	eduM = getArray(edu, gender, "Male");
	var maxEdu;
	if (findmax(eduW) > findmax(eduM))
		maxEdu = findmax(eduW);
	else
		maxEdu = findmax(eduM);

  stroke(Mcolor);
  plot(eduM, menSal, maxEdu, maxSal);
  stroke(Wcolor);
  plot(eduW, womenSal, maxEdu, maxSal);
	pop();


  push();
  translate (1500, 750);
  var agesW = [];
  agesW = getArray(age, gender, "Female");
  var agesM = [];
  agesM = getArray(age, gender, "Male");
  var maxAge;
	if (findmax(agesW) > findmax(agesM))
		maxAge = findmax(agesW);
	else
		maxAge = findmax(agesM);
  
  
  stroke(Mcolor);
  plot(agesM, menSal, maxAge, maxSal);
  stroke(Wcolor);
  plot(agesW, womenSal, maxAge, maxSal);
  pop();

	
}

function parseSource() {
  for (var i = 0; i < table.getRowCount(); i++){
    edu[i] = Number(table.get(i,1));
    jobcat[i] = table.get(i,2);
    salary[i] = Number(table.get(i,3));
    salbegin[i] = Number(table.get(i,4));
    jobtime[i] = Number(table.get(i,5));
    prevexp[i] = Number(table.get(i,6));
    race[i] = table.get(i,7);
    age[i] = Number(table.get(i,8));
    gender[i] = table.get(i,9);
  }
}

function average(array) {   // takes the average of the values in the array (interval-ratio numbers only)
    var sum = 0;
    for (var i = 0; i < array.length; i++)
        sum += array[i];
    
    var avg = (sum / array.length);

    return avg;
}

function countType (array, type) {  // returns the number of occurrences of type in array
    var count = 0;
    for (var i = 0; i < array.length; i++)
        if (array[i] === type)
            count++;

    return count;
}

function countSubtype (array, type, subarray, subtype) { // returns the number of occurrences of subtype that correspond with type
    var subcount = 0;
    for (var i = 0; i < array.length; i++)
        if (array[i] === type && subarray[i] === subtype)
                subcount++;

    return subcount;
}

function findmin (array) { // returns the minimum value in the array
    var min = array[0];
    for (var i = 1; i < array.length; i++)
        if (array[i] < min)
            min = array[i];

    return min;
}

function findmax (array) { // returns the maximum value in the array
    var max = array[0];
    for (var i = 1; i < array.length; i++)
        if (array[i] > max)
            max = array[i];

    return max;
}

// function percentageBreakdown(array, cat1, cat2, cat3) { //
//     var sum1 = 0;
//     var sum2 = 0;
//     var sum3 = 0;

//     for (var i; i < array.length; i++) {
//         if (array[i] === cat1)
//             sum1++;
//         else if (array[i] === cat2)
//             sum2++;
//         else if (array[i] === cat3)
//             sum3++;   
//     }

//     var allperc = [sum1 / (sum1 + sum2 + sum3), sum2 / (sum1 + sum2 + sum3), sum3 / (sum1 + sum2 + sum3)];

//     return allperc;

// }

// function percentageBreakdown(array, cat1, cat2) { //
//     var sum1 = 0;
//     var sum2 = 0;

//     for (var i = 0; i < array.length; i++) {
//         if (array[i] === cat1)
//             sum1++;
//         else if (array[i] === cat2)
//             sum2++;
//     }

//     var allperc = [sum1 / (sum1 + sum2), sum2 / (sum1 + sum2)];

//     return allperc;

// }

function getArray(array, subarray, subtype, subarray2, subtype2) { // something is wrong with the filtering, returns same array for white women and men and for PoC women and men
    var newarray = [];
    for (var i = 0; i < subarray.length; i++)
        if (subarray[i] === subtype && subarray2[i] === subtype2)
            append(newarray, array[i]);
    
    return newarray;
}

function getArray(array, subarray, subtype) {
    var newarray = [];
    for (var i = 0; i < subarray.length; i++)
        if (subarray[i] === subtype)
            append(newarray, array[i]);
    
    return newarray;
}

function plot(xarray, yarray, xmax, ymax) {
	var xcoords = [];
	var ycoords = [];
	var graphwidth = 500; 
	var graphheight = 300;
	
	for (var i = 0; i < xarray.length; i++)
		append(xcoords, map(xarray[i], 0, xmax, 0, graphwidth));
	
	for (var j = 0; j < yarray.length; j++)
		append(ycoords, map(yarray[j], 0, ymax, 0, graphheight));
	
	
	for (var k = 0; k < xcoords.length; k++) { 
		noFill();
		strokeWeight(3);
 		ellipse(xcoords[k], -ycoords[k], 10, 10);
	}
	
	strokeWeight(1);
	stroke(0);
	line(0, 0, graphwidth, 0);
	line(0, 0, 0, -graphheight);
	
	fill(0);
	textSize(15);
	text(xmax, graphwidth, 20);
	text("$" + nf(ymax, 0, 0), -30, -graphheight);
	return;
}
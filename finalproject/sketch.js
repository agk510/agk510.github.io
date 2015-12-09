// TO DO: add descriiptions of each global var
var canvas;
var table;

var edu = [];
var jobcat = [];
var salary = [];
var salbegin = [];
var jobtime = [];
var prevexp = []; // DECIDE WHETHER TO USE PREVEXP OR DELETE UNECESSARY VAR
var race = [];
var age = [];
var gender = [];

function preload() {
    table = loadTable("http://agk510.github.io/finalproject/libraries/empdat.csv", "csv", "header"); // load source, parse when done
}

function setup() {
	  window.resizeTo(400, 800); // TO DO: determine best viewing size for scrolling
    canvas = createCanvas(6000, 700);
    canvas.position(0,80);
    
    var toptitle = createDiv("Is this gender discrimination?");
    toptitle.parent("title");
    
    // section title bookmarks to link buttons to 
    var sec1 = createDiv("Overall Breakdown by Gender");
    sec1.position(500,100);
    sec1.id("sec1");
    sec1.class("bookmarks");

    var sec2 = createDiv("Breakdown by Job Type");
    sec2.position(1300,100);
    sec2.id("sec2");
    sec2.class("bookmarks");
   
    var sec3 = createDiv("Breakdown by Race");
    sec3.position(2600,100);
    sec3.id("sec3");
    sec3.class("bookmarks");

    var sec4 = createDiv("Average Salary by Education");
    sec4.position(3775,100);
    sec4.id("sec4");
    sec4.class("bookmarks");

    var sec5 = createDiv("Average Salary by Age");
    sec5.position(4600,100);
    sec5.id("sec5");
    sec5.class("bookmarks");

    
    
    // create divs for text    
    var intro = createDiv("In 1989, a company was sued for gender discrimination in employee salaries.");
    intro.id("heading");
    intro.class("description");
    intro.position(0, 100);
    
    var subintro = createDiv("The following information is taken from data released by the company during the lawsuit. The company's identity remains unknown.");
    subintro.id("subheading");
    subintro.class("description");
    subintro.position(0, 350);
    
    var scrolldir = createDiv("Scroll to the right to take a closer look at whether this company was indeed paying female employees less than male employees.");
    scrolldir.id("details");
    scrolldir.class("description");
    scrolldir.position(0, 500);

  // TO DO: create more divs for more text
    
    ellipseMode(CENTER);
    textAlign(CENTER);
    parseSource();
}

function draw() {
    var bgcolor = '#e5f0ff'; // background strip color
    var Wcolor = '#80ccff'; // color representing women in all graphs/charts
    var Mcolor = '#006cff'; // color reporesenting men in all graphs/charts
    
    background(255);
    
    // create blue background stripe for charts and graphs section
    fill(bgcolor);
    noStroke();
    rect(0, 0, width, 400);

   // order of canvas drawings
   // 1. overall gender pie chart
   // 2. overall gender beginning salary graph
   // 3. overall gender current salary graph
   // 4. job type pie charts
   // 5. job type salary graphs
   // 6. race pie charts
   // 7. race salary graphs
   // 8. education scatter plot
   // 9. age scatter plot
   // 10. conclusion - what do you think?

    // 1. calculate percentages of women and men in firm
    var men = countType(gender, "Male");
    var women = countType(gender, "Female");
    var percMen = men / (men + women);
    var percWomen = women / (men + women);

    push();
    translate(600, 200);
    pie(percWomen, Wcolor, percMen, Mcolor);
    pop();

    // 2. calculate average beginning salary for each gender
    var begW = [];
    begW = getArray(salbegin, gender, "Female");
    var avgBegW = average(begW);
    var begM = [];
    begM = getArray(salbegin, gender, "Male");
    var avgBegM = average(begM);

    push();
    translate(800, 300);
    bar(avgBegW, Wcolor, avgBegM, Mcolor, 50000);
    pop();

    // 3. calculate average current salaries for men and women
    var womenSal = [];
    womenSal = getArray(salary, gender, "Female");
    var avgWomanSal = average(womenSal);
    var menSal = [];
    menSal = getArray(salary, gender, "Male");
    var avgManSal = average(menSal);
  
    push();
    translate(1000, 300);
    bar(avgWomanSal, Wcolor, avgManSal, Mcolor, 50000);
    pop();

    // 4. calculate percentages of men/women by job category
    var numWmanagers = countSubtype(gender, 'Female', jobcat, 'Manager');
    var numMmanagers = countSubtype(gender, 'Male', jobcat, 'Manager');
    var percMmanagers = numMmanagers / (numWmanagers + numMmanagers);
    var percWmanagers = numWmanagers / (numWmanagers + numMmanagers);

    push();
    translate(1400, 200);
    pie(percWmanagers, Wcolor, percMmanagers, Mcolor);
    pop();

    var numWclerical = countSubtype(gender, 'Female', jobcat, 'Clerical');
    var numMclerical = countSubtype(gender, 'Male', jobcat, 'Clerical');
    var percWclerical = numWclerical / (numWclerical + numMclerical);
    var percMclerical = numMclerical / (numWclerical + numMclerical);
 
    push();
    translate(1650, 200);
    pie(percWclerical, Wcolor, percMclerical, Mcolor);
    pop();

    var numWcustodial = countSubtype(gender, 'Female', jobcat, 'Custodial');
    var numMcustodial = countSubtype(gender, 'Male', jobcat, 'Custodial');
    var percWcustodial = numWcustodial / (numWcustodial + numMcustodial);
    var percMcustodial = numMcustodial / (numWcustodial + numMcustodial);

    push();
    translate(1900, 200);
    pie(percWcustodial+0.0001, Wcolor, percMcustodial-0.0001, Mcolor); // 100% of custodians are men, so I made slight changes to the values to draw a circle instead of arcs
    pop();

    // 5. calculate avg salaries for men and women in different job categories
   var Wmanagers = [];
   Wmanagers = getArray(salary, gender, "Female", jobcat, "Manager");
   var avgWmanager = average(Wmanagers); // average salary for female managers

   var Mmanagers = [];
   Mmanagers = getArray(salary, gender, "Male", jobcat, "Manager");
   var avgMmanager = average(Mmanagers); // average salary for male managers

    push();
    translate(2100, 300);
    bar(avgWmanager, Wcolor, avgMmanager, Mcolor, 50000);
    pop();


   var Wclericals = [];
   Wclericals = getArray(salary, gender, "Female", jobcat, "Clerical");
   var avgWclerical = average(Wclericals); // average salary for female clericals

   var Mclericals = [];
   Mclericals = getArray(salary, gender, "Female", jobcat, "Clerical");
   var avgMclerical = average(Mclericals); // average salary for male clericals

    push();
    translate(2300, 300);
    bar(avgWclerical, Wcolor, avgMclerical, Mcolor, 50000); // something is wrong with the graphs - the values should not be equal
    pop();


   // custodial salary data not applicable because all custodial staff are men, hence there is no comparison to be made
   // var Wcustodials = [];
   // Wcustodials = getArray(salary, gender, "Female", jobcat, "Custodial");
   // var avgWcustodial = average(Wcustodials); // average salary for female custodials

   // var Mcustodials = [];
   // Mcustodials = getArray(salary, gender, "Male", jobcat, "Custodial");
   // var avgMcustodial = average(Mcustodials); // average salary for male custodials

 
   // 6. calculate percentages of men/women by race
    var numWhites = countType(race, 'No');
    var numPOC = countType(race, 'Yes');
    var percWhites = numWhites / (numWhites + numPOC);
    var percPOC = numPOC / (numWhites + numPOC);

    push();
    translate(2700, 400);
    pie(percPOC, 'green', percWhites, 'red'); // TODO: decide whether to include this stat. is it useful to see what percentage of the firm is white/POC???
    pop();

    var numWpoc = countSubtype(gender, 'Female', race, 'No');
    var numMpoc = countSubtype(gender, 'Male', race, 'No');
    var percMpoc = numMpoc / (numWpoc + numMpoc);
    var percWpoc = numWpoc / (numWpoc + numMpoc);

    push();
    translate(2700, 200);
    pie(percWpoc, Wcolor, percMpoc, Mcolor);
    pop();

    var numWwhites = countSubtype(gender, 'Female', race, 'No');
    var numMwhites = countSubtype(gender, 'Male', race, 'No');
    var percMwhites = numMwhites / (numWwhites + numMwhites);
    var percWwhites = numWwhites / (numWwhites + numMwhites);

    push();
    translate(2950, 200);
    pie(percWwhites, Wcolor, percMwhites, Mcolor);
    pop();


   // 7. calculate avg salaries for white vs. non-white men and women
   var PoCwomen = [];
   PoCwomen = getArray(salary, race, "Yes", gender, "Female");
   var avgPoCw = average(PoCwomen); // average current salary for women of color
    
   var PoCmen = [];
   PoCmen = getArray(salary, race, "Yes", gender, "Male");
   var avgPoCm = average(PoCmen); // average current salary for men of color

    push();
    translate(3150, 300);
    bar(avgPoCw, Wcolor, avgPoCm, Mcolor, 50000); // TO DO: troubleshoot why the graphs are equal
    pop();

   var whiteWomen = [];
   whiteWomen = getArray(salary, race, "No", gender, "Female");
   var avgwhiteW = average(whiteWomen); // average current salary for white women

   var whiteMen = [];
   whiteMen = getArray(salary, race, "No", gender, "Male");
   avgwhiteM = average(whiteMen); //average current salary for white men

    push();
    translate(3350, 300);
    bar(avgwhiteM, Wcolor, avgwhiteW, Mcolor, 50000); // TO DO: troubleshoot why the graphs are equal
    pop();

   // 8. education scatter plot
    var maxSal;
    if (findmax(womenSal) > findmax(menSal))
        maxSal = findmax(womenSal);
    else
        maxSal = findmax(menSal);
    
    var eduW = [];
    eduW = getArray(edu, gender, "Female");
    var eduM = [];
    eduM = getArray(edu, gender, "Male");
    var maxEdu;
    
    if (findmax(eduW) > findmax(eduM))
        maxEdu = findmax(eduW);
    else
        maxEdu = findmax(eduM);

    push();
    translate(3700, 350);
    stroke(Mcolor);
    plot(eduM, menSal, maxEdu, maxSal, 'years', '$');
    stroke(Wcolor);
    plot(eduW, womenSal, maxEdu, maxSal, 'years', '$');
    pop();

   // 9. age scatter plot
  var agesW = [];
  agesW = getArray(age, gender, "Female");
  var agesM = [];
  agesM = getArray(age, gender, "Male");
  var maxAge;
    if (findmax(agesW) > findmax(agesM))
        maxAge = findmax(agesW);
    else
        maxAge = findmax(agesM);
  
  push();
  translate(4500, 350);
  stroke(Mcolor);
  plot(agesM, menSal, maxAge, maxSal, 'years', '$');
  stroke(Wcolor);
  plot(agesW, womenSal, maxAge, maxSal, 'years', '$');
  pop();


  // 10. conclusion - what do you think?

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

function plot(xarray, yarray, xmax, ymax, xunit, yunit) {
	var xcoords = [];
	var ycoords = [];
	var graphwidth = 500; 
	var graphheight = 250;
	
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
	text(xmax + " " + xunit, graphwidth, 20);
	text(yunit + nf(ymax, 0, 0), -30, -graphheight);
	return;
}

function pie(perc1, color1, perc2, color2) {
    push();

    var pieW = 200;
    var pieH = 200;

    noStroke();
    fill(color2);
    arc(0, 0, pieW, pieH, -HALF_PI, -HALF_PI + perc2*TWO_PI, PIE);
    
    fill(color1);
    arc(0, 0, pieW, pieH, -HALF_PI + perc2*TWO_PI, -HALF_PI + perc2*TWO_PI + perc1*TWO_PI, PIE);
    pop();
}

function bar(amount1, color1, amount2, color2, max) {
   push();
   
   var rectW = 50;
   var graphH = 200;
   
   noStroke();
   fill(color1);
   rect(0, 0, rectW, -map(amount1, 0, max, 0, graphH));    
   fill(color2);
   rect(70, 0, rectW, -map(amount2, 0, max, 0, graphH));
   
   pop();
}
    
// Andrew Gordon-Kirsch final project for Data Viz, spring 2015
// data source: empdat.csv - employee demographic information for unknown company under lawsuite. Retreived from Aaron Hill, spring 2015.

var canvas;
var table;

// arrays to store demographic info
var edu = [];
var jobcat = [];
var salary = [];
var salbegin = [];
var race = [];
var age = [];
var gender = [];

// global vars for calculations
var men;
var women;
var perMen;
var percWomen;
var begW = [];
var avgBegW;
var begM = [];
var avgBegM;
var womenSal = [];
var avgWomanSal;
var menSal = [];
var avgManSal;
var numWmanagers;
var numMmanagers;
var percMmanagers;
var precWmanagers;
var numWclerical;
var numMclerical;
var percWclerical;
var percMclerical;
var numWcustodial;
var numMcustodial;
var percWcustodial;
var percMcustodial;
var Wmanagers = [];
var avgWmanager;
var Mmanagers = [];
var avgMmanager;
var Wclericals = [];
var avgWclerical;
var Mclericals = [];
var avgMclerical;
var numWhites;
var numPOC;
var percWhites;
var percPOC;
var numWpoc;
var numMpoc;
var percMpoc;
var percWpoc;
var numWwhites;
var numMwhites;
var percMwhites;
var percWwhites;
var PoCwomen = [];
var avgPoCw;
var PoCmen = [];
var avgPoCm;
var whiteWomen = [];
var avgwhiteW;
var whiteMen = [];
var avgwhiteM;
var maxSal;
var eduW = [];
var eduM = [];
var maxEdu;
var edudiff;
var agesW = [];
var agesM = [];
var maxAge;

var buttonguilty;
var buttoninnocent;

function preload() {
    table = loadTable("http://agk510.github.io/finalproject/libraries/empdat.csv", "csv", "header"); // load source, parse when done
}

function setup() {
	  // window.resizeTo(700, 800); // TO DO: determine best viewing size for scrolling
    canvas = createCanvas(6600, 800);
    canvas.position(0,0);
    
    ellipseMode(CENTER);
    textAlign(CENTER);
    parseSource();
    calc();

    var toptitle = createDiv("Is this gender discrimination?");
    toptitle.parent("title");
    
    // section title bookmarks to link buttons to 
    var sec1 = createDiv("Overall Breakdown by Gender");
    sec1.position(600,125);
    sec1.id("sec1");
    sec1.class("bookmarks");

    var sec2 = createDiv("Breakdown by Job Type");
    sec2.position(1800,125);
    sec2.id("sec2");
    sec2.class("bookmarks");
   
    var sec3 = createDiv("Breakdown by Race");
    sec3.position(3350,125);
    sec3.id("sec3");
    sec3.class("bookmarks");

    var sec4 = createDiv("Average Salary by Education");
    sec4.position(4750,125);
    sec4.id("sec4");
    sec4.class("bookmarks");

    var sec5 = createDiv("Average Salary by Age");
    sec5.position(5500,125);
    sec5.id("sec5");
    sec5.class("bookmarks");

    var sec6 = createDiv("The Verdict");
    sec6.position(6050, 125);
    sec6.id("sec6");
    sec6.class("bookmarks");
    
    // create divs for text    
    var intro = createDiv("In 1989, a company was sued for gender discrimination in employee salaries.");
    intro.class("heading");
    intro.class("description");
    intro.class("wide4");
    intro.position(50, 125);
    
    var subintro = createDiv("The following information is taken from data released by the company during the lawsuit. The company's identity remains unknown.");
    subintro.class("subheading");
    subintro.class("description");
    subintro.class("wide4");
    subintro.position(50, 350);
    
    var scrolldir = createDiv("Scroll to the right to take a closer look at whether this company was indeed paying female employees less than male employees.");
    scrolldir.class("details");
    scrolldir.class("description");
    scrolldir.class("wide4");
    scrolldir.position(50, 525);

    var desGender = createDiv("Of the " + table.getRowCount() + " people on staff, " + nf(percWomen*100, 2, 1) + "% were women and " + nf(percMen*100, 2, 1) + "% were men.\nNote: transgender people are not accounted for in the company’s records.");
    desGender.class("details");
    desGender.class("description");
    desGender.position(600, 525);


    var graphGenderbeg = createDiv("Beginning Salaries");
    graphGenderbeg.class("subheading");
    graphGenderbeg.class("description");
    graphGenderbeg.class("wide2");    
    graphGenderbeg.position(1050, 175);


    var desGenderbeg = createDiv("Women averaged $" +  nf(avgBegM - avgBegW, 0, 2) + " less than men at the time they were hired.\nNote: all amounts in 1989 US dollars, not adjusted for inflation.");
    desGenderbeg.class("details");
    desGenderbeg.class("description");
    desGenderbeg.position(1000, 525);

    var graphGender = createDiv("Current Salaries");
    graphGender.class("subheading");
    graphGender.class("description");
    graphGender.position(1450, 175);

   var desGendercur = createDiv("Women averaged $" + nf(avgManSal - avgWomanSal, 0, 2) + " less than men at the time of the lawsuit (1989).");
    desGendercur.class("details");
    desGendercur.class("description");
    desGendercur.position(1400, 525);

    var piemanager = createDiv("Managers");
    piemanager.class("subheading");
    piemanager.class("description");
    piemanager.position(1850, 170);

    var pieclerk = createDiv("Clerical Workers");
    pieclerk.class("subheading");
    pieclerk.class("description");
    pieclerk.position(2075, 170);

    var piecustodian = createDiv("Custodians");
    piecustodian.class("subheading");
    piecustodian.class("description");
    piecustodian.position(2350, 170);

    var desJobtype = createDiv("The company had three job categories: managerial, clerical and custodial staff.\nWomen made up " + nf(percWmanagers*100, 2, 1) + "% of managers, " + nf(percWclerical*100, 2, 1) + "% of clerical workers and 0% of the custodians.");
    desJobtype.class("details");
    desJobtype.class("description");
    desJobtype.class("wide7");
    desJobtype.position(1800, 525);

    var graphmanagers = createDiv("Manager Salaries");
    graphmanagers.class("subheading");
    graphmanagers.class("description");
    graphmanagers.position(2650, 175);
    
    var graphclericals = createDiv("Clerical Salaries");
    graphclericals.class("subheading");
    graphclericals.class("description");
    graphclericals.position(3000, 175);

    var mgmtdesc = createDiv("Female managers averaged $" + nf(avgMmanager - avgWmanager, 0, 2) + " less than male managers.");
    mgmtdesc.class("details");
    mgmtdesc.class("description");
    mgmtdesc.position(2600, 525);

    var clercdesc = createDiv("Female clercial workers averaged $" + nf(avgMclerical - avgWclerical, 0, 2) + " less than male clerks.");
    clercdesc.class("details");
    clercdesc.class("description");
    clercdesc.position(2950, 525);

    var racedesc = createDiv("Overall, people of color comprised " + nf(percPOC*100, 2, 1) + "% of the company.");
    racedesc.class("details");
    racedesc.class("description");
    racedesc.class("wide4");
    racedesc.position(3350, 600);

    var piePOC = createDiv("People of Color");
    piePOC.class("subheading");
    piePOC.class("description");
    piePOC.position(3400, 170);

    var piewhite = createDiv("White People");
    piewhite.class("subheading");
    piewhite.class("description");
    piewhite.position(3650, 170);

    var pocdesc = createDiv(nf(percWpoc*100, 2, 1) + "% of the employees of color were women.");
    pocdesc.class("details");
    pocdesc.class("description");
    pocdesc.class("wide2");
    pocdesc.position(3350, 525);

    var whitedesc = createDiv(nf(percWwhites*100, 2, 1) + "% of the white employees were women.");
    whitedesc.class("details");
    whitedesc.class("description");
    whitedesc.class("wide2");
    whitedesc.position(3600, 525);

    var graphPOC = createDiv("Salaries for People of Color");
    graphPOC.class("subheading");
    graphPOC.class("description");
    graphPOC.position(3925, 175);

    var graphwhite = createDiv("Salaries for White People");
    graphwhite.class("subheading");
    graphwhite.class("description");
    graphwhite.position(4225, 175);

    var pocgraphdesc = createDiv("Women of color averaged $" + nf(avgPoCm - avgPoCw, 0, 2) + " less than men of color.");
    pocgraphdesc.class("details");
    pocgraphdesc.class("description");
    pocgraphdesc.position(3900, 525);

    var whitegraphdesc = createDiv("White women averaged $" + nf(avgwhiteM - avgwhiteW, 0, 2) + " less than white men.");
    whitegraphdesc.class("details");
    whitegraphdesc.class("description");
    whitegraphdesc.position(4250, 525);

    var edudesc = createDiv("There is a direct correlation between amount of education and pay: people with more education tend to get paid more, on average.\nWomen averaged " + nf(edudiff, 0, 2) + " fewer years in school than men.\nNote: education is measured in total years of schooling, from elementary and up.");
    edudesc.class("details");
    edudesc.class("description");
    edudesc.class("wide6");
    edudesc.position(4600, 525);

    var agedesc = createDiv("While salaries among middle-aged men appear to be higher than younger and older men, there doesn't seem to be a strong correlation between age and salary among women.\nWhat is clear, however, is that the salary distribution for men seems to be higher on average than that of women at most ages.");
    agedesc.class("details");
    agedesc.class("description");
    agedesc.class("wide6");
    agedesc.position(5350, 525);

    var concl = createDiv("What do you think? Is this company guilty of gender discrimination?");
    concl.class("heading");
    concl.class("description");
    concl.class("conclusion");
    concl.position(6100, 175);
 
    buttoninnocent = createButton("Innocent!");
    buttoninnocent.position(6150, 450);
    buttoninnocent.mousePressed(innocent);

    buttonguilty = createButton("Guilty!");
    buttonguilty.position(6250, 450);
    buttonguilty.mousePressed(guilty);

}

function calc() {

// overall gendeer breakdown

  men = countType(gender, "Male");
  women = countType(gender, "Female");
  percMen = men / (men + women);
  percWomen = women / (men + women);

  
  begW = getArray(salbegin, gender, "Female");
  avgBegW = average(begW);
  begM = getArray(salbegin, gender, "Male");
  avgBegM = average(begM);


  womenSal = getArray(salary, gender, "Female");
  avgWomanSal = average(womenSal);
  menSal = getArray(salary, gender, "Male");
  avgManSal = average(menSal);


// by job type

  numWmanagers = countSubtype(gender, 'Female', jobcat, 'Manager');
  numMmanagers = countSubtype(gender, 'Male', jobcat, 'Manager');
  percMmanagers = numMmanagers / (numWmanagers + numMmanagers);
  percWmanagers = numWmanagers / (numWmanagers + numMmanagers);

  numWclerical = countSubtype(gender, 'Female', jobcat, 'Clerical');
  numMclerical = countSubtype(gender, 'Male', jobcat, 'Clerical');
  percWclerical = numWclerical / (numWclerical + numMclerical);
  percMclerical = numMclerical / (numWclerical + numMclerical);

  numWcustodial = countSubtype(gender, 'Female', jobcat, 'Custodial');
  numMcustodial = countSubtype(gender, 'Male', jobcat, 'Custodial');
  percWcustodial = numWcustodial / (numWcustodial + numMcustodial);
  percMcustodial = numMcustodial / (numWcustodial + numMcustodial);


  for (var g = 0; g < table.getRowCount(); g++) {
    if (table.get(g,2) === "Manager") {
      if (table.get(g,9) === "Female") 
        append(Wmanagers, Number(table.get(g,3)));
      else
        append(Mmanagers, Number(table.get(g,3)));
    }
    else if (table.get(g,2) === "Clerical") {
      if (table.get(g,9) === "Female") 
        append(Wclericals, Number(table.get(g,3)));
      else
        append(Mclericals, Number(table.get(g,3)));
    }
  }
  // Wmanagers = getArray(salary, gender, "Female", jobcat, "Manager");
  avgWmanager = average(Wmanagers); // average salary for female managers

  // Mmanagers = getArray(salary, gender, "Male", jobcat, "Manager");
  avgMmanager = average(Mmanagers); // average salary for male managers

  // Wclericals = getArray(salary, gender, "Female", jobcat, "Clerical");
  avgWclerical = average(Wclericals); // average salary for female clericals
  
  // Mclericals = getArray(salary, gender, "Female", jobcat, "Clerical");
  avgMclerical = average(Mclericals); // average salary for male clericals


// by race

  numWhites = countType(race, 'No');
  numPOC = countType(race, 'Yes');
  percWhites = numWhites / (numWhites + numPOC);
  percPOC = numPOC / (numWhites + numPOC);


  numWpoc = countSubtype(gender, 'Female', race, 'Yes');
  numMpoc = countSubtype(gender, 'Male', race, 'Yes');
  percMpoc = numMpoc / (numWpoc + numMpoc);
  percWpoc = numWpoc / (numWpoc + numMpoc);

  numWwhites = countSubtype(gender, 'Female', race, 'No');
  numMwhites = countSubtype(gender, 'Male', race, 'No');
  percMwhites = numMwhites / (numWwhites + numMwhites);
  percWwhites = numWwhites / (numWwhites + numMwhites);
  
  for (var e = 0; e < table.getRowCount(); e++) {
    if (table.get(e,7) === "Yes") {
      if (table.get(e,9) === "Female")
        append(PoCwomen, Number(table.get(e,3)));
      else
        append(PoCmen, Number(table.get(e,3)));
    }
    else {
      if (table.get(e,9) === "Female")
        append(whiteWomen, Number(table.get(e,3)));
      else
        append(whiteMen, Number(table.get(e,3)));
    }
  }
 
  // PoCwomen = getArray(salary, race, "Yes", gender, "Female");
  avgPoCw = average(PoCwomen); // average current salary for women of color


  // PoCmen = getArray(salary, race, "Yes", gender, "Male");
  avgPoCm = average(PoCmen); // average current salary for men of color

  // whiteWomen = getArray(salary, race, "No", gender, "Female");
  avgwhiteW = average(whiteWomen); // average current salary for white women


  // whiteMen = getArray(salary, race, "No", gender, "Male");
  avgwhiteM = average(whiteMen); //average current salary for white men


// by education

  if (findmax(womenSal) > findmax(menSal))
      maxSal = findmax(womenSal);
  else
      maxSal = findmax(menSal);
    

  eduW = getArray(edu, gender, "Female");
  eduM = getArray(edu, gender, "Male");
    
  if (findmax(eduW) > findmax(eduM))
      maxEdu = findmax(eduW);
  else
      maxEdu = findmax(eduM);

  edudiff = average(eduM) - average(eduW);


// by age

  agesW = getArray(age, gender, "Female");
  agesM = getArray(age, gender, "Male");

  if (findmax(agesW) > findmax(agesM))
      maxAge = findmax(agesW);
  else
      maxAge = findmax(agesM);

}

function draw() {
  var bgcolor = '#e5f0ff'; // background strip color
  var Wcolor = '#80ccff'; // color representing women in all graphs/charts
  var Mcolor = '#006cff'; // color reporesenting men in all graphs/charts

  background(255);

  // create blue background stripe for charts and graphs section
  fill(bgcolor);
  noStroke();
  rect(0, 100, width, 400);


// // temporary numbers for format alignment
//   for (var p = 0; p < width; p++) {
//     if (p % 50 === 0) {
//       fill(0);
//       textSize(10);
//       text(p, p, 600);
//     }
//   }

// // temporary numbers for format alignment
//   for (var q = 0; q < height; q++) {
//     if (q % 50 === 0) {
//       fill(0);
//       textSize(10);
//       text(q, 10, q);
//     }
//   }


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

  // 1. percentages of women and men in firm
  push();
  translate(750, 300);
  pie(percWomen, Wcolor, percMen, Mcolor);
  pop();


  // 2. average beginning salary for each gender
  push();
  translate(1050, 400);
  bar(avgBegW, Wcolor, avgBegM, Mcolor, 75000);
  pop();


  // 3. average current salaries for men and women
  push();
  translate(1450, 400);
  bar(avgWomanSal, Wcolor, avgManSal, Mcolor, 75000);
  pop();


  // 4. percentages of men/women by job category
  push();
  translate(1900, 300);
  pie(percWmanagers, Wcolor, percMmanagers, Mcolor);
  pop();

  push();
  translate(2150, 300);
  pie(percWclerical, Wcolor, percMclerical, Mcolor);
  pop();

  push();
  translate(2400, 300);
  pie(percWcustodial+0.0001, Wcolor, percMcustodial-0.0001, Mcolor); // 100% of custodians are men, so I made slight changes to the values to draw a circle instead of arcs
  pop();


  // // 5. avg salaries for men and women in different job categories
  push();
  translate(2650, 400);
  bar(avgWmanager, Wcolor, avgMmanager, Mcolor, 75000);
  pop();

  push();
  translate(3000, 400);
  bar(avgWclerical, Wcolor, avgMclerical, Mcolor, 75000); // something is wrong with the graphs - the values should not be equal
  pop();


  // custodial salary data not applicable because all custodial staff are men, hence there is no comparison to be made

  // 6. percentages of men/women by race

  push();
  translate(3450, 300);
  pie(percWpoc, Wcolor, percMpoc, Mcolor);
  pop();

  push();
  translate(3700, 300);
  pie(percWwhites, Wcolor, percMwhites, Mcolor);
  pop();


  // // 7. avg salaries for white vs. non-white men and women
  push();
  translate(3950, 400);
  bar(avgPoCw, Wcolor, avgPoCm, Mcolor, 75000); // TO DO: troubleshoot why the graphs are equal
  pop();

  push();
  translate(4300, 400);
  bar(avgwhiteM, Wcolor, avgwhiteW, Mcolor, 75000); // TO DO: troubleshoot why the graphs are equal
  pop();


  // // 8. education scatter plot
  push();
  translate(4650, 450);
  stroke(Mcolor);
  plot(eduM, menSal, maxEdu, maxSal, 'years', '$');
  noStroke();
  fill(Mcolor);
  textSize(20);
  text("Men", 60, -175);

  stroke(Wcolor);
  plot(eduW, womenSal, maxEdu, maxSal, 'years', '$');
  noStroke();
  fill(Wcolor);
  textSize(20);
  text("Women", 60, -200);
  pop();


  // // 9. age scatter plot
  push();
  translate(5400, 450);
  stroke(Mcolor);
  plot(agesM, menSal, maxAge, maxSal, 'years', '$');
  noStroke();
  fill(Mcolor);
  textSize(20);
  text("Men", 60, -175);


  stroke(Wcolor);
  plot(agesW, womenSal, maxAge, maxSal, 'years', '$');
  noStroke();
  fill(Wcolor);
  textSize(20);
  text("Women", 60, -200);
  pop();


  // 10. conclusion - what do you think? -> with rest of text calls

}


function parseSource() {
  for (var i = 0; i < table.getRowCount(); i++){
    edu[i] = Number(table.get(i,1));
    jobcat[i] = table.get(i,2);
    salary[i] = Number(table.get(i,3));
    salbegin[i] = Number(table.get(i,4));
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
    // stroke(0);
    // strokeWeight(1);
    textSize(20);
    text("Men: " + nf(perc2*100, 2, 1) + "%", 0, 150);

    noStroke();
    fill(color1);
    arc(0, 0, pieW, pieH, -HALF_PI + perc2*TWO_PI, -HALF_PI + perc2*TWO_PI + perc1*TWO_PI, PIE);
    // stroke(0);
    // strokeWeight(2);
    textSize(20);
    text("Women: " + nf(perc1*100, 2, 1) + "%", 0, 125);

    
    pop();
}

function bar(amount1, color1, amount2, color2, max) {
   push();
   
   var rectW = 50;
   var graphH = 200;
   
   noStroke();
   fill(color1);
   rect(0, 0, rectW, -map(amount1, 0, max, 0, graphH));  
   textSize(20);
   text("Women: $" + nf(amount1, 0, 2), 60, 25);

   noStroke();  
   fill(color2);
   rect(70, 0, rectW, -map(amount2, 0, max, 0, graphH));
   textSize(20);
    text("Men: $" + nf(amount2, 0, 2), 60, 50);

   pop();
}

function innocent() {
  confirm("ARE YOU SURE?\n\nSufficient evidence was provided in the lawsuite to find the company in question guilty of gender discimination.");
}

function guilty() {
  confirm("GUILTY!\n\nSufficient evidence was provided in the lawsuite to find the company in question guilty of gender discimination.");
}
    
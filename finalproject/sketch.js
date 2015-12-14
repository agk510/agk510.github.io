// Andrew Gordon-Kirsch final project for Data Viz, spring 2015

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

function preload() {
    table = loadTable("http://agk510.github.io/finalproject/libraries/empdat.csv", "csv", "header"); // load source, parse when done
}

function setup() {
	  // window.resizeTo(400, 800); // TO DO: determine best viewing size for scrolling
    canvas = createCanvas(6000, 700);
    canvas.position(0,80);
    
    ellipseMode(CENTER);
    textAlign(CENTER);
    parseSource();
    calc();

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

    var placeholder = 999;
    
    // create divs for text    
    var intro = createDiv("In 1989, a company was sued for gender discrimination in employee salaries.");
    intro.class("heading");
    intro.class("description");
    intro.position(0, 100);
    
    var subintro = createDiv("The following information is taken from data released by the company during the lawsuit. The company's identity remains unknown.");
    subintro.class("subheading");
    subintro.class("description");
    subintro.position(0, 350);
    
    var scrolldir = createDiv("Scroll to the right to take a closer look at whether this company was indeed paying female employees less than male employees.");
    scrolldir.class("details");
    scrolldir.class("description");
    scrolldir.position(0, 500);

    var desGender = createDiv("Of the " + table.getRowCount() + " people on staff, " + nf(percWomen*100, 2, 1) + "% were women and " + nf(percMen*100, 2, 1) + "% were men.\nNote: Transgender people are not accounted for in the company’s records.");
    desGender.class("details");
    desGender.class("description");
    desGender.position(450, 500);


    var graphGenderbeg = createDiv("Average Beginning Salary by Gender");
    graphGenderbeg.class("subheading");
    graphGenderbeg.class("description");
    graphGenderbeg.position(600, 150);


    var desGenderbeg = createDiv("Women averaged $" +  nf(avgBegM - avgBegW, 0, 2) + " less than men at the time they were hired.\nNote: All amounts in 1989 US dollars, not adjusted for inflation.");
    desGenderbeg.class("details");
    desGenderbeg.class("description");
    desGenderbeg.position(600, 500);

    var graphGender = createDiv("Average Current Salary by Gender");
    graphGender.class("subheading");
    graphGender.class("description");
    graphGender.position(900, 150);

   var desGendercur = createDiv("Women averaged $" + nf(avgManSal - avgWomanSal, 0, 2) + " less than men at the time of the lawsuit (1989).");
    desGendercur.class("details");
    desGendercur.class("description");
    desGendercur.position(900, 500);

    var piemanager = createDiv("Managers");
    piemanager.class("subheading");
    piemanager.class("description");
    piemanager.position(1300, 150);

    var pieclerk = createDiv("Clerks");
    pieclerk.class("subheading");
    pieclerk.class("description");
    pieclerk.position(1550, 150);

    var piecustodian = createDiv("Custodians");
    piecustodian.class("subheading");
    piecustodian.class("description");
    piecustodian.position(1800, 150);

    var desJobtype = createDiv("The company had three job categories: managerial, clerical and custodial staff.\nWomen made up " + nf(percWmanagers*100, 2, 1) + "% of managers, " + nf(percWclerical*100, 2, 1) + "% of clerical workers and 0% of the custodians.");
    desJobtype.class("details");
    desJobtype.class("description");
    desJobtype.class("wide6");
    desJobtype.position(1300, 500);

    var graphmanagers = createDiv("Average Salaries for Managers");
    graphmanagers.class("subheading");
    graphmanagers.class("description");
    graphmanagers.position(2000, 150);
    
    var graphclericals = createDiv("Average Salaries for Clerks");
    graphclericals.class("subheading");
    graphclericals.class("description");
    graphclericals.position(2200, 150);

    var mgmtdesc = createDiv("Female managers averaged $" + nf(avgMmanager - avgWmanager, 0, 2) + " less than male managers.");
    mgmtdesc.class("details");
    mgmtdesc.class("description");
    mgmtdesc.position(2000, 500);

    var clercdesc = createDiv("Female clerks averaged $" + nf(avgMclerical - avgWclerical, 0, 2) + " less than male clerks.");
    clercdesc.class("details");
    clercdesc.class("description");
    clercdesc.position(2200, 500);

    var racedesc = createDiv("Overall, people of color comprised " + nf(percPOC*100, 2, 1) + "% of the company.\nNote: Multiracial people are not accounted for in the company’s records.");
    racedesc.class("details");
    racedesc.class("description");
    racedesc.class("wide6");
    racedesc.position(2500, 600);

    var piePOC = createDiv("People of Color");
    piePOC.class("subheading");
    piePOC.class("description");
    piePOC.position(2500, 150);

    var piewhite = createDiv("White People");
    piewhite.class("subheading");
    piewhite.class("description");
    piewhite.position(2800, 150);

    var pocdesc = createDiv(nf(percWpoc*100, 2, 1) + "% of the employees of color were women.");
    pocdesc.class("details");
    pocdesc.class("description");
    pocdesc.position(2500, 500);

    var whitedesc = createDiv(nf(percWhites*100, 2, 1) + "% of the white employees were women.");
    whitedesc.class("details");
    whitedesc.class("description");
    whitedesc.position(2800, 500);

    var graphPOC = createDiv("Average Salaries for People of Color");
    graphPOC.class("subheading");
    graphPOC.class("description");
    graphPOC.position(3050, 150);

    var graphwhite = createDiv("Average Salaries for White People");
    graphwhite.class("subheading");
    graphwhite.class("description");
    graphwhite.position(3250, 150);

    var pocgraphdesc = createDiv("Women of color averaged $" + nf(avgPoCm - avgPoCw, 0, 2) + " less than men of color.");
    pocgraphdesc.class("details");
    pocgraphdesc.class("description");
    pocgraphdesc.position(3050, 500);

    var whitegraphdesc = createDiv("White women averaged $" + nf(avgwhiteM - avgwhiteW, 0, 2) + " less than white men.");
    whitegraphdesc.class("details");
    whitegraphdesc.class("description");
    whitegraphdesc.position(3250, 500);

    var edudesc = createDiv("There is a direct correlation between amount of education and pay: people with more education tend to get paid more, on average.\nWomen averaged " + nf(edudiff, 0, 2) + " fewer years in school than men.\nNote: Education is measured in total years of schooling, from elementary on up.");
    edudesc.class("details");
    edudesc.class("description");
    edudesc.class("wide6");
    edudesc.position(3700, 500);

    var agedesc = createDiv("While salaries among middle-aged men appear to be higher than younger and older men, there doesn't seem to be a strong correlation between age and salary among women.\nWhat is clear, however, is that the salary distribution for men seems to be higher on average than that of women at most ages.");
    agedesc.class("details");
    agedesc.class("description");
    agedesc.class("wide6");
    agedesc.position(4500, 500);

    var concl = createDiv("What do you think? Is this company guilty of gender discrimination?");
    concl.class("heading");
    concl.class("description");
    concl.position(5200, 100);
 
}

function calc() {

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


  Wmanagers = getArray(salary, gender, "Female", jobcat, "Manager");
  avgWmanager = average(Wmanagers); // average salary for female managers


  Mmanagers = getArray(salary, gender, "Male", jobcat, "Manager");
  avgMmanager = average(Mmanagers); // average salary for male managers

  Wclericals = getArray(salary, gender, "Female", jobcat, "Clerical");
  avgWclerical = average(Wclericals); // average salary for female clericals
  
  Mclericals = getArray(salary, gender, "Female", jobcat, "Clerical");
  avgMclerical = average(Mclericals); // average salary for male clericals

  numWhites = countType(race, 'No');
  numPOC = countType(race, 'Yes');
  percWhites = numWhites / (numWhites + numPOC);
  percPOC = numPOC / (numWhites + numPOC);

  numWpoc = countSubtype(gender, 'Female', race, 'No');
  numMpoc = countSubtype(gender, 'Male', race, 'No');
  percMpoc = numMpoc / (numWpoc + numMpoc);
  percWpoc = numWpoc / (numWpoc + numMpoc);

  numWwhites = countSubtype(gender, 'Female', race, 'No');
  numMwhites = countSubtype(gender, 'Male', race, 'No');
  percMwhites = numMwhites / (numWwhites + numMwhites);
  percWwhites = numWwhites / (numWwhites + numMwhites);

    
  PoCwomen = getArray(salary, race, "Yes", gender, "Female");
  avgPoCw = average(PoCwomen); // average current salary for women of color


  PoCmen = getArray(salary, race, "Yes", gender, "Male");
  avgPoCm = average(PoCmen); // average current salary for men of color


  whiteWomen = getArray(salary, race, "No", gender, "Female");
  avgwhiteW = average(whiteWomen); // average current salary for white women


  whiteMen = getArray(salary, race, "No", gender, "Male");
  avgwhiteM = average(whiteMen); //average current salary for white men


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

  push();
  translate(600, 200);
  pie(percWomen, Wcolor, percMen, Mcolor);
  pop();

  // 2. calculate average beginning salary for each gender

  push();
  translate(800, 300);
  bar(avgBegW, Wcolor, avgBegM, Mcolor, 50000);
  pop();

  // 3. calculate average current salaries for men and women

  push();
  translate(1000, 300);
  bar(avgWomanSal, Wcolor, avgManSal, Mcolor, 50000);
  pop();

  // 4. calculate percentages of men/women by job category


  push();
  translate(1400, 200);
  pie(percWmanagers, Wcolor, percMmanagers, Mcolor);
  pop();



  push();
  translate(1650, 200);
  pie(percWclerical, Wcolor, percMclerical, Mcolor);
  pop();



  push();
  translate(1900, 200);
  pie(percWcustodial+0.0001, Wcolor, percMcustodial-0.0001, Mcolor); // 100% of custodians are men, so I made slight changes to the values to draw a circle instead of arcs
  pop();

  // 5. calculate avg salaries for men and women in different job categories


  push();
  translate(2100, 300);
  bar(avgWmanager, Wcolor, avgMmanager, Mcolor, 50000);
  pop();



  push();
  translate(2300, 300);
  bar(avgWclerical, Wcolor, avgMclerical, Mcolor, 50000); // something is wrong with the graphs - the values should not be equal
  pop();

  // custodial salary data not applicable because all custodial staff are men, hence there is no comparison to be made

  // 6. calculate percentages of men/women by race

  // push();
  // translate(2700, 400);
  // pie(percPOC, 'green', percWhites, 'red'); // TODO: decide whether to include this stat. is it useful to see what percentage of the firm is white/POC???
  // pop();



  push();
  translate(2700, 200);
  pie(percWpoc, Wcolor, percMpoc, Mcolor);
  pop();



  push();
  translate(2950, 200);
  pie(percWwhites, Wcolor, percMwhites, Mcolor);
  pop();


  // 7. calculate avg salaries for white vs. non-white men and women

  push();
  translate(3150, 300);
  bar(avgPoCw, Wcolor, avgPoCm, Mcolor, 50000); // TO DO: troubleshoot why the graphs are equal
  pop();


  push();
  translate(3350, 300);
  bar(avgwhiteM, Wcolor, avgwhiteW, Mcolor, 50000); // TO DO: troubleshoot why the graphs are equal
  pop();

  // 8. education scatter plot


  push();
  translate(3700, 350);
  stroke(Mcolor);
  plot(eduM, menSal, maxEdu, maxSal, 'years', '$');
  stroke(Wcolor);
  plot(eduW, womenSal, maxEdu, maxSal, 'years', '$');
  pop();

  // 9. age scatter plot

  push();
  translate(4500, 350);
  stroke(Mcolor);
  plot(agesM, menSal, maxAge, maxSal, 'years', '$');
  stroke(Wcolor);
  plot(agesW, womenSal, maxAge, maxSal, 'years', '$');
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
    
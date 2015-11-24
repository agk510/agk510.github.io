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
// var graphContext, graphGender, graphRace; // create graphics for each section 
var sectionHeight = 400;

function preload() {
    table = loadTable("http://agk510.github.io/finalproject/libraries/empdat.csv", "csv", "header"); // load source, parse when done
}

function setup() {
	canvas = createCanvas(windowWidth, sectionHeight*6);
    canvas.position(0,100);

    ellipseMode(CENTER);
    textAlign(CENTER);
    parseSource();
 

    var title = createDiv("<b>TITLE<b>");
    title.id("top");
    title.position(30, 35);

    var titlebar = createDiv("");
    titlebar.id("top-bg");
    titlebar.position(0,0);

    //keep title bar at top when scrolling (still needs development)
    // <script>
    //   $(document).ready(function(){
    //   $("#sticker").sticky({topSpacing:0});
    //     });
    // </script>
}

function draw() {
   
    // spaceholder for background context and description
    //noStroke();
    fill(255);
    rect(0, 0, width, sectionHeight);
    fill(100);
    textSize(20);
    text("I am a placeholder for background context and description.", 100, 100); // alternately could create a div for this text 

    var men = countType(gender, 'Male');
    var women = countType(gender, 'Female');
    var percMen = men / (men + women);
    var percWomen = women / (men + women);
    var cat1color = 'turquoise';
    var cat2color = 'blue';
    

    // new section for first dataset
    push();
    translate(0, sectionHeight*1);
    //noStroke();
    fill(255);
    rect(0, 0, width, sectionHeight);


    //create buttons to toggle between pie charts and graphs
    var button1 = createButton('1', 1)
    button1.position(width/4, sectionHeight-10); // note that button is not included in translate function -- need to reposition under the pie chart
    // button1.mousePressed(swithGraph);

    //draw pie chart to show overall gender breakdown in firm
    noStroke();
    fill(cat1color);
    arc(width/4, sectionHeight/2, sectionHeight/2, sectionHeight/2, -HALF_PI, -HALF_PI + percWomen*TWO_PI, PIE);
    text(nf(percWomen*100, 2, 1) + "% Women", width/4, sectionHeight - sectionHeight/4 + 20);
    fill(cat2color);
    arc(width/4, sectionHeight/2, sectionHeight/2, sectionHeight/2, -HALF_PI + percWomen*TWO_PI, -HALF_PI + percWomen*TWO_PI + percMen*TWO_PI, PIE);
  	text(nf(percMen*100, 2, 1) + "% Men", width/4, sectionHeight - sectionHeight/4+40); // create div instead
    
    //calculate average salary for each gender
    var womenSal = [];
    womenSal = getArray(salary, gender, "Female");
    var avgWomanSal = average(womenSal);
    var menSal = [];
    menSal = getArray(salary, gender, "Male");
    var avgManSal = average(menSal);
    
    //draw bar graph for average salaries
    noStroke();
    fill(cat1color);
    rect(width-width/2, sectionHeight-sectionHeight/4, 50, -map(avgWomanSal, 0, 50000, 0, sectionHeight/2));    
    text("Current salary (avg): $" + nf(avgWomanSal, 0, 2), width-width/2, sectionHeight-sectionHeight/4+20);
    fill(cat2color);
    rect(width-width/2+70, sectionHeight-sectionHeight/4, 50, -map(avgManSal, 0, 50000, 0, sectionHeight/2));
    text("Current salary (avg): $" + nf(avgManSal, 0, 2), width-width/2, sectionHeight-sectionHeight/4+40);

      
    //calculate average beginning salary for each gender
    var begW = [];
    begW = getArray(salbegin, gender, "Female");
    var avgBegW = average(begW);
    var begM = [];
    begM = getArray(salbegin, gender, "Male");
    var avgBegM = average(begM);

    // draw bargraph for avg beginning salaries
    noStroke();
    fill(cat1color);
    rect(width-width/4, sectionHeight-sectionHeight/4, 50, -map(avgBegW, 0, 50000, 0, sectionHeight/2));    
    text("Starting salary (avg): $" + nf(avgBegW, 0, 2), width-width/4, sectionHeight-sectionHeight/4+20);
    fill(cat2color);
    rect(width-width/4+70, sectionHeight-sectionHeight/4, 50, -map(avgBegM, 0, 50000, 0, sectionHeight/2));
    text("Starting salary (avg): $" + nf(avgBegM, 0, 2), width-width/4, sectionHeight-sectionHeight/4+40);
    
    pop();

    
    // create next section
    push();
    translate(0, sectionHeight*2);
    //noStroke();
    fill(255);
    rect(0, 0, width, sectionHeight*2); // resize height to sectionHeight x1 once the buttons are functional

    //calculate avg salaries for men and women in different job categories
    var Wmanagers = new Array(getArray(salary, gender, "Female", jobcat, "Manager"));
    var avgWmanager = average(Wmanagers); // average salary for female managers

    var Mmanagers = new Array(getArray(salary, gender, "Male", jobcat, "Manager"));
    var avgMmanager = average(Mmanagers); // average salary for male managers

    var Wclericals = new Array(getArray(salary, gender, "Female", jobcat, "Clerical"));
    var avgWclerical = average(Wclericals); // average salaary for female clericals

    var Mclericals = new Array(getArray(salary, gender, "Female", jobcat, "Clerical"));
    var avgMclerical = average(Mclericals); // average salary for male clericals

    var Wcustodials = new Array(getArray(salary, gender, "Female", jobcat, "Custodial"));
    var avgWcustodial = average(Wcustodials); // average salary for female custodials

    var Mcustodials = new Array(getArray(salary, gender, "Male", jobcat, "Custodial"));
    var avgMcustodial = average(Mcustodials); // average salary for male custodials

    // draw bar graphs for men/women salaries by job category


    pop();

    //calculate avg salaries for white vs. non-white men and women
    var PoCwomen = [];
    PoCwomen = getArray(salary, race, "Yes", gender, "Female");
    var avgPoCw = average(PoCwomen); // average current salary for women of color
    
    var PoCmen = [];
    PoCmen = getArray(salary, race, "Yes", gender, "Male");
    var avgPoCm = average(PoCmen); // average current salary for men of color

    var whiteWomen = [];
    whiteWomen = getArray(salary, race, "No", gender, "Female");
    var avgwhiteW = average(whiteWomen); // average current salary for white women

    var whiteMen = [];
    whiteMen = getArray(salary, race, "No", gender, "Male");
    avgwhiteM = average(whiteMen); //average current salary for white men

    // draw bar graphs for men/women salaries by race
    noStroke();
    fill(cat1color);
    rect(width-width/2, sectionHeight-sectionHeight/4, 50, -map(avgPoCw, 0, 50000, 0, sectionHeight/2));    
    text("Person of color salary (avg): $" + nf(avgPoCw, 0, 2), width-width/2, sectionHeight-sectionHeight/4+20);
    fill(cat2color);
    rect(width-width/2+70, sectionHeight-sectionHeight/4, 50, -map(avgPoCm, 0, 50000, 0, sectionHeight/2));
    text("Person of color salary (avg): $" + nf(avgPoCm, 0, 2), width-width/2, sectionHeight-sectionHeight/4+40);

    noStroke();
    fill(cat1color);
    rect(width-width/4, sectionHeight-sectionHeight/4, 50, -map(avgwhiteW, 0, 50000, 0, sectionHeight/2));    
    text("White salary (avg): $" + nf(avgwhiteW, 0, 2), width-width/4, sectionHeight-sectionHeight/4+20);
    fill(cat2color);
    rect(width-width/4+70, sectionHeight-sectionHeight/4, 50, -map(avgwhiteM, 0, 50000, 0, sectionHeight/2));
    text("White salary (avg): $" + nf(avgwhiteM, 0, 2), width-width/4, sectionHeight-sectionHeight/4+40);

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
        if (array[i] === type)
            if (subarray[i] === subtype)
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

function percentageBreakdown(array, cat1, cat2, cat3) { //
    var sum1 = 0;
    var sum2 = 0;
    var sum3 = 0;

    for (var i; i < array.length; i++) {
        if (array[i] === cat1)
            sum1++;
        else if (array[i] === cat2)
            sum2++;
        else if (array[i] === cat3)
            sum3++;   
    }

    var allperc = [sum1 / (sum1 + sum2 + sum3), sum2 / (sum1 + sum2 + sum3), sum3 / (sum1 + sum2 + sum3)];

    return allperc;

}

function percentageBreakdown(array, cat1, cat2) { //
    var sum1 = 0;
    var sum2 = 0;

    for (var i = 0; i < array.length; i++) {
        if (array[i] === cat1)
            sum1++;
        else if (array[i] === cat2)
            sum2++;
    }

    var allperc = [sum1 / (sum1 + sum2), sum2 / (sum1 + sum2)];

    return allperc;

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
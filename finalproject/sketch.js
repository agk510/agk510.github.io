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
	canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0,100);
   
    // graphContext = createGraphics(width, sectionHeight);
    // graphGender = createGraphics(width, sectionHeight);
    // graphRace = createGraphics(width, sectionHeight);

    ellipseMode(CENTER);
    parseSource();
    // for (var j = 0; j < table.getRowCount(); j++) { // check that source has successfully been parsed
    //     console.log(edu[j]);
    //     console.log(salary[j]);
    // }

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
    background(255);

    // graphContext.background(200);
    // graphContext.text("I am text in Context section. \nI will talk about the historical context of the court case.", 10, 100);    
    // image(graphContext, 0, 0);

    var context = createDiv("");
    context.id("gContext");
    context.position(0,100);
    context.add.text("I am the historical context.", 10, 20);


    var gGender = createDiv("");
    gGender.id("Odd");
    gGender.position(0,100+sectionHeight);

    var men = countType(gender, 'Male');
    var women = countType(gender, 'Female');
    // print("Number of men: " + men); //check to make sure function is returning properly
    // print("Number of women: " + women);

    // testing pie chart drawing
    background(255);
    var percMen = men / (men + women);
    var percWomen = women / (men + women);
    fill(0);
    text("Percentage men: " + percMen, 50, 50);
    text("Percentage women: " + percWomen, 50, 60);
    var cat1color = 'red';
    var cat2color = 'blue';
    noStroke();
    fill(cat1color);
    arc(100, 200, 50, 50, -HALF_PI, -HALF_PI + percMen*TWO_PI, PIE);
    fill(cat2color);
    arc(100, 200, 50, 50, -HALF_PI + percMen*TWO_PI, -HALF_PI + percMen*TWO_PI + percWomen*TWO_PI, PIE);
    
}

function parseSource() {
  for (var i = 0; i < table.getRowCount(); i++){
    edu[i] = table.get(i,1);
    jobcat[i] = table.get(i,2);
    salary[i] = table.get(i,3);
    salbegin[i] = table.get(i,4);
    jobtime[i] = table.get(i,5);
    prevexp[i] = table.get(i,6);
    race[i] = table.get(i,7);
    age[i] = table.get(i,8);
    gender[i] = table.get(i,9);
  }
}

function average(array) {   // takes the average of the values in the array (interval-ratio numbers only)
    var sum = 0;
    for (var i = 0; i < array.length; i++)
        sum = sum + array[j];
    
    var avg = sum / array.length;

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
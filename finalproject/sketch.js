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

function preload() {
    table = loadTable("http://agk510.github.io/finalproject/libraries/empdat.csv", "csv", "header"); // load source, parse when done
}

function setup() {
	noCanvas();
 	parseSource();
    // for (var j = 0; j < table.getRowCount(); j++) { // check that source has successfully been parsed
    //     console.log(edu[j]);
    //     console.log(salary[j]);
    // }

}

function draw() {
 
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

function average(array) {
    var sum = 0;
    for (var i = 0; i < array.length; i++) {
        sum = sum + array[j];
    }
    var avg; = sum / array.length;

    return avg;
}

function percentageBreakdown(array, cat1, cat2, cat3) {
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

    // NOTE: still need to calculate percetages of each cat and return array with each percetage

}
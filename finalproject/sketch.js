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

function setup() {
	noCanvas();
 	table = loadTable("http://agk510.github.io/finalproject/libraries/empdat.csv", "csv", "header", parseSource); // load source, parse when done
 	console.log(edu[5]);
 	console.log(jobcat[29]);
 	console.log(salary[365]);
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
// 	for (var i = 1; i < data.length; i++) {
// 		var column = split(data[i], ",");
// 		edu[i-1] = column[1];
// 	  text("Edu = " + edu);
// 		// jobcat[i-1] = column[2];
// 		// salary[i-1] = column[3];
// 	}
}
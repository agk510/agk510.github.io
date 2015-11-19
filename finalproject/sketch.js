var table;
var edu = []; //, jobcat, salary, salbegin, jobtime, prevexp, race, age, gender = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
 	table = loadTable("http://agk510.github.io/finalproject/libraries/empdat.csv", "csv", "header", parseSource); // load source, parse when done
}

function draw() {
 
ellipse(50, 50, 50, 50);

text("Edu = " + edu, 50, 200);
}

function parseSource() {
  for (var i = 0; i < table.getRowCount(); i++){
    edu[i] = table.get(i,1);
  }
// 	for (var i = 1; i < data.length; i++) {
// 		var column = split(data[i], ",");
// 		edu[i-1] = column[1];
// 	  text("Edu = " + edu);
// 		// jobcat[i-1] = column[2];
// 		// salary[i-1] = column[3];
// 	}
}
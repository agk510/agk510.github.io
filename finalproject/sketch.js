var edu = []; //, jobcat, salary, salbegin, jobtime, prevexp, race, age, gender = [];

function setup() {
  loadStrings("http://agk510.github.io/finalproject/libraries/empdat.csv", parseSource); // load source, parse when done
}

function draw() {
 

}

function parseSource(data) {
	for (var i = 1; i < data.length; i++) {
		var column = split(data[i], ",");
		edu[i-1] = column[1];
	  text("Edu = " + edu);
		// jobcat[i-1] = column[2];
		// salary[i-1] = column[3];
	}
}
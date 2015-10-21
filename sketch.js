var goalsTable, categoryTable;
var div;
var r = 1; //global row var to toggle between goals

var categories = {
  "End Extreme Poverty": "red",
  "Fight Inequality and Injustice": "blue",
  "Fix Climate Change": "green"
};

var wordsToDisplay = [];
var lookUp =[];

function preload() {
  goalsTable = loadTable("UNgoaldescriptions.csv", "csv");
  categoryTable = loadTable("UNcategories.csv", "csv");
}


function setup() {
  noCanvas();
  
  // load categories
  for(var l = 0; l < categoryTable.getColumnCount(); l++) {
    for (var k = 1; k < categoryTable.getRowCount(); k++) {
       if (categoryTable.get(k,l) !== undefined && categoryTable.get(k,l) !== "") { 
        lookUp[categoryTable.get(k,l)] = categoryTable.get(0,l);
       }
    }
  }

  // load descriptions
  wordsToDisplay = [];
  var words = goalsTable.get(r,2).split(" "); //description broken down into single words in an array
  for(var i = 0; i < words.length; i++) {
    if(lookUp[words[i]]) {
      wordsToDisplay.push(
        {
          word: words[i],
          category: lookUp[words[i]]
        }
      );

    } 
    else {
      wordsToDisplay.push({word: words[i]});
    }
  }
}

function draw() {
  colorMode(RGB);
  background(255);
  
  //print goal number, goal title and goal description
  var goalnum = createSpan(goalsTable.get(r,0));
  goalnum.style("font-size", "100pt");
  
  var title = createSpan(goalsTable.get(r,1));
  title.style("font-size", "60pt");
  title.style("padding", "10%");
  
  for(var j = 0; j < wordsToDisplay.length; j++){
    var div = createDiv(wordsToDisplay[j].word + " ");
    if (wordsToDisplay[j].category) {
      div.style("color", categories[wordsToDisplay[j].category]);
    }
  }
  
  noLoop();
}

function keyTyped() {
  // print(key);
  if (key === ">") { // what is the value of a right arrow and left arrow?
    r++;
    if (r > 17)
      r = 17; // bound the toggling ability
  
    loop();
  }
  else if (key === "<") { // left arrow pressed
    r--;
    if (r < 1)
      r = 1;
  
    loop();
  }
}
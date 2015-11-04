var goalsTable, categoryTable, goalnum, title;
var r = 0; //global row var to toggle between goals

var wordsToDisplay = [];
var lookUp = {};
var span = [];
var goalnum, title;

var categories = {
  "End Extreme Poverty": "red",
  "Fight Inequality and Injustice": "blue",
  "Fix Climate Change": "green"
};

function preload() {
  goalsTable = loadTable("UNgoaldescriptions.csv", "csv", "header");
  categoryTable = loadTable("UNcategories.csv", "csv");
}

function setup() {
  noCanvas();
  noLoop();
  parseData();
}

function parseData() {
  // load categories
  for(var l = 0; l < categoryTable.getColumnCount(); l++) {
    for (var k = 1; k < categoryTable.getRowCount(); k++) {
       if (categoryTable.get(k,l) !== undefined && categoryTable.get(k,l) !== "") { 
        lookUp[categoryTable.get(k,l)] = categoryTable.get(0,l);
       }
    }
  }

  // load descriptions

  goalnum = createSpan(goalsTable.get(r, 0)); // ds
  goalnum.style("font-size", "100pt"); //ds
  title = createSpan(goalsTable.get(r, 1)); // ds
  title.style("font-size", "60pt"); // ds
  title.style("padding", "10%"); // ds
  
  //var span = [];
  

}

function draw() {
  //print goal number, goal title and goal description
  
  // visibility: hide
  
  title.html("");
  goalnum.html("");
  // span.html("");
  title.html(goalsTable.get(r, 1));
  goalnum.html(goalsTable.get(r, 0));
  
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

  // goalnum = createSpan(goalsTable.get(r, 0)); // ds
  // goalnum.style("font-size", "100pt"); //ds
  // title = createSpan(goalsTable.get(r, 1)); // ds
  // title.style("font-size", "60pt"); // ds
  // title.style("padding", "10%"); // ds
  
  var span = [];

  for(var j = 0; j < wordsToDisplay.length; j++){
    span[j] = createSpan(wordsToDisplay[j].word + " ");
    span[j].style("color", categories[wordsToDisplay[j].category]);
  }
  
  for(var j = 0; j < wordsToDisplay.length; j++){
    span[j].html("");
    // span[j] = createSpan(wordsToDisplay[j].word + " ");
    span[j].html(wordsToDisplay[j].word + " ");
    // span[j].style("color", categories[wordsToDisplay[j].category]);
  }
}

function keyTyped() {
  print(r);
  if (key === ">") { // what is the value of a right arrow and left arrow?
    r++;
    if (r > 16)
      r = 16; // bound the toggling ability
  }
  else if (key === "<") { // left arrow pressed
    r--;
    if (r < 0)
      r = 0;
  }
  draw();
}
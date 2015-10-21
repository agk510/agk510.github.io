var goalsTable, categoryTable;
// var div;
var r = 0; //global row var to toggle between goals

var goalnum, title;
var span = [];

var categories = {
  "End Extreme Poverty": "red",
  "Fight Inequality and Injustice": "blue",
  "Fix Climate Change": "green"
};

var wordsToDisplay = [];
var lookUp =[];

function setup() {
  noCanvas();
  noLoop();
  goalsTable = loadTable("UNgoaldescriptions.csv", "csv");
  categoryTable = loadTable("UNcategories.csv", "csv");
}

function loadCats() {
  // load categories
  for(var l = 0; l < categoryTable.getColumnCount(); l++) {
    for (var k = 1; k < categoryTable.getRowCount(); k++) {
       if (categoryTable.get(k,l) !== undefined && categoryTable.get(k,l) !== "") { 
        lookUp[categoryTable.get(k,l)] = categoryTable.get(0,l);
       }
    }
  }
}

function loadDescrip() {

  // load description
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
  // console.log(wordsToDisplay); not working--why?
}


function draw() {

  goalnum = createSpan(goalsTable.get(r, 0)); // ds
  goalnum.style("font-size", "100pt"); //ds
  title = createSpan(goalsTable.get(r, 1)); // ds
  title.style("font-size", "60pt"); // ds
  title.style("padding", "10%"); // ds
  
  for(var j = 0; j < wordsToDisplay.length; j++){
    span[j] = createSpan(wordsToDisplay[j].word + " ");
    // if (wordsToDisplay[j].category)
      span.style("color", categories[wordsToDisplay[j].category]);
    
  }
  // can't get the displayed description to swith with the goal number -- stuck on Goal 1 description
}

function keyTyped() {
  // print(key);
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
  
  // print(goalsTable.get(r, 0));
  // print(goalsTable.get(r, 1));

  // ds 
  //print goal number, goal title and goal description
  title.html("");
  goalnum.html("");
  // span.html("");
  title.html(goalsTable.get(r, 1));
  goalnum.html(goalsTable.get(r, 0));
  
  // parseData();
  loadDescrip();
  draw();
}
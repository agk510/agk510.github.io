var table;

function preload() {
  table = loadTable("http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.csv", "csv");
  // table = loadTable("MacintoshHD/Users/agk/Downloads/all_hour (4).csv", "csv");
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  ellipseMode(CENTER);
  textAlign(CENTER); // ds to center the text labels
  
}

function draw() {
  //set drawing window and background
  translate(0, windowHeight / 2);
  background('lavender');
  var drawWidth = width / table.getRowCount();

  //retrieve magnitudes and dates from table
  for (var r = 1; r < table.getRowCount(); r++) {
    var magnitude = table.get(r, 4);
    var dQuake = new Date(table.get(r, 0)); // ds following the parseEarthquakes approach of creating a 'new' Data object
    
    //label each earthquake with mag and reformatted date
    fill(100);
    // var ft = new SimpleDateFormat ("HH:mm:ss zzz");
    textSize(12);
    text("Mag: " + magnitude + "\n" + dQuake, r * drawWidth, 120);
    // text(ft.format(dQuake), 80 + r * 100, 125);

    //draw concentric circles with number of rings based on magnitude 
    for (var i = 0; i < magnitude; i++) {
      fill(225, 17, 58, 100 - 10 * i);
      noStroke();
      ellipse(r * drawWidth, 0, 50 + i * 25, 50 + i * 25);
      
      //if mouse scrolls over quake visual, location will pop up
      if(r * drawWidth - (50 + i * 25)/2 < mouseX) {
        if(r * drawWidth + (50 + i * 25)/2 > mouseX) {
          if(mouseY > (windowHeight / 2) - (50 + i * 25)/2) {
           if(mouseY < (windowHeight / 2) + (50 + i * 25)/2) {
              fill (225, 17, 58);
              textSize (14);
              text("Epicenter: " + table.get(r, 13), width/2, 200);
            }
          }
        }
      }
    }
  }
  
  //print position of mouse (for testing)
  //text("Mouse position: " + mouseX + ", " + mouseY, width/2, 250);

  //print total number of earthquakes in last hour
  fill(100);
  textSize(20);
  if (table.getRowCount() === 2) {
    text("In the last hour, " + (table.getRowCount() - 1) + " earthquake has occurred...", width/2, -200);
  }
  else {
    text("In the last hour, " + (table.getRowCount() - 1) + " earthquakes have occurred...", width/2, -200);
  }

}

const images = {Sun: "https://cdn.pixabay.com/photo/2018/01/26/13/04/sun-3108640_960_720.png",
                Mercury: "https://cdn.pixabay.com/photo/2021/04/05/15/44/mercury-6153848_1280.png",
                Venus: "https://cdn.pixabay.com/photo/2021/04/05/15/44/venus-6153849_1280.png",
                Earth: "https://cdn.pixabay.com/photo/2021/04/05/15/48/earth-6153854_1280.png",
                Mars: "https://cdn.pixabay.com/photo/2021/04/05/15/52/mars-6153858_960_720.png",
                Jupiter: "https://cdn.pixabay.com/photo/2021/04/05/15/52/jupiter-6153859_960_720.png",
                Saturn: "https://cdn.pixabay.com/photo/2021/04/05/15/53/saturn-6153860_960_720.png",
                Uranus: "https://cdn.pixabay.com/photo/2021/04/05/15/54/uranus-6153865_960_720.png",
                Neptune: "https://cdn.pixabay.com/photo/2021/04/05/15/55/neptune-6153867_960_720.png"};

function getApi(id) {
  const url = "https://api.le-systeme-solaire.net/rest/bodies/" + id;
  let result = fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json);
      console.log(Object.keys(json));
      return json;
    }).then(json => setPlanetName(json)
    ).then(json => writeInfo(json)
    ).then(json => setBackground(json)
  );
}

function addGap() {
  var toAdd = document.getElementById("fixed-container").offsetHeight;
  document.getElementById("gap").style.height = toAdd + "px";
}

function writeInfo(json) {
  var toAdd = [];
  let results = "";
  var avgTemp = json.avgTemp;
  if (avgTemp != 0 && avgTemp != "") {
    avgTemp = "Average Temperature: " + avgTemp + "K";
    toAdd.push(avgTemp);
  }
  var year = json.sideralOrbit;
  if (year != 0 && year != "") {
    year = "Time to complete one orbit: " + year + " earth days";
    toAdd.push(year);
  }
  var day = json.sideralRotation;
  if (day != 0 && day != "") {
    day = "Time to complete one rotation: " + day + " hours";
    toAdd.push(day);
  }
  var gravity = json.gravity;
  if (gravity != 0 && gravity != "") {
    gravity = "Surface gravity: " + gravity + " m/s<sup>2</sup>";
    toAdd.push(gravity);
  }
  var radius = json.meanRadius;
  if (radius != 0 && radius != "") {
    radius = "Mean radius: " + radius + " km";
    toAdd.push(radius);
  }
  var per = json.perihelion;
  if (per != 0 && per != "") {
    per = "Closest distance from the sun: " + per + " km";
    toAdd.push(per);
  }
  var ap = json.aphelion;
  if (ap != 0 && ap != "") {
    ap = "Farthest distance from the sun: " + ap + " km";
    toAdd.push(ap);
  }
  var inclination = json.inclination;
  if (inclination != 0 && inclination != "") {
    inclination = "Orbital inclination: " + inclination + "°";
    toAdd.push(inclination);
  }
  var mass = json.mass.value;
  if (mass != 0 && mass != "") {
    mass = "Mass: " + mass + " * 10<sup>" + json.mass.massExponent + "</sup> kg";
    toAdd.push(mass);
  }
  var vol = json.vol.volValue;
  if (vol != 0 & vol != "") {
    vol = "Volume: " + vol + " * 10<sup>" + json.vol.volExponent + "</sup> km<sup>3</sup>";
    toAdd.push(vol);
  }
  var den = json.density;
  if (den != 0 && den != "") {
    den = "Density: " + den + " g*cm<sup>3</sup>";
    toAdd.push(den);
  }
  var tilt = json.axialTilt;
  if (tilt != 0 && tilt != "") {
    tilt = "Axial tilt: " + tilt + "°";
    toAdd.push(tilt);
  }

  for (var i = 0; i < toAdd.length; i++) {
    results += "<p>";
    results += toAdd[i];
    results += "</p>";
  }

  document.getElementById("planet-facts").innerHTML = results;
  console.log(avgTemp, year, day, gravity, radius);
  return json;
}

function openInfo() {
  document.getElementById("fixed-container").style.display = "flex";
}

function closeInfo() {
  document.getElementById("fixed-container").style.display = "none";
  document.getElementById("gap").style.height = "0";
}

function setPlanetName(json) {
  openInfo();
  let results = "";
  let name = json.englishName;
  results += "Name: ";
  results += name;
  document.getElementById("planet-name").innerHTML = results;
  return json;
}

function setBackground(json) {
  let name = json.englishName;
  console.log(images[name]);
  var element = document.getElementById("info-box");
  element.style.backgroundImage = "url(" + images[name] + ")";
  var imageSize;
  if (name == "Saturn") {
    imageSize = element.offsetWidth * 2.25;
  } else {
    imageSize = element.offsetWidth * 1.5;
  }
  element.style.backgroundSize = imageSize + "px";
  var pixelDifWidth = element.offsetWidth - imageSize;
  var pixelDifHeight = element.offsetHeight - imageSize;

  if (screen.width > 650) {
    var offsetCrop = imageSize / -2;
    var offsetMid = pixelDifWidth * .5;
    element.style.backgroundPosition = "left " + offsetMid + "px bottom " + offsetCrop + "px";
  }
  else {
    var offsetCrop = imageSize / -2;
    var offsetMid = pixelDifHeight * .5;
    console.log(offsetCrop, offsetMid);
    element.style.backgroundPosition = "right " + offsetCrop + "px bottom " + offsetMid + "px";
  }
  addGap();

  return json;
}

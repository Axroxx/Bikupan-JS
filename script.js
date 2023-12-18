var hex_id = 1;
var bee_id = 1;

function createHex(type, hexClass, amt) {
  let str = `<div class="hex-container">`;
  for (let i = 0; i < amt; i++){
    if (type != "bee"){
    str += `<div class="hex ${hexClass}" id="${hex_id}"></div>`;
      hex_id++;
    }  else {
    str += `<div class="hex ${hexClass}" id="b${bee_id}"></div>`;
      bee_id++;
  } }
  
  str += `</div>`;
  return str;
}


// Select an existing element on your webpage
var body = document.getElementsByTagName('body')[0];

// Use innerHTML to insert the new HTML
for (let row = 0; row < 4; row++) {
  body.innerHTML += createHex("","l1", 4);
  body.innerHTML += createHex("","l2", 5);
  body.innerHTML += createHex("bee","b1", 4);
  body.innerHTML += createHex("","l3", 5);
  body.innerHTML += createHex("","l1", 4);
  if (bee_id < 25){
    body.innerHTML += createHex("bee","b2", 3);}
}

const hexagons = document.querySelectorAll('.hex');



for (let i = 0; i < hexagons.length; i++) {
  const hexagon = hexagons[i];
  if (!hexagon.id.includes("B")) {
    hexagon.addEventListener('click', function() {
      selectedHex = hexagon;
    });
  } else {
    hexagon.textContent = hexagon.id
  }
}



document.addEventListener('keydown', function (event) {
  if (selectedHex) {
    selectedHex.textContent = event.key.toUpperCase();
    selectedHex = null;
  }
});
/*
  hexagons.forEach(hexagon => {
    if (!hexagon.id.includes("b"))
    hexagon.textContent = hexagon.id;
  });

*/

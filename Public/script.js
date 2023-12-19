var hex_id = 1;
var bee_id = 1;

function createHex(type, hexClass, amt) {
  let str = `<div class="hex-container">`;
  for (let i = 0; i < amt; i++) {
    if (type !== "bee") {
      str += `<div class="hex ${hexClass}" id="${hex_id}"></div>`;
      hex_id++;
    } else {
      str += `<div class="hex ${hexClass}" id="b${bee_id}"></div>`;
      bee_id++;
    }
  }

  str += `</div>`;
  return str;
}

// Select an existing element on your webpage
var hiveContainer = document.querySelector('.hive-container');

// Use innerHTML to insert the new HTML under hive-container
for (let row = 0; row < 4; row++) {
  hiveContainer.innerHTML += createHex("", "l1", 4);
  hiveContainer.innerHTML += createHex("", "l2", 5);
  hiveContainer.innerHTML += createHex("bee", "b1", 4);
  hiveContainer.innerHTML += createHex("", "l3", 5);
  hiveContainer.innerHTML += createHex("", "l1", 4);
  if (bee_id < 25) {
    hiveContainer.innerHTML += createHex("bee", "b2", 3);
  }
}

const hexagons = document.querySelectorAll('.hex');
var selectedHex;

for (let i = 0; i < hexagons.length; i++) {
  const hexagon = hexagons[i];
  if (!hexagon.id.includes("B")) {
    hexagon.addEventListener('click', function () {
      selectedHex = hexagon;
    });
  } else {
    hexagon.textContent = hexagon.id;
  }
}

document.addEventListener('keydown', function (event) {
  if (selectedHex) {
    selectedHex.textContent = event.key.toUpperCase();
    selectedHex = null;
  }
});

var formsContainer = document.querySelector('.forms-container');

for (let i = 1; i <= 25; i++) {
  var form = document.createElement('form');
  form.className = 'form';

  var input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Word nr ' + i;
  input.setAttribute('data-hex-id', i);

  form.appendChild(input);

  formsContainer.appendChild(form);
}

// Submit button click event
// Submit button click event
const submit_button = document.querySelector('.submit-button');

submit_button.addEventListener('click', function () {
  const forms = document.querySelectorAll('.form');
  const inputValues = [];

  forms.forEach(form => {
    const input = form.querySelector('input');
    const inputValue = input.value;
    const hexId = input.getAttribute('data-hex-id');
    inputValues.push({ hexId, inputValue });
  });

  // Log the input values (you can modify this part to send data to the server)
  console.log(inputValues);

  // Send the data to the server using AJAX (you can use fetch or other methods)
  fetch('/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ inputValues }),
  })
    .then(response => response.text())
    .then(data => {
      console.log('Server response:', data);
      // Handle the server response if needed
    })
    .catch(error => {
      console.error('Error:', error);
    });
});

const express = require('express');
const { spawn } = require('child_process');

const app = express();
const port = 3000;

// Serve static files (HTML, CSS, etc.) from the "public" directory
app.use(express.static('public'));

// Parse JSON requests
app.use(express.json());

// Handle the submit request
app.post('/submit', (req, res) => {
  const { inputValues } = req.body;
  console.log('Received input values:', inputValues);

  // Replace the following line with your Python script execution logic
  // This is just an example and may need modification based on your actual script
  const python = spawn('python', ['run.py', ...inputValues]);

  let dataToSend = '';

  python.stdout.on('data', function (data) {
    console.log('Pipe data from Python script ...');
    dataToSend += data.toString();
  });

  python.on('close', (code) => {
    console.log(`Child process closed all stdio with code ${code}`);
    res.send(dataToSend);
  });
});

// Serve your HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => console.log(`Server listening on port ${port}`));

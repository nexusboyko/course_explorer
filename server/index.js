const axios = require('axios');

const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');

const app = express();
const canvasRouter = express.Router();
const scrapeRouter = express.Router();

const { PythonShell } = require('python-shell');

app.use(cors());
app.use('/canvas', canvasRouter);
app.use('/scrape', scrapeRouter);

// Canvas O-Auth Token (user-provided for API functions)
const AUTH = '10~X7GU0oHYFXM1c9cQa734eUYKWEHeFQ9jmobgrvHjKKcKwDwKj6dljWxcJTczYcvZ';

canvasRouter.get('/', function (req, res) {
  axios({
      url: "https://canvas.instructure.com/api/v1/courses",
      method: "GET",
      withCredentials: false,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + AUTH
      }
      // data: formData,
  })
  .then((response) => {
    res.send(response.data);
  })
  .catch((err) => {
    console.log(err);
  });
});

canvasRouter.get('/:id/assignments', function (req, res) {
  axios({
      url: `https://canvas.instructure.com/api/v1/courses/${req.params.id}/assignments`,
      method: "GET",
      withCredentials: false,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + AUTH
      }
      // data: formData,
  })
  .then((response) => {
    res.send(response.data);
  })
  .catch((err) => {
    console.log(err);
  });
});

scrapeRouter.get('/cse', function (req, res) {
  PythonShell.run('../python/cse.py', null).then(results => {
    console.log('results\n', results);
    res.send(JSON.parse(results));
  }).then((err) => console.log(err));
});

app.get('/', (req, res) => {
  res.send({ text: 'Server' });
});

app.listen(8080, () => {
  console.log(`SERVER RUNNING...http://localhost:8080/`);
});

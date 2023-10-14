const axios = require('axios');

const express = require('express');
const cors = require('cors');
const app = express();
const canvasRouter = express.Router();

app.use(cors());
app.use('/canvas', canvasRouter);
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
    // console.log(response.data);
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
    // console.log(response.data);
    res.send(response.data);
  })
  .catch((err) => {
    console.log(err);
  });
});


app.get('/', (req, res) => {
  res.send({ text: 'Server' });
});

app.listen(8080, () => {
  console.log('SERVER RUNNING...' + `http://localhost:8080/`);
});

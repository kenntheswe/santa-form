// server.js
// where your node app starts

// init project
const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser());
app.use(morgan());

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
// parse data
app.use(bodyParser.urlencoded({ extended: false }));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', (request, response) => {
  response.sendFile(__dirname + '/views/index.html');
});

// post wish
app.post('/wish', (request, response) => {
  console.log(request.params);
  const { username } = request.body;
  const { wish } = request.body;


  userService.updateData().then(() => {
    const userInfo = userService.getData(username);
  })

  if (!userInfo) {
    response.sendFile(__dirname + '/views/invalid-user.html')
  }
})

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

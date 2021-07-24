// server.js
// where your node app starts

// init project
const express = require('express');
const morgan = require('morgan');
const app = express();
const moment = require('moment');
const user = require('./services/user');
const sendEmail = require('./services/sendEmail');

app.use(express.json());
app.use(morgan('combined'));

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
// parse data
app.use(express.urlencoded());

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', (request, response) => {
  response.sendFile(__dirname + '/views/index.html');
});

// post wish
app.post('/wish', (request, response) => {
  const { username } = request.body;
  const { wish } = request.body;


  user.updateData().then(() => {
    // username validation
    const userInfo = user.getData(username);
  })

  // invalid user
  if (!userInfo) {
    response.sendFile(__dirname + '/views/invalid-user.html');
    return;
  }

  const dateCheck = userInfo.birthdate;
  const today = moment();
  const age = today.diff(dateCheck, "years");

  // age validation
  if (age > 10) {
    response.sendFile(__dirname + '/views/invalid-user.html');
    return;
  }

  // wish validation
  if (!wish) {
    response.sendFile(__dirname + '/views/invalid-user.html');
    return;
  }

  // 
  sendEmail.add(userInfo.username, userInfo.address, wish);
  //
  response.sendFile(__dirname + '/views/invalid-user.html');
})

sendEmail.init();

// listen for requests :)
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

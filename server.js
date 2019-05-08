var express = require("express");
var app = express();
var cfenv = require("cfenv");
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//serve static file (index.html, images, css)
app.use(express.static(__dirname + '/views'));

const USERS = [];

app.post('/cadastrar', (req, res) => {
  const info = req.body;

  USERS.push({ email: info.email, password: info.password })

  res.redirect('/');
})

app.post('/login', (req, res) => {
  const credentials = req.body;
  
  for (let cadastro of USERS) {
    if (cadastro.email == credentials.email) {
      if (cadastro.password == credentials.password) {
        res.redirect('/vacinas.html');
        return;
      }
    }
  }
  res.redirect('/login.html');
});

app.get('/', (req, res) => {
  res.redirect('/cadastro.html');
});

app.get('/login', (req, res) => {
  res.redirect('/login.html');
})

app.get('/vacinas', (req, res) => {
  res.redirect('/vacinas.html');
})

app.get('/mapa', (req, res) => {
  res.redirect('/mapa.html');
})


var port = process.env.PORT || 3000
app.listen(port, function () {
  console.log("To view your app, open this link in your browser: http://localhost:" + port);
});

const express = require('express');
const bodyParser = require('body-parser');
const authMiddleware = require('./middleware/auth');

// Create the app
const app = express();

app.use(require('cookie-parser')());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(require('express-session')(
  { secret: 'secret', resave: false, saveUninitialized: false }
));
app.use(authMiddleware.initialize);


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// cakes router/controller
const cakesRouter = require('./routes/cakes');
app.use('/cakes', cakesRouter);
app.use('/auth', require('./routes/auth'));

app.get('/', (req, res) => {
  res.json({
    resources: [{
      cakes: '/cakes'
    }]
  })
});

module.exports = app

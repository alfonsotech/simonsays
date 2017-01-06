const express = require('express')
const app = express()
const pug = require('pug')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bodyParser = require('body-parser')
const database = require('./database/db')

app.set('view engine', 'pug')
app.set('views', __dirname + 'views')

app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}))

app.use(bodyParser.json())
// app.use(express.bodyParser())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err) }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' })
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' })
      }
      return done(null, user)
    })
  }
))



app.use(express.static('public'))

app.get('/', function(request, response) {
  response.render(__dirname + '/views/login.pug', {failure: false})
})

app.get('/failure', function(request, response) {
  response.render(__dirname + '/views/login.pug', {failure: true})
})

app.get('/game', function(request, response) {
  response.render(__dirname + '/views/index.pug')
})

app.get('/signup', function(request, response) {
  response.render(__dirname + '/views/signup.pug')
})

app.post('/signup', (request, response) => {
  console.log('request.body', request.body.username )
  database.createUser(request.body.username, request.body.password).then( user => {
    console.log('user', user)
    response.send('hello')
  })
})

app.post('/login',
    passport.authenticate('local', {
    successRedirect: '/game',
    failureRedirect: '/failure',
    failureFlash: false
  })
)

app.listen(3000, function() {
  console.log('listening on port:3000')
})

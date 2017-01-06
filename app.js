const express = require('express')
const app = express()
const pug = require('pug')
const passport = require('passport')
const GitHubStrategy = require('passport-github').Strategy

const User = {
  findOrCreate: (info, cb) => {
    // info.githubId
    cb(null, info)
  }
}

app.use(passport.initialize())

passport.use(new GitHubStrategy({
    clientID: '863ba309b31f9ee84476',
    clientSecret: 'bb0cfa254c26b21a7df663c03a785f8ab47725fb',
    callbackURL: "http://127.0.0.1:3000/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return cb(err, user)
    })
  }
))

// App configuration
app.set('view engine', 'pug')
app.set('views', __dirname + 'views')
app.use(express.static('public'))

passport.serializeUser(function(user, cb) {
  cb(null, user);
})

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
})

// Routes
app.get('/auth/github',
  passport.authenticate('github'))

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/game')
})

app.get('/', function(request, response) {
  response.render(__dirname + '/views/login.pug')
})

app.get('/game', function(request, response) {
  response.render(__dirname + '/views/index.pug')
})

app.listen(3000, function() {
  console.log('listening on port:3000')
})

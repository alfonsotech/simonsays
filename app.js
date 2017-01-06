const express = require('express')
const app = express()
const pug = require('pug')
const bodyParser = require('body-parser')


app.set('view engine', 'pug')
app.set('views', __dirname + 'views')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

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

app.listen(3000, function() {
  console.log('listening on port:3000')
})

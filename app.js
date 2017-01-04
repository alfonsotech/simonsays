const express = require('express')
const app = express()
const pug = require('pug')
const normalize = require('normalize')

app.set('view engine', 'pug')
// app.set('/', __dirname + '/views') //double check this
app.set('views', __dirname + 'views')

// app.use('/', index)
app.use(express.static('public'))

app.get('/', function(request, response) {
  // response.send('Hello Tacos!')
  // response.render(index)
  response.render(__dirname + '/views/index.pug')
})

app.listen(3000, function() {
  console.log('listening on port:3000');
})

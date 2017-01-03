const express = require('express')
const app = express()
const pug = require('pug')

//app.set('view engine', 'pug')
//app.set('/', __dirname + '/') //double check this

//app.use('/', index)

app.get('/', function(request, response) {
  response.send('Hello Tacos!')
})

app.listen(3000, function() {
  console.log('listening on port:3000');
})

const express = require('express')

const path = require('path')
const fs = require('fs')

const app = express()

app.engine('html', require('ejs').renderFile)
app.set('views', path.join(__dirname, 'templates'))
app.set('view engine', 'html')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

let server = app.listen(8080)

require('./routes')(app)
require('./sockets')(server)
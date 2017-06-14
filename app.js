var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var nodemailer = require('nodemailer')

var app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', function(req, res) {
  res.render('index', {title: 'Welcome to Diana Prince Training'})
})

app.get('/about', function(req, res) {
  res.render('about')
})

app.get('/contact', function(req, res) {
  res.render('contact')
})

app.post('/contact/send', function(req, res) {
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'pllearns@gmail.com',
      password: process.env.USER_PASSWORD
    }
  })

  var mailOptions = {
    from: 'Phillip Lorenzo <pllearns@gmail.com>',
    to: 'phillip.lorenzo@gmail.com',
    subject: 'Website Submission',
    text: 'This is a simple message confirming submission to Name: '+req.body.name+'Email: '+req.body.email+'Message: '+req.body.message,
    html: '<p>This is a simple message confirming submission</p><ul><li>Name: ' + req.body.name + '</li><li>Email: '+req.body.email+ '</li><li>Message: ' +req.body.message+ '</li></ul>'
  }

  transporter.sendMail(mailOptions, function(error, info) {
    if(error) {
      console.log(error)
      res.redirect('/')
    } else {
      console.log('Message sent: ' + info.response)
      res.redirect('/')
    }
  })
})

app.listen(3000)
console.log('server is running on port 3000')
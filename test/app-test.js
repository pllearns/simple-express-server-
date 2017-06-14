const request = require('supertest')
const express = require('express')

const app = express()

app.get('/', function(req, res) {
  res.status(200).json({name: 'Diana'})
})

describe('GET /', function() {
  it('responds with Simple JSON', function(done) {
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  })
})



// server.js

const http = require('http');
const app = require('./app');

const port = process.env.port || 3000;

const server = http.createServer(app);

server.listen(port);
/*
const express = require('express');
const jsonServer = require('json-server');
const jwt = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');
  
const secret = 'topSecret';
  
const app = express();
  
app.post('/login', (req, res) => {
  // check credentials, fetch userdata
  // ...
  const token = jsonwebtoken.sign(userdata, secret);
  res.json({ token });
});
  
app.use('/api', jwt({ secret }), jsonServer.router('db.json'));
  
app.listen(8080);
*/
/*
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})
*/
/** 
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query)
})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  // Continue to JSON Server router
  next()
})

// Use default router
server.use('/api', router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})
**/

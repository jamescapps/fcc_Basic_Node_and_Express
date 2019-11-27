console.log("Hello World");
var express = require('express');
var app = express();
var bodyParser = require("body-parser")


// --> 7)  Mount the Logger middleware here
/*app.use(function mWare(req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip)
  next()
})

// --> 11)  Mount the body-parser middleware  here*/
app.use(bodyParser.urlencoded({ extended: false }))

 /*1) Meet the node console. */


/** 2) A first working Express Server 
app.get("/", handle)

function handle(req, res) {
  res.send("Hello Express");
}*/

/** 3) Serve an HTML file */
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html")
})

/** 4) Serve static assets  */
app.use(express.static( __dirname + "/public"))

/** 5) serve JSON on a specific route */
/*app.get("/json", function(req, res) {
  res.json({
    "message": "Hello json"
  })
})*/

/** 6) Use the .env file to configure the app */

  app.get('/json', function(req, res) {
  let response = {"message": "Hello json"};
  if (process.env.MESSAGE_STYLE == 'uppercase') {
    response.message = response.message.toUpperCase()
    }
  res.json(response)
})


 
/** 7) Root-level Middleware - A logger */
//  place it before all the routes !


/** 8) Chaining middleware. A Time server */
app.get("/now", function(req, res, next) {
  req.time = new Date().toString()
  next();
}, function (req, res) {
  res.send({
      time: req.time
    })
  }
)

/** 9)  Get input from client - Route parameters */
app.get("/:word/echo", function (req, res) {
  const {word} = req.params
  res.json ({
    echo: word
  })
})

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>
app.get("/name", function (req, res) {
  var firstName = req.query.first
  var lastName = req.query.last
  
  res.json({
    name: `${firstName} ${lastName}`
  })
}) 
  
/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !


/** 12) Get data form POST  */
app.post("/name", function(req, res) {
  var fullName = req.body.first + " " + req.body.last
  res.json({
    name: fullName
  })
})


// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;

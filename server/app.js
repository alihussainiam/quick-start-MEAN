let express = require('express')
let ExpressSession = require('express-session')
const SessionFileStore = require('session-file-store')(ExpressSession)

let session = ExpressSession({
  secret: 'my-secret',
  resave: true,
  saveUninitialized: true,
  store: new SessionFileStore()
})


let bodyParser = require('body-parser')

let api = require('./api/index')

let config = require('./config/config')

let app = express()
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use(bodyParser.json())

app.use(session)


app.use(config.apiBase, api)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  let err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

app.sessionObject = session

module.exports = app

import mongoose from 'mongoose'
import routes from './routes/index'
import session from 'express-session'
import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import passport from 'passport'
import { authenticate } from './src/account/passport'
import bodyParser from 'body-parser'

authenticate(passport)
var app = express()

app.set('trust proxy', true)

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

const port = process.env.PORT || 3000;

var dbURI = 'mongodb://localhost/ClimateBond'

mongoose.connect(dbURI)

mongoose.set('useCreateIndex', true)
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + dbURI)
})

mongoose.connection.on('error', function (err) {
  console.log('Mongoose default connection error: ' + err)
})

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection disconnected')
})

// mongoose.set('debug', true)

process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination')
    process.exit(0)
  })
})
// Middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(passport.initialize())
app.use(passport.session())

app.use('/', routes)

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

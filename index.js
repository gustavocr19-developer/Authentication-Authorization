//Express
const express = require('express')
const app = express()
const path = require('path')
const session = require('express-session')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000

//Mongo
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const mongo = process.env.MONGODB || 'mongodb://localhost:27017/noticias'

//Importing routes
const noticias = require('./routes/noticias')
const restrito = require('./routes/restrito')
const auth = require('./routes/auth')
const pages = require('./routes/pages')
const admin = require('./routes/admin')

//Importing EJS and Template
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(session({ secret: 'fullstack-master' }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use((req, res, next) => {
  if ('user' in req.session) {
    res.locals.user = req.session.user
  }
  next()
})

const createInitialUser = async () => {
  const total = await User.countDocuments({ username: 'gustavorodrigues' })
  if (total === 0) {
    const user = new User({
      username: 'user1',
      password: '1234',
      role: ['restrito', 'admin']
    })
    await user.save()

    const user2 = new User({
      username: 'user2',
      password: '1234',
      role: ['restrito']
    })
    await user2.save()

    console.log('user created')
  } else {
    console.log('user created skipped')
  }
}

//All application routes
app.use('/', pages)
app.use('/noticias', noticias)
app.use(auth)
app.use(admin)

//Middleware
app.use('/restrito', (req, res, next) => {
  if ('user' in req.session) {
    return next()
  }
  res.redirect('/login')
})
app.use('/restrito', restrito)


mongoose.connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    createInitialUser()
    app.listen(port, () => console.log('listening...'))
  })
  .catch(e => console.log(e))

const User = require('./models/user')

const user = new User({
  username: 'Gustavo',
  password: 'abc123'
})

user.save((console.log('opa')))
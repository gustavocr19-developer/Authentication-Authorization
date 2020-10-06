//Express
const express = require('express')
const app = express()
const path = require('path')
const session = require('express')
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000

//Mongo
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const mongo = process.env.MONGODB || 'mongodb://localhost:27017/noticias'

//Importing routes
const noticias = require('./routes/noticias')
const restrito = require('./routes/restrito')

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
      username: 'gustavorodrigues',
      password: 'abc123'
    })
    await user.save()
    console.log('user created')
  } else {
    console.log('user created skipped')
  }
}

//All application routes
app.get('/', (req, res) => res.render('index'))
app.use('/noticias', noticias)

//Middleware
app.use('/restrito', (req, res, next) => {
  if ('user' in req.session) {
    return next()
  }
  res.redirect('/login')
})
app.use('/restrito', restrito)

app.get('/login', (req, res) => {
  res.render('login')
})

const User = require('./models/user')

app.post('/login', async (req, res) => {
  const user = await User.findOne({ username: req.body.username })
  const isValid = await user.checkPassword(req.body.password)
  console.log(isValid)
  res.send({
    user,
    //isValid
  })
})

mongoose.connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    createInitialUser()
    app.listen(port, () => console.log('listening...'))
  })
  .catch(e => console.log(e))



const user = new User({
  username: 'Gustavo',
  password: 'abc123'
})

user.save((console.log('opa')))
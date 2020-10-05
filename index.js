//Express
const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 3000

//Mongo
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const mongo = process.env.MONGODB || 'mongodb://localhost:27017/noticias'


//Importing EJS and Template
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static('public'))

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



app.get('/', (req, res) => res.render('index'))


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
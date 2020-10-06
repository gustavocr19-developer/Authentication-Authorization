const express = require('express')
const router = express.Router()

router.use((req, res, next) => {
  if ('user' in req.session) {
    if (req.session.user.role.indexOf('admin') >= 0) {
      return next()
    } else {
      res.redirect('/')
    }
  }
})

router.get('/admin', (req, res) => res.send('admin'))

module.exports = router
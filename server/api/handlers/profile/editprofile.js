const { models } = require('../../../db')
const { User } = models

const { allPass, path, pick, pipe, merge } = require('ramda')

const validField = (p) => (obj) => Boolean(path([p], obj))

const validProfile = pipe(
    path(['body', 'profile']),
    allPass([
        validField('name'),
        validField('username')
    ]))

const validate = req => {
  if (!validProfile(req)) return Promise.reject('missing fields')

  return User.findOne({
      where: { username: req.body.profile.username }, 
      plain: true
  })
  .then(user =>
      user && user.id !== req.user.id ?
          Promise.reject('invalid user')
          : req.body.profile
  )
}

const validateUsername = (req, username, id) => {
  if (!validProfile(req)) return Promise.reject('missing fields')

  return User.findOne({
      where: { username, id: { $ne: id } }
  })
  .then(user =>
      user ?
          Promise.reject('username taken')
          : username
  )
}

module.exports = (req, res) => {
  validate(req)
    .then(validatedUser => validateUsername(req, validatedUser.username, validatedUser.id))
    .then(validatedUsername => {
      const updatedUser = merge({
        username: validatedUsername || req.body.profile.username,
      }, pick(['name', 'dob', 'bio'], req.body.profile))
      return User.update(updatedUser, { where: { id: req.user.id }, returning: true, plain: true })
    })
    .then(profile => res.status(200).json({profile}))
    .catch(error => res.status(400).json({error}))
}
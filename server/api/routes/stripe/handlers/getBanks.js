const { models } = requireDb
const { User } = models
const { merge, pick } = require('ramda')

const userAttributes = ['id', 'stripe_banks']

const validate = req =>
  User.findOne({
    where: { id: req.user.id },
    attributes: userAttributes
  })
  .then(user =>
      !user ?
          Promise.reject('invalid user')
          : user
  )

module.exports = (req, res) =>
  validate(req)
    .then(({stripe_banks}) => res.status(200).json({stripe_banks}))
    .catch(error => res.status(400).json({error}))

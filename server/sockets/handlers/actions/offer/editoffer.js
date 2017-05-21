const { models } = rootRequire('db')
const { Message, User, Offer } = models

const offerAttributes = ['id', 'state', 'product_name', 'price', 'price_type', 'productId', 'userId', 'seller_id']
const userAttributes = ['id', 'username', 'image']

const acceptOffer = (io, socket, action) => {
  const { user, offer, threadId } = action.payload
  const { username, image, token } = user
  const { timestamp } = offer
    Offer.findOne({ where: { id: offer.id, state: 'open' } })
      .then(foundOffer =>
        !foundOffer ? Promise.reject('No offer')
        : foundOffer
      )
      .then(validatedOffer =>
        Offer.update({ state: 'accepted' }, { where: { id: validatedOffer.id } })
      )
      .then(updatedOffer =>
        Message.findAll({
          include: [
            {
              model: Offer,
              attributes: offerAttributes
            },
            {
              model: User,
              attributes: userAttributes
            }
        ],
          where: { threadId }
        })
      )
      .then(messages =>
        socket.emit('action', {
          type: 'RECEIVE_ROOM_CHAT_MESSAGES',
          payload: {
            messages
          }
        })
      )
      .catch(error => console.log(error))
}

const rejectOffer = (io, socket, action) => {
  const { user, offer, threadId } = action.payload
  const { username, image, token } = user
  const { timestamp } = offer
    Offer.findOne({ where: { id: offer.id, state: 'open' } })
      .then(foundOffer =>
        !foundOffer ? Promise.reject('No offer')
        : foundOffer
      )
      .then(validatedOffer =>
        Offer.update({ state: 'rejected' }, { where: { id: validatedOffer.id } })
      )
      .then(updatedOffer =>
        Message.findAll({
          include: [
            {
              model: Offer,
              attributes: offerAttributes
            },
            {
              model: User,
              attributes: userAttributes
            }
        ],
          where: { threadId }
        })
      )
      .then(messages =>
        io.to(threadId).emit('action', {
          type: 'RECEIVE_ROOM_CHAT_MESSAGES',
          payload: {
            messages
          }
        })
      )
      .catch(error => console.log(error))
}

module.exports = { acceptOffer, rejectOffer }

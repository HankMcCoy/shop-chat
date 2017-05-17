const { models } = require('../../../db')
const { Product, Shop } = models

const productParams = ['id', 'name', 'slug', 'description', 'category', 'sub_category', 'price_type', 'price', 'image', 'shopId']

module.exports = (req, res) => {
  Shop.findOne({
    where: { slug: req.params.shopId },
    attributes: ['id']
  })
  .then(shop =>
    !shop ? Promise.reject('Invalid shop id')
    : shop
  )
  .then(shop =>
    Product.findOne({
      include: [{
        model: Shop,
        attributes: ['image', 'name', 'slug']
      }],
      where: { slug: req.params.id, shopId: shop.id },
      attributes: productParams
    })
  )
  .then(product => res.status(200).json({product}))
  .catch(error => res.status(400).json({error}))
}
import React from 'react'
import { connect } from 'react-redux'
import { Segment, Header, Image, Button } from 'semantic-ui-react'
import { pipe, path } from 'ramda'

import { productBuyNow, productAddToCart } from 'actions/orders'

import SocialMenu from 'components/SocialMenu'
import PurchaseButtons from 'components/Product/Cart/PurchaseButtons'
import ProductImageSegment from 'components/Product/Segment/ImageSegment'

const productUserId = path(['user', 'id'])

const getPrimaryRGB = path(['themes', 'primary', 'rgb'])
const getSecondaryRGB = path(['themes', 'secondary', 'rgb'])
const getBackgroundRGB = path(['themes', 'background', 'rgb'])
const getFontRGB = path(['themes', 'font', 'rgb'])

const toRGBStyle = rgba => !!rgba ? `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})` : `rgba(255,255,255,1)`

const getPrimary = pipe(getPrimaryRGB, toRGBStyle)
const getSecondary = pipe(getSecondaryRGB, toRGBStyle)
const getBackground = pipe(getBackgroundRGB, toRGBStyle)
const getFont = pipe(getFontRGB, toRGBStyle)

const UserView = ({
  orders,
  product,
  user,
  switchToProductAdmin,
  productBuyNow,
  productAddToCart,
}) =>
  <div className='product-container' style={{backgroundColor: getBackground(product)}}>
    <Image src={product.image || '/images/productholder.png'} className='product--image avatar-image product-image-underlay' />
    <Segment basic style={{display: 'flex', width: '100%', pointerEvents: 'none', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
      <ProductImageSegment>
        <Header as='h1' style={{color: getFont(product)}}>{product.name}</Header>
      </ProductImageSegment>
      <ProductImageSegment>
        <Header as='h4' style={{color: getFont(product)}}>{product.description || 'No description'}</Header>
      </ProductImageSegment>
      <ProductImageSegment>
        <Header as='h4' style={{color: getFont(product)}}>${product.price}</Header>
      </ProductImageSegment>
    </Segment>
    <Segment basic>
      {user.id === productUserId(product) ?
          <Segment compact>
            <Button fluid basic color='yellow' onClick={switchToProductAdmin}>Edit Product</Button>
          </Segment>
        :
        <Segment compact>
          <SocialMenu url={`https://kuwau.com/product/${product.slug}`} productId={product.id} />
          <PurchaseButtons />
        </Segment>
      }
    </Segment>
  </div>

const mapStateToProps = ({orders}) =>
({
  orders
})

const mapDispatchToProps = dispatch =>
({
  productBuyNow: product => dispatch(productBuyNow(product)),
  productAddToCart: product => dispatch(productAddToCart(product)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserView)

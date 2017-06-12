import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Segment, Header, Image, Button } from 'semantic-ui-react'
import { pipe, path } from 'ramda'

import { productBuyNow, productAddToCart } from 'actions/orders'

const productUserId = path(['user', 'id'])

const getPrimaryRGB = path(['themes', 'primary', 'rgb'])
const getSecondaryRGB = path(['themes', 'secondary', 'rgb'])
const getBackgroundRGB = path(['themes', 'background', 'rgb'])
const getSegmentRGB = path(['themes', 'segment', 'rgb'])
const getFontRGB = path(['themes', 'font', 'rgb'])

const toRGBStyle = rgba => !!rgba ? `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})` : `rgba(255,255,255,1)`

const getPrimary = pipe(getPrimaryRGB, toRGBStyle)
const getSecondary = pipe(getSecondaryRGB, toRGBStyle)
const getBackground = pipe(getBackgroundRGB, toRGBStyle)
const getSegment = pipe(getSegmentRGB, toRGBStyle)
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
      <Segment style={{pointerEvents: 'auto', backgroundColor: getSegment(product)}}>
        <Header as='h1' style={{color: getFont(product)}}>{product.name}</Header>
      </Segment>
      <Segment style={{pointerEvents: 'auto', backgroundColor: getSegment(product)}}>
        <Header as='h4' style={{color: getFont(product)}}>{product.description || 'No description'}</Header>
      </Segment>
      <Segment style={{pointerEvents: 'auto', backgroundColor: getSegment(product)}}>
        <Header as='h4' style={{color: getFont(product)}}>${product.price}</Header>
      </Segment>
      <Segment style={{pointerEvents: 'auto'}}>
          {user.id === productUserId(product) ?
            <Button type='button' basic onClick={() => switchToProductAdmin()} style={{justifyContent: 'center'}}>Edit Product</Button>
            :
          <Button.Group vertical fluid>
            <NavLink to='/checkout/review'>
              <Button type='button' basic color='green' onClick={() => productBuyNow(product)} style={{justifyContent: 'center'}}>Buy now</Button>
            </NavLink>
            <Button fluid basic color='green' onClick={() => productAddToCart(product)} style={{justifyContent: 'center'}}>Add to cart</Button>
          </Button.Group>
          }
      </Segment>
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

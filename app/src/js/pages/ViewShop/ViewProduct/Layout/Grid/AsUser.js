import React from 'react'
import { Grid, Segment, Header, Image } from 'semantic-ui-react'
import { pipe, path } from 'ramda'

import ProductCartMenu from 'components/Product/Cart/Menu'
import ProductGridSegment from 'components/Product/Segment/GridSegment'

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
  product,
  user
}) =>
  <div className='product-container' style={{backgroundColor: getBackground(product)}}>
    <Grid celled='internally'>
      <Grid.Row columns={2}>
        <Grid.Column width={8} stretched>
          <Segment basic>
            <ProductGridSegment>
              <Image src={product.image || '/images/productholder.png'} />
            </ProductGridSegment>
          </Segment>
        </Grid.Column>
        <Grid.Column width={8} stretched>
          <ProductGridSegment>
            <Header as='h1' style={{color: getFont(product)}}>{product.name}</Header>
          </ProductGridSegment>
          <ProductGridSegment>
            <Header as='h4' style={{color: getFont(product)}}>${product.price}</Header>
          </ProductGridSegment>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={2}>
        <Grid.Column width={8} stretched>
          {!!product.description && <ProductGridSegment>
            <Header as='h4' style={{color: getFont(product)}}>{product.description || 'No description'}</Header>
          </ProductGridSegment>}
        </Grid.Column>
        <Grid.Column width={8} stretched>
          {/*TODO*/}
        </Grid.Column>
      </Grid.Row>
    </Grid>
    <ProductCartMenu />
  </div>

export default UserView

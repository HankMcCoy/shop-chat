import React from 'react'
import { Button, Image, Header } from 'semantic-ui-react'
import { path } from 'ramda'

import ShareMenu from 'components/SocialMenu'
import ProfileLabel from 'elements/ProfileLabel'

import ShopChat from 'components/Chat'

import GridLayout from 'components/layouts/Grid'
import Products from './Products'


const Avatar = ({image}) =>
  <div className='ui image shop--image avatar-image'>
    <Image src={image || '/images/productholder.png'} />
  </div>

const getUsername = path(['user', 'username'])
const getUserImage = path(['user', 'image'])

const UserView = ({
  shop,
  user,
  switchToShopAdmin
}) =>
  <GridLayout
    Image={<Avatar image={shop.image} />}
    Canopy={<Products />}
    ChatBox={<ShopChat thread={shop} threadType='shop' />}
    Header={<Header as='h1'>{shop.name}</Header>}
    SubHeader={!!shop.description && <Header as='h4'>{shop.description}</Header>}
    Gutter={<ProfileLabel username={getUsername(shop)} image={getUserImage(user)} />}
    GutterRight={
      user.id === shop.userId ?
        <Button basic onClick={switchToShopAdmin}>Switch to Admin</Button>
        :
        <ShareMenu url={`https://kuwau.com/shop/${shop.slug}`} shopId={shop.id} />
    } />


export default UserView

import React from 'react'

import MenuButton from '../../elements/MenuButton'

export default
({
  user,
  toLogin,
  toSignup,
  toProducts,
  toShops,
  toGlobe,
  toPencil,
  toFreePencil,
  toSettings,
  toPower
}) =>
  <div>
    <div className='ui fluid bottom fixed menu menu--container'>
      <MenuButton onClick={toGlobe} icon='globe' text='public products' />
      {!user.isAuthenticated && <MenuButton onClick={toLogin} icon='sign in' text='login' />}
      {!user.isAuthenticated && <MenuButton onClick={toSignup} icon='add user' text='sign up' />}
      {user.isAuthenticated && <MenuButton onClick={toProducts} icon='sticky note' text='your products' />}
      {user.isAuthenticated && <MenuButton onClick={toShops} icon='book' text='your shops' />}
      {user.isAuthenticated && <MenuButton onClick={toPencil} icon='edit' text='start a product' />}
      {user.isAuthenticated && <MenuButton onClick={() => user.username && toSettings(user.username)} icon='setting' text='profile' />}
      {user.isAuthenticated && <MenuButton onClick={toPower} icon='power' text='logout' />}
    </div>
  </div>
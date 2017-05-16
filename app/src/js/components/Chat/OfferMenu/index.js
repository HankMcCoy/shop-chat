import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Button, Popup } from 'semantic-ui-react'

import ShopChatMenuForm from './form'

import { sendOffer, openOffer, closeOffer } from 'actions/chat'

class ShopChatMenu extends Component {
  componentWillMount() {
    this.props.closeOffer()
  }
  render() {
    const { user, products, sendOffer, shop, chat, openOffer, closeOffer } = this.props
    return (
      <Popup wide position='top right' on='click'
        trigger={<Button icon='dollar' className='offer-button' />}
        open={chat.offer.isOpen}
        onOpen={openOffer} onClose={closeOffer}>
          <Popup.Header>Make an Offer</Popup.Header>
          <Popup.Content>
            <ShopChatMenuForm
              products={products.list}
              onSubmit={values => {
                sendOffer(values.product, values.price, `shop${shop.id}`, user)
                closeOffer()
              }} />
          </Popup.Content>
      </Popup>
    )
  }
}


const mapStateToProps = ({user, products, shops, chat}) =>
({
  chat,
  user,
  products,
  shop: shops.current
})

const mapDispatchToProps = dispatch =>
({
  sendOffer: (product, price, roomId, user) => dispatch(sendOffer(product, price, roomId, user)),
  openOffer: () => dispatch(openOffer()),
  closeOffer: () => dispatch(closeOffer()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShopChatMenu)

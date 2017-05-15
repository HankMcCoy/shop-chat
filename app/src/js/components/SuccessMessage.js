import React from 'react'
import { connect } from 'react-redux'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

import { resetSignup } from 'actions/signup'
import { createProduct } from 'actions/products'

const SuccessMessage = ({visible, resetSignup}) =>
  <Modal open={visible} onClose={resetSignup} basic size='small'>
    <Header icon='mail' content='Success!' />
  <Modal.Content>
    <h3>Check your email for verification.</h3>
  </Modal.Content>
  <Modal.Actions>
    <Button color='green' onClick={resetSignup} inverted>
      <Icon name='checkmark' />
    </Button>
  </Modal.Actions>
</Modal>

const mapStateToProps = ({user}) =>
({
  user,
  visible: user.isRegistered
})

const mapDispatchToProps = dispatch =>
({
  resetSignup: () => dispatch(resetSignup()),
  createProduct: (product, user) => dispatch(createProduct(product, user)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SuccessMessage)

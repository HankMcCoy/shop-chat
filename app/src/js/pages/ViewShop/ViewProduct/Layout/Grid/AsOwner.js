import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Grid, Button, Label, Dimmer, Loader, Image, Header, Segment } from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'
import { length } from 'ramda'

import ProductAdminMenu from 'components/ProductAdminMenu'
import ProductLayoutMenu from 'components/ProductLayoutMenu'

import ShareMenu from 'components/SocialMenu'
import ImageCropper from 'components/ImageCropper'
import Dropzone from 'components/Dropzone'

import EditorField from 'elements/Input/EditorField'
import CheckboxField from 'elements/Input/CheckboxField'

import {
  openEditProductCropper,
  closeEditProductCropper,
  editProduct,
  deleteProduct,
  uploadEditProductImage,
  onUploadEditProductImageFailure,
  editProductField
} from 'actions/products'

import { validate } from './validators'
import { normalizePrice } from './normalize'

const Avatar = ({product, openEditProductCropper, onUploadEditProductImageFailure}) =>
  <Dropzone className='ui image editable avatar-image' onDropAccepted={openEditProductCropper} onDropRejected={onUploadEditProductImageFailure}>
    {product.image_loading && <Dimmer active><Loader /></Dimmer>}
    <Image src={product.image || '/images/productholder.png'} />
    {product.image_error && <Label basic color='red'>Invalid image</Label>}
  </Dropzone>

const NameField = ({isEditing, product, user, editProduct, editProductField}) =>
  <EditorField
    isEditing={product.focused === 'name'}
    placeholder='Name' name='name'
    onClick={() => editProductField('name')} onClickOutside={() => editProductField(null)}
    onSubmit={name => {
      if(length(name)) {
        editProduct({...product, name}, user)
      }
    }}>
    <Header as='h1'>{product.name}</Header>
  </EditorField>

const DescriptionField = ({isEditing, product, user, editProduct, editProductField}) =>
  <EditorField
    isEditing={isEditing}
    placeholder='Description' name='description'
    onClick={() => editProductField('description')} onClickOutside={() => editProductField(null)}
    onSubmit={description => editProduct({...product, description}, user)}>
    <Header as='h4'>{product.description || 'Add a description'}</Header>
  </EditorField>

const PublicField = ({product, user, editProduct, style}) =>
  <Field component={CheckboxField} name='is_public' label='Public' style={style} onSubmit={is_public => editProduct({...product, is_public}, user)} />

const PriceField = ({isEditing, product, user, editProduct, editProductField}) =>
  <EditorField
    isEditing={isEditing}
    placeholder='Price' name='price'
    normalize={normalizePrice}
    onClick={() => editProductField('price')} onClickOutside={() => editProductField(null)}
    onSubmit={price => editProduct({...product, price}, user)}>
    <Header as='h4'>${product.price}</Header>
  </EditorField>

class AdminGridView extends Component {
  render() {
    const {
      user,
      product,
      editProduct,
      deleteProduct,
      editProductField,
      openEditProductCropper,
      closeEditProductCropper,
      uploadEditProductImage,
      onUploadEditProductImageFailure,
    } = this.props
    return (
      <div>
        <ProductLayoutMenu>
          <div className='edit-product-container'>
            <Grid celled='internally'>
              <Grid.Row columns={2}>
                <Grid.Column width={8} stretched>
                  <Segment basic>
                    <Segment>
                      {product.isCropperOpen ?
                        <ImageCropper isOpen={product.isCropperOpen} image={product.imagePreview} uploadImage={img => uploadEditProductImage(img, product, user)} closeCropper={closeEditProductCropper} />
                        :
                        <Avatar product={product} openEditProductCropper={img => openEditProductCropper(img[0])} onUploadEditProductImageFailure={onUploadEditProductImageFailure} />
                      }
                    </Segment>
                  </Segment>
                </Grid.Column>
                <Grid.Column width={8} stretched>
                  <Segment compact>
                    <NameField isEditing={product.focused === 'name'} product={product} user={user} editProduct={editProduct} editProductField={editProductField} />
                  </Segment>
                  <Segment compact>
                    <PriceField isEditing={product.focused === 'price'} product={product} user={user} editProduct={editProduct} editProductField={editProductField} />
                  </Segment>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column width={8} stretched>
                  <Segment>
                    <DescriptionField isEditing={product.focused === 'description'} product={product} user={user} editProduct={editProduct} editProductField={editProductField} />
                  </Segment>
                </Grid.Column>
                <Grid.Column width={8} stretched>
                  <ShareMenu url={`https://kuwau.com/product/${product.slug}`} productId={product.id} />
                  <Segment>
                    <Button fluid basic color='red' onClick={() => deleteProduct(product.id, product.shopId, user)} style={{justifyContent: 'center'}}>Remove listing</Button>
                  </Segment>
                </Grid.Column>

              </Grid.Row>
            </Grid>
          </div>
          <ProductAdminMenu PublicField={<PublicField product={product} user={user} editProduct={editProduct} style={{position: 'absolute', left: '25px'}} />} />
        </ProductLayoutMenu>
      </div>
    )
  }
}

const ConnectedAdminGridView = reduxForm({
  form: 'editProduct',
  validate
})(AdminGridView)

const mapStateToProps = ({user, products}) =>
({
  user,
  product: products.current,
  initialValues: products.current
})

const mapDispatchToProps = dispatch =>
({
  deleteProduct: (productId, shopId, user) => dispatch(deleteProduct(productId, shopId, user)),
  editProduct: (product, user) => dispatch(editProduct(product, user)),
  uploadEditProductImage: (img, product, user) => dispatch(uploadEditProductImage(img, product, user)),
  onUploadEditProductImageFailure: () => dispatch(onUploadEditProductImageFailure()),
  editProductField: field => dispatch(editProductField(field)),
  openEditProductCropper: img => dispatch(openEditProductCropper(img)),
  closeEditProductCropper: () => dispatch(closeEditProductCropper()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConnectedAdminGridView)
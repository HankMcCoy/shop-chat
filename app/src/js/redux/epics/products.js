import {
  onFetchProductsSuccess,
  onFetchSingleProductSuccess,
  onEditProductSuccess,
  onDeleteProductSuccess,
  onCreateProductSuccess,
  onUploadProductImageSuccess,
  onUploadEditProductImageSuccess,
  onUploadGalleryProductImageSuccess,
  onUploadEditProductLayoutSuccess,
  onUploadEditProductThemeSuccess,
  onDeleteProductGalleryImageSuccess,
  onShareProductSuccess
} from 'actions/products'
import su from 'superagent'
import { Observable } from 'rxjs/Rx'

const API_HOST = '/api/v1'

const api = {
  fetchProducts: ({shopId, token}) => {
    const request = su.get(`${API_HOST}/products/${shopId}`)
      .set('Accept', 'application/json')
      .set('Authorization', token)
    return Observable.fromPromise(request)
  },
  fetchSingleProduct: ({productId, shopId, token}) => {
    const request = su.get(`${API_HOST}/products/${shopId}/${productId}`)
      .set('Accept', 'application/json')
      .set('Authorization', token)
    return Observable.fromPromise(request)
  },
  createProduct: ({product, shopId, token}) => {
   const request = su.post(`${API_HOST}/products/${shopId}`)
      .send({product})
      .set('Accept', 'application/json')
      .set('Authorization', token)
    return Observable.fromPromise(request)
  },
  shareProduct: ({name, email, message, token, url, productId}) => {
   const request = su.post(`${API_HOST}/products/share`)
      .send({name, email, message, token, url, productId})
      .set('Accept', 'application/json')
      .set('Authorization', token)
    return Observable.fromPromise(request)
  },
  uploadProductImage: ({image, token}) => {
    const request = su.post(`${API_HOST}/image/product`)
      .attach('image', image)
      .set('Accept', 'application/json')
      .set('Authorization', token)
    return Observable.fromPromise(request)
  },
  uploadEditProductImage: ({image, product, token}) => {
    const request = su.post(`${API_HOST}/image/${product.shopId}/product/${product.id}`)
      .attach('image', image)
      .set('Accept', 'application/json')
      .set('Authorization', token)
    return Observable.fromPromise(request)
  },
  uploadGalleryProductImage: ({image, index, product, user}) => {
    const request = su.post(`${API_HOST}/image/${product.shopId}/product/${product.id}/gallery/${index}`)
      .attach('image', image)
      .set('Accept', 'application/json')
      .set('Authorization', user.token)
    return Observable.fromPromise(request)
  },
  deleteProductGalleryImage: ({index, product, user}) => {
    const request = su.delete(`${API_HOST}/products/${product.shopId}/${product.id}/gallery/${index}`)
      .set('Accept', 'application/json')
      .set('Authorization', user.token)
    return Observable.fromPromise(request)
  },
  uploadEditProductLayout: ({layout, product, user}) => {
    const request = su.put(`${API_HOST}/products/${product.shopId}/${product.id}/layout`)
      .send({layout})
      .set('Accept', 'application/json')
      .set('Authorization', user.token)
    return Observable.fromPromise(request)
  },
  uploadEditProductTheme: ({theme, color, product, user}) => {
    const request = su.put(`${API_HOST}/products/${product.shopId}/${product.id}/theme`)
      .send({theme, color})
      .set('Accept', 'application/json')
      .set('Authorization', user.token)
    return Observable.fromPromise(request)
  },
  editProduct: ({product, shopId, token}) => {
   const request = su.put(`${API_HOST}/products/${shopId}/${product.id}`)
      .send({product})
      .set('Accept', 'application/json')
      .set('Authorization', token)
    return Observable.fromPromise(request)
  },
  deleteProduct: ({id, shopId, token}) => {
   const request = su.delete(`${API_HOST}/products/${shopId}/${id}`)
      .set('Accept', 'application/json')
      .set('Authorization', token)
    return Observable.fromPromise(request)
  }
}

export const fetchProducts = action$ =>
  action$.ofType('FETCH_PRODUCTS')
    .mergeMap(action =>
      api.fetchProducts(action.payload)
        .map(onFetchProductsSuccess)
        .catch(error => Observable.of({
          type: 'FETCH_PRODUCTS_FAILURE'
        }))
      )

export const fetchSingleProduct = action$ =>
  action$.ofType('FETCH_SINGLE_PRODUCT')
    .mergeMap(action =>
      api.fetchSingleProduct(action.payload)
        .map(onFetchSingleProductSuccess)
        .catch(error => Observable.of({
          type: 'FETCH_SINGLE_PRODUCT_FAILURE'
        }))
      )

export const shareProduct = action$ =>
  action$.ofType('SHARE_PRODUCT')
    .mergeMap(action =>
      api.shareProduct(action.payload)
        .map(onShareProductSuccess)
        .catch(error => Observable.of({
          type: 'SHARE_PRODUCT_FAILURE'
        }))
      )

export const createProduct = action$ =>
  action$.ofType('CREATE_PRODUCT')
    .mergeMap(action =>
      api.createProduct(action.payload)
        .map(onCreateProductSuccess)
        .catch(error => Observable.of({
          type: 'CREATE_PRODUCT_FAILURE'
        }))
      )

export const uploadProductImage = action$ =>
  action$.ofType('UPLOAD_PRODUCT_IMAGE')
    .mergeMap(action =>
      api.uploadProductImage(action.payload)
        .map(onUploadProductImageSuccess)
        .catch(error => Observable.of({
          type: 'UPLOAD_PRODUCT_IMAGE_FAILURE',
          error
        }))
    )

export const uploadEditProductImage = action$ =>
  action$.ofType('UPLOAD_EDIT_PRODUCT_IMAGE')
    .mergeMap(action =>
      api.uploadEditProductImage(action.payload)
        .map(onUploadEditProductImageSuccess)
        .catch(error => Observable.of({
          type: 'UPLOAD_PRODUCT_IMAGE_FAILURE',
          error
        }))
    )

export const uploadGalleryProductImage = action$ =>
  action$.ofType('UPLOAD_GALLERY_PRODUCT_IMAGE')
    .mergeMap(action =>
      api.uploadGalleryProductImage(action.payload)
        .map(onUploadGalleryProductImageSuccess)
        .catch(error => Observable.of({
          type: 'UPLOAD_GALLERY_PRODUCT_IMAGE_FAILURE',
          payload: {
            error,
            index: action.payload.index
          }
        }))
    )

export const uploadEditProductLayout = action$ =>
  action$.ofType('UPLOAD_EDIT_PRODUCT_LAYOUT')
    .mergeMap(action =>
      api.uploadEditProductLayout(action.payload)
        .map(onUploadEditProductLayoutSuccess)
        .catch(error => Observable.of({
          type: 'UPLOAD_EDIT_PRODUCT_LAYOUT_FAILURE',
          error
        }))
    )

export const uploadEditProductTheme = action$ =>
  action$.ofType('UPLOAD_EDIT_PRODUCT_THEME')
    .mergeMap(action =>
      api.uploadEditProductTheme(action.payload)
        .map(onUploadEditProductThemeSuccess)
        .catch(error => Observable.of({
          type: 'UPLOAD_EDIT_PRODUCT_THEME_FAILURE',
          error
        }))
    )

export const editProduct = action$ =>
  action$.ofType('EDIT_PRODUCT')
    .mergeMap(action =>
      api.editProduct(action.payload)
        .map(onEditProductSuccess)
        .catch(error => Observable.of({
          type: 'EDIT_PRODUCT_FAILURE'
        }))
      )

export const deleteProduct = action$ =>
  action$.ofType('DELETE_PRODUCT')
    .mergeMap(action =>
      api.deleteProduct(action.payload)
        .map(onDeleteProductSuccess)
        .catch(error => Observable.of({
          type: 'DELETE_PRODUCT_FAILURE'
        }))
      )

export const deleteProductGalleryImage = action$ =>
  action$.ofType('DELETE_PRODUCT_GALLERY_IMAGE')
    .mergeMap(action =>
      api.deleteProductGalleryImage(action.payload)
        .map(onDeleteProductGalleryImageSuccess)
        .catch(error => Observable.of({
          type: 'DELETE_PRODUCT_GALLERY_IMAGE_FAILURE'
        }))
      )

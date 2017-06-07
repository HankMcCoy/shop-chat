import React from 'react'
import { connect } from 'react-redux'

import TabletMenu from './TabletMenu'
import DesktopMenu from './DesktopMenu'

import { openChangeProductLayout, openAddProductOptions, openAddProductText, openAddProductMedia } from 'actions/products'

import isMobile, { isTablet } from 'utils/isMobile'
//Only renders if this is a tablet or desktop
const BottomNav = props =>
  !isMobile && (
    isTablet ?
      <TabletMenu
        {...props}
      />
    :
      <DesktopMenu
        {...props}
      />
  )

const mapStateToProps = ({user}) =>
({
  user
})

const mapDispatchToProps = dispatch =>
({
  openChangeProductLayout:  () => dispatch(openChangeProductLayout()),
  openAddProductOptions:    () => dispatch(openAddProductOptions()),
  openAddProductText:       () => dispatch(openAddProductText()),
  openAddProductMedia:      () => dispatch(openAddProductMedia()),
})

export default connect(mapStateToProps, mapDispatchToProps)(BottomNav)

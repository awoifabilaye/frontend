import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'

import { withStyles } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Header = ({
  t,
  theme,
  children,
}) => {
  const styling = styles(theme)
  
  return (
    <View style={styling.root}>
      {children}
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    backgroundColor: '#bdc3c7',
  },
})

Header.propTypes = {
  theme: PropTypes.any,
  children: PropTypes.any,
  t: PropTypes.any,
}

export default withTranslation()(withStyles(Header))

import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

import { withTheme, Text } from 'react-native-paper'
import { withTranslation } from 'react-i18next'

const HeaderRight = ({
  t,
  title,
  theme,
  onPress,
  hidden,
  style = {},
}) => {
  const styling = styles(theme)
  
  if (hidden) {
    return null
  }
  
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styling.headerRight, style]}>{t(title)}</Text>
    </TouchableOpacity>
  )
}

HeaderRight.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
  title: PropTypes.any,
  onPress: PropTypes.any,
  hidden: PropTypes.any,
  style: PropTypes.any,
}

HeaderRight.defaultProps = {
  hidden: false,
  style: {},
}

const styles = theme => StyleSheet.create({
  headerRight: {
    paddingHorizontal: theme.spacing.base,
    fontSize: 16,
    fontWeight: '700',
    color: '#3498db',
  },
})

export default withTranslation()(withTheme(HeaderRight))
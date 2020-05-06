import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  TouchableOpacity,
} from 'react-native'

import { withStyles } from '@ui-kitten/components'
import { Text } from '@ui-kitten/components'
import { withTranslation } from 'react-i18next'

const HeaderRight = ({
  t,
  title,
  theme,
  onPress,
  hidden,
}) => {
  const styling = styles(theme)
  
  if (hidden) {
    return null
  }
  
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styling.headerRight}>{t(title)}</Text>
    </TouchableOpacity>
  )
}

HeaderRight.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
  title: PropTypes.any,
  onPress: PropTypes.any,
  hidden: PropTypes.any,
}

HeaderRight.defaultProps = {
  hidden: false,
}

const styles = theme => StyleSheet.create({
  headerRight: {
    paddingHorizontal: 12,
    fontSize: 16,
    fontWeight: '700',
    color: '#3498db',
  },
})

export default withTranslation()(withStyles(HeaderRight))
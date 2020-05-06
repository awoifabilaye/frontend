import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { Text } from '@ui-kitten/components'

import { withStyles } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const BottomAction = ({
  t,
  theme,
  children,
  onPress,
}) => {
  const styling = styles(theme)

  return (
    <TouchableOpacity style={styling.root} onPress={onPress}>
      <Text style={styling.action}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bdc3c7',
    height: 80,
  },
  action: {
    fontWeight: '500',
    letterSpacing: 0,
    color: '#2ecc71',
  },
})

BottomAction.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
  children: PropTypes.any,
  onPress: PropTypes.any,
}

export default withTranslation()(withStyles(BottomAction))

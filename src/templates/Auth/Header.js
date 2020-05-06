import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
} from 'react-native'
import { Text } from '@ui-kitten/components'

import { withStyles } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Header = ({
  t,
  theme,
  title,
  subtitle,
}) => {
  const styling = styles(theme)

  return (
    <View style={styling.root}>
      <Text category="h2" status="primary" style={styling.title}>{title}</Text>
      <Text category="h3" status="basic" style={styling.subtitle}>{subtitle}</Text>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    marginVertical: 12 * 6,
    alignItems: 'center',
  },
  title: {
    marginBottom: 12,
  },
  subtitle: {
    textAlign: 'center',
  },
})

Header.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
  title: PropTypes.any,
  subtitle: PropTypes.any,
}

export default withTranslation()(withStyles(Header))

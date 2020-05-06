import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import { Text } from '@ui-kitten/components'
import LinearGradient from 'react-native-linear-gradient'

import { withStyles } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const TextOnlyComponent = ({
  t,
  theme,
  themes,
  text,
  themeCode,
}) => {
  const styling = styles(theme)

  return (
    <View style={styling.root}>
      <LinearGradient
        colors={[`#2ecc71`, `#2ecc7190`]}
        style={styling.gradient}
      />
      <Text style={styling.text}>{text}</Text>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  text: {
    fontSize: 8,
    textAlign: 'center',
    zIndex: 2,
  },
  gradient: {
    ...StyleSheet.absoluteFill,
    zIndex: 1,
  },
})

TextOnlyComponent.propTypes = {
  theme: PropTypes.any,
  post: PropTypes.any,
}

export default withTranslation()(withStyles(TextOnlyComponent))

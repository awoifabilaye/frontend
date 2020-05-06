import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import { Text } from '@ui-kitten/components'

import { withStyles } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Empty = ({
  t,
  theme,
}) => {
  const styling = styles(theme)

  return (
    <View style={styling.root}>
      <Text style={styling.text}>{t('seems to be empty')}</Text>
    </View>
  )
}

Empty.propTypes = {
  theme: PropTypes.any,
  t: PropTypes.any,
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    opacity: 0.4,
    color: '#333333',
    textAlign: 'center',
  },
})

export default withTranslation()(withStyles(Empty))

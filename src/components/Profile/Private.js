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

const Private = ({
  t,
  theme,
}) => {
  const styling = styles(theme)
  
  return (
    <View style={styling.root}>
      <Text>{t('This account is private')} </Text>
      <Text>{t('Follow this account to see their photos')}</Text>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    padding: 12,
    marginVertical: 12,
    alignItems: 'center',
  },
  link: {
    color: '#2ecc71',
    fontWeight: '500',
  },
})

Private.propTypes = {
  theme: PropTypes.any,
  t: PropTypes.any,
}

export default withTranslation()(withStyles(Private))

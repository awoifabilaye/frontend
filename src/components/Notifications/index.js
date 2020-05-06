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

const Notifications = ({
  t,
  theme,
}) => {
  const styling = styles(theme)

  return (
    <View style={styling.root}>
      <Text style={styling.title}>{t('Notifications Coming Soon')}</Text>
      <Text style={styling.paragraph}>{t('REAL is fully Open Source & built by the people')}. {t('Help us move faster by contributing code')}.</Text>
    </View>
  )
}
  
const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 12,
  },
  paragraph: {
    textAlign: 'center',
    maxWidth: 280,
  },
})

Notifications.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
}

export default withTranslation()(withStyles(Notifications))

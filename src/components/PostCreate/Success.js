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

const Success = ({
  t,
  theme,
}) => {
  const styling = styles(theme)
  
  return (
    <View style={styling.root}>
      <Text>{t('All posts have been submitted')}</Text>
      <Text>{t('You can safely close this window now')}</Text>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    padding: 12,
    alignItems: 'center',
  },
  text: {
  },
})

Success.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
  values: PropTypes.any,
  setFieldValue: PropTypes.any,
}

export default withTranslation()(withStyles(Success))

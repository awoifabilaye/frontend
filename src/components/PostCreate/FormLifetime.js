import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
} from 'react-native'
import Slider from '@react-native-community/slider'
import Layout from 'constants/Layout'
import LifetimeIndicator from 'components/PostCreate/LifetimeIndicator'
import { Text } from '@ui-kitten/components'

import { withStyles } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const getTextByValue = (t) => (lifetime) => {
  if (lifetime === 'P1D') { return t('for a Day') }
  if (lifetime === 'P7D') { return t('for a Week') }
  if (lifetime === 'P1M') { return t('for a Month') }
  if (lifetime === 'P1Y') { return t('for a Year') }
  if (lifetime === null) { return t('Forever') }
}

const getIndexByValue = (lifetime) => {
  if (lifetime === 'P1D') { return 1 }
  if (lifetime === 'P7D') { return 2 }
  if (lifetime === 'P1M') { return 3 }
  if (lifetime === 'P1Y') { return 4 }
  if (lifetime === null) { return 5 }
}

const getValueByIndex = (lifetime) => {
  if (lifetime === 1) { return 'P1D' }
  if (lifetime === 2) { return 'P7D' }
  if (lifetime === 3) { return 'P1M' }
  if (lifetime === 4) { return 'P1Y' }
  if (lifetime === 5) { return null }
}

const FormLifetime = ({
  t,
  theme,
  values,
  setFieldValue,
}) => {
  const styling = styles(theme)
  
  return (
    <View style={styling.root}>
      <Text>{t('Post will be available {{lifetime}}', { lifetime: getTextByValue(t)(values.lifetime) })}</Text>
      <Text>{t('All posts become stories when they are 24 hours from expiring')}</Text>

      <Slider
        style={styling.slider}
        minimumValue={1}
        step={1}
        maximumValue={5}
        minimumTrackTintColor={'#2ecc71'}
        maximumTrackTintColor={'#95a5a6'}
        value={getIndexByValue(values.lifetime)}
        onValueChange={(value) => setFieldValue('lifetime', getValueByIndex(value))}
      />
      
      <View style={styling.sliderIndicator}>
        <LifetimeIndicator
          onValueChange={(value) => setFieldValue('lifetime', getValueByIndex(value))}
        />
      </View>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
  },
  slider: {
    width: Layout.window.width - 24,
    height: 30,
    marginTop: 12,
  },
  sliderIndicator: {
  },
})

FormLifetime.propTypes = {
  theme: PropTypes.any,
  values: PropTypes.any,
  setFieldValue: PropTypes.any,
  t: PropTypes.any,
  setFieldValue: PropTypes.any,
}

export default withTranslation()(withStyles(FormLifetime))

import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import Layout from 'constants/Layout'
import { Text } from '@ui-kitten/components'

import { withStyles } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const trackerWidth = (Layout.window.width - 24) - 28

const LifetimeIndicator = ({
  t,
  theme,
  onValueChange,
}) => {
  const styling = styles(theme)
  
  return (
    <View style={styling.root}>
      <TouchableOpacity style={[{ left: '0%' }, styling.indicator]} onPress={() => onValueChange(1)}>
        <Text style={[styling.caption, styling.captionStart]}>{t('Day')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[{ left: '25%', }, styling.indicator]} onPress={() => onValueChange(2)}>
        <Text style={styling.caption}>{t('Week')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[{ left: '50%', }, styling.indicator]} onPress={() => onValueChange(3)}>
        <Text style={styling.caption}>{t('Month')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[{ left: '75%', }, styling.indicator]} onPress={() => onValueChange(4)}>
        <Text style={styling.caption}>{t('Year')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[{ left: '100%', }, styling.indicator]} onPress={() => onValueChange(5)}>
        <Text style={[styling.caption, styling.captionEnd]}>{t('Forever')}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flexDirection: 'row',
    width: trackerWidth,
    height: 20,
    marginBottom: 6,
  },
  indicator: {
    width: 24,
    height: 24,
    position: 'absolute',
    alignItems: 'center',
  },
  caption: {
    position: 'absolute',
    width: 70,
    paddingTop: 2,
    textAlign: 'center',
    color: '#95a5a6',
    marginLeft: 2,
  },
  captionStart: {
    textAlign: 'left',
    left: 0,
  },
  captionEnd: {
    textAlign: 'right',
    right: 0,
  },
})

LifetimeIndicator.propTypes = {

  t: PropTypes.any,
  theme: PropTypes.any,
  onValueChange: PropTypes.any,
}

export default withTranslation()(withStyles(LifetimeIndicator))
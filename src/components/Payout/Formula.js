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

const Formula = ({
  t,
  theme,
}) => {
  const styling = styles(theme)

  return (
    <View style={styling.root}>
      <View style={styling.output}>
        <View style={styling.divident}>
          <Text style={styling.paragraph}>{t('(Total Revenue) * (Processing Fees)')}</Text>
        </View>

        <View style={styling.line}></View>

        <View style={styling.divisor}>
          <Text style={styling.paragraph}>{t('(Total 💎Views)')}</Text>
        </View>
      </View>
    </View>
  )
}
  
const styles = theme => StyleSheet.create({
  root: {
    backgroundColor: '#bdc3c7',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  input: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  equals: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  output: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  divident: {
  },
  line: {
    borderTopWidth: 0.5,
    borderColor: '#333333',
    width: '100%',
    marginVertical: 8,
  },
  divisor: {
  },
  paragraph: {
  },
})

Formula.propTypes = {
  theme: PropTypes.any,
  t: PropTypes.any,
}

export default withTranslation()(withStyles(Formula))

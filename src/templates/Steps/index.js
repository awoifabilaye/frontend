import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'

import { withStyles } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const StepsTemplate = ({
  t,
  theme,
  steps,
  currentStep,
}) => {
  const styling = styles(theme)
  
  return (
    <View style={styling.root}>
      <View style={styling.progress}>
        {Array.from(Array(steps).keys()).map(key => {
          const stepStyle = currentStep === key ? styling.progressItemActive : styling.progressItem
          return (
            <View style={stepStyle} key={key} />
          )
        })}
      </View>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    padding: 12,
  },
  progress: {
    flexDirection: 'row',
  },
  progressItemActive: {
    flex: 1,
    height: 2,
    backgroundColor: '#3498db',
    marginHorizontal: 4,
  },
  progressItem: {
    flex: 1,
    height: 2,
    backgroundColor: '#333333',
    marginHorizontal: 4,
  },
})

StepsTemplate.defaultProps = {
  items: [],
  children: () => {},
}

StepsTemplate.propTypes = {
  theme: PropTypes.any,
  steps: PropTypes.any,
  currentStep: PropTypes.any,
}

export default withTranslation()(withStyles(StepsTemplate))

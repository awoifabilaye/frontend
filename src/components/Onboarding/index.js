import React from 'react'
import PropTypes from 'prop-types'
import {
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import * as navigationActions from 'navigation/actions'
import { Text } from '@ui-kitten/components'

import { withStyles } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Onboarding = ({
  t,
  theme,
  handleLibrarySnap,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()

  return (
    <View style={styling.root}>
      <TouchableOpacity style={styling.backdrop} onPress={navigationActions.navigateBack(navigation)} />
    
      <View style={styling.component}>
        <LinearGradient
          colors={['#0984e3', '#74b9ff']}
          style={styling.gradient}
        />

        <View style={styling.content}>
          <Text style={styling.headline}>Tap to scroll post</Text>
        </View>
      </View>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFill,
  },
  gradient: {
    ...StyleSheet.absoluteFill,
    zIndex: 1,
  },
  component: {
    height: 420,
    width: '100%',
    borderRadius: 38,
    overflow: 'hidden',
  },
  content: {
    ...StyleSheet.absoluteFill,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headline: {
  },
})

Onboarding.propTypes = {
  theme: PropTypes.any,
  t: PropTypes.any,
  handleLibrarySnap: PropTypes.any,
}

export default withTranslation()(withStyles(Onboarding))

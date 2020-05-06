import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native'
import * as navigationActions from 'navigation/actions'
import { Text } from '@ui-kitten/components'

import { withStyles } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const ProfileStatus = ({
  t,
  theme,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()

  return (
    <View style={styling.root}>
      <TouchableOpacity onPress={navigationActions.navigatePayout(navigation)}>
        <Text>
          <Text>{t('You will be paid {{amount}} dollars per view from other diamond members', { amount: '$0.11' })} </Text>
          <Text style={styling.link}>{t('learn more')}</Text>
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    paddingHorizontal: 12,
    paddingTop: 12,
  },
  link: {
    color: '#2ecc71',
    fontWeight: '500',
  },
})

ProfileStatus.propTypes = {
  theme: PropTypes.any,
  t: PropTypes.any,
}

export default withTranslation()(withStyles(ProfileStatus))

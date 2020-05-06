import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import path from 'ramda/src/path'
import dayjs from 'dayjs'
import { Text } from '@ui-kitten/components'

import { withStyles } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const ProfileAbout = ({
  t,
  theme,
  usersGetProfile,
}) => {
  const styling = styles(theme)
  
  return (
    <View style={styling.root}>
      <Text style={styling.itemTitle}>{path(['data', 'fullName'])(usersGetProfile)}</Text>
      {path(['data', 'bio', 'length'])(usersGetProfile) ?
        <Text style={styling.itemText}>{path(['data', 'bio'])(usersGetProfile)}</Text>
      : null}
      <Text style={styling.itemText}>{t('Joined')} {dayjs(path(['data', 'signedUpAt'])(usersGetProfile)).from(dayjs())}</Text>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
  },
  itemTitle: {
  },
  itemText: {
  },
})

ProfileAbout.propTypes = {
  theme: PropTypes.any,
  usersGetProfile: PropTypes.any,
  t: PropTypes.any,
}

export default withTranslation()(withStyles(ProfileAbout))

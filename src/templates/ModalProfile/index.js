import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import Avatar from 'templates/Avatar'
import { Text } from '@ui-kitten/components'

import { withStyles } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Profile = ({
  t,
  theme,
  thumbnailSource,
  imageSource,
  title,
  subtitle,
}) => {
  const styling = styles(theme)
  
  return (
    <View style={styling.profile}>
      <Avatar
        thumbnailSource={thumbnailSource}
        imageSource={imageSource}
      />

      <View style={styling.profileText}>
        <Text>{title}</Text>
        <Text>{subtitle}</Text>
      </View>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileText: {
    paddingHorizontal: 12,
  },
})

Profile.propTypes = {
  theme: PropTypes.any,
  thumbnailSource: PropTypes.any,
  imageSource: PropTypes.any,
  title: PropTypes.any,
  subtitle: PropTypes.any,
}

export default withTranslation()(withStyles(Profile))

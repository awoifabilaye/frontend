import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native'
import path from 'ramda/src/path'
import is from 'ramda/src/is'
import * as navigationActions from 'navigation/actions'
import { Text } from '@ui-kitten/components'

import { withStyles } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const ProfileCounts = ({
  t,
  theme,
  usersGetProfile,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()

  const followerCount = path(['data', 'followerCount'])(usersGetProfile)
  const followedCount = path(['data', 'followedCount'])(usersGetProfile)

  return (
    <View style={styling.root}>
      <View style={styling.item}>
        <Text style={styling.itemTitle}>{path(['data', 'postCount'])(usersGetProfile)}</Text>
        <Text style={styling.itemText} numberOfLines={1}>{t('Posts')}</Text>
      </View>
      
      <TouchableOpacity style={styling.item} onPress={navigationActions.navigateProfileFollower(navigation, { user: usersGetProfile.data })}>
        {!path(['data', 'followCountsHidden'])(usersGetProfile) && is(Number)(followerCount) ?
          <Text style={styling.itemTitle}>{followerCount}</Text>
        :
          <Text style={styling.itemTitle}>•</Text>
        }
        <Text style={styling.itemText} numberOfLines={1}>{t('Followers')}</Text>
      </TouchableOpacity>

      
      <TouchableOpacity style={styling.item} onPress={navigationActions.navigateProfileFollowed(navigation, { user: usersGetProfile.data })}>
        {!path(['data', 'followCountsHidden'])(usersGetProfile) && is(Number)(followedCount) ?
          <Text style={styling.itemTitle}>{followedCount}</Text>
        :
          <Text style={styling.itemTitle}>•</Text>
        }
        <Text style={styling.itemText} numberOfLines={1}>{t('Following')}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTitle: {
    height: 32,
  },
  itemText: {
  },
})

ProfileCounts.propTypes = {
  theme: PropTypes.any,
  usersGetProfile: PropTypes.any,
  t: PropTypes.any,
}

export default withTranslation()(withStyles(ProfileCounts))

import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import path from 'ramda/src/path'
import Avatar from 'templates/Avatar'
import * as navigationActions from 'navigation/actions'
import { Text } from '@ui-kitten/components'

import { withStyles } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Stories = ({
  t,
  theme,
  user,
  usersGetFollowedUsersWithStories,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()

  const handleUserStoryPress = (user) => navigationActions.navigateStory(navigation, {
    user,
    usersGetFollowedUsersWithStories,
  })

  return (
    <ScrollView
      style={styling.root}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      <TouchableOpacity
        key={user.userId}
        onPress={navigationActions.navigateCamera(navigation)}
        style={styling.story}
      >
        <Avatar
          active={path(['stories', 'items', 'length'])(user) || false}
          size="medium"
          thumbnailSource={{ uri: path(['photo', 'url64p'])(user) }}
          imageSource={{ uri: path(['photo', 'url480p'])(user) }}
          icon={true}
        />
        <Text style={styling.username}>{path(['username'])(user)}</Text>
      </TouchableOpacity>

      {(usersGetFollowedUsersWithStories.data || []).map((user, key) => (
        <TouchableOpacity
          key={key}
          onPress={handleUserStoryPress(user)}
          style={styling.story}
        >
          <Avatar
            active={path(['stories', 'items', 'length'])(user) || false}
            size="medium"
            thumbnailSource={{ uri: path(['photo', 'url64p'])(user) }}
            imageSource={{ uri: path(['photo', 'url480p'])(user) }}
            themeCode={path(['themeCode'])(user)}
          />
          <Text style={styling.username}>{path(['username'])(user)}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    height: 115,
    padding: 12,
    backgroundColor: '#ffffff',
  },
  story: {
    alignItems: 'center',
    marginRight: 10,
  },
  username: {
    marginTop: 6,
    color: '#333333',
  },
})

Stories.propTypes = {
  theme: PropTypes.any,
  user: PropTypes.any,
  usersGetFollowedUsersWithStories: PropTypes.any,
  t: PropTypes.any,
}

export default withTranslation()(withStyles(Stories))

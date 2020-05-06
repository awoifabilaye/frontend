import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native'
import Avatar from 'templates/Avatar'
import path from 'ramda/src/path'
import * as navigationActions from 'navigation/actions'
import { Text } from '@ui-kitten/components'

import { withStyles } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Bookmark = ({
  t,
  theme,
  postsGetTrendingPosts,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()

  return (
    <TouchableOpacity style={styling.root} onPress={navigationActions.navigateSearch(navigation)}>
      <View style={styling.text}>
        <Text>{t('You\'re All Caught Up')}</Text>
      </View>

      <ScrollView style={styling.posts} horizontal>
        {(path(['data'])(postsGetTrendingPosts) || []).filter(item => item.postType !== 'TEXT_ONLY').map((post, key) => (
          <Avatar
            key={key}
            thumbnailSource={{ uri: path(['image', 'url64p'])(post) }}
            imageSource={{ uri: path(['image', 'url64p'])(post) }}
          />
        ))}
      </ScrollView>

      <View style={styling.text}>
        <Text>{t('Tap to discover')}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    paddingHorizontal: 12,
    backgroundColor: '#bdc3c7',
    alignItems: 'center',
    height: 140,
  },
  text: {
    marginVertical: 12,
  },
  posts: {
    flexDirection: 'row',
  },
})

Bookmark.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
  postsGetTrendingPosts: PropTypes.any,
}

export default withTranslation()(withStyles(Bookmark))

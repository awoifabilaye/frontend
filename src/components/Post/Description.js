import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import path from 'ramda/src/path'
import reactStringReplace from 'react-string-replace'
import { Text } from '@ui-kitten/components'
import * as navigationActions from 'navigation/actions'

import { withStyles } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Description = ({
  t,
  theme,
  post,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()
  const regex = /(?:@)([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)/g
  const visibility = path(['text', 'length'])(post)

  if (!visibility) {
    return null
  }
  
  return (
    <TouchableOpacity style={styling.root} onPress={navigationActions.navigateComments(navigation, { post })}>
      <Text style={styling.text} numberOfLines={4} ellipsizeMode="tail">
        {[
          /**
           * Username of post owner
           */
          <Text key="username" onPress={navigationActions.navigateProfile(navigation, { user: post.postedBy })} style={styling.username}>{post.postedBy.username} </Text>,

          /**
           * Tagged @username occurrences with attached user object
           */
          ...reactStringReplace(post.text.trim(), regex, (match, i) => {
            const tagged = (path(['textTaggedUsers'])(post) || [])
              .find(textTag => textTag.tag === `@${match}`)

            if (tagged) {
              return (
                <Text key={match + i} onPress={navigationActions.navigateProfile(navigation, { user: tagged.user })} style={styling.textUsername}>@{match}</Text>
              )
            }
            
            return <Text key="matched" style={styling.textDefault}>{`@${match}`}</Text>
          })
        ]}
      </Text>
    </TouchableOpacity>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    paddingHorizontal: 12,
    marginBottom: 6,
  },
  likes: {
  },
  username: {
    color: '#333333',
    fontWeight: '700',
  },
  text: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  textDefault: {
    color: '#333333',
  },
  textUsername: {
    color: '#2ecc71',
  },
})

Description.propTypes = {
  theme: PropTypes.any,
  post: PropTypes.any,
  t: PropTypes.any,
}

export default withTranslation()(withStyles(Description))

import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native'
import BubbleIcon from 'assets/svg/action/Bubble'
import DirectIcon from 'assets/svg/action/Direct'
import LikeIcon from 'assets/svg/action/Like'
import UnlikeIcon from 'assets/svg/action/Unlike'
import path from 'ramda/src/path'
import dayjs from 'dayjs'
import * as navigationActions from 'navigation/actions'
import { Text } from '@ui-kitten/components'

import { withStyles } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Action = ({
  t,
  theme,
  user,
  post,
  postsOnymouslyLikeRequest,
  postsDislikeRequest,
  handlePostShare,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()

  const self = path(['postedBy', 'userId'])(post) === path(['userId'])(user)

  /**
   * See if current authenticated user is tagged in post by author
   */
  const tagged = (path(['textTaggedUsers'])(post) || [])
    .find(textTag => textTag.tag === `@${path(['username'])(user)}`)

  /**
   * Visibility of like button, like button will be visible if:
   * - Post owner has enabled likes
   * - Post owner has not enabled likesDisabled global setting
   * - Like hasn't been set before, which allows only 1 like per post
   */
  const likeButtonVisibility = (
    !post.likesDisabled &&
    !path(['postedBy', 'likesDisabled'])(post)
  )

  /**
   * Visibility of comment button, comment button will be visible if:
   * - Post owner has enabled comments
   * - Post owner has not enabled commentsDisabled global setting
   */
  const commentButtonVisibility = (
    !post.commentsDisabled &&
    !path(['postedBy', 'commentsDisabled'])(post)
  )

  /**
   * Visibility of share button, share button will be visible if:
   * - Post owner has enabled shares
   * - Current authenticated user has shares enabled in settings
   * - Current authenticated user is tagged in post by author
   */
  const shareButtonVisibility = (
    !post.sharingDisabled ||
    tagged
  )

  /**
   * Visibility of seen by text, text will be visible if:
   * - Current authenticated user owns the post
   * - Post has not enabled viewCountsHidden setting
   * - Post owner has not enabled viewCountsHidden global setting
   */
  const seenByVisibility = (
    self &&
    !post.viewCountsHidden &&
    !path(['postedBy', 'viewCountsHidden'])(post) &&
    post.viewedByCount > 0
  )

  return (
    <View style={styling.action}>
      <View style={styling.actionLeft}>

        {likeButtonVisibility && post.likeStatus === 'NOT_LIKED' ?
          <TouchableOpacity style={styling.actionLeftIcon} onPress={() => postsOnymouslyLikeRequest({ postId: path(['postId'])(post), userId: path(['postedBy', 'userId'])(post) })}>
            <LikeIcon fill={'#333333'} />
          </TouchableOpacity>
        : null}

        {likeButtonVisibility && post.likeStatus !== 'NOT_LIKED' ?
          <TouchableOpacity style={styling.actionLeftIcon} onPress={() => postsDislikeRequest({ postId: path(['postId'])(post), userId: path(['postedBy', 'userId'])(post) })}>
            <UnlikeIcon fill={'#2ecc71'} />
          </TouchableOpacity>
        : null}
        
        {commentButtonVisibility ?
          <TouchableOpacity style={styling.actionLeftIcon} onPress={navigationActions.navigateComments(navigation, { post })}>
            <BubbleIcon fill={'#333333'} />
          </TouchableOpacity>
        : null}

        {shareButtonVisibility ?
          <TouchableOpacity style={styling.actionLeftIcon} onPress={handlePostShare}>
            <DirectIcon fill={'#333333'} />
          </TouchableOpacity>
        : null}
      </View>

      <View style={styling.actionCenter}>
      </View>

      {seenByVisibility ?
        <TouchableOpacity style={styling.actionRight} onPress={navigationActions.navigatePostViews(navigation, { post })}>
          <Text>{t('Seen by {{viewedByCount}} people', { viewedByCount: post.viewedByCount })}</Text>
        </TouchableOpacity>
      :
        <View style={styling.actionRight}>
          <Text>{dayjs(post.postedAt).from(dayjs())}</Text>
        </View>
      }
    </View>
  )
}

const styles = theme => StyleSheet.create({
  action: {
    zIndex: 1,
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actionLeftIcon: {
    marginRight: 18,
  },
  actionLeft: {
    flex: 1,
    flexDirection: 'row',
  },
  actionCenter: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  actionRight: {
    flex: 1,
    flexDirection: 'row-reverse',
  },
})

Action.propTypes = {
  theme: PropTypes.any,  
  post: PropTypes.any,
  postsOnymouslyLikeRequest: PropTypes.any,
  postsDislikeRequest: PropTypes.any,
  t: PropTypes.any,
  user: PropTypes.any,
  handlePostShare: PropTypes.any,
}

export default withTranslation()(withStyles(Action))

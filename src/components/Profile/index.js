import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native'
import CountsComponent from 'components/Profile/Counts'
import AboutComponent from 'components/Profile/About'
import ActionComponent from 'components/Profile/Action'
import ProfileTabViewComponent from 'components/Profile/ProfileTabView'
import Avatar from 'templates/Avatar'
import NativeError from 'templates/NativeError'
import path from 'ramda/src/path'
import pathOr from 'ramda/src/pathOr'
import * as navigationActions from 'navigation/actions'
import ScrollService from 'services/Scroll'

import { withTheme } from 'react-native-paper'
import { useNavigation, useRoute } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Profile = ({
  t,
  theme,
  profileRef,

  usersBlock,
  usersGetProfile,

  postsGet,
  postsGetRequest,
  postsGetMoreRequest,
  
  albumsGet,
  albumsGetRequest,
  albumsGetMoreRequest,

  usersBlockRequest,
  usersUnblock,
  usersUnblockRequest,
  usersFollow,
  usersFollowRequest,
  usersUnfollow,
  usersUnfollowRequest,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()
  const route = useRoute()

  const handleUserStoryPress = () => {
    if (!pathOr(0, ['data', 'stories', 'items', 'length'], usersGetProfile)) {
      return
    }

    navigationActions.navigateStory(navigation, {
      user: usersGetProfile.data,
      usersGetFollowedUsersWithStories: { data: [usersGetProfile.data] },
    })()
  }

  const scroll = ScrollService({
    resource: postsGet,
    loadInit: (extra) => {
      postsGetRequest(extra)
      albumsGetRequest(extra)
    },
    loadMore: postsGetMoreRequest,
    extra: { userId: path(['data', 'userId'])(usersGetProfile) },
  })

  return (
    <ScrollView
      ref={profileRef}
      style={styling.root}
      onScroll={scroll.handleScrollChange}
      scrollEventThrottle={400}
      refreshControl={(
        <RefreshControl
          tintColor={theme.colors.border}
          onRefresh={scroll.handleRefresh}
          refreshing={scroll.refreshing}
        />
      )}
    >
      <NativeError
        handleCancelPress={() => {}}
        titleText={t('User Blocked')}
        messageText={t('The user has been blocked and will no longer have access to yours posts.')}
        actionText={t('Done')}
        status={path(['status'])(usersBlock)}
        triggerOn="success"
      />

      <View style={styling.component}>
        <TouchableOpacity style={styling.image} onPress={handleUserStoryPress}>
          <Avatar
            size="large"
            active={path(['data', 'stories', 'items', 'length'])(usersGetProfile) || false}
            thumbnailSource={{ uri: path(['data', 'photo', 'url64p'])(usersGetProfile) }}
            imageSource={{ uri: path(['data', 'photo', 'url480p'])(usersGetProfile) }}
            themeCode={path(['data', 'themeCode'])(usersGetProfile)}
          />
        </TouchableOpacity>
        <View style={styling.counts}>
          <CountsComponent
            usersGetProfile={usersGetProfile}
          />
        </View>
      </View>

      <View style={styling.about}>
        <AboutComponent
          usersGetProfile={usersGetProfile}
        />
      </View>

      <View style={styling.action}>
        <ActionComponent
          usersGetProfile={usersGetProfile}
          usersBlock={usersBlock}
          usersBlockRequest={usersBlockRequest}
          usersUnblock={usersUnblock}
          usersUnblockRequest={usersUnblockRequest}
          usersFollow={usersFollow}
          usersFollowRequest={usersFollowRequest}
          usersUnfollow={usersUnfollow}
          usersUnfollowRequest={usersUnfollowRequest}
        />
      </View>

      <ProfileTabViewComponent />

      {scroll.loadingmore ?
        <View style={styling.activity}>
          <ActivityIndicator color={theme.colors.border} />
        </View>
      : null}
    </ScrollView>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
  },
  component: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  image: {
    paddingRight: theme.spacing.base,
  },
  counts: {
    flex: 1,
  },
  about: {
    paddingHorizontal: theme.spacing.base,
    marginBottom: theme.spacing.base,
  },
  activity: {
    padding: theme.spacing.base * 2,
  },
})

Profile.propTypes = {
  theme: PropTypes.any,
  usersGetProfile: PropTypes.any,
  user: PropTypes.any,
  usersBlock: PropTypes.any,
  usersBlockRequest: PropTypes.any,
  usersUnblock: PropTypes.any,
  usersUnblockRequest: PropTypes.any,
  usersFollow: PropTypes.any,
  usersFollowRequest: PropTypes.any,
  usersUnfollow: PropTypes.any,
  usersUnfollowRequest: PropTypes.any,
  postsGet: PropTypes.any,
  t: PropTypes.any,
  profileRef: PropTypes.any,
  postsGet: PropTypes.any,
  postsGetRequest: PropTypes.any,
  postsGetMoreRequest: PropTypes.any,
  albumsGet: PropTypes.any,
  albumsGetRequest: PropTypes.any,
  albumsGetMoreRequest: PropTypes.any,
}

export default withTranslation()(withTheme(Profile))

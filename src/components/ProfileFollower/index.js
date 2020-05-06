import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  ScrollView,
  RefreshControl,
} from 'react-native'
import ResultComponent from 'components/Search/Result'

import { withStyles } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const ProfileFollower = ({
  t,
  theme,
  usersGetFollowerUsers,
  usersFollow,
  usersFollowRequest,
  usersUnfollow,
  usersUnfollowRequest,
  usersAcceptFollowerUser,
  usersAcceptFollowerUserRequest,
}) => {
  const styling = styles(theme)
  
  return (
    <View style={styling.root}>
      <ScrollView
        refreshControl={
          <RefreshControl
            tintColor={'#95a5a6'}
            refreshing={false}
          />
        }
      >
        <ResultComponent
          usersSearch={usersGetFollowerUsers}
          usersFollow={usersFollow}
          usersFollowRequest={usersFollowRequest}
          usersUnfollow={usersUnfollow}
          usersUnfollowRequest={usersUnfollowRequest}
          usersAcceptFollowerUser={usersAcceptFollowerUser}
          usersAcceptFollowerUserRequest={usersAcceptFollowerUserRequest}
          loading={usersGetFollowerUsers.status === 'loading'}
        />
      </ScrollView>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
  },
})

ProfileFollower.propTypes = {
  theme: PropTypes.any,
  usersGetFollowerUsers: PropTypes.any,
  usersFollow: PropTypes.any,
  usersFollowRequest: PropTypes.any,
  usersUnfollow: PropTypes.any,
  usersUnfollowRequest: PropTypes.any,
  t: PropTypes.any,
  usersAcceptFollowerUser: PropTypes.any,
  usersAcceptFollowerUserRequest: PropTypes.any,
}

export default withTranslation()(withStyles(ProfileFollower))

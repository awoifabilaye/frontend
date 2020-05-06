import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  Dimensions,
} from 'react-native'
import FeedComponent from 'components/Profile/Feed'
import AlbumsComponent from 'components/Profile/Albums'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view'
import { Text } from '@ui-kitten/components'

import { withStyles } from '@ui-kitten/components'
import { useNavigation, useRoute } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const ProfileTabView = ({
  t,
  theme,
  index,
  setIndex,
  routes,
}) => {
  const renderScene = SceneMap({
    feed: FeedComponent,
    albums: AlbumsComponent,
  })

  const renderTabBar = props => (
    <TabBar
      {...props}
      activeColor={'#2ecc71'}
      inactiveColor={'#333333'}
      indicatorStyle={{ backgroundColor: '#2ecc71' }}
      style={{ backgroundColor: 'transparent' }}
      renderLabel={({ route, focused, color }) => (
        <Text style={{ color, fontSize: 14, fontWeight: '600', margin: 8 }}>
          {route.title}
        </Text>
      )}
    />
  )

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: Dimensions.get('window').width }}
      indicatorStyle={{ backgroundColor: 'transparent' }}
      renderTabBar={renderTabBar}
    />
  )
}

const Profile = ({
  t,
  theme,
  index,
  setIndex,
  routes,
}) => {
  const styling = styles(theme)
  
  return (
    <View style={styling.root}>
      <ProfileTabView
        theme={theme}
        index={index}
        setIndex={setIndex}
        routes={routes}
      />
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#ffffff',
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
  index: PropTypes.any,
  setIndex: PropTypes.any,
  routes: PropTypes.any,
}

export default withTranslation()(withStyles(Profile))

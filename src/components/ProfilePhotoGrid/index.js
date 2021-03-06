import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native'
import path from 'ramda/src/path'
import GridComponent from 'templates/Grid'
import GridItemComponent from 'templates/GridItem'
import CacheComponent from 'components/Cache'
import CheckedIcon from 'assets/svg/other/Checked'
import UncheckedIcon from 'assets/svg/other/Unchecked'
import { useHeader } from 'components/ProfilePhotoGrid/header'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const ProfilePhotoGrid = ({
  t,
  theme,
  usersImagePostsGet,
  handlePostPress,
  selectedPost,
  usersEditProfileRequest,
}) => {
  const styling = styles(theme)

  useHeader({
    title: 'Update',
    onPress: usersEditProfileRequest,
    hidden: !selectedPost.postId,
  }, [selectedPost.postId])

  return (
    <View style={styling.root}>
      <ScrollView>
        <GridComponent items={path(['data'])(usersImagePostsGet)}>
          {(post, priorityIndex) => (
            <GridItemComponent
              onPress={() => handlePostPress(post)}
              active={selectedPost.postId === post.postId}
              activeIcon={<CheckedIcon fill={theme.colors.iconPrimary} />}
              inactiveIcon={<UncheckedIcon fill={theme.colors.iconPrimary} />}
            >
              <CacheComponent
                thread="default"
                images={[
                  [path(['image', 'url64p'])(post), true],
                  [path(['image', 'url480p'])(post), true],
                ]}
                fallback={path(['image', 'url480p'])(post)}
                priorityIndex={priorityIndex}
                resizeMode="cover"
              />
            </GridItemComponent>
          )}
        </GridComponent>
      </ScrollView>
    </View>
  )
}
const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.backgroundPrimary,
    flexWrap: 'wrap',
  },
  info: {
    padding: theme.spacing.base,
    alignItems: 'center',
  },
})

ProfilePhotoGrid.defaultProps = {
  usersImagePostsGet: {},
}

ProfilePhotoGrid.propTypes = {
  theme: PropTypes.any,
  usersImagePostsGet: PropTypes.any,
  handlePostPress: PropTypes.any,
  selectedPost: PropTypes.any,
  t: PropTypes.any,
  usersEditProfileRequest: PropTypes.any,
  user: PropTypes.any,
  postsCreateRequest: PropTypes.any,
  postsCreateQueue: PropTypes.any,
  cameraCapture: PropTypes.any,
  postsCreateIdle: PropTypes.any,
}

export default withTranslation()(withTheme(ProfilePhotoGrid))

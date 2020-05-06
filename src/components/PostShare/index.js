import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native'
import path from 'ramda/src/path'
import AccordionComponent from 'templates/Accordion'
import ModalProfileComponent from 'templates/ModalProfile'
import ModalHeaderComponent from 'templates/ModalHeader'
import ModalPreviewComponent from 'templates/ModalPreview'
import dayjs from 'dayjs'
import * as navigationActions from 'navigation/actions'
import NativeError from 'templates/NativeError'
import { Text } from '@ui-kitten/components'

import { withStyles } from '@ui-kitten/components'
import { useNavigation, useRoute } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const PostShare = ({
  t,
  theme,
  user,
  postsSingleGet,
  postsShare,
  postsShareRequest,
  watermark,
  handleWatermark,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()
  const route = useRoute()

  const tagged = (path(['data', 'textTaggedUsers'])(postsSingleGet) || [])
    .find(textTag => textTag.tag === `@${path(['username'])(user)}`)

  /**
   * Visibility of repost button, repost button will be visible if:
   * - Post owner has tagged current authenticated user
   */
  const repostButtonVisibility = (
    !path(['data', 'sharingDisabled'])(postsSingleGet) ||
    tagged
  )

  const photoUrl = (
    route.params.renderUri ||
    path(['data', 'image', 'url'])(postsSingleGet)
  )

  const handleGallerySave = () => postsShareRequest({
    photoUrl,
    type: 'cameraroll',
    title: 'Camera roll export',
    watermark,
    post: path(['data'])(postsSingleGet),
  })

  const handleRepost = () => postsShareRequest({
    photoUrl,
    type: 'repost',
    title: 'Repost',
    watermark,
    post: path(['data'])(postsSingleGet),
  })

  const handleInstagramPost = () => postsShareRequest({
    photoUrl,
    type: 'instagramPost',
    title: 'Instagram export',
    watermark,
    post: path(['data'])(postsSingleGet),
  })

  return (
    <View style={styling.root}>
      <NativeError
        handleCancelPress={() => {}}
        titleText={t('Success')}
        messageText={t('Successfully saved to camera roll')}
        actionText={t('Done')}
        status={postsShare.status}
        triggerOn="success"
        hidden={path(['payload', 'type'])(postsShare) !== 'cameraroll'}
      />

      <View style={styling.header}>
        <ModalHeaderComponent
          onPress={navigationActions.navigateBack(navigation)}
        />
      </View>

      <ScrollView bounces={false}>
        <ModalPreviewComponent
          post={path(['data'])(postsSingleGet)}
          renderUri={route.params.renderUri}
        />

        <View style={styling.content}>
          <ModalProfileComponent
            thumbnailSource={{ uri: path(['data', 'postedBy', 'photo', 'url64p'])(postsSingleGet) }}
            imageSource={{ uri: path(['data', 'postedBy', 'photo', 'url480p'])(postsSingleGet) }}
            title={path(['data', 'postedBy', 'username'])(postsSingleGet)}
            subtitle={`${t('Posted')} ${dayjs(path(['data', 'postedAt'])(postsSingleGet)).from(dayjs())}`}
          />
        </View>

        <View style={styling.content}>
          <Text style={styling.headline}>{t('Store as')}</Text>
          <View style={styling.bottomSpacing} />
          <AccordionComponent
            items={[
              {
                text: t('Repost on REAL'),
                onPress: handleRepost,
                loading: postsShare.status === 'loading' && postsShare.payload.type === 'repost',
                disabled: !repostButtonVisibility,
              },
              {
                text: t('Copy to Photos'),
                onPress: handleGallerySave,
                loading: postsShare.status === 'loading' && postsShare.payload.type === 'cameraroll',
              },
            ]}
          />
          <View style={styling.bottomSpacing} />
          <Text style={[styling.bottomSpacing]}>{t('Prove your post is verified by sharing a link to your REAL profile in it\'s description')}</Text>
          <View style={styling.bottomSpacing} />
        </View>

        <View style={styling.content}>
          <Text style={styling.headline}>{t('Share as')}</Text>
          <View style={styling.bottomSpacing} />
          <AccordionComponent
            items={[{
              text: t('Share on Instagram'),
              onPress: handleInstagramPost,
              loading: postsShare.status === 'loading' && postsShare.payload.type === 'instagramPost',
            }]}
          />
          <View style={styling.bottomSpacing} />
          <Text style={[styling.bottomSpacing]}>{t('Prove your post is verified by sharing a link to your REAL profile in it\'s description')}</Text>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    zIndex: 2,
  },
  content: {
    padding: 12,
  },
  headline: {
    fontSize: 20,
    fontWeight: '600',
  },
  bottomSpacing: {
    marginBottom: 12,
  },
})

PostShare.propTypes = {
  theme: PropTypes.any,
  postsSingleGet: PropTypes.any,
  postsShare: PropTypes.any,
  postsShareRequest: PropTypes.any,
  t: PropTypes.any,
  user: PropTypes.any,
  watermark: PropTypes.any,
  handleWatermark: PropTypes.any,
}

export default withTranslation()(withStyles(PostShare))

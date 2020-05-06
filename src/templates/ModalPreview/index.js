import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import Layout from 'constants/Layout'
import LinearGradient from 'react-native-linear-gradient'
import path from 'ramda/src/path'
import CacheComponent from 'components/Cache'

import { withStyles } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const ModalPreview = ({
  t,
  theme,
  post,
  renderUri,
}) => {
  const styling = styles(theme)
  const thumbnailSource = { uri: path(['image', 'url64p'])(post) }
  const imageSource = { uri: path(['image', 'url1080p'])(post) }

  return (
    <View style={styling.preview}>
      <LinearGradient
        colors={[`#ecf0f110`, '#ecf0f1']}
        style={styling.gradient}
      />

      {!renderUri ?
        <CacheComponent
          images={[
            [thumbnailSource.uri, true],
            [imageSource.uri, true],
          ]}
          fallback={imageSource.uri}
          priorityIndex={1}
          resizeMode="cover"
        />
      : null}

      {renderUri ?
        <CacheComponent
          images={[
            [renderUri, true],
          ]}
          fallback={renderUri}
          priorityIndex={1}
          resizeMode="cover"
        />
      : null}
    </View>
  )
}

const styles = theme => StyleSheet.create({
  preview: {
    height: 160,
    width: Layout.window.width,
  },
  gradient: {
    ...StyleSheet.absoluteFill,
    zIndex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
})

ModalPreview.propTypes = {
  theme: PropTypes.any,
  thumbnailSource: PropTypes.any,
  imageSource: PropTypes.any,
}

export default withTranslation()(withStyles(ModalPreview))

import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import pathOr from 'ramda/src/pathOr'
import * as navigationActions from 'navigation/actions'
import { Text } from '@ui-kitten/components'

import { withStyles } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const FormAlbums = ({
  t,
  theme,
  values,
  setFieldValue,
  albumsGet,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()

  const handleAlbumPress = (albumId) => () => {
    setFieldValue('albumId', albumId)
  }

  return (
    <View style={styling.root}>
      <ScrollView style={styling.albums} horizontal>
        {pathOr([], ['data'])(albumsGet).map((album, key) => {
          const style = (values.albumId === album.albumId) ?
            [styling.album, styling.albumSelected] :
            [styling.album, styling.albumDefault]

          return (
            <TouchableOpacity style={style} onPress={handleAlbumPress(album.albumId)} key={key}>
              <Text>{album.name}</Text>
            </TouchableOpacity>
          )
        })}

        <TouchableOpacity style={[styling.album, styling.albumCreate]} onPress={navigationActions.navigateAlbums(navigation)}>
          <Text>{t('Create new album')}</Text>
        </TouchableOpacity>
      </ScrollView>

      <TouchableOpacity onPress={navigationActions.navigateAlbums(navigation)}>
        <Text>{t('Choose an album from the list to group your posts')}, {t('or click here to browse all your albums')}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
  },
  text: {
  },
  albums: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  album: {
    borderRadius: 4,
    marginRight: 12,
    marginBottom: 6,
    padding: 6,
  },
  albumCreate: {
    borderColor: '#95a5a6',
    borderWidth: 1,

  },
  albumSelected: {
    backgroundColor: '#2ecc71',
  },
  albumDefault: {
    backgroundColor: '#bdc3c7',
  },
})

FormAlbums.propTypes = {
  theme: PropTypes.any,
  values: PropTypes.any,
  setFieldValue: PropTypes.any,
  t: PropTypes.any,
  albumsGet: PropTypes.any,
}

export default withTranslation()(withStyles(FormAlbums))

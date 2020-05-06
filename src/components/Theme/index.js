import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native'
import { Text } from '@ui-kitten/components'
import RowsComponent from 'templates/Rows'
import RowsItemComponent from 'templates/RowsItem'
import UserRowComponent from 'templates/UserRow'
import ThemeRowActionComponent from 'templates/ThemeRowAction'
import path from 'ramda/src/path'
import ThemeAvatar from 'templates/ThemeAvatar'

import { withStyles } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Theme = ({
  t,
  theme,
  user,
  themeFetch,
  themePreview,
  themePreviewRequest,
  themePreviewIdle,
}) => {
  const styling = styles(theme)
  
  return (
    <ScrollView style={styling.root}>
      <RowsComponent items={path(['data'])(themeFetch)}>
        {(theme) => (
          <RowsItemComponent>
            <UserRowComponent
              avatar={
                <ThemeAvatar
                  size="default"
                  colors={[
                    'red',
                    'black',
                  ]}
                />
              }
              content={
                <View>
                  {/*
                   * Available values coming from json resource
                   *
                   * White & Green
                   * Black & Green
                   * White & Red
                   * Black & Red
                   */}
                  <Text style={styling.username}>{t(path(['label'])(theme))}</Text>
                </View>
              }
              action={
                <ThemeRowActionComponent
                  enabled={user.themeCode === theme.key}
                  onEnablePress={() => themePreviewRequest({ name: theme.key, theme: theme.theme })}
                  onDisablePress={themePreviewIdle}
                />
              }
            />
          </RowsItemComponent>
        )}
      </RowsComponent>
    </ScrollView>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 12,
  },
  form: {
    padding: 12,
  },
})

Theme.propTypes = {
  theme: PropTypes.any,
  initialValues: PropTypes.any,
  themeFetch: PropTypes.any,
  themePreview: PropTypes.any,
  themePreviewRequest: PropTypes.any,
  themePreviewIdle: PropTypes.any,
  t: PropTypes.any,
}

export default withTranslation()(withStyles(Theme))

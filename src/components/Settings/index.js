import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import {
  Alert,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import ActionSheet from 'react-native-actionsheet'
import RowsComponent from 'templates/Rows'
import RowsItemComponent from 'templates/RowsItem'
import UserRowComponent from 'templates/UserRow'
import SettingsAvatar from 'templates/SettingsAvatar'
import EditIcon from 'assets/svg/settings/Edit'
import PhotoIcon from 'assets/svg/settings/Photo'
import NextIcon from 'assets/svg/settings/Next'
import LanguageIcon from 'assets/svg/settings/Language'
import ThemeIcon from 'assets/svg/settings/Theme'
import ArchiveIcon from 'assets/svg/settings/Archive'
import SignoutIcon from 'assets/svg/settings/Signout'
import PrivacyIcon from 'assets/svg/settings/Privacy'
import DiamondIcon from 'assets/svg/settings/Diamond'
import CashIcon from 'assets/svg/settings/Cash'
import Avatar from 'templates/Avatar'
import path from 'ramda/src/path'
import * as navigationActions from 'navigation/actions'
import codePush from 'react-native-code-push' 
import useAsync from 'react-use/lib/useAsync'
import { Text } from '@ui-kitten/components'

import { withStyles } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Settings = ({
  t,
  theme,
  authSignoutRequest,
  user,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()
  const actionSheetRef = useRef(null)

  const handleProfilePhotoUpload = () => {
    Alert.alert(
      'Profile Photo Upload',
      'Your photo will be uploaded as post',
      [{
        text: 'Take a Photo',
        onPress: navigationActions.navigateCamera(navigation, { nextRoute: 'ProfilePhoto' }),
      }],
      { cancelable: true }
    )
  }

  const codePushVersion = useAsync(async () => {
    const response = await codePush.getUpdateMetadata()
    return response
  }, [])

  // {
  //   label: t('Join Diamond'),
  //   onPress: () => navigation.navigate('Membership'),
  //   icon: <DiamondIcon fill={'#333333'} />,
  // }
  // {
  //   label: t('Change Language'),
  //   onPress: () => navigation.navigate('Translation'),
  //   icon: <LanguageIcon fill={'#333333'} />,
  // }

  return (
    <ScrollView style={styling.root}>
      <TouchableOpacity onPress={() => navigation.navigate('ProfilePhoto')}>
        <Avatar
          size="large"
          thumbnailSource={{ uri: path(['photo', 'url64p'])(user) }}
          imageSource={{ uri: path(['photo', 'url480p'])(user) }}
        />
      </TouchableOpacity>

      <ActionSheet
        ref={actionSheetRef}
        options={[t('Take a Photo'), t('Choose From Gallery'), t('Cancel')]}
        cancelButtonIndex={2}
        onPress={(index) => {
          if (index === 0) {
            handleProfilePhotoUpload()
          }
          if (index === 1) {
            navigation.navigate('ProfilePhoto')
          }
        }}
      />

      <RowsComponent items={[{
        label: t('Edit Profile'),
        onPress: () => navigation.navigate('ProfileEdit'),
        icon: <EditIcon fill={'#333333'} />,
      }, {
        label: t('Change Profile Photo'),
        onPress: () => actionSheetRef.current.show(),
        icon: <PhotoIcon fill={'#333333'} />,
      }, {
        label: t('Choose Theme'),
        onPress: () => navigation.navigate('Theme'),
        icon: <ThemeIcon fill={'#333333'} />,
      }, {
        label: t('Archived Photos'),
        onPress: () => navigation.navigate('Archived'),
        icon: <ArchiveIcon fill={'#333333'} />,
      }, {
        label: t('Mental Health & Privacy Settings'),
        onPress: () => navigation.navigate('Privacy'),
        icon: <PrivacyIcon fill={'#333333'} />,
      }, {
        label: t('Diamond Payout'),
        onPress: () => navigation.navigate('Payout'),
        icon: <CashIcon fill={'#333333'} />,
      }, {
        label: t('Signout'),
        onPress: () => authSignoutRequest(),
        icon: <SignoutIcon fill={'#333333'} />,
      }]}>
        {(settings) => (
          <RowsItemComponent hasBorders>
            <UserRowComponent
              onPress={path(['onPress'])(settings)}
              avatar={
                <SettingsAvatar icon={path(['icon'])(settings)} />
              }
              content={
                <View>
                  <Text style={styling.username}>{path(['label'])(settings)}</Text>
                </View>
              }
              action={
                <SettingsAvatar icon={<NextIcon fill={'#333333'} />} />
              }
            />
          </RowsItemComponent>
        )}
      </RowsComponent>

      {!codePushVersion.loading ?
        <View style={styling.helper}>
          <Text>version: {path(['value', 'appVersion'])(codePushVersion)} [{path(['value', 'label'])(codePushVersion)}]</Text>
        </View>
      : null}
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
  details: {
    alignItems: 'center',
  },
  helper: {
    paddingVertical: 8,
    paddingBottom: 32,
  }
})

Settings.propTypes = {
  theme: PropTypes.any,
  authSignout: PropTypes.any,
  authSignoutRequest: PropTypes.any,
  user: PropTypes.any,
  t: PropTypes.any,
  authSignoutRequest: PropTypes.any,
}

export default withTranslation()(withStyles(Settings))

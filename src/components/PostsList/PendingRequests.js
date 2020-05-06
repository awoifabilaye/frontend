import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native'
import PendingIcon from 'assets/svg/post/Pending'
import * as navigationActions from 'navigation/actions'
import path from 'ramda/src/path'
import { Text } from '@ui-kitten/components'

import { withStyles } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const PendingRequests = ({
  t,
  theme,
  usersGetPendingFollowers,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()

  if (!path(['data', 'length'])(usersGetPendingFollowers)) {
    return null
  }

  return (
    <View style={styling.root}>
      <View style={styling.avatar}>
        <PendingIcon fill="#ffffff" />
      </View>

      <View style={styling.status}>
        {usersGetPendingFollowers.data.length === 1 ?
          <TouchableOpacity style={styling.content} onPress={navigationActions.navigateProfileRequests(navigation)}>
            <Text style={styling.title}>{t('You have {{number}} new request', { number: usersGetPendingFollowers.data.length })}</Text>
            <View style={styling.caption}>
              <Text style={styling.subtitle}>{t('Follower request from')} {usersGetPendingFollowers.data.map(user => user.username)}</Text>
            </View>
          </TouchableOpacity>
        : null}

        {usersGetPendingFollowers.data.length > 1 ?
          <TouchableOpacity style={styling.content} onPress={navigationActions.navigateProfileRequests(navigation)}>
            <Text style={styling.title}>{t('You have {{number}} new requests', { number: usersGetPendingFollowers.data.length })}</Text>
            <View style={styling.caption}>
              <Text style={styling.subtitle}>{t('Follower requests from')} {usersGetPendingFollowers.data.map(user => user.username)} {t('and others')}</Text>
            </View>
          </TouchableOpacity>
        : null}
        {/* <TouchableOpacity style={styling.icon} onPress={() => {}}>
          <CloseIcon fill="#ffffff" />
        </TouchableOpacity> */}
      </View>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#ffffff',
  },
  avatar: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  content: {
    paddingHorizontal: 8,
    justifyContent: 'center',
    flex: 1,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 38,
    width: 38,
  },
  title: {
  },
  subtitle: {
    color: '#676767',
    marginRight: 4,
  },
  caption: {
    flexDirection: 'row',
    alignItems: 'center',
  }
})

PendingRequests.propTypes = {
  theme: PropTypes.any,
  t: PropTypes.any,
  usersGetPendingFollowers: PropTypes.any,
}

export default withTranslation()(withStyles(PendingRequests))

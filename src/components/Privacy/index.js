import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native'
import PrivacyForm from 'components/Privacy/Form'
import Disclaimer from 'components/Privacy/Disclaimer'

import { withStyles } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Privacy = ({
  t,
  theme,
  user,
  togglePrivacyStatus,
  toggleFollowCountsHidden,
  toggleViewCountsHidden,
  toggleLikesDisabled,
  toggleCommentsDisabled,
  toggleSharingDisabled,
  toggleVerificationHidden,
}) => {
  const styling = styles(theme)
  
  return (
    <ScrollView>
      <View style={styling.root}>
        <PrivacyForm
          user={user}
          togglePrivacyStatus={togglePrivacyStatus}
          toggleFollowCountsHidden={toggleFollowCountsHidden}
          toggleViewCountsHidden={toggleViewCountsHidden}
          toggleLikesDisabled={toggleLikesDisabled}
          toggleCommentsDisabled={toggleCommentsDisabled}
          toggleSharingDisabled={toggleSharingDisabled}
          toggleVerificationHidden={toggleVerificationHidden}
        />
        <Disclaimer />
      </View>
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

Privacy.propTypes = {
  theme: PropTypes.any,
  user: PropTypes.any,
  togglePrivacyStatus: PropTypes.any,
  toggleFollowCountsHidden: PropTypes.any,
  t: PropTypes.any,
  toggleViewCountsHidden: PropTypes.any,
  toggleLikesDisabled: PropTypes.any,
  toggleCommentsDisabled: PropTypes.any,
  toggleSharingDisabled: PropTypes.any,
  toggleVerificationHidden: PropTypes.any,
}

export default withTranslation()(withStyles(Privacy))

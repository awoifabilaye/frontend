import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native'
import DefaultButton from 'components/Formik/Button/DefaultButton'
import FeatureComponent from 'templates/Feature'
import { Text } from '@ui-kitten/components'
import path from 'ramda/src/path'

import { withStyles } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Verification = ({
  t,
  theme,
  user,
  postsSingleGet,
  postsEditRequest,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()
  
  /**
   * Hide verification if:
   * - Post does not belong to currently authenticated user
   * - Post is not uploaded yet
   */
  const verificationVisibility = (
    user.userId === path(['data', 'postedBy', 'userId'])(postsSingleGet) &&
    path(['data', 'postId'])(postsSingleGet)
  )

  return (
    <ScrollView style={styling.root}>
      <View>
        <View style={[styling.title, styling.titlePrimary]}>
          <Text>{t('Verification Criteria')}</Text>
        </View>
        <View style={styling.features}>
          <FeatureComponent active>{t('The Photo must be uncropped')}</FeatureComponent>
          <FeatureComponent active>{t('The Photo must be unrotated')}</FeatureComponent>
          <FeatureComponent active>{t('The Photo must have been taken on this phone (not sent to you)')}</FeatureComponent>
          <FeatureComponent active>{t('If you’re still having trouble, photos taken using the camera inside the REAL app will always pass verification')}</FeatureComponent>
        </View>
      </View>

      {verificationVisibility ?
        <View style={styling.action}>
          <DefaultButton label={t('Dismiss')} onPress={postsEditRequest} />
        </View>
      : null}
    </ScrollView>
  )
}
  
const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  title: {
    backgroundColor: '#bdc3c7',
    padding: 12,
  },
  titlePrimary: {
    backgroundColor: '#2ecc71',
  },
  disabled: {
    display: 'none',
  },
  features: {
    marginVertical: 6,
  },
  action: {
    padding: 12,
  },
})

Verification.propTypes = {
  theme: PropTypes.any,
  t: PropTypes.any,
  user: PropTypes.any,
  postsSingleGet: PropTypes.any,
  postsEditRequest: PropTypes.any,
}

export default withTranslation()(withStyles(Verification))
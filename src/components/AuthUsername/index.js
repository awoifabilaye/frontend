import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  StyleSheet,
} from 'react-native'
import FormComponent from 'components/AuthUsername/Form'
import AuthActionTemplate from 'templates/Auth/Action'
import AuthHeaderTemplate from 'templates/Auth/Header'
import * as navigationActions from 'navigation/actions'

import { withTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const AuthUsername = ({
  t,
  theme,
  authSignin,
  authSigninRequest,
}) => {
  const styling = styles(theme)
  const navigation = useNavigation()

  return (
    <React.Fragment>
      <View style={styling.root}>
        <AuthHeaderTemplate
          title={t('Secure Your Account')}
          subtitle={t('You can always change it later')}
        />

        <View style={styling.content}>
          <FormComponent
            authSignin={authSignin}
            authSigninRequest={authSigninRequest}
          />
        </View>
      </View>
    </React.Fragment>
  )
}

const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 48, 
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  footer: {
  },
})

AuthUsername.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
  authSignin: PropTypes.any,
  authSigninRequest: PropTypes.any,
}

export default withTranslation()(withTheme(AuthUsername))

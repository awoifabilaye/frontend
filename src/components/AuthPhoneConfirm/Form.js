import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import TextField from 'components/Formik/TextField'
import DefaultButton from 'components/Formik/Button/DefaultButton'
import { Formik, Field } from 'formik'
import * as Yup from 'yup'

import { withStyles } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const formSchema = Yup.object().shape({
  code: Yup.string()
    .min(3)
    .max(50)
    .matches(/^\S*$/, 'no whitespace')
    .trim()
    .required(),
})

const PhoneConfirmForm = ({
  t,
  theme,
  handleSubmit,
  loading,
}) => {
  const styling = styles(theme)
  
  return (
    <View style={styling.root}>
      <View style={styling.input}>
        <Field name="code" component={TextField} placeholder={t('Confirmation Code')} />
      </View>
      <View style={styling.input}>
        <DefaultButton label={t('Next')} onPress={handleSubmit} loading={loading} disabled={loading} />
      </View>
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
  },
  input: {
    marginBottom: 12,
  },
})

PhoneConfirmForm.propTypes = {
  t: PropTypes.any,
  theme: PropTypes.any,
  handleSubmit: PropTypes.any,
  loading: PropTypes.any,
  authSignin: PropTypes.any,
}

export default withTranslation()(withStyles(({
  authSignin,
  authSigninRequest,
  ...props
}) => (
  <Formik
    initialValues={{
      code: '',
    }}
    validationSchema={formSchema}
    onSubmit={authSigninRequest}
    enableReinitialize
  >
    {(formikProps) => (
      <PhoneConfirmForm
        {...formikProps}
        {...props}
        loading={authSignin.status === 'loading'}
      />
    )}
  </Formik>
)))

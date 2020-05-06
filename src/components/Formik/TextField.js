import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
} from 'react-native'
import { ErrorMessage } from 'formik'
import { Text, Input } from '@ui-kitten/components'

import { withStyles } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const TextField = ({
  t,
  theme,
  field: {
    value,
    name,
  },
  form,
  placeholder,
  multiline = false,
  keyboardType = 'default',
  onSubmitEditing,
  disabled,
  hideError,
  autoCompleteType = 'off',
  secureTextEntry,
}) => {
  const styling = styles(theme)
  

  const onFocus = () => {
    form.setFieldTouched(name, true)
  }
  const onBlur = (event) => {
    form.handleBlur(name)(event)
    // form.setFieldTouched(name, false)
  }
  const onChangeText = (event) => {
    form.handleChange(name)(event)
  }

  return (
    <View style={styling.root}>
      <Input
        style={styling.input}
        name={name}
        onChangeText={onChangeText}
        onBlur={onBlur}
        onFocus={onFocus}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={'#95a5a6'}
        autoCapitalize="none"
        multiline={multiline}
        keyboardType={keyboardType}
        onSubmitEditing={onSubmitEditing}
        mode="outlined"
        dense={true}
        label={placeholder}
        disabled={disabled}
        autoCompleteType={autoCompleteType}
        secureTextEntry={secureTextEntry}
        returnKeyType="done"
      />

      {!hideError ?
        <ErrorMessage name={name} render={msg => <Text>{msg}</Text>} />
      : null}
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
  },
  input: {
  },
  error: {
  },
})

TextField.propTypes = {
  theme: PropTypes.any,
  field: PropTypes.any,
  form: PropTypes.any,
  placeholder: PropTypes.any,
  meta: PropTypes.any,
  multiline: PropTypes.any,
  keyboardType: PropTypes.any,
  onSubmitEditing: PropTypes.any,
  disabled: PropTypes.any,
  t: PropTypes.any,
  hideError: PropTypes.any,
  autoCompleteType: PropTypes.any,
  secureTextEntry: PropTypes.any,
}

export default withTranslation()(withStyles(TextField))

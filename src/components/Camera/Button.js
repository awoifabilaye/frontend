import React from 'react'
import PropTypes from 'prop-types'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import useInterval from 'react-use/lib/useInterval'
import useBoolean from 'react-use/lib/useBoolean'

import { withStyles } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Button = ({
  t,
  theme,
  handleCameraRecordStart,
  handleCameraRecordStop,
}) => {
  const styling = styles(theme)
  

  const [count, setCount] = React.useState(0)
  const [isRunning, toggleIsRunning] = useBoolean(false)

  useInterval(
    () => {
      setCount(count + 0.1)

      if (count >= 15) {
        handleCameraRecordStop()
      }
    },
    isRunning ? 100 : null
  )

  const handlePress = () => {
    handleCameraRecordStart()
    toggleIsRunning()
  }

  return (
    <TouchableOpacity style={styling.capture} onPress={handlePress}>
      <AnimatedCircularProgress
        size={90}
        width={6}
        fill={Math.ceil(count / 15 * 100)}
        tintColor={'#2ecc71'}
        backgroundColor={'#333333'}
      />
    </TouchableOpacity>
  )
}

const styles = theme => StyleSheet.create({
  capture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 20,
    backgroundColor: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

Button.propTypes = {
  theme: PropTypes.any,
  handleCameraRecordStart: PropTypes.any,
  handleCameraRecordStop: PropTypes.any,
  t: PropTypes.any,
}

export default withTranslation()(withStyles(Button))

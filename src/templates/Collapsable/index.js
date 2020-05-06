import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native'
import useToggle from 'react-use/lib/useToggle'
import UpIcon from 'assets/svg/collapsable/Up'
import DownIcon from 'assets/svg/collapsable/Down'
import { Text } from '@ui-kitten/components'

import { withStyles } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Collapsable = ({
  children,
  theme,
  style,
  title,
  active,
  helper,
}) => {
  const styling = styles(theme)
  const [visible, setVisible] = useToggle(active)

  return (
    <View style={[styling.root, style]}>
      <TouchableOpacity onPress={setVisible} style={styling.spacing}>
        <View style={styling.header}>
          <Text style={styling.title}>{title}</Text>

          <View style={styling.icon}>
            {!visible ?
              <DownIcon fill={'#333333'} />
            : 
              <UpIcon fill={'#333333'} />
            }
          </View>
        </View>

        {!visible ?
          <Text>{helper}</Text>
        : null}
      </TouchableOpacity>

      {visible ? children : null}
    </View>
  )
}

const styles = theme => StyleSheet.create({
  root: {
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  spacing: {
    paddingBottom: 12,
  },
  icon: {
  },
  title: {
    fontSize: 18,
  },
})

Collapsable.propTypes = {
  children: PropTypes.any,
  theme: PropTypes.any,
  style: PropTypes.any,
  title: PropTypes.any,
  active: PropTypes.any,
  helper: PropTypes.any,
}

export default withTranslation()(withStyles(Collapsable))

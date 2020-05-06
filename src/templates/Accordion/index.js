import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { Text } from '@ui-kitten/components'

import { withStyles } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Accordion = ({
  t,
  theme,
  items,
}) => {
  const styling = styles(theme)
  const list = items.filter(item => !item.disabled)

  return (
    <View style={styling.accordion}>
      {list.map((item, key) => {
        const style = (key + 1 !== list.length) ?
          [styling.divider] :
          null

        return (
          <View key={key} style={style}>
            <TouchableOpacity style={styling.accordionItem} onPress={item.onPress}>
              <Text style={styling.text}>{item.text}</Text>

              {item.loading ?
                <ActivityIndicator size={8} style={styling.icon} />
              : null}
            </TouchableOpacity>
          </View>
        )
      })}
    </View>
  )
}

const styles = theme => StyleSheet.create({
  text: {
    fontSize: 16,
  },
  accordion: {
    backgroundColor: '#bdc3c7',
    borderRadius: 4,
  },
  accordionItem: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  divider: {
    borderBottomColor: `${'#95a5a6'}20`,
    borderBottomWidth: 0.5,
  },
  icon: {
    paddingHorizontal: 12,
  },
})

Accordion.propTypes = {
  theme: PropTypes.any,
  items: PropTypes.any,
}

export default withTranslation()(withStyles(Accordion))

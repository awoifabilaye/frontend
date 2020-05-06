import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native'
import { Text } from '@ui-kitten/components'
import Formula from 'components/Payout/Formula'

import { withStyles } from '@ui-kitten/components'
import { useNavigation } from '@react-navigation/native'
import { withTranslation } from 'react-i18next'

const Payout = ({
  t,
  theme,
}) => {
  const styling = styles(theme)
  
  return (
    <ScrollView style={styling.root}>
      <Text style={styling.title}>{t('Starting March of 2019')}</Text>
      <Text style={styling.title}>{t('Current Payout Per 💎View')}.</Text>

      <View style={styling.amount}>
        <Text>{t('{{amount}}', '$0.11')}</Text>
      </View>
      
      <Text style={styling.paragraph}>{t('We feel there are many influencers on Social Media getting paid to promote products that they don’t actually use or care about in real life')}. {t('On REAL, you’ll get paid to be yourself')}.</Text>
      <Text style={styling.paragraph}>{t('For every view you get from another diamond member, you’ll be paid the current payout per view rate (above)')}. {t('We explain how it’s calculated below')}.</Text>
      <Text style={styling.paragraph}>{t('Tips to earning big on REAL')}:</Text>
      <Text style={styling.paragraph}>* {t('You can restrict your account to only allow followers who have a diamond membership to ensure you’re getting paid for every view')}.</Text>
      <Text style={styling.paragraph}>* {t('You can add an additional “Charge Users Monthly” fee, which requires followers to pay you each month')}.</Text>

      <Text style={styling.title}>{t('Is Calculated')}:</Text>
      <Text style={styling.paragraph}>{t('How “Current Payout Per 💎View” Is Calculated')}.</Text>
      <Text style={styling.paragraph}>{t('This rate changes slightly throughout the day and is calculated in real time by our platform learning from the previous day’s views and revenues')}.</Text>

      <View style={styling.formula}>
        <Formula />
      </View>

      <Text style={styling.paragraph}>* <Text style={styling.bold}>{t('Total Revenue')}</Text>: {t('The amount of money {{comapny}} earned over the past 30 days from all global REAL subscribers', { company: '“REAL.app, Inc.“' })}.</Text>
      <Text style={styling.paragraph}>* <Text style={styling.bold}>{t('Processing Fees')}</Text>: {t('Fees taken by our providers to operate our business')} (e.g Apple Pay, AWS)</Text>
      <Text style={styling.paragraph}>* <Text style={styling.bold}>{t('Total 💎Views')}</Text>: {t('Total views over the past 30 days of diamond member posts by other REAL diamond members')}.</Text>
    </ScrollView>
  )
}
  
const styles = theme => StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 12,
  },
  paragraph: {
    marginBottom: 12,
  },
  amount: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 24,
    backgroundColor: '#2ecc71',
  },
  formula: {
    marginTop: 12,
    marginBottom: 24,
  },
  bold: {
    fontWeight: '500',
    color: '#333333',
  },
})

Payout.propTypes = {
  theme: PropTypes.any,
  t: PropTypes.any,
}

export default withTranslation()(withStyles(Payout))

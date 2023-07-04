import React from 'react';

import { ActivityIndicator, View } from 'react-native';

import styles from './styles';

const Load = ({ show = false, size = 'small', color = 'black' }) => {
  return show ? (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size={size} color={color} />
    </View>
  ) : null
}

export default Load
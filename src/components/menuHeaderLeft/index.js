import React from 'react';
import { Platform, TouchableNativeFeedback, TouchableOpacity } from 'react-native';

import { Ionicons } from '../';

const MenuHeaderLeft = ({
  navigation,
}) => {
  const TouchableElement = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
                
  return (
    <>
      <TouchableElement onPress={() => navigation.getParent('headerDrawerLeft').openDrawer()}>
        <Ionicons name="person-outline" size={20} />
      </TouchableElement>
    </>
  )
}

export default MenuHeaderLeft
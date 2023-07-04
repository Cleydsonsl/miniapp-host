import React, { useContext, useEffect } from 'react';
import { Federated } from '@callstack/repack/client';

import { Platform, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import { Ionicons, Load } from '../../components';

import { GlobalContext } from '../../context';
import styles from './styles';

const CardHeader = React.lazy(() => Federated.importModule('checkout', './CardHeader'))

const MenuHeaderRight = ({
  navigation,
  miniapps
}) => {
  const { context } = useContext(GlobalContext)
  const TouchableElement = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;
  
  return (
    <>
      {!miniapps.hideCard && (
        <View style={styles.containerCard}>
          <React.Suspense fallback={<Load show={true} />}>
            <CardHeader navigation={navigation} reload={context.ui.reload.topRight} />
          </React.Suspense>
        </View>
      )}
      <TouchableElement onPress={() => navigation.getParent('headerDrawerRigth').openDrawer()}>
        <Ionicons name="notifications-outline" size={20} />
      </TouchableElement>
    </>
  )
}

export default MenuHeaderRight
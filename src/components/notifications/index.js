import React from 'react';
import { SafeAreaView, ScrollView, Text } from 'react-native';
import styles from './styles';

const Notifications = () => { 
  return ( 
    <SafeAreaView contentContainerStyle={styles.scrollContainer}>
      <ScrollView style={styles.notifications}> 
        <Text>Sem novas notificações!</Text> 
      </ScrollView> 
    </SafeAreaView>
  ); 
}

export default Notifications;
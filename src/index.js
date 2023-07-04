import 'react-native-gesture-handler';
import React from 'react';
import { Federated } from '@callstack/repack/client';

// import { useRoute } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import miniAppsJson from './miniapps.json';

import { 
  MenuHeaderLeft,
  MenuHeaderRight,
  MiniApps,
  Notifications,
} from './components';

import { GlobalProvider } from './context';

const App = () => {
  const Stack = createNativeStackNavigator();

  const Container = () => { 
    const lazyApps = miniAppsJson.map((mini) => ({
      ...mini,
      component: React.lazy(() => Federated.importModule(mini.id, './App')),
    }))

    const initialRoute = miniAppsJson.filter(apps => apps.initial)[0]

    return (
      <Stack.Navigator 
        initialRouteName={initialRoute.id}
        id="Container"
        screenOptions={({ route, navigation }) => {
          return {
            gestureEnabled: true
          }
        }}
      >
        {lazyApps.map((miniapps, i) => (
          <Stack.Screen 
            key={miniapps.id || i}  
            id={miniapps.id} 
            name={miniapps.id} 
            options={({ route, navigation }) => ({
              // title: route.params.userId,
              title: miniapps.label,
              headerRight: (props) => <MenuHeaderRight navigation={navigation} miniapps={miniapps} {...props} />,
              headerLeft: (props) => miniapps.headerShow && <MenuHeaderLeft navigation={navigation} miniapps={miniapps} {...props} />,
            })}
            component={MiniApps(miniapps)}
          />
        ))}
      </Stack.Navigator>
    )
  }

  const LeftDrawer = createDrawerNavigator();
  const LeftDrawerScreen = () => {
    return (
      <LeftDrawer.Navigator
        id="headerDrawerLeft"
        screenOptions={{ drawerPosition: 'left', headerShown: false }}
      >
        <LeftDrawer.Screen name="container" component={Container} />
      </LeftDrawer.Navigator>
    );
  };

  const RightDrawer = createDrawerNavigator();
  const RightDrawerScreen = () => {
    return (
      <RightDrawer.Navigator
        id="headerDrawerRigth"
        screenOptions={{ drawerPosition: 'right', headerShown: false }}
        drawerContent={(props) => <Notifications {...props} />}
      > 
        <RightDrawer.Screen name="notification" component={LeftDrawerScreen} /> 
      </RightDrawer.Navigator> 
    );
  };

  return (
    <GlobalProvider>
      <NavigationContainer>
        <RightDrawerScreen />
      </NavigationContainer>
    </GlobalProvider>
  )
}

export default App;

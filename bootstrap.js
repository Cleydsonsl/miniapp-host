import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './src/index';

// SOMENTE NO HOST DEVERIA TER ESSA SCRIPT
import scriptSharedModules from './scriptSharedModules'; 
scriptSharedModules(); 

AppRegistry.registerComponent(appName, () => App);

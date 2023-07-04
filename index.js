/**
 * @format
 */

 import {AppRegistry, Platform} from 'react-native';
 import {ScriptManager, Script, Federated} from '@callstack/repack/client';
 import {name as appName} from './app.json';
 import {version as appVersion} from './package.json';
 import miniapps from './src/miniapps.json';
 import getContainers from '../miniapp-server/utils/getContainersURL';
 import App from './src/index';
 
import {CATALOG_SERVER_URL} from '@env';
 
 ScriptManager.shared.addResolver(async (scriptId, caller) => {
   const containersURL = getContainers({
    hostname: CATALOG_SERVER_URL,
    version: appVersion,
    platform: Platform.OS,
    appName
   });

   const containersResponse = await fetch(containersURL);

   const containers = await containersResponse.json();

   const resolveURL = Federated.createURLResolver({
    containers,
   });

  let url;
  if (__DEV__ && caller === 'main') {
    url = Script.getDevServerURL(scriptId);
  } else {
    url = resolveURL(scriptId, caller);
  }

  if (!url) {
    return undefined;
  }

  return {
    url,
    cache: !__DEV__,
    query: {
      platform: Platform.OS,
    },
    verifyScriptSignature: 'strict'
  }
 });
 
 AppRegistry.registerComponent(appName, () => App);
 
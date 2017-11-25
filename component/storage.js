import { AsyncStorage } from 'react-native';
import Storage from 'react-native-storage';

let storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: true
})

// storage.save({
//   key: 'accessToken',
//   rawData: {
//     token: '1c960268-5b1e-4747-8196-81249ec01371',
//     name: 'jhonny-wang',
//     isLogin: true
//   }
// })
global.storage = storage;
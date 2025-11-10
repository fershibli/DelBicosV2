import AsyncStorage from '@react-native-async-storage/async-storage';

// Lightweight adapter: prefer expo-secure-store when available at runtime,
// fallback to AsyncStorage. We avoid requiring expo-secure-store at build-time
// so repository consumers can choose to install it.

let SecureStore: any = null;
let secureStoreAvailable = false;

try {
  // dynamic require to avoid hard dependency at build time
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  SecureStore = require('expo-secure-store');
  secureStoreAvailable = !!SecureStore;
} catch (e) {
  secureStoreAvailable = false;
}

const KEY_PREFIX = '@delbicos:';

export const secureStorage = {
  async getItem(key: string): Promise<string | null> {
    const fullKey = `${KEY_PREFIX}${key}`;
    try {
      if (secureStoreAvailable && SecureStore.getItemAsync) {
        return await SecureStore.getItemAsync(fullKey);
      }
      return await AsyncStorage.getItem(fullKey);
    } catch (e) {
      return null;
    }
  },
  async setItem(key: string, value: string): Promise<void> {
    const fullKey = `${KEY_PREFIX}${key}`;
    try {
      if (secureStoreAvailable && SecureStore.setItemAsync) {
        await SecureStore.setItemAsync(fullKey, value);
        return;
      }
      await AsyncStorage.setItem(fullKey, value);
    } catch (e) {
      // ignore errors silently — fallback storage best-effort
    }
  },
  async deleteItem(key: string): Promise<void> {
    const fullKey = `${KEY_PREFIX}${key}`;
    try {
      if (secureStoreAvailable && SecureStore.deleteItemAsync) {
        await SecureStore.deleteItemAsync(fullKey);
        return;
      }
      await AsyncStorage.removeItem(fullKey);
    } catch (e) {
      // ignore
    }
  },
};

export default secureStorage;

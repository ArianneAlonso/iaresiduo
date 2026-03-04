import Constants from 'expo-constants';

const getBaseUrl = () => {
  if (__DEV__) {
    const hostUri =
      Constants.expoConfig?.hostUri ||
      Constants.expoGoConfig?.hostUri;

    if (!hostUri) {
      return 'http://localhost:8000';
    }

    const cleaned = hostUri.replace('exp://', '').replace('http://', '');
    const ip = cleaned.split(':')[0];

    return `http://${ip}:8000`;
  }

};

export const API_URL = getBaseUrl();
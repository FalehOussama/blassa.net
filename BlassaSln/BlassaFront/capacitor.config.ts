

import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'blassa.cov',
  appName: 'Blassa',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  cordova: {
    preferences: {
      ScrollEnabled: 'false',
      BackupWebStorage: 'none',
      SplashMaintainAspectRatio: 'true',
      FadeSplashScreenDuration: '300',
      SplashShowOnlyFirstTime: 'false',
      SplashScreen: 'screen',
      SplashScreenDelay: '3000'
    }
  },
  plugins: {
    FirebaseAuthentication: {
      skipNativeAuth: false,
      providers: ["apple.com", "google.com"],
    },
    GoogleAuth: {
    scopes: ["profile","email"],
    serverClientId: "856756010084-gleml74i01flrj2gd64ckkmpfk2d8io4.apps.googleusercontent.com"
    }
    }
};

export default config;

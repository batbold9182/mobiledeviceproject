import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { Slot,
} from 'expo-router';


import { AuthProvider } from '../context/AuthContext';
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    const hideSplash = async () => {
      await SplashScreen.hideAsync();
    };

    hideSplash();
  }, []);

  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}

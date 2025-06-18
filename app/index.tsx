import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ActivityIndicator, View, Text, Image , } from 'react-native';

export default function Index() {
  const { token, loading } = useAuth();
  const router = useRouter();

  const [showSplash, setShowSplash] = useState(true); 

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSplash(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!loading && !showSplash) {
      router.replace(token ? '/(app)/home' : '/auth/signin');
    }
  }, [loading, token, showSplash,router]);

  if (showSplash || loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <Image source={require('../components/icon/icon.png')} style={{ width: 120, height: 120, marginBottom: 20 }} />
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Welcome to BestMovies</Text>
        <ActivityIndicator size="large" style={{ marginTop: 20 }} />
      </View>
    );
  }

  return null;
}

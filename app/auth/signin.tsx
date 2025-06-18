import { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useRouter ,
        Link
} from 'expo-router';


export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();
  const router = useRouter();
  
  const handleSignIn = () => {
    if (email && password) {
      signIn('dummy-token');
      router.replace('/(app)/home');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Email:</Text>
      <TextInput onChangeText={setEmail} value={email} />
      <Text>Password:</Text>
      <TextInput secureTextEntry onChangeText={setPassword} value={password} />
      <Button title="Sign In" onPress={handleSignIn} />
      <Link href="/auth/signup">
  <Text style={{ marginTop: 20, color: 'blue' }}>Dont have an account? Sign up</Text>
</Link>
    </View>
    
  );
  
}

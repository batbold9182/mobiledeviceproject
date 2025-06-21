import { useState } from 'react';
import {
  TextInput,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useRouter, Link } from 'expo-router';

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
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: 'padding', android: undefined })}
      style={styles.container}
    >
      <Text style={styles.title}>Welcome Back!</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="you@example.com"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail}
        value={email}
        textContentType="emailAddress"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="••••••••"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
        textContentType="password"
      />

      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <Link href="/auth/signup" style={styles.signupLink}>
        <Text style={styles.signupText}>Dont have an account? Sign up</Text>
      </Link>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 36,
    alignSelf: 'center',
    color: '#333',
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    color: '#555',
  },
  input: {
    height: 48,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  button: {
    backgroundColor: '#007AFF',
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  signupLink: {
    marginTop: 20,
    alignSelf: 'center',
  },
  signupText: {
    color: '#007AFF',
    fontSize: 16,
  },
});

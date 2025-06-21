import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'expo-router';
import React, { useEffect, useState, useRef } from 'react';
import { Movie } from '../(app)/types/movie';
import PageHandle from './types/pagehandle';

const API_KEY = 'b5086d70a6c34cbeeaf56b54b81b9363';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export default function HomeScreen() {
  const { signOut } = useAuth();
  const router = useRouter();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleLogout = () => {
    signOut();
    router.replace('/auth/signin');
  };

  useEffect(() => {
    // Animate fade-out
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      setLoading(true);

      // Fetch movies for the new page
      fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
      )
        .then((response) => response.json())
        .then((data) => {
          setMovies(data.results);
          setLoading(false);

          // Animate fade-in
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 250,
            useNativeDriver: true,
          }).start();
        })
        .catch(() => {
          setLoading(false);
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 250,
            useNativeDriver: true,
          }).start();
        });
    });
  }, [page, fadeAnim]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcome}>Welcome to the best movie site</Text>
        <PageHandle
          page={page}
          onPrev={() => setPage((p) => Math.max(p - 1, 1))}
          onNext={() => setPage((p) => p + 1)}
        />
        <Text style={styles.name}>Batbold Samdan</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </View>

      {/* Wrap FlatList in Animated.View with fadeAnim for opacity */}
      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.movieContainer}
              onPress={() => router.push(`../movie/${item.id}`)}
            >
              {item.poster_path && (
                <Image
                  source={{ uri: `${IMAGE_BASE_URL}${item.poster_path}` }}
                  style={styles.poster}
                />
              )}

              <View style={styles.details}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.releaseDate}>{item.release_date}</Text>
                <Text numberOfLines={3} style={styles.overview}>
                  {item.overview}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 20,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  welcome: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 6,
    color: '#333',
  },
  name: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  logoutButton: {
    backgroundColor: '#121212',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  logoutText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  movieContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    padding: 12,
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginRight: 12,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
    color: '#111',
  },
  releaseDate: {
    color: '#888',
    marginBottom: 6,
  },
  overview: {
    fontSize: 14,
    color: '#555',
  },
});

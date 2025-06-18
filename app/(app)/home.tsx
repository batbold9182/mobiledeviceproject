import { View, Text, Button, StyleSheet, ActivityIndicator, FlatList, Image,TouchableOpacity } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useRouter, } from 'expo-router';
import React, { useEffect, useState } from 'react';
import  {Movie} from '../(app)/types/movie';

const API_KEY = 'b5086d70a6c34cbeeaf56b54b81b9363';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export default function HomeScreen() {
  const { signOut } = useAuth();
  const router = useRouter();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    signOut();
    router.replace('/auth/signin');
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched movies:', data.results);
        setMovies(data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.welcome}>Welcome to the best movie site</Text>
        <Text style={styles.name}>Batbold Samdan</Text>
        <Button title="Log out" onPress={handleLogout} />
      </View>
      <FlatList
  data={movies}
  keyExtractor={(item) => item.id.toString()}
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
        <Text numberOfLines={3}>{item.overview}</Text>
      </View>
    </TouchableOpacity>
  )}
  ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
  },
  welcome: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  name: {
    marginBottom: 10,
  },
  movieContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  poster: {
    width: 100,
    height: 150,
    marginRight: 10,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  releaseDate: {
    color: '#888',
    marginBottom: 5,
  },
});

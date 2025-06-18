import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Image, StyleSheet } from 'react-native';
import { Movie } from '../types/movie';

const API_KEY = 'b5086d70a6c34cbeeaf56b54b81b9363';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export default function MovieDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return; 

    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`)
      .then((res) => res.json())
      .then((data) => {
        setMovie(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" />;

  if (!movie) return <Text>Movie not found</Text>;

  return (
    <View style={styles.container}>
      {movie.poster_path ? (
        <Image source={{ uri: `${IMAGE_BASE_URL}${movie.poster_path}` }} style={styles.poster} />
      ) : (
        <Text>No poster available</Text>
      )}
      <Text style={styles.title}>{movie.title}</Text>
      <Text>{movie.overview}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  poster: { width: '100%', height: 400, resizeMode: 'cover', marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
});

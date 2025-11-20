import { useLocalSearchParams ,
         useRouter
 } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Text,
  ActivityIndicator,
  Image,
  StyleSheet,
  Share,
  Button,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { Movie } from '../types/movie';
import * as Linking from 'expo-linking';

const API_KEY = '';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export default function MovieDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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

  const handleShare = async () => {
    const url = Linking.createURL(`/movie/${id}`, { scheme: 'mobiledeviceproject' });
    try {
      await Share.share({
        message: `🎬 Check out this movie: ${movie?.title}\n\n${url}`,
        url,
      });
    } catch (error) {
      console.error('Error sharing movie:', error);
    }
  };

  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" color="#007AFF" />;

  if (!movie) return <Text style={styles.errorText}>Movie not found</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button title="← Back" onPress={() => router.back()} />
      {movie.poster_path ? (
        <Image source={{ uri: `${IMAGE_BASE_URL}${movie.poster_path}` }} style={styles.poster} />
      ) : (
        <Text style={styles.noPoster}>No poster available</Text>
      )}
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.subtitle}>Release Date: {movie.release_date}</Text>
      <Text style={styles.overview}>{movie.overview}</Text>
      <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
        <Text style={styles.shareButtonText}>Share Movie</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  poster: {
    width: '100%',
    height: 450,
    resizeMode: 'cover',
    borderRadius: 12,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  overview: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 20,
    textAlign: 'justify',
  },
  shareButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  shareButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  noPoster: {
    marginVertical: 20,
    color: '#999',
  },
  errorText: {
    flex: 1,
    textAlign: 'center',
    marginTop: 100,
    fontSize: 18,
    color: 'red',
  },
});

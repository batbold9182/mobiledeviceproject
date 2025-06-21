import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';

interface PageHandleProps {
  page: number;
  onNext: () => void;
  onPrev: () => void;
}

export default function PageHandle({ page, onNext, onPrev }: PageHandleProps) {
  return (
    <View style={styles.paginationContainer}>
      <Button title="Previous" onPress={onPrev} disabled={page === 1} />
      <Text style={styles.pageNumber}>Page {page}</Text>
      <Button title="Next" onPress={onNext} />
    </View>
  );
}

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  pageNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

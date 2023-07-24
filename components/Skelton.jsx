import React from 'react';
import { View, StyleSheet } from 'react-native';

const Skeleton = () => {
  return (
    <View style={styles.container}>
      <View style={styles.thumbnail} />
      <View style={styles.detailsContainer}>
        <View style={styles.title} />
        <View style={styles.description} />
        <View style={styles.author} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EAEAEA',
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
    backgroundColor: '#EAEAEA',
  },
  detailsContainer: {
    flex: 1,
  },
  title: {
    width: '80%',
    height: 20,
    marginBottom: 8,
    backgroundColor: '#EAEAEA',
  },
  description: {
    width: '60%',
    height: 16,
    marginBottom: 8,
    backgroundColor: '#EAEAEA',
  },
  author: {
    width: '40%',
    height: 16,
    backgroundColor: '#EAEAEA',
  },
});

export default Skeleton;

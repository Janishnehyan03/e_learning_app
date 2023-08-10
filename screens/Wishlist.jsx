import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
const WishlistScreen = () => {
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
      fetchWishlist();
    }, []);
  
    const fetchWishlist = async () => {
      try {
        const wishlistData = await AsyncStorage.getItem('@wishlist');
        if (wishlistData !== null) {
          setWishlist(JSON.parse(wishlistData));
        }
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };
  
    const removeFromWishlist = async (courseId) => {
      const updatedWishlist = wishlist.filter(course => course.id !== courseId);
      setWishlist(updatedWishlist);
      try {
        await AsyncStorage.setItem('@wishlist', JSON.stringify(updatedWishlist));
      } catch (error) {
        console.error('Error updating wishlist:', error);
      }
    };
  
  const renderCourseItem = ({ item }) => (
    <View style={styles.courseItem}>
      <Text style={styles.courseTitle}>{item.title}</Text>
      <Text style={styles.courseInstructor}>By {item.instructor}</Text>
      <TouchableOpacity
        onPress={() => removeFromWishlist(item.id)}
        style={styles.removeButton}
      >
        <FontAwesomeIcon icon={faHeart} size={20} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wishlist</Text>
      {wishlist.length === 0 ? (
        <Text style={styles.emptyMessage}>Your wishlist is empty.</Text>
      ) : (
        <FlatList
          data={wishlist}
          keyExtractor={item => item.id}
          renderItem={renderCourseItem}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  emptyMessage: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  courseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    elevation: 2,
  },
  courseTitle: {
    flex: 1,
    fontSize: 16,
  },
  courseInstructor: {
    fontSize: 14,
    color: '#666',
  },
  removeButton: {
    marginLeft: 12,
  },
});

export default WishlistScreen;

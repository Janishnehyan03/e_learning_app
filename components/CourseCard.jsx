import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {VIOLET_COLOR} from '../utils/Consts';

const CourseCard = ({
  title,
  videos,
  slug,
  thumbnail,
  description,
  creator,
  price,
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Details', {slug, thumbnail});
      }}
      style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: thumbnail}}
          style={styles.thumbnail}
          resizeMode="cover"
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.videoCount}>({videos.length}) Lessons</Text>
        <Text style={styles.createdBy}>
          created by{' '}
          <Text style={{fontWeight: 'bold', color: VIOLET_COLOR}}>
            {creator}
          </Text>
        </Text>
        <Text style={styles.videoCount}>₹{price}.00</Text>
      </View>
      {/* <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            handlePress();
          }}
          style={[
            styles.button,
            {
              backgroundColor: learners.includes(userId)
                ? '#5124C0'
                : '#05393E',
            },
          ]}>
          <Text style={styles.buttonText}>
            {learners.includes(userId) ? 'Learn Now' : `Know More`}
          </Text>
        </TouchableOpacity>
      </View> */}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    margin: 12,
    backgroundColor: '#fff',
    // borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    margin: 5,
    height: 180,
    // borderTopLeftRadius: 15,
    // borderTopRightRadius: 15,
    overflow: 'hidden',
  },
  thumbnail: {
    flex: 1,
    backgroundColor: 'black',
  },
  content: {
    padding: 8,
  },
  title: {
    fontWeight: '700',
    fontSize: 20,
    color: VIOLET_COLOR,
  },
  description: {
    color: '#6E6D6D',
  },
  videoCount: {
    color: '#333',
    fontWeight: '600',
    marginVertical: 5,
  },
  createdBy: {
    color: '#333',
    marginVertical: 5,
  },
  buttonContainer: {
    width: '100%',
    padding: 5,
  },
  button: {
    borderRadius: 10,
    paddingVertical: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default CourseCard;

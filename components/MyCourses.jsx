import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {DARK_GREEN, VIOLET_COLOR} from '../utils/Consts';

const MyCourses = ({
  title,
  slug,
  thumbnail,
  creators,
  category,
  description,
}) => {
  const navigation = useNavigation();

  const renderCreators = () => {
    if (!creators || creators.length === 0) return null;

    if (creators.length === 1) {
      return <Text style={styles.creator}>{creators[0].name}</Text>;
    }

    let creatorsText = '';
    for (let i = 0; i < creators.length; i++) {
      if (i === creators.length - 1) {
        creatorsText += 'and ' + creators[i].name;
      } else {
        creatorsText += creators[i].name + ', ';
      }
    }

    return <Text style={styles.creator}>{creatorsText}</Text>;
  };

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Learn', {slug, thumbnail});
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
        <Text style={styles.createdBy}>
          created by{' '}
          <Text style={{fontWeight: 'bold', color: VIOLET_COLOR}}>
            {renderCreators()}
          </Text>
        </Text>
        <Text style={styles.category}>{category}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 12,
    // backgroundColor: '#EEEDED', // New background color
    borderRadius: 10, // Changed border radius
    // borderWidth: 1,
    // borderColor: '#C9E1D8', // Border color
    overflow: 'hidden', // Ensure borderRadius is applied to the container
    // elevation: 3, // Box shadow for Android devices
  },
  imageContainer: {
    height: 180,
    overflow: 'hidden',
  },
  thumbnail: {
    flex: 1,
    backgroundColor: '#D8D8D8', // New background color
  },
  content: {
    padding: 12, // Increased padding
  },
  title: {
    fontWeight: '700',
    fontSize: 20,
    color: DARK_GREEN,
    marginBottom: 8,
  },
  createdBy: {
    color: '#666', // Changed text color
    marginBottom: 8,
    fontWeight: 'bold',
  },
  creator: {
    fontWeight: 'bold',
    color: DARK_GREEN,
  },
  category: {
    color: '#777', // Changed text color
    marginBottom: 4,
    fontWeight: 'bold',
    color: VIOLET_COLOR,
  },
  description: {
    color: '#666', // Changed text color
    marginBottom: 8,
  },
});

export default MyCourses;

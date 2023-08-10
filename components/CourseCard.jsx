import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {VIOLET_COLOR} from '../utils/Consts';

const CourseCard = ({course}) => {
  const navigation = useNavigation();

  const renderCreators = () => {
    const creatorsCount = course.creators?.length;
    if (!creatorsCount) return null;

    if (creatorsCount === 1) {
      return <Text style={styles.creator}>{course.creators[0].name}</Text>;
    }

    let creatorsText = '';
    for (let i = 0; i < creatorsCount; i++) {
      if (i === creatorsCount - 1) {
        // Last creator
        creatorsText += 'and ' + course.creators[i].name;
      } else {
        creatorsText += course.creators[i].name + ', ';
      }
    }

    return <Text style={styles.creator}>{creatorsText}</Text>;
  };

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Details', {slug: course.slug});
      }}
      style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: course.thumbnail}}
          style={styles.thumbnail}
          resizeMode="cover"
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{course.title}</Text>
        <View style={styles.creatorsContainer}>
          <Text style={styles.creatorsLabel}>Created by: </Text>
          <View style={styles.creators}>{renderCreators()}</View>
        </View>
        <Text style={styles.categoryText}>{course.category?.name}</Text>

        <Text style={[styles.description]}>{course.description}</Text>
        {/* {!expanded && (
            <TouchableOpacity
              style={styles.readMoreButton}
              onPress={() => setExpanded(true)}
            >
              <Text style={styles.readMoreButtonText}>Read More</Text>
            </TouchableOpacity>
          )} */}

        <Text style={styles.price}>₹{course.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 8,
    borderRadius: 8,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
  imageContainer: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%',
    height: 180,
    backgroundColor: 'black',
  },
  content: {
    padding: 8,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#131b65',
    marginVertical: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    color: VIOLET_COLOR,
  },
  description: {
    color: '#333',
    fontSize: 14,
    lineHeight: 24,
  },
  lineClampFour: {
    // Line clamp to show only 4 lines of text
    lineHeight: 24,
    maxHeight: 96, // (24 * 4)
    overflow: 'hidden',
  },
  readMoreButton: {
    alignSelf: 'flex-start',
    marginTop: 8,
    backgroundColor: VIOLET_COLOR,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  readMoreButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  creatorsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  creatorsLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  creators: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  creator: {
    fontSize: 14,
    color: VIOLET_COLOR,
    marginRight: 8,
    fontWeight: 'bold',
  },

  price: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 4,
  },
});

export default CourseCard;

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import YoutubePlayer from 'react-native-youtube-iframe';
import Axios from '../utils/Axios';

const CourseDetailsPage = ({route}) => {
  const {slug, thumbnail} = route.params;
  const [courseData, setCourseData] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const navigation = useNavigation();

  const onYoutubeStateChange = event => {
    if (event === 'ended') {
      setIsPlaying(false);
    }
  };
  async function handleButton() {
    const userExist = await AsyncStorage.getItem('username');
    if (userExist) {
      navigation.navigate('Payment', {
        courseId: courseData._id,
        thumbnail: courseData?.thumbnail,
        title: courseData.title,
        price: courseData.price,
      });
    } else {
      navigation.navigate('Login');
    }
  }

  const fetchCourseData = async () => {
    try {
      const {data} = await Axios.get(`/course/${slug}`);
      setCourseData(data);
      setIsPlaying(false);
    } catch (error) {
      console.error('Error loading course data', error);
    }
  };
  const getYoutubeVideoId = url => {
    // Extract the video ID from the URL
    const regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
      return match[2];
    } else {
      // Invalid YouTube URL
      return '';
    }
  };
  useEffect(() => {
    fetchCourseData();
  }, [slug]);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.thumbnailContainer}>
          {isPlaying ? (
            <YoutubePlayer
              height={250}
              videoId={getYoutubeVideoId(courseData?.previewVideo)}
              play={true}
              onChangeState={onYoutubeStateChange}
            />
          ) : (
            <TouchableOpacity
              onPress={() => setIsPlaying(true)}
              style={styles.thumbnailOverlay}>
              {courseData && (
                <Image
                  source={{uri: courseData?.thumbnail}}
                  style={styles.thumbnail}
                />
              )}
              <Ionicons
                name="play-circle-outline"
                size={48}
                color="white"
                style={styles.playIconThumbnail}
              />
            </TouchableOpacity>
          )}
        </View>
        <ScrollView style={styles.contentContainer}>
          <Text style={styles.title}>{courseData?.title}</Text>
          <Text style={styles.description}>{courseData?.description}</Text>
          <View style={styles.creatorContainer}>
            <Text style={styles.creatorText}>Created by</Text>
            <Text style={styles.creatorName}>{courseData?.creator?.name}</Text>
            {courseData?.creator && (
              <Image
                source={{uri: courseData?.creator?.image}}
                style={styles.creatorImage}
              />
            )}
          </View>
          <Text style={styles.priceText}>₹{courseData?.price}</Text>
          <Text style={styles.lessonsHeading}>Lessons</Text>
          {courseData?.videos.map((lesson, index) => (
            <TouchableOpacity key={index} style={styles.lessonItem}>
              <View style={styles.lessonItemContent}>
                <Ionicons
                  name="play-circle-outline"
                  size={48}
                  color="white"
                  style={styles.playIcon}
                />
                <Text style={styles.lessonTitle}>{lesson?.videoTitle}</Text>
              </View>
            </TouchableOpacity>
          ))}
          <View style={styles.enrollButtonContainer}>
            <TouchableOpacity style={styles.enrollButton}>
              <Text style={styles.enrollButtonText}>Enroll Now</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ScrollView>
      <View style={styles.buyButtonContainer}>
        <TouchableOpacity title="BUY NOW" onPress={() => handleButton()}>
          <Text
            style={{textAlign: 'center', color: 'white', fontWeight: 'bold'}}>
            Buy now
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
  },
  buyButtonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    width: '100%',
    backgroundColor: '#333',
  },
  thumbnailContainer: {
    width: '100%',
    height: 250,
    backgroundColor: 'black',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: -6,
  },
  webView: {
    flex: 1,
  },
  thumbnailOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // playIcon: {
  //   position: 'absolute',
  // },
  thumbnail: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  //
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 29,
    marginBottom: 8,
    color: '#333333',
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    color: '#666666',
  },
  creatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  creatorText: {
    fontSize: 16,
    marginRight: 4,
  },
  creatorName: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginRight: 4,
    color: '#0a2766',
  },
  creatorImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  priceText: {
    fontSize: 30,
    marginBottom: 16,
    color: '#333333',
    fontWeight:"bold"
  },
  lessonsHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333333',
  },
  lessonItem: {
    marginBottom: 8,
  },
  lessonItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 20,
    backgroundColor: '#eff4ff',
  },
  playIcon: {
    marginRight: 8,
    color: '#1e489c',
  },
  playIconThumbnail: {
    marginRight: 8,
    color: '#fff',
    position: 'absolute',
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1e489c',
  },
  enrollButtonContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  enrollButton: {
    backgroundColor: '#6F00FF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
  enrollButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
};

export default CourseDetailsPage;

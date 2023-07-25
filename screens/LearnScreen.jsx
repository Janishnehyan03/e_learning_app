import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView,Dimensions} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import Axios from '../utils/Axios';
import {DARK_GREEN, VIOLET_COLOR} from '../utils/Consts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const LearnScreen = ({route}) => {
  const {slug} = route.params;
  const [courseData, setCourseData] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const navigation = useNavigation();
  const isPortrait = () => {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width;
};
 
/**
 * Returns true of the screen is in landscape mode
 */
const isLandscape = () => {
    const dim = Dimensions.get('screen');
    return dim.width >= dim.height;
};
  // Function to play the next video
  const playNextVideo = () => {
    const nextVideoIndex = currentVideoIndex + 1;
    if (nextVideoIndex < courseData.videos.length) {
      handleSelectVideo(nextVideoIndex);
      setCurrentVideoIndex(nextVideoIndex);
    }
  };

  // Callback function for video state changes
  const handleStateChange = event => {
    if (event === 'ended') {
      // Play the next video when the current video ends
      playNextVideo();
    }
  };
  const convertUrlToId = url => {
    var regExp =
      /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length === 11) {
      return match[2];
    } else {
      // Error handling if URL doesn't match
      return null;
    }
  };

  const handleSelectVideo = async index => {
    setVideoUrl(convertUrlToId(courseData.videos[index].videoUrl));
    await AsyncStorage.setItem('lastVideoIndex', `${index}`);
    await AsyncStorage.setItem('lastCourse', `${courseData._id}`);
  };

  const fetchCourseData = async () => {
    try {
      const {data} = await Axios.get(`/course/${slug}`);
      setCourseData(data);
      const lastVideoIndex = await AsyncStorage.getItem('lastVideoIndex');
      const lastCourse = await AsyncStorage.getItem('lastCourse');
      if (lastVideoIndex === null || lastCourse === null) {
        // If lastVideoIndex is null, set it to 0
        await AsyncStorage.setItem('lastVideoIndex', '0');
        if (data.videos.length > 0) {
          const firstVideoUrl = data.videos[0].videoUrl;
          const videoId = convertUrlToId(firstVideoUrl);
          setVideoUrl(videoId);
        }
      } else {
        if (data.videos.length > 0) {
          const firstVideoUrl = data.videos[lastVideoIndex].videoUrl;
          const videoId = convertUrlToId(firstVideoUrl);
          setVideoUrl(videoId);
        }
      }
    } catch (error) {
      console.error('Error loading course data', error);
    }
  };

  
  useEffect(() => {
    fetchCourseData();
  }, []);

  return (
    <View style={{
      flex:1
    }}>
      <YoutubePlayer
        height={250}
        videoId={videoUrl}
        initialPlayerParams={{
          controls: true,
          loop: false,
          modestbranding: true,
        }}
        onChangeState={handleStateChange} // Add the onChangeState prop
        play
      />
      <View>
        <Text style={styles.sectionTitle}>About the course</Text>
        {courseData ? (
          <View>
            <Text style={styles.courseTitle}>{courseData.title}</Text>
            <Text style={styles.courseDescription}>
              {courseData.description}
            </Text>
            <View style={styles.createdBy}>
              <Text style={{color: 'black'}}>created by</Text>
              <Text>
                {/* Map through the creators array */}
                {courseData?.creators?.length > 0 &&
                  courseData?.creators.map((creator, index) => {
                    // Add comma if it's not the last creator
                    if (index !== courseData?.creators.length - 1) {
                      return (
                        <TouchableOpacity
                          key={creator.slug}
                          onPress={() =>
                            navigation.navigate('CreatorScreen', {
                              slug: creator.slug,
                            })
                          }>
                          <Text
                            style={{
                              fontWeight: 'bold',
                              color: VIOLET_COLOR,
                            }}>
                            {creator.name}
                          </Text>
                        </TouchableOpacity>
                      );
                    }
                    // Add 'and' before the last creator
                    return (
                      <TouchableOpacity
                        key={creator.slug}
                        onPress={() =>
                          navigation.navigate('CreatorScreen', {
                            slug: creator.slug,
                          })
                        }>
                        <Text
                          style={{
                            fontWeight: 'bold',
                            color: VIOLET_COLOR,
                            marginLeft: 4,
                          }}>
                          {'and ' + creator.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
              </Text>
            </View>

            <Text style={styles.sectionTitle}>
              Lessons ({courseData.videos.length})
            </Text>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              style={{
                marginTop: 5,
                marginBottom: 20,
              }}>
              {Array.isArray(courseData?.videos) &&
              courseData?.videos.length > 0 ? (
                courseData.videos.map((lesson, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.lessonContainer,
                      videoUrl === convertUrlToId(lesson.videoUrl)
                        ? styles.currentVideoCard
                        : null,
                    ]}
                    onPress={() => handleSelectVideo(index)}>
                    <Image
                      source={{
                        uri: `https://img.youtube.com/vi/${convertUrlToId(
                          lesson.videoUrl,
                        )}/hqdefault.jpg`,
                      }}
                      style={styles.courseImage}
                      resizeMode="cover"
                    />
                    <View style={styles.lessonDetailsContainer}>
                      <Text
                        style={[
                          styles.lessonTitle,
                          videoUrl === convertUrlToId(lesson.videoUrl)
                            ? styles.currentVideoTitle
                            : null,
                        ]}
                        numberOfLines={2} // Limit the number of lines to 2
                      >
                        {index + 1}. {lesson.videoTitle.toUpperCase()}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={styles.loadingText}>No lessons available</Text>
              )}
            </ScrollView>
          </View>
        ) : (
          <Text style={styles.loadingText}>Loading course data...</Text>
        )}
      </View>
    </View>
  );
};

const styles = {
  thumbnailContainer: {
    width: 80,
    height: 60,
    backgroundColor: 'black',
    marginRight: 10,
  },
  thumbnail: {
    width: '100%',
    height: 100,
  },
  sectionTitle: {
    paddingHorizontal: 8,
    fontWeight: 'bold',
    fontSize: 13,
    color: 'grey',
  },
  coursesContainer: {
    paddingVertical: 2,
    paddingHorizontal: 5,
    height: 300,
  },
  createdBy: {
    color: '#333',
    marginVertical: 5,
    marginLeft: 7,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  courseCard: {
    width: 200,
    marginRight: 10,
    backgroundColor: '#d5d0d0',
    borderRadius: 10,
    padding: 10,
  },
  currentVideoCard: {
    backgroundColor: '#215b60', // Example: Dark background color
    color: '#FFF', // Example: White text color
  },

  courseTitle: {
    paddingHorizontal: 8,
    fontWeight: 'bold',
    fontSize: 20,
    color: DARK_GREEN,
  },
  courseDescription: {
    paddingHorizontal: 8,
    fontSize: 13,
    color: 'grey',
  },
  lessonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#fffafa',
    borderRadius: 10,
  },
  lessonDetailsContainer: {
    marginLeft: 10,
    flex: 1, // Allow the text to take up the remaining space
  },
  lessonTitle: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
  loadingText: {
    paddingHorizontal: 8,
    fontSize: 13,
    color: 'grey',
  },
  currentVideoCard: {
    borderColor: '#007BFF',
  },
  currentVideoTitle: {
    color: DARK_GREEN,
  },
  courseImage: {
    width: 80, // Adjust the width according to your needs
    height: 70, // Adjust the height according to your needs
    borderRadius: 5,
  },
};

export default LearnScreen;

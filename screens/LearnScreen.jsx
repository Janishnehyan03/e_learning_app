import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import Axios from '../utils/Axios';

const LearnScreen = ({route}) => {
  const {slug} = route.params;

  const [videoLoaded, setVideoLoaded] = useState(false);
  const [courseData, setCourseData] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [videoThumbnails, setVideoThumbnails] = useState([]);

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

  useEffect(() => {
    fetchCourseData();
  }, []);

  const fetchCourseData = async () => {
    try {
      const {data} = await Axios.get(`/course/${slug}`);
      setCourseData(data);
      const thumbnails = await fetchVideoThumbnails(data.videos);
      setVideoThumbnails(thumbnails);
      if (data.videos.length > 0) {
        const firstVideoUrl = data.videos[0].videoUrl;
        const videoId = convertUrlToId(firstVideoUrl);
        setVideoUrl(videoId);
      }
    } catch (error) {
      console.error('Error loading course data', error);
    }
  };

  const fetchVideoThumbnails = async videos => {
    const thumbnailPromises = videos.map(async video => {
      const videoId = convertUrlToId(video.videoUrl);
      const thumbnailUrl = await fetchVideoThumbnail(videoId);
      return {videoId, thumbnailUrl};
    });
    return Promise.all(thumbnailPromises);
  };

  const fetchVideoThumbnail = async videoId => {
    try {
      const response = await Axios.get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=AIzaSyBTCAUBcrPkNOeO_HIQ5J67uGf41K801mE`,
      );
      const items = response.data.items;
      if (items.length > 0) {
        const thumbnailUrl = items[0].snippet.thumbnails.default.url;
        return thumbnailUrl;
      }
    } catch (error) {
      console.error('Error loading video thumbnail', error);
    }
    return null;
  };

  return (
    <View>
      <YoutubePlayer
        height={250}
        videoId={videoUrl}
        initialPlayerParams={{
          controls: true,
          loop: false,
          modestbranding: true,
        }}
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
            <Text style={styles.sectionTitle}>
              Lessons ({courseData.videos.length})
            </Text>
            <ScrollView
              horizontal
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
                      styles.courseCard,
                      videoUrl === convertUrlToId(lesson.videoUrl)
                        ? styles.currentVideoCard
                        : null,
                    ]}
                    onPress={() => {
                      const videoId = convertUrlToId(lesson.videoUrl);
                      if (videoId) {
                        setVideoUrl(videoId);
                      }
                    }}>
                    <Image
                      source={{
                        uri: `https://img.youtube.com/vi/${convertUrlToId(
                          lesson.videoUrl,
                        )}/hqdefault.jpg`,
                      }}
                      style={styles.courseImage}
                      resizeMode="cover"
                    />
                    <Text
                      style={[
                        styles.lessonTitle,
                        videoUrl === convertUrlToId(lesson.videoUrl)
                          ? styles.currentVideoTitle
                          : null,
                      ]}>
                      {index + 1}. {lesson.videoTitle.toUpperCase()}
                    </Text>
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
  currentVideoTitle: {
    color: '#FFF', // Example: White text color
  },
  courseImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  courseTitle: {
    paddingHorizontal: 8,
    fontWeight: 'bold',
    fontSize: 20,
    color: '#11676D',
  },
  courseDescription: {
    paddingHorizontal: 8,
    fontSize: 13,
    color: 'grey',
  },
  lessonContainer: {
    // flexDirection: 'row',
    // alignItems: 'center',
    backgroundColor: '#d5d0d0',
    marginVertical: 2,
    marginHorizontal: 6,
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 10,
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
};

export default LearnScreen;

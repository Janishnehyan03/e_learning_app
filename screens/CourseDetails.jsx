import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import Axios from '../utils/Axios';

const CourseDetailsPage = ({slug, thumbnail}) => {
  console.log(slug);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [courseData, setCourseData] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);

  const convertUrlToId = url => {
    var regExp =
      /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length == 11) {
      setVideoUrl(match[2]);
      return match[2];
    } else {
      //error
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, []);

  const fetchCourseData = async () => {
    try {
      const {data} = await Axios.get(`/course/${slug}`);
      setCourseData(data);
      console.log(data);
      convertUrlToId(data.lessons[0].videoUrl)
    } catch (error) {
      console.error('Error loading course data', error);
    }
  };

  const renderPlayer = player => {
    return (
      <View>
        {videoLoaded ? (
          player
        ) : (
          <View style={styles.thumbnailContainer}>
            <Image source={{uri: thumbnail}} style={styles.thumbnail} />
          </View>
        )}
        <Text style={styles.sectionTitle}>About the course</Text>
        {courseData ? (
          <View>
            <Text style={styles.courseTitle}>{courseData.title}</Text>
            <Text style={styles.amount}>
              Amount: ₹{courseData.price.toString()}
            </Text>
            <Text style={styles.courseDescription}>
              {courseData.description}
            </Text>
            <Text style={styles.sectionTitle}>Lessons</Text>
            <View>
              {courseData.videos.map((lesson, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.lessonContainer}
                  onPress={() => {
                    setVideoLoaded(true);
                  }}>
                  <View style={styles.playIconContainer}>
                    <Text style={styles.playIcon}>▶</Text>
                  </View>
                  <Text style={styles.lessonTitle}>
                    {lesson.videoTitle.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : (
          <Text style={styles.loadingText}>Loading course data...</Text>
        )}
      </View>
    );
  };

  return (
    <YoutubePlayer
      height={250}
      videoId={videoUrl}
      play={videoLoaded}
      onChangeState={event => {
        if (event === 'ended') {
          setVideoLoaded(false);
        }
      }}
      initialPlayerParams={{
        controls: true,
        loop: false,
        modestbranding: true,
      }}
      renderLoader={() => (
        <Text style={styles.loadingText}>Loading video...</Text>
      )}>
      {renderPlayer}
    </YoutubePlayer>
  );
};

const styles = {
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
  thumbnail: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    overlayColor: 'black',
    overlayOpacity: 0.35,
  },
  sectionTitle: {
    paddingHorizontal: 8,
    fontWeight: 'bold',
    fontSize: 13,
    color: 'grey',
  },
  courseTitle: {
    paddingHorizontal: 8,
    fontWeight: 'bold',
    fontSize: 20,
    color: '#11676D',
  },
  amount: {
    paddingHorizontal: 8,
    fontSize: 16,
    color: '#208E62',
  },
  courseDescription: {
    paddingHorizontal: 8,
    fontSize: 13,
    color: 'grey',
  },
  lessonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#104B4D',
    borderRadius: 20,
    marginVertical: 2,
    marginHorizontal: 6,
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  playIconContainer: {
    backgroundColor: 'white',
    borderRadius: 50,
    marginRight: 8,
    padding: 5,
  },
  playIcon: {
    fontSize: 18,
    color: 'black',
  },
  lessonTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
  },
  loadingText: {
    paddingHorizontal: 8,
    fontSize: 13,
    color: 'grey',
  },
};

export default CourseDetailsPage;

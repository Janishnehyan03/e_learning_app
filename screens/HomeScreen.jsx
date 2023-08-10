import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CourseCard from '../components/CourseCard';
import Features from '../components/Features';
import HeroSection from '../components/HeroSection';
import MyCourses from '../components/MyCourses';
import Skeleton from '../components/Skelton';
import Axios from '../utils/Axios';
import {VIOLET_COLOR} from '../utils/Consts';

const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [user, setUser] = useState(null);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [myCourses, setMyCourse] = useState([]);
  const [lastWatchedVideo, setLastWatchedVideo] = useState({
    videoUrl: null,
    videoTitle: null,
    slug: null,
    thumbnail: null,
  });

  const navigation = useNavigation();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const {data} = await Axios.get('/course');
      setCourses(data.courses);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
  const fetchLastWatchedVideo = async user => {
    try {
      const lastWatchedIndex = await AsyncStorage.getItem(`lastVideoIndex`);
      const lastCourse = await AsyncStorage.getItem(`lastCourse`);
      if (lastCourse) {
        const matchingCourse = courses.find(
          course => course._id.toString() === lastCourse,
        );
        setLastWatchedVideo({
          videoTitle:
            matchingCourse?.videos[parseInt(lastWatchedIndex)].videoTitle,
          videoUrl: matchingCourse?.videos[parseInt(lastWatchedIndex)].videoUrl,
          slug: matchingCourse?.slug,
          thumbnail: matchingCourse?.thumbnail,
        });
      }
    } catch (error) {
      console.log('Error fetching last watched video URL:', error);
    }
  };
  async function getUser() {
    let data = await AsyncStorage.getItem('userId');
    if (data) {
      setUser(data);
    }
  }

  useEffect(() => {
    // Filter out courses that do not include the specified learner
    const filtered = courses.filter(course => !course.learners.includes(user));
    setFilteredCourses(filtered);
    const myData = courses.filter(course => course.learners.includes(user));
    setMyCourse(myData);
    fetchLastWatchedVideo(user);
  }, [courses, user]);

  useFocusEffect(
    React.useCallback(() => {
      // set state to initial value
      fetchLastWatchedVideo(user);
    }, []),
  );
  useEffect(() => {
    getUser();
    fetchData();
  }, []);

  return (
    <>
      <ScrollView style={{flex: 1}}>
        <HeroSection user={user} />

        {lastWatchedVideo.videoUrl && (
          <View>
            <Text
              style={{
                marginLeft: 30,
                marginBottom: 5,
                fontWeight: 'bold',
                color: VIOLET_COLOR,
              }}>
              continue watching
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Learn', {
                  slug: lastWatchedVideo.slug,
                  thumbnail: lastWatchedVideo.thumbnail,
                });
              }}
              style={styles.cardContainer}>
              <View style={styles.iconContainer}>
                <Ionicons name="play-circle" size={30} color="black" />
              </View>
              <View style={styles.videoInfoContainer}>
                <Text style={styles.videoTitle}>
                  {lastWatchedVideo.videoTitle}
                </Text>
                {/* Add other video information here as needed */}
              </View>
            </TouchableOpacity>
          </View>
        )}
        <View style={styles.content}>
          {myCourses.length > 0 && (
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
                color: VIOLET_COLOR,
                textTransform: 'uppercase',
              }}>
              My Courses
            </Text>
          )}
          <ScrollView contentContainerStyle={{flexGrow: 1}}>
            {myCourses.map(item => (
              <MyCourses
                key={item._id}
                title={item.title}
                videos={item.videos}
                slug={item.slug}
                courseId={item._id}
                thumbnail={item.thumbnail}
                description={item.description}
                creators={item.creators}
                price={item.price}
                category={item.category?.name}
              />
            ))}
          </ScrollView>

          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              color: VIOLET_COLOR,
              textTransform: 'uppercase',
              marginVertical: 30,
            }}>
            our new courses
          </Text>
          {isLoading ? (
            [1, 2, 3, 4, 5, 6, 7].map((data, key) => <Skeleton key={key} />)
          ) : (
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
              {filteredCourses.map(item => (
                <CourseCard key={item._id} course={item} />
              ))}
            </ScrollView>
          )}
        </View>
        <Features />
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
  },
  content: {
    marginTop: 40,
    paddingBottom: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    marginBottom: 10,
    marginHorizontal: 30,
  },
  iconContainer: {
    marginRight: 2,
  },
  videoInfoContainer: {
    flex: 1,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'left',
    color: VIOLET_COLOR,
  },
});
export default HomeScreen;

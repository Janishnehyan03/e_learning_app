import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, FlatList, Image} from 'react-native';
import Axios from '../utils/Axios';
import {VIOLET_COLOR} from '../utils/Consts';

const MyLearning = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [user, setUser] = useState(null);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [myCourses, setMyCourse] = useState([]);

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
  
  async function getUser() {
    let data = await AsyncStorage.getItem('userId');
    if (data) {
      setUser(data);
    }
  }

  useEffect(() => {
    // Filter out courses that do not include the specified learner
    const myData = courses.filter(course => course.learners.includes(user));
    setMyCourse(myData);
  }, [courses, user]);

  useFocusEffect(
    React.useCallback(() => {
      // set state to initial value
    }, []),
  );
  useEffect(() => {
    getUser();
    fetchData();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Courses</Text>
      {myCourses.length > 0 ? (
        <FlatList
          data={myCourses}
          keyExtractor={course => course._id.toString()}
          renderItem={({item}) => (
            <CourseCard imageSource={item?.thumbnail} title={item.title} />
          )}
        />
      ) : (
        <View style={styles.noCoursesContainer}>
          <Text style={styles.noCoursesText}>
            No courses purchased. Get one now!
          </Text>
        </View>
      )}
    </View>
  );
};
const CourseCard = ({imageSource, title}) => (
  <View style={styles.courseCard}>
    <Image source={{uri: imageSource}} style={styles.courseImage} />
    <Text style={styles.courseTitle}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: VIOLET_COLOR,
    marginVertical: 5,
    textTransform: 'uppercase',
    fontSize: 19,
  },
  courseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 0,
  },
  courseImage: {
    width: 80,
    height: 80,
    borderRadius: 4,
    marginRight: 12,
  },
  courseTitle: {
    flex: 1,
    fontSize: 16,
  },
  noCoursesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noCoursesText: {
    fontSize: 18,
    textAlign: 'center',
  },
});
export default MyLearning;

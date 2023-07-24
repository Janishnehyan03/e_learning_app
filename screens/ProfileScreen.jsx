import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Avatar from '../assets/images/user.png';
import Axios from '../utils/Axios';
import {UserAuthContext} from '../utils/UserContext';

const ProfileScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const {setLoggedIn} = useContext(UserAuthContext);
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);

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
  const logout = async () => {
    setIsLoading(true);
    try {
      const response = await Axios.post('/auth/logout');
      if (response.status === 200) {
        await AsyncStorage.clear();
        setLoggedIn(false);
        navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
      }
    } catch (error) {
      console.error(error.response);
    }
  };
  const getUser = async () => {
    let userName = await AsyncStorage.getItem('username');
    let userEmail = await AsyncStorage.getItem('email');
    let userID = await AsyncStorage.getItem('userId');
    setUserId(userID);

    setName(userName);
    setEmail(userEmail);
  };

  useEffect(() => {
    getUser();
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.profileImage} source={Avatar} />
      <Text style={styles.username}>{name}</Text>
      <Text style={styles.email}>{email}</Text>
      <Text style={styles.sectionTitle}>My Courses</Text>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          {courses.filter(course => course.learners.includes(userId)).length >
          0 ? (
            <ScrollView
              contentContainerStyle={styles.coursesContainer}
              horizontal
              showsHorizontalScrollIndicator={false}>
              {courses
                .filter(course => course.learners.includes(userId))
                .map((course, key) => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Learn', {
                        slug: course.slug,
                      });
                    }}
                    style={styles.courseCard}
                    key={key}>
                    <Image
                      source={{uri: course.thumbnail}}
                      style={styles.courseImage}
                      resizeMode="cover"
                    />
                    <Text style={styles.courseTitle}>{course.title}</Text>
                    <Text style={styles.courseDescription}>
                      {course.description}
                    </Text>
                    <View style={styles.courseDetails}>
                      <Text style={styles.courseDetailText}>
                        Lessons: ({course.videos.length})
                      </Text>
                      <Text style={styles.courseDetailText}>
                        Price: ${course.price}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
            </ScrollView>
          ) : (
            <Text
              style={{
                color: '#333',
                textAlign: 'center',
                marginBottom: 10,
                textTransform: 'uppercase',
              }}>
              you don't have any courses
            </Text>
          )}
        </View>
      )}
      <TouchableOpacity onPress={logout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
    color: '#333',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2f69b0',
  },
  email: {
    fontSize: 18,
    marginBottom: 20,
    color: '#2f69b0',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
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
  courseDescription: {
    fontSize: 14,
    marginBottom: 10,
  },
  courseDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  courseDetailText: {
    fontSize: 12,
  },
  logoutButton: {
    backgroundColor: '#b02f4f',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 35,
    marginBottom: 20,
    marginTop: 40,
  },
  logoutText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;

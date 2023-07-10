import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native';
import CourseCard from '../components/CourseCard';
import Axios from '../utils/Axios';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState([]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const {data} = await Axios.get('/course');
      console.log(data);
      setCourses(data.courses);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <ScrollView style={{flex: 1}}>
        {/* <CustomAppBar /> */}
        <View style={styles.content}>
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
              {courses.length > 0 &&
                courses.map(item => (
                  <CourseCard
                    key={item._id}
                    title={item.title}
                    price={item.price.toString()}
                    slug={item.slug}
                    courseId={item._id}
                    learners={item.learners}
                    thumbnail={item.thumbnail}
                    description={item.description}
                  />
                ))}
            </ScrollView>
          )}
        </View>
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
});
export default App;

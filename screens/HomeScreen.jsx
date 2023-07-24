import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  View,
  FlatList,
} from 'react-native';
import CourseCard from '../components/CourseCard';
import Axios from '../utils/Axios';
import HeroSection from '../components/HeroSection';
import Features from '../components/Features';
import Skeleton from '../components/Skelton';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState([]);

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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <ScrollView style={{flex: 1}}>
        <HeroSection />
        {/* <CustomAppBar /> */}
        <View style={styles.content}>
          {isLoading ? (
            [1, 2, 3, 4, 5, 6, 7].map((data, key) => <Skeleton key={key} />)
          ) : (
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
              {courses.length > 0 &&
                courses.map(item => (
                  <CourseCard
                    key={item._id}
                    title={item.title}
                    videos={item.videos}
                    slug={item.slug}
                    courseId={item._id}
                    thumbnail={item.thumbnail}
                    description={item.description}
                    creator={item.creator.name}
                    price={item.price}
                  />
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
});
export default App;

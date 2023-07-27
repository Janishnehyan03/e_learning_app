import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import YoutubePlayer from 'react-native-youtube-iframe';
import Axios from '../utils/Axios';
import {VIOLET_COLOR} from '../utils/Consts';
import RazorpayCheckout from 'react-native-razorpay';
import ShareButton from '../components/ShareButton';

const CourseDetailsPage = ({route}) => {
  const [courseData, setCourseData] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const {slug} = route.params;

  const onYoutubeStateChange = event => {
    if (event === 'ended') {
      setIsPlaying(false);
    }
  };
  async function handleButton() {
    const userExist = await AsyncStorage.getItem('username');
    if (userExist) {
      openCheckout();
    } else {
      navigation.navigate('Login');
    }
  }

  const fetchCourseData = async () => {
    try {
      setFetching(true);
      const {data} = await Axios.get(`/course/${slug}`);
      setCourseData(data);
      setFetching(false);
      setIsPlaying(false);
    } catch (error) {
      setFetching(false);
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

  const openCheckout = async () => {
    try {
      setLoading(true);
      const response = await Axios.post(`/booking/${courseData?._id}`);
      const responseData = response.data;
      const paymentId = responseData.order.id;

      const options = {
        key: 'rzp_test_PXZvFNXpJFylGx',
        amount: courseData?.price * 100,
        name: 'CPET Darul Huda',
        order_id: paymentId,
        description: 'Payment',
        notes: {orderId: paymentId},
        prefill: {contact: '9746229547', email: 'cpetdarulhuda@gmail.com'},
        external: {
          wallets: ['paytm'],
        },
        theme: {color: '#53a20e'},
      };

      const data = await RazorpayCheckout.open(options);
      setLoading(false);
      handlePaymentSuccess(data);
    } catch (error) {
      setLoading(false);
      console.log(error.response.data);
    }
  };

  const handlePaymentSuccess = async data => {
    try {
      const response = await Axios.post('/booking/success/booking', {
        course: courseData._id,
        razorpay_payment_id: data.razorpay_payment_id,
        razorpay_order_id: data.razorpay_order_id,
        razorpay_signature: data.razorpay_signature,
        price: courseData.price,
      });

      if (response.status === 200) {
        setLoading(false);
        navigation.reset({
          index: 0,
          routes: [{name: 'Home'}],
        });
      }
    } catch (error) {
      setLoading(false);
      console.log(error.response);
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
              {!fetching && courseData && (
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

        {!fetching ? (
          <ScrollView style={styles.contentContainer}>
            <Text style={styles.title}>{courseData?.title}</Text>
            <Text style={styles.description}>{courseData?.description}</Text>
            <Text
              style={{color: 'black', marginVertical: 7, fontWeight: 'bold'}}>
              #{courseData?.category?.name}
            </Text>
            <View style={styles.creatorContainer}>
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
                                marginRight: 4,
                              }}>
                              {creator.name + ','}
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
              {courseData?.creator && (
                <Image
                  source={{uri: courseData?.creator?.image}}
                  style={styles.creatorImage}
                />
              )}
            </View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.priceText}>₹{courseData?.price}</Text>
              <View>
                <ShareButton
                  title={courseData?.title}
                  url={`https://e-learn.cpetdhiu.in/course/${slug}`}
                />
                <Text style={{color: VIOLET_COLOR}}>Share </Text>
              </View>
            </View>
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
          </ScrollView>
        ) : (
          <View style={styles.skeletonContainer}>
            <View style={styles.skeletonThumbnail} />
            <View style={styles.skeletonTextContainer}>
              <View style={styles.skeletonText} />
              <View style={styles.skeletonText} />
              <View style={styles.skeletonText} />
            </View>
            <View style={styles.skeletonLesson} />
            <View style={styles.skeletonLesson} />
            <View style={styles.skeletonLesson} />
          </View>
        )}
      </ScrollView>
      <View style={styles.enrollButtonContainer}>
        {loading ? (
          <TouchableOpacity style={styles.enrollButton}>
            <Text style={styles.enrollButtonText}>Processing...</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.enrollButton}
            title="Enroll Now"
            onPress={() => handleButton()}>
            <Text style={styles.enrollButtonText}>Enroll Now</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = {
  container: {
    backgroundColor: 'white',
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
    fontWeight: 'bold',
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
    marginTop: 6,
    marginBottom: 4,
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
  skeletonContainer: {
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  skeletonThumbnail: {
    width: 80,
    height: 70,
    backgroundColor: '#d5d0d0',
    borderRadius: 5,
    marginBottom: 8,
  },
  skeletonTextContainer: {
    marginBottom: 8,
  },
  skeletonText: {
    width: '70%',
    height: 12,
    backgroundColor: '#d5d0d0',
    marginBottom: 4,
    borderRadius: 5,
  },
  skeletonLesson: {
    width: '100%',
    height: 60,
    backgroundColor: '#d5d0d0',
    marginBottom: 8,
    borderRadius: 10,
  },
};

export default CourseDetailsPage;

import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window');

const OnboardingScreen = ({navigation}) => {
  const slides = [
    {
      title: 'Welcome to the Learning App',
      description:
        'Learn new things and improve your skills with our wide range of courses!',
      image:
        'https://images.unsplash.com/photo-1527838832700-5059252407fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aXNsYW1pY3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
    },
    {
      title: 'Interactive Lessons',
      description:
        'Engage with interactive lessons that make learning enjoyable.',
      image:
        'https://images.unsplash.com/photo-1537181534458-45dcee76ae90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGlzbGFtaWN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    },
    {
      title: 'Track Your Progress',
      description:
        'Track your progress and see how far you have come in your learning journey.',
      image:
        'https://images.unsplash.com/photo-1601191362988-ac6ebec629c8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGlzbGFtaWN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60',
    },
  ];

  const scrollViewRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleGetStarted = async () => {
    // Save the onboarding completion flag to AsyncStorage
    try {
      await AsyncStorage.setItem('@onboarding_completed', 'true');
      navigation.navigate('Home');
    } catch (error) {
      // Error handling if AsyncStorage fails
      console.error('Error saving onboarding completion:', error);
    }
  };

  useEffect(() => {
    // Check if the onboarding has already been completed
    const checkOnboardingCompleted = async () => {
      try {
        const onboardingCompleted = await AsyncStorage.getItem(
          '@onboarding_completed',
        );
        if (onboardingCompleted === 'true') {
          navigation.navigate('Home');
        }
      } catch (error) {
        // Error handling if AsyncStorage fails
        console.error('Error checking onboarding completion:', error);
      }
    };
    checkOnboardingCompleted();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View
        style={styles.sliderContainer}
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}>
        {slides.map((slide, index) => (
          <View key={index} style={[styles.slideContainer, {width}]}>
            <Image
              source={{uri: slides[currentIndex].image}}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.title}>{slides[currentIndex].title}</Text>
            <Text style={styles.description}>
              {slides[currentIndex].description}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.paginationDotsContainer}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === currentIndex ? styles.activePaginationDot : null,
            ]}
          />
        ))}
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.prevButton]}
          onPress={handlePrev}
          disabled={currentIndex === 0}>
          <Text style={styles.buttonText}>Prev</Text>
        </TouchableOpacity>

        {currentIndex === slides.length - 1 ? (
          <TouchableOpacity
            style={[styles.button, styles.getStartedButton]}
            onPress={handleGetStarted}>
            <Text style={[ styles.getStartedButtonText]}>
              Get Started
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.button, styles.nextButton]}
            onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  sliderContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  slideContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: width * 0.8,
    height: height * 0.6,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 30,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginTop: 15,
    textAlign: 'center',
    color: '#888',
  },
  paginationDotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#888',
    marginHorizontal: 5,
  },
  activePaginationDot: {
    backgroundColor: '#007BFF',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 40,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  prevButton: {
    opacity: 0.6,
  },
  nextButton: {
    borderColor: '#007BFF',
    marginLeft:20
  },
  getStartedButton: {
    backgroundColor: '#007BFF',
    borderRadius:30,
    marginLeft:30
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007BFF',
  },
  getStartedButtonText: {
    color: '#fff',
    borderRadius: 30,
  },
  disabledButton: {
    borderColor: '#888',
    opacity: 0.6,
  },
});

export default OnboardingScreen;

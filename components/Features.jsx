import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {VIOLET_COLOR} from '../utils/Consts';

const FeaturesScreen = () => {
  const features = [
    {
      title: 'Wide Range of Courses',
      description: `Explore a vast collection of courses covering various subjects and skills. Our platform offers a diverse range of topics, including technology, business, arts, and more. Whether you're a beginner or an advanced learner, you'll find the right courses to meet your learning goals.`,
      icon: <Ionicons name="book-outline" size={48} color={'white'} />,
    },
    {
      title: 'Learn Anytime, Anywhere',
      description: `Access your courses from anywhere and learn at your own pace. With our mobile app and responsive website, you can continue your learning journey on the go. No matter where you are, you can dive into your favorite courses and make the most of your time.`,
      icon: <Ionicons name="globe-outline" size={48} color={'white'} />,
    },
    {
      title: 'Expert Instructors',
      description: `Learn from industry experts and experienced educators. Our courses are designed and taught by professionals who have extensive knowledge and practical experience in their fields. You'll benefit from their insights and gain valuable skills for your career.`,
      icon: <Ionicons name="people-outline" size={48} color={'white'} />,
    },
    {
      title: 'Interactive Learning',
      description: `Engage in interactive lessons, quizzes, and practical exercises. We believe that active participation enhances the learning experience. Our courses are designed to keep you engaged through hands-on activities, discussions, and assessments.`,
      icon: (
        <Ionicons
          name="chatbubble-ellipses-outline"
          size={48}
          color={'white'}
        />
      ),
    },
    {
      title: 'Certifications',
      description: `Earn certificates upon course completion to showcase your skills. When you successfully complete a course, you'll receive a verified certificate that can be shared with employers and on your professional profiles. Our certifications are a testament to your knowledge and dedication.`,
      icon: <Ionicons name="medal-outline" size={48} color={'white'} />,
    },
    // Add more features here...
  ];
  const ExternalLink = ({url, children}) => {
    const handleLinkPress = () => {
      Linking.openURL(url).catch(err =>
        console.error('Error opening URL: ', err),
      );
    };

    return (
      <TouchableOpacity onPress={handleLinkPress}>
        <Text style={styles.developedByText}>{children}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text
        style={{
          fontWeight: 'bold',
          color: VIOLET_COLOR,
          textAlign: 'center',
          textTransform: 'uppercase',
          marginBottom: 20,
        }}>
        Our Features
      </Text>
      {features.map((feature, index) => (
        <View key={index} style={styles.featureItem}>
          <View style={styles.iconContainer}>{feature.icon}</View>
          <Text style={styles.title}>{feature.title}</Text>
          <Text style={styles.description}>{feature.description}</Text>
        </View>
      ))}
      <View style={styles.footer}>
        <ExternalLink url="https://digitiostack.co.in">
          Developed by <Text style={{fontWeight: 'bold'}}>DIGITIO STACK</Text>
        </ExternalLink>
        <Text style={styles.copyrightText}>
          © 2023 Digitio Stack. All rights reserved.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  featureItem: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 24,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: VIOLET_COLOR,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    textAlign: 'center',
    color: VIOLET_COLOR,
  },
  description: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 8,
    color: '#777', // You can use any color of your choice
    lineHeight: 22, // Adjust the line height for better readability
    paddingHorizontal: 16, //
  },
  footer: {
    alignItems: 'center',
    marginTop: 32,
  },
  developedByText: {
    fontSize: 14,
    color: '#777',
  },
  copyrightText: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
});

export default FeaturesScreen;

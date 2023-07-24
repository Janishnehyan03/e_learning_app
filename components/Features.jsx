import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { VIOLET_COLOR } from '../utils/Consts';
import LinearGradient from 'react-native-linear-gradient';
const Features = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Our Features</Text>
      <Text style={styles.subHeading}>Built and Designed with you in Mind</Text>

      <View style={styles.feature}>
        <View style={styles.icon}>
          <Ionicons name="videocam" size={50} color="white" />
        </View>
        <Text style={styles.featureText}>Video Classes</Text>
        <Text style={styles.featureDescription}>
          Simplify learning with video classes for effortless knowledge acquisition.
        </Text>
        <Text style={styles.learnMore}>Learn More</Text>
      </View>

      <View style={styles.feature}>
        <View style={styles.icon}>
          <Ionicons name="construct" size={50} color="white" />
        </View>
        <Text style={styles.featureText}>Practical Sessions</Text>
        <Text style={styles.featureDescription}>
          Apply video class knowledge through hands-on practical sessions.
        </Text>
        <Text style={styles.learnMore}>Learn More</Text>
      </View>

      <View style={styles.feature}>
        <View style={styles.icon}>
          <Ionicons name="notifications" size={50} color="#fff" />
        </View>
        <Text style={styles.featureText}>Smart Notifications</Text>
        <Text style={styles.featureDescription}>
          Stay informed with intelligent, timely notifications for reminders.
        </Text>
        <Text style={styles.learnMore}>Learn More</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#3b82f6',
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
  },
  icon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: VIOLET_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  feature: {
    alignItems: 'center',
    marginVertical: 20,
  },
  featureText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  featureDescription: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginHorizontal: 20,
  },
  learnMore: {
    fontSize: 14,
    color: '#3b82f6',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
});

export default Features;

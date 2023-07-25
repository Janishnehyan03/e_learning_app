import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView} from 'react-native';

const AboutScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.appName}>CPET Online</Text>

      <Text style={styles.appDescription}>
        CPET is an unprecedented attempt by DHIU to plan, design and implement
        various educational and training programs aimed at different groups of
        public. Established in January 2012, the CPET has started engaging in
        the process of educating the ummah by providing the long and short term
        diploma and Certificate courses. CPET now offers the following courses:
      </Text>

      <View style={styles.featureItem}>
        <Text style={styles.featureText}>
          Diploma in Transformational Leadership for Imams
        </Text>
      </View>
      <View style={styles.featureItem}>
        <Text style={styles.featureText}>
          Certificate course in Islamic Concept and Practices for women
        </Text>
      </View>
      <View style={styles.featureItem}>
        <Text style={styles.featureText}>
          Trainers’ Training for women (12 workshops)
        </Text>
      </View>
      <View style={styles.featureItem}>
        <Text style={styles.featureText}>
          Happy Family Workshop for women (4 Classes)
        </Text>
      </View>
      <View style={styles.featureItem}>
        <Text style={styles.featureText}>
          Happy Family Workshop for women (4 Classes){' '}
        </Text>
      </View>

      <Text style={styles.contactTitle}>Contact Us:</Text>

      <Text style={styles.contactText}>
        For any inquiries or support, please feel free to contact us at:
      </Text>

      <Text style={styles.contactEmail}>cpetdarulhuda@gmail.com</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 32,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    color: '#1E90FF',
  },
  appDescription: {
    fontSize: 16,
    marginTop: 16,
    textAlign: 'left',
    color: 'gray',
  },
  featureItem: {
    backgroundColor: '#cdcdcd',
    padding: 14,
    borderRadius: 10,
    marginVertical: 4,
  },
  featureText: {
    fontSize: 16,
    color: 'black',
  },
  contactTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 8,
    color: 'gray',
  },
  contactText: {
    fontSize: 16,
    color: 'black',
  },
  contactEmail: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E90FF',
    marginTop: 8,
  },
});

export default AboutScreen;

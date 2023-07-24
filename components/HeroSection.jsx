import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {VIOLET_COLOR} from '../utils/Consts';
import {useNavigation} from '@react-navigation/native';

function HeroSection() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://cdn.devdojo.com/images/september2020/macbook-mockup.png',
        }} // Replace with the actual image path
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.title}>Learn the Next Great Thing</Text>
        <Text style={styles.description}>
          Are you prepared to embark on an exciting journey and begin your
          learning experience with CPET to advance your career?
        </Text>
        <View style={styles.centeredButtonContainer}>
          <TouchableOpacity
            style={styles.signupButton}
            onPress={() => {
              navigation.navigate('Register');
            }}>
            <Text style={styles.signupButtonText}>Signup Today!</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    paddingTop: 40,
    paddingBottom: 40,
  },
  image: {
    width: '100%',
    height: 300, // Adjust the height as needed
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: 360,
    paddingTop: 48,
    paddingLeft: 8,
    paddingRight: 8,
    marginTop: -32,
    marginBottom: -32,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingRight: 20,
    marginBottom: 24,
  },
  centeredButtonContainer: {
    alignItems: 'center', // Center the button horizontally
  },
  signupButton: {
    backgroundColor: VIOLET_COLOR,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontWeight: 'bold',
    color: '#fff',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default HeroSection;

import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const CustomHeader = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: 'https://seeklogo.com/images/U/udemy-wordmark-logo-5BA74BCA61-seeklogo.com.png',
          }}
          style={styles.logo}
          resizeMode="contain"
        />
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1598723106396-f89827f6aa1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG11c2xpbXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
          }}
          style={styles.userImage}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.welcomeText}>Welcome,</Text>
      <Text style={styles.welcomeText}> Janish Nehyan</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 2,
  },
  logo: {
    width: 90,
    height: 60,
    marginBottom: 10,
  },
  userImage: {
    width: 30,
    height: 30,
    borderRadius: 40,
  },
  welcomeText: {
    fontSize: 18,
    color: 'black',
  },
  imageContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
});

export default CustomHeader;

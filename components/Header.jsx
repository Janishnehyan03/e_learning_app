import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context'; // Import useSafeAreaInsets
import Axios from '../utils/Axios';
import Logo from '../assets/images/logo.png';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuth} from '../utils/UserContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

function Header() {
  const navigation = useNavigation();
  const {logout} = useAuth();
  const insets = useSafeAreaInsets(); //  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isMobileNavClosed, setIsMobileNavClosed] = useState(true);
  const [token, setToken] = useState(null);
  const {width, height} = Dimensions.get('window'); // Get the screen dimensions

  const getUser = async () => {
    try {
      let {data} = await Axios.get('/auth/user');
      setUser(data);
    } catch (error) {
      setUser(null);
    }
  };

  useEffect(() => {
    async function getToken() {
      const storedToken = await AsyncStorage.getItem('authToken');
      setToken(storedToken);
      if (storedToken) {
        getUser();
      }
    }
    getToken();
  }, []);

  const handleLogout = async () => {
    // Perform logout logic, e.g., clearing cookies or AsyncStorage
    await logout();
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    }); // Navigate to the login screen
  };

  const handleMobileNavToggle = () => {
    setIsMobileNavClosed(!isMobileNavClosed);
  };

  return (
    <View style={[styles.headerContainer]}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <View style={styles.logoContainer}>
          <Image
            source={Logo} // Assuming you have the logo.svg file in the correct location
            style={styles.logo}
          />
          <Text style={styles.logoText}>
            CPET<Text style={styles.logoTextAccent}>.</Text>
          </Text>
        </View>
      </TouchableOpacity>
      {/* Navigation links */}
      {/* Replace the 'Link' component with 'TouchableOpacity' and use navigation.navigate to handle navigation */}
      <View
        style={[
          styles.navContainer,
          {height: height - insets.top, width}, // Set full screen width and height
          isMobileNavClosed ? styles.hidden : null,
        ]}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={styles.navLink}>
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Courses')}
          style={styles.navLink}>
          <Text style={styles.navText}>Courses</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Dashboard')}
          style={styles.navLink}>
          <Text style={styles.navText}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AboutScreen');
          }}
          style={styles.navLink}>
          <Text style={styles.navText}>About</Text>
        </TouchableOpacity>

        {/* Mobile-only links */}
        {token && (
          <TouchableOpacity style={styles.mobileLink}>
            <Text style={styles.mobileLinkText}>{user?.name}</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[
            styles.mobileLink,
            styles.mobileLinkButton,
            {backgroundColor: token ? '#891010' : '#0a2766'}, // Customize the button background based on the login status
          ]}
          onPress={
            token ? handleLogout : () => navigation.navigate('Register')
          }>
          <Text
            style={[
              styles.mobileLinkText,
              {color: '#fff'}, // Customize the button background based on the login status
            ]}>
            {token ? 'Logout' : 'Get Started'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Mobile navigation toggle button */}
      <TouchableOpacity
        onPress={handleMobileNavToggle}
        style={styles.mobileNavToggle}>
        {!isMobileNavClosed ? (
          <Ionicons name="md-close" size={34} color="#5A67D8" />
        ) : (
          <Ionicons name="md-menu" size={34} color="#5A67D8" />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    position: 'relative',
    width: '100%',
    height: 100,
    paddingHorizontal: 16,
    paddingTop: 34,
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 1,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 24,
    height: 24,
    marginRight: 8,
    tintColor: '#5A67D8', // Customize the logo color
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  logoTextAccent: {
    color: '#FF007F', // Customize the accent color
  },
  navContainer: {
    flexDirection: 'column',
    position: 'absolute',
    top: 100,
    left: 0,
    zIndex: 1,
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E5E5',
    borderWidth: 1,
  },
  hidden: {
    display: 'none',
  },
  navLink: {
    marginBottom: 16,
  },
  navText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  mobileLink: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 8,
    borderColor: '#FF007F', // Customize the link color
    borderWidth: 2,
    borderRadius: 4,
    alignItems: 'center',
  },
  mobileLinkButton: {
    backgroundColor: '#FF007F', // Customize the button background color
    borderColor: 'transparent',
  },
  mobileLinkText: {
    fontWeight: 'bold',
    color: '#000',
  },
  mobileNavToggle: {
    position: 'absolute',
    top: 34,
    right: 16,
    zIndex: 2,
  },
  mobileNavToggleLine: {
    width: 30,
    height: 4,
    backgroundColor: '#333333',
    marginBottom: 4,
  },
});

export default Header;

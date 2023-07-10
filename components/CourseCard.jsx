import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CourseCard = ({title, price, learners, slug, thumbnail, description}) => {
  const [userId, setUserId] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    getUserIdFromAsyncStorage();
  }, []);

  const getUserIdFromAsyncStorage = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (userId) {
        setUserId(userId);
      }
    } catch (error) {
      console.log('Error getting user ID:', error);
    }
  };

  return (
    <View style={{margin: 12, backgroundColor: '#E1E1E1', borderRadius: 20}}>
      <View
        style={{margin: 5, height: 180, borderRadius: 15, overflow: 'hidden'}}>
        <Image
          source={{uri: thumbnail}}
          style={{flex: 1, backgroundColor: 'black'}}
          resizeMode="cover"
        />
      </View>
      <View style={{padding: 8}}>
        <Text style={{fontWeight: '700', fontSize: 20, color: '#0D4759'}}>
          {title}
        </Text>
        <Text style={{color: '#6E6D6D'}}>{description}</Text>
      </View>
      <View style={{width: '100%', padding: 5}}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Details', {slug, thumbnail});
          }}
          style={{
            backgroundColor: learners.includes(userId) ? '#5124C0' : '#05393E',
            borderRadius: 20,
            paddingVertical: 10,
          }}>
          <Text style={{color: 'white', textAlign: 'center'}}>
            {learners.includes(userId) ? 'Learn Now' : `Buy Now ₹ ${price}`}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CourseCard;

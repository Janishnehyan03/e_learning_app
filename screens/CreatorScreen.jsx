import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import Axios from '../utils/Axios'; // Assuming you have Axios configured for API calls

const CreatorScreen = ({route}) => {
  const {slug} = route.params;
  const [creatorData, setCreatorData] = useState(null);

  const fetchCreatorData = async () => {
    try {
      // Fetch the creator's data based on the provided creatorId
      const {data} = await Axios.get(`/creator/${slug}`);
      setCreatorData(data);
    } catch (error) {
      console.error('Error fetching creator data:', error);
    }
  };

  useEffect(() => {
    fetchCreatorData();
  }, []);

  return (
    <View style={styles.container}>
      {/* Creator's rounded image */}
      <Image
        source={creatorData?.image && {uri: creatorData.image}}
        style={styles.thumbnail}
        resizeMode="cover"
      />

      {/* Creator's name and description */}
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{creatorData?.name || 'Loading...'}</Text>
        <Text style={styles.description}>
          {creatorData?.description || 'Loading...'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  thumbnail: {
    width: 160,
    height: 160,
    borderRadius: 80,
    marginBottom: 16,
    backgroundColor: '#EAEAEA',
  },
  detailsContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    textAlign:"center"
  },
});

export default CreatorScreen;

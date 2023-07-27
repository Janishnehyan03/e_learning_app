import {Share, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {VIOLET_COLOR} from '../utils/Consts';

const ShareButton = ({title, url}) => {
  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `Check out this course: ${title}. ${url}`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Shared with specific activity type
          console.log(`Shared via ${result.activityType}`);
        } else {
          // Shared
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        // Dismissed
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error while sharing:', error.message);
    }
  };

  return (
    <TouchableOpacity title="Share" onPress={handleShare}>
      <Ionicons name="share-social-outline" size={28} color={VIOLET_COLOR} />
    </TouchableOpacity>
  );
};

export default ShareButton;

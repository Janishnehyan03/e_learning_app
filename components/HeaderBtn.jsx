import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';

const HeaderBtn = ({iconUrl, dimension, handlePress}) => {
  return (
    <TouchableOpacity>
      <Image
        source={iconUrl}
        resizeMode="cover"
        style={{
          width: 30,
          height: 30,
        }}
      />
    </TouchableOpacity>
  );
};

export default HeaderBtn;

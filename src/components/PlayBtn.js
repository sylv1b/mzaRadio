import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Platform,
} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';

import {colors} from '../styles/colors';

const PlayBtn = ({size, onPress, text, isLoading}) => {
  return (
    <TouchableOpacity
      style={{
        position: 'absolute',
        right: 12,
        bottom: 12,
        backgroundColor: 'black',
        width: size,
        height: size,
        borderRadius: size / 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: colors.red,
        borderStyle: 'solid',
        borderWidth: 1,
        shadowColor: colors.red,
        shadowOffset: {
          width: 2,
          height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        zIndex: 1000,
        opacity: text === 'play' ? 0.5 : 1,
      }}
      onPress={() => onPress()}>
      {isLoading ? (
        <ActivityIndicator color={colors.red} />
      ) : text === 'play' ? (
        <Icon name="right" color={colors.red} size={size / 2} />
      ) : (
        <Icon name="pause" color={colors.red} size={size / 2} />
      )}
    </TouchableOpacity>
  );
};

export default React.memo(PlayBtn);

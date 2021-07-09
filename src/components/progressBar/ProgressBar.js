import React from 'react';
import {View} from 'react-native';
import {colors} from '../../styles/colors';

export default function ProgressBar({current, length}) {
  return (
    <View
      style={{
        height: 5,
        width: '100%',
        backgroundColor: 'grey',
        borderRadius: 2,
        overflow: 'hidden',
      }}>
      <View
        style={{
          flex: 1,
          width: `${(current / length) * 100}%`,
          backgroundColor: colors.red,
        }}
      />
    </View>
  );
}

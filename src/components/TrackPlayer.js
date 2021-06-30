import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import TrackPlayer, {RepeatMode} from 'react-native-track-player';

export default function MyTrackPlayer() {
  useEffect(async () => {
    await TrackPlayer.setupPlayer({});
    TrackPlayer.registerPlaybackService(() => require('./service'));
  }, []);

  return (
    <View>
      <Text></Text>
    </View>
  );
}

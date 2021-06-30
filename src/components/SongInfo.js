import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import millisToMinutesAndSeconds from '../utils/convertToMinutesAndSeconds';

const SongInfo = ({songInfo}) => {
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    {
      remaining > 1000 &&
        setTimeout(() => setRemaining(remaining - 1000), 1000);
    }
  }, [remaining]);

  useEffect(() => {
    const start = songInfo.ts;
    const end = start + songInfo.length;
    const refreshTime = new Date(end).getTime() - Date.now();
    setRemaining(refreshTime);
  }, [songInfo]);

  const noImage =
    'https://manager2.creativradio.com:2250/media/tracks/default_track_img.png';
  const songImage = songInfo.img_url ? songInfo.img_url : noImage;
  return (
    <View style={{flexDirection: 'row', paddingHorizontal: 8}}>
      <View>
        <Image source={{uri: songImage}} style={{width: 100, height: 100}} />
      </View>
      <View style={{flex: 1, marginHorizontal: 12}}>
        {/* <Text style={styles.nowPlaying}>
          Now playing (
          {`${millisToMinutesAndSeconds(
            remaining,
          )} / ${millisToMinutesAndSeconds(songInfo.length)}`}
          )
        </Text> */}
        <Text style={styles.nowPlaying}>Now playing</Text>
        {songInfo.author ? (
          <Text style={styles.artistText}>{songInfo.author}</Text>
        ) : (
          <View />
        )}
        {songInfo.title ? (
          <Text style={styles.songText}>{songInfo.title}</Text>
        ) : (
          <View />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  nowPlaying: {
    color: 'white',
    fontSize: 10,
  },
  artistText: {
    color: 'white',
    fontSize: 16,
    flexWrap: 'wrap',
  },
  songText: {
    color: 'white',
    fontSize: 14,
    flexWrap: 'wrap',
  },
});

export default React.memo(SongInfo);

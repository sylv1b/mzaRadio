import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import millisToMinutesAndSeconds from '../utils/convertToMinutesAndSeconds';
import ProgressBar from './progressBar/ProgressBar';

const SongInfo = ({songInfo}) => {
  const [remaining, setRemaining] = useState(0);
  const [timePlayed, setTimePlayed] = useState(0);
  const [displayInfo, setDisplayInfo] = useState(1);

  useEffect(() => {
    const start = songInfo.ts;
    const end = start + songInfo.length;
    const refreshTime = new Date(end).getTime() - Date.now();
    const timePlayed = Date.now() - new Date(start).getTime();
    setTimePlayed(Math.round(timePlayed / 1000) * 1000);

    setRemaining(Math.round(refreshTime / 1000) * 1000);
  }, [songInfo]);

  useEffect(() => {
    const timer = setTimeout(() => setTimePlayed(timePlayed + 1000), 1000);
    return () => clearTimeout(timer);
  }, [timePlayed]);

  useEffect(() => {
    const timer =
      remaining > 1000 &&
      setTimeout(() => setRemaining(remaining - 1000), 1000);
    return () => clearTimeout(timer);
  }, [remaining]);

  const noImage =
    'https://manager2.creativradio.com:2250/media/tracks/default_track_img.png';
  const songImage = songInfo.img_url ? songInfo.img_url : noImage;
  return (
    <View style={{flexDirection: 'row', paddingHorizontal: 8}}>
      <View>
        <Image source={{uri: songImage}} style={{width: 100, height: 100}} />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          marginVertical: 12,
          marginLeft: 6,
        }}>
        <View style={{flex: 1}}>
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
        <TouchableWithoutFeedback
          onPress={() =>
            displayInfo === 1 ? setDisplayInfo(0) : setDisplayInfo(1)
          }>
          <View>
            {displayInfo === 1 ? (
              <Text style={styles.nowPlaying}>
                Now playing (
                {`${millisToMinutesAndSeconds(
                  timePlayed,
                )} / ${millisToMinutesAndSeconds(songInfo.length)}`}
                )
              </Text>
            ) : (
              <Text style={styles.nowPlaying}>
                Remaining ({`${millisToMinutesAndSeconds(remaining)} `})
              </Text>
            )}
            <ProgressBar current={timePlayed} length={songInfo.length} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  nowPlaying: {
    color: 'white',
    fontSize: 10,
    marginBottom: 4,
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

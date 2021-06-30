import {transformSync} from '@babel/core';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  StyleSheet,
} from 'react-native';
import RadioPlayer, {
  RadioPlayerEvents,
  RadioPlayerMetadata,
} from 'react-native-radio-player';
import axios from 'axios';
import PlayBtn from './PlayBtn';
import SongInfo from './SongInfo';
import Caroussel from './caroussel/Caroussel';

const {width, height} = Dimensions.get('window');

export default function Player() {
  const [playerState, setPlayerState] = useState('stopped');
  const [currentSong, setCurrentSong] = useState({});

  const stream = 'https://manager2.creativradio.com:2305/stream';
  const metadataURI =
    'https://manager2.creativradio.com:2250/api/v2/history/?limit=50&offset=0&server=1';

  useEffect(() => {
    RadioPlayerEvents.addListener('StateDidChange', eventObject => {
      setPlayerState(eventObject.state);
    });
    return () => {
      RadioPlayerEvents.removeListener('StateDidChange', eventObject => {
        setPlayerState(eventObject.state);
      });
    };
  }, []);

  React.useEffect(() => {
    RadioPlayer.radioURL(stream);
    play();
    return () => {
      RadioPlayer.stop();
    };
  }, []);

  const play = () => {
    getMetaData();
    RadioPlayer.play();
  };

  const stop = () => {
    RadioPlayer.stop();
  };

  const getMetaData = () => {
    axios
      .get(metadataURI)
      .then(res => {
        setCurrentSong(res.data);
        refreshMetaData(res.data.results[0]);
      })
      .catch(err => console.log(err));
  };

  const refreshMetaData = currentSong => {
    const start = currentSong.ts;
    const end = start + currentSong.length;
    const refreshTime = new Date(end).getTime() - Date.now();
    setTimeout(() => getMetaData(), refreshTime);
  };

  return (
    <View style={{flex: 1}}>
      <View style={{alignItems: 'center'}}>
        <Image
          source={require('../assets/headerImage.png')}
          style={{width: width / 1.5, height: width / 1.5}}
        />
      </View>
      <View style={{marginVertical: 12}}>
        {currentSong.results && <SongInfo songInfo={currentSong.results[0]} />}
      </View>
      {currentSong.results && (
        <Caroussel
          items={currentSong.results.slice(1, currentSong.results.length - 1)}
        />
      )}
      <PlayBtn
        text={playerState === 'playing' ? 'stop' : 'play'}
        isLoading={playerState === 'buffering'}
        onPress={playerState === 'playing' ? stop : play}
        size={width / 6}
      />
    </View>
  );
}

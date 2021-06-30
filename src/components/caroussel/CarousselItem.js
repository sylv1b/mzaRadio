import React from 'react';
import {View, Text, Image} from 'react-native';
import millisToMinutesAndSeconds from '../../utils/convertToMinutesAndSeconds';

const CarousselItem = ({item}) => {
  const songLength = millisToMinutesAndSeconds(item.length);
  const noImage =
    'https://manager2.creativradio.com:2250/media/tracks/default_track_img.png';
  const songImage = item.img_url ? item.img_url : noImage;
  return (
    <View style={{flexDirection: 'row'}}>
      <Image source={{uri: songImage}} style={{width: 50, height: 50}} />
      <View
        style={{
          flexDirection: 'column',
          marginLeft: 12,
          justifyContent: 'space-between',
        }}>
        <Text style={{color: 'white', fontSize: 8}}>
          Played {new Date(item.ts).toLocaleString('en-US')}
        </Text>
        <View style={{flex: 1}}>
          {item.author ? (
            <Text style={{color: 'white'}}>{item.author}</Text>
          ) : (
            <View />
          )}
          <Text style={{color: 'white', fontSize: 10}}>{item.title}</Text>
        </View>
        <Text style={{color: 'white', fontSize: 8}}>{songLength}</Text>
      </View>
    </View>
  );
};

export default React.memo(CarousselItem);

import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {colors} from '../../styles/colors';
import CarousselItem from './CarousselItem';

export default function Caroussel({items}) {
  return (
    <FlatList
      data={items}
      renderItem={({item}) => <CarousselItem item={item} />}
      style={{height: '100%', marginHorizontal: 12}}
      ListHeaderComponent={() => (
        <Text style={{color: 'white', marginBottom: 8}}>
          What was that song?
        </Text>
      )}
      ItemSeparatorComponent={() => (
        <View
          style={{
            backgroundColor: colors.red,
            height: 1,
            marginTop: 8,
            marginBottom: 8,
            opacity: 0.2,
          }}
        />
      )}
    />
  );
}

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Colors} from '../styles';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad5werwer3ab2b28ba',
    title: 'First Item',
    uri: 'https://reactnative.dev/img/tiny_logo.png',
    album: '2021',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd9werewr1aa297f63',
    title: 'Second Item',
    uri: 'https://reactnative.dev/img/tiny_logo.png',
    album: '2021',
  },
  {
    id: '58694a0f-3da1-471f-bd96-14554werwer71e329d72',
    title: 'Third Item',
    uri: 'https://reactnative.dev/img/tiny_logo.png',
    album: '2021',
  },
  {
    id: '58694a0f-3da1-471f-bd96-1452erwer571e239d72',
    title: 'Third Item',
    uri: 'https://reactnative.dev/img/tiny_logo.png',
    album: '2021',
  },
  {
    id: '58694a0f-3da1-471f-bd96-14sdfsdf5571e329d72',
    title: 'Third Item',
    uri: 'https://reactnative.dev/img/tiny_logo.png',
    album: '2021',
  },
  {
    id: '58694a0f-3da1-471f-bd96-1455sdf71e29d742',
    title: 'Third Item',
    uri: 'https://reactnative.dev/img/tiny_logo.png',
    album: '2021',
  },
];

const ListMusic = props => {
  const {data, isLoading, skipToSong, activeIndex} = props;

  const CardList = (item, id) => {
    //console.log(JSON.stringify(item) + 'item di list');
    let data = item.item;
    let index = item.id;
    return (
      <TouchableOpacity
        onPress={() => {
          skipToSong(index);
          //console.log('click ' + JSON.stringify(item));
        }}>
        <View
          style={[
            styles.item,
            {backgroundColor: index == activeIndex ? 'green' : 'black'},
          ]}>
          <Image
            style={styles.tinyLogo}
            source={{
              uri: data.album.cover_small,
            }}
          />
          <View style={styles.containerColumn}>
            <Text style={styles.title}>{data.title}</Text>
            <Text style={styles.title}>{data.artist.name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#00ff00" />
      ) : (
        <FlatList
          data={data}
          renderItem={({item, index}) => (
            <CardList item={item} id={index} key={index} />
          )}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

export default ListMusic;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: 'blue',
    marginTop: 20,
  },
  item: {
    borderColor: Colors.mainColor2,
    borderWidth: 1,
    padding: 8,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tinyLogo: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  containerColumn: {},
  title: {
    color: 'white',
    fontWeight: 'bold',
  },
});

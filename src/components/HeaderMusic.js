import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Slider from '@react-native-community/slider';
import {Colors} from '../styles';

const HeaderMusic = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleSong}>{props.title}</Text>
      <Text style={styles.artist}>{props.artist}</Text>

      <View style={styles.containerSlider}>
        <Slider
          style={styles.slider}
          value={props.position}
          minimumValue={0}
          maximumValue={props.duration}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          thumbTintColor="#FFD479"
        />
        <View style={styles.containerSliderLabel}>
          <Text style={styles.textLabel}>
            {new Date(props.position * 1000).toISOString().substr(14, 5)}
          </Text>
          <Text style={styles.textLabel}>
            {new Date((props.duration - props.position) * 1000)
              .toISOString()
              .substr(14, 5)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default HeaderMusic;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  titleSong: {
    fontSize: 24,
    color: Colors.mainColor2,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  artist: {
    fontSize: 17,
    color: 'white',
    fontWeight: '400',
  },
  containerSlider: {
    //backgroundColor: 'red',
    width: '85%',
    marginTop: 20,
  },
  slider: {
    width: '100%',
  },

  containerSliderLabel: {
    //backgroundColor: 'skyblue',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  textLabel: {
    color: 'white',
    fontWeight: 'bold',
  },
});

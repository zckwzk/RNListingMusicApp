import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const initialCond = {
  onPlay: () => {},
  onPause: () => {},
  onPrev: () => {},
  onNext: () => {},
};

const MusicControl = (props = initialCond) => {
  const [activeButton, setActiveButton] = useState('play');

  const {onPlay, onPause, onPrev, onNext} = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          onPlay();
        }}>
        <Text style={styles.button}>Play</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          onPause();
        }}>
        <Text style={styles.button}>Pause</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          onPrev();
        }}>
        <Text style={styles.button}>Prev</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          onNext();
        }}>
        <Text style={styles.button}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MusicControl;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    //backgroundColor: 'red',
    justifyContent: 'space-evenly',
    marginBottom: 20,
  },
  button: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    minWidth: 65,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 4,
    borderColor: 'green',
    borderWidth: 1,
  },
});

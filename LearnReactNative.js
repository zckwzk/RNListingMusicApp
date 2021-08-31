import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

const LearnReactNative = () => {
  return (
    <View>
      <Image style={styles.stretch} source={require('./src/images/OIP.jpg')} />
    </View>
  );
};

export default LearnReactNative;

const styles = StyleSheet.create({});

import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Colors} from '../styles';

const initialCond = {
  Cari: () => {},
};

const SearchInput = (props = initialCond) => {
  const [text, setText] = useState('');
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Search"
        placeholderTextColor="white"
        onChangeText={text => setText(text)}
      />
      <TouchableOpacity onPress={() => props.Cari(text)}>
        <Text style={styles.buttonSearch}>Cari</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',

    //backgroundColor: 'red',
  },
  textInput: {
    width: '80%',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.mainColor2,
    paddingVertical: 4,
    marginRight: 20,
    color: 'white',
  },

  buttonSearch: {
    backgroundColor: 'red',
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: 'white',
    fontWeight: 'bold',
    borderRadius: 4,
  },
});

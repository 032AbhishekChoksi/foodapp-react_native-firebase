//import liraries
import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

// eslint-disable-next-line no-unused-vars
const {height, width} = Dimensions.get('window');

// create a component
const Header = ({title}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    height: 60,
    width: width,
    elevation: 5,
    backgroundColor: '#fff',
    paddingLeft: 15,
    justifyContent: 'center',
  },
  title: {fontSize: 20, fontWeight: '600', color: 'purple'},
});

//make this component available to the app
export default Header;

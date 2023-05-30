/* eslint-disable react-native/no-inline-styles */
//import liraries
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';

// eslint-disable-next-line no-unused-vars
const {height, width} = Dimensions.get('window');

// create a component
const Header = ({title, icon, count, onClickIcon}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {icon && (
        <View
          style={{
            width: 50,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              onClickIcon();
            }}>
            <Image source={icon} style={styles.icon} />
          </TouchableOpacity>
          <View style={styles.count}>
            <Text style={{color: '#fff'}}>{count ? count : '0'}</Text>
          </View>
        </View>
      )}
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

    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 15,
    paddingLeft: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: 'purple',
  },
  icon: {
    width: 24,
    height: 24,
  },
  count: {
    backgroundColor: 'red',
    width: 20,
    height: 20,
    borderRadius: 10,
    position: 'absolute',
    top: 5,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

//make this component available to the app
export default Header;

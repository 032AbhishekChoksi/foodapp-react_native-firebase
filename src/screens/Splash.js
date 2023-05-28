//import liraries
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

// create a component
const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      checkLogin();
    }, 3000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkLogin = async () => {
    // AsyncStorage.setItem('EMAIL', '');
    const email = await AsyncStorage.getItem('EMAIL');
    if (email !== null) {
      if (email === 'admin@gmail.com') {
        navigation.navigate('Dashboard');
      } else {
        navigation.navigate('Home');
      }
    } else {
      navigation.navigate('SelectLogin');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Splash</Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 30,
    fontWeight: '800',
    color: 'red',
  },
});

//make this component available to the app
export default Splash;

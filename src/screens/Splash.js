//import liraries
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

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
        navigation.navigate('Main');
      }
    } else {
      navigation.navigate('SelectLogin');
    }
  };

  return (
    <View style={styles.container}>
      <View />
      <View style={styles.logoContainer}>
        <Image source={require('../images/logo.png')} style={styles.logo} />
        <Text style={styles.logoText}>Food App</Text>
      </View>
      <View>
        <Text style={styles.bottomText}>Developed By Abhishek Choksi 💻</Text>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  logoContainer: {alignItems: 'center'},
  logo: {
    width: 200,
    height: 200,
  },
  logoText: {fontSize: 30, fontWeight: '600', color: 'red'},
  bottomText: {fontSize: 15, fontWeight: '800'},
});

//make this component available to the app
export default Splash;

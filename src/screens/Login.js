/* eslint-disable no-alert */
//import liraries
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {translation} from '../utils';

// create a component
const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState(0);

  useEffect(() => {
    // firestore()
    //     .collection('admin')
    //     .add({email: 'admin@gmail.com', password: 'admin@1234'})
    //     .then(() => {
    //       console.log('admin added!');
    //     });
    getLanguage();
  }, []);

  const getLanguage = async () => {
    let language = 0;
    try {
      // eslint-disable-next-line radix
      language = parseInt(await AsyncStorage.getItem('LANGUAGE'));
    } catch (e) {
      console.error('AsyncStorage Error: ' + e);
    }
    setSelectedLanguage(language);
  };

  const adminLogin = async () => {
    let users = await firestore().collection('admin').get();
    users = users.docs[0]._data;
    // console.log(users.docs[0]._data);
    // console.log(users.docs[0]._data.email);
    if (email === users.email && password === users.password) {
      try {
        await AsyncStorage.setItem('EMAIL', email);
      } catch (e) {
        console.error('AsyncStorage Error: ' + e);
      }
      navigation.navigate('Dashboard');
    } else {
      alert('wrong email or password!');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {selectedLanguage === 0
          ? translation[1].English
          : selectedLanguage === 1
          ? translation[1].Gujarati
          : selectedLanguage === 2
          ? translation[1].Hindi
          : selectedLanguage === 3
          ? translation[1].Punjabi
          : selectedLanguage === 4
          ? translation[1].Tamil
          : translation[1].Urdu}
      </Text>
      <TextInput
        style={styles.inputStyle}
        placeholder={'Enter Email ID'}
        value={email}
        onChangeText={txt => setEmail(txt)}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder={'Enter Password'}
        value={password}
        secureTextEntry={true}
        onChangeText={txt => setPassword(txt)}
      />
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => {
          if (email !== '' && password !== '') {
            adminLogin();
          } else {
            alert('Please Enter All Data');
          }
        }}>
        <Text style={styles.btnText}>
          {selectedLanguage === 0
            ? translation[3].English
            : selectedLanguage === 1
            ? translation[3].Gujarati
            : selectedLanguage === 2
            ? translation[3].Hindi
            : selectedLanguage === 3
            ? translation[3].Punjabi
            : selectedLanguage === 4
            ? translation[3].Tamil
            : translation[3].Urdu}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#000',
    marginTop: 100,
    alignSelf: 'center',
  },
  inputStyle: {
    paddingLeft: 20,
    height: 50,
    alignSelf: 'center',
    marginTop: 30,
    borderWidth: 0.5,
    borderRadius: 10,
    width: '90%',
  },
  loginBtn: {
    backgroundColor: 'orange',
    width: '90%',
    height: 50,
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
});

//make this component available to the app
export default Login;

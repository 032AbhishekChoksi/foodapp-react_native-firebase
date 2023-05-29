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
import Loader from '../common/Loader';
import {translation} from '../../utils';

// create a component
const UserLogin = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(0);

  useEffect(() => {
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

  const adminLogin = () => {
    setModalVisible(true);
    firestore()
      .collection('users')
      // Filter results
      .where('email', '==', email)
      .get()
      .then(res => {
        setModalVisible(false);
        if (res.docs.length !== 0) {
          if (res.docs[0]._data.password === password) {
            goToNextScreen();
          } else {
            alert('Wrong Password!');
          }
        } else {
          alert('Wrong Email!');
        }
      })
      .catch(error => {
        setModalVisible(false);
        console.log('Use Login Error: ' + error);
      });
  };

  const goToNextScreen = async () => {
    try {
      await AsyncStorage.setItem('EMAIL', email);
    } catch (e) {
      console.error('AsyncStorage Error: ' + e);
    }

    navigation.navigate('Main');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {selectedLanguage === 0
          ? translation[2].English
          : selectedLanguage === 1
          ? translation[2].Gujarati
          : selectedLanguage === 2
          ? translation[2].Hindi
          : selectedLanguage === 3
          ? translation[2].Punjabi
          : selectedLanguage === 4
          ? translation[2].Tamil
          : translation[2].Urdu}
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
      <Text
        style={styles.createNewAccount}
        onPress={() => {
          navigation.navigate('UserSignup');
        }}>
        {selectedLanguage === 0
          ? translation[4].English
          : selectedLanguage === 1
          ? translation[4].Gujarati
          : selectedLanguage === 2
          ? translation[4].Hindi
          : selectedLanguage === 3
          ? translation[4].Punjabi
          : selectedLanguage === 4
          ? translation[4].Tamil
          : translation[4].Urdu}
      </Text>
      <Loader modalVisible={modalVisible} setModalVisible={setModalVisible} />
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
  createNewAccount: {
    fontSize: 18,
    fontWeight: '600',
    textDecorationLine: 'underline',
    marginTop: 50,
    alignSelf: 'center',
  },
});

//make this component available to the app
export default UserLogin;

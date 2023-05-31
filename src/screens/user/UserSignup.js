/* eslint-disable no-alert */
//import liraries
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Loader from '../common/Loader';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';

// create a component
const UserSignup = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const saveUser = () => {
    setModalVisible(true);
    const userId = uuid.v4();
    firestore()
      .collection('users')
      .doc(userId)
      .set({
        name: name,
        email: email,
        mobile: mobile,
        password: password,
        userId: userId,
        cart: [],
        address: [],
      })
      .then(res => {
        setModalVisible(false);
        alert('User Sign Up!');
        navigation.goBack();
      })
      .catch(error => {
        setModalVisible(false);
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Sign Up</Text>
      <TextInput
        style={styles.inputStyle}
        placeholder={'Enter Name'}
        value={name}
        onChangeText={txt => setName(txt)}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder={'Enter Email ID'}
        keyboardType={'email-address'}
        value={email}
        onChangeText={txt => setEmail(txt)}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder={'Enter Mobile Number'}
        keyboardType={'phone-pad'}
        value={mobile}
        onChangeText={txt => setMobile(txt)}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder={'Enter Password'}
        value={password}
        secureTextEntry={true}
        onChangeText={txt => setPassword(txt)}
      />
      <TouchableOpacity
        style={styles.signupBtn}
        onPress={() => {
          if (
            name !== '' &&
            email !== '' &&
            mobile !== '' &&
            mobile.length > 9 &&
            password !== ''
          ) {
            saveUser();
          } else {
            alert('Please Enter Data');
          }
        }}>
        <Text style={styles.btnText}>Sign Up</Text>
      </TouchableOpacity>
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
  signupBtn: {
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
export default UserSignup;

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
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../common/Loader';
import {useNavigation} from '@react-navigation/native';

// create a component
const AddNewAddress = () => {
  const navigation = useNavigation();
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [mobile, setMobile] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const saveAddress = async () => {
    try {
      setModalVisible(true);
      const addressId = uuid.v4();
      const userId = await AsyncStorage.getItem('USERID');
      const user = await firestore().collection('users').doc(userId).get();

      let tempDart = [];
      tempDart = user._data.address;
      tempDart.push({street, city, pincode, mobile, addressId});
      await firestore()
        .collection('users')
        .doc(userId)
        .update({
          address: tempDart,
        })
        .then(res => {
          setModalVisible(false);
          alert('Address Successfully added');
          navigation.goBack();
        })
        .catch(error => {
          setModalVisible(false);
          console.log(error);
        });
    } catch (e) {
      setModalVisible(false);
      console.error('' + e);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputStyle}
        placeholder={'Enter Street'}
        value={street}
        onChangeText={txt => setStreet(txt)}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder={'Enter City '}
        value={city}
        onChangeText={txt => setCity(txt)}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder={'Enter Pincode'}
        value={pincode}
        keyboardType="number-pad"
        onChangeText={txt => setPincode(txt)}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder={'Enter Contact '}
        value={mobile}
        maxLength={10}
        keyboardType={'phone-pad'}
        onChangeText={txt => setMobile(txt)}
      />
      <TouchableOpacity
        style={styles.addNewBtn}
        onPress={() => {
          //   navigation.navigate('AddNewAddress');
          saveAddress();
        }}>
        <Text style={styles.btnText}>Save Address</Text>
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
  inputStyle: {
    paddingLeft: 20,
    height: 50,
    alignSelf: 'center',
    marginTop: 30,
    borderWidth: 0.5,
    borderRadius: 10,
    width: '90%',
  },
  addNewBtn: {
    width: '90%',
    height: 50,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    borderRadius: 10,
  },
  btnText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
});

//make this component available to the app
export default AddNewAddress;

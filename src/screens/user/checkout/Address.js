/* eslint-disable react-native/no-inline-styles */
//import liraries
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Loader from '../../common/Loader';

// create a component
const Address = () => {
  const navigation = useNavigation();
  const [addressList, setAddressList] = useState([]);
  const isFocused = useIsFocused();
  // const [selectedAddress, setSelectedAddress] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getAddressList();
  }, [isFocused]);

  const getAddressList = async () => {
    try {
      const userId = await AsyncStorage.getItem('USERID');
      const addressId = await AsyncStorage.getItem('ADDRESS');
      const user = await firestore().collection('users').doc(userId).get();
      let tempDart = [];
      tempDart = user._data.address;
      tempDart.map(item => {
        if (item.addressId === addressId) {
          item.selected = true;
        } else {
          item.selected = false;
        }
      });
      setAddressList(tempDart);
    } catch (e) {
      setModalVisible(false);
      console.error('' + e);
    }
  };

  const saveDeafultAddress = async item => {
    try {
      setModalVisible(true);
      await AsyncStorage.setItem('ADDRESS', item.addressId);
      let tempDart = [];
      tempDart = addressList;
      tempDart.map(itm => {
        if (itm.addressId === item.addressId) {
          itm.selected = true;
        } else {
          itm.selected = false;
        }
      });

      let temp = [];
      tempDart.map(element => {
        temp.push(element);
      });
      setAddressList(temp);
      setModalVisible(false);
    } catch (e) {
      setModalVisible(false);
      console.error('AsyncStorage Error: ' + e);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={addressList}
        renderItem={({item, index}) => {
          return (
            <View
              style={[
                styles.addressItem,
                {marginBottom: index === addressList.length - 1 ? 100 : 10},
              ]}>
              <View>
                <Text>{'Street: ' + item.street}</Text>
                <Text>{'City: ' + item.city}</Text>
                <Text>{'Pincode: ' + item.pincode}</Text>
                <Text>{'Mobile: ' + item.mobile}</Text>
              </View>
              {item.selected === true ? (
                <Text>default</Text>
              ) : (
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => {
                    saveDeafultAddress(item);
                  }}>
                  <Text style={{color: '#fff'}}>Set Default</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        }}
      />
      <TouchableOpacity
        style={styles.addNewBtn}
        onPress={() => {
          navigation.navigate('AddNewAddress');
        }}>
        <Text style={styles.btnText}>Add New Address</Text>
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
  addressItem: {
    width: '90%',

    backgroundColor: '#fff',
    elevation: 4,
    alignSelf: 'center',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center',
  },
  btn: {
    backgroundColor: 'green',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
  },
});

//make this component available to the app
export default Address;

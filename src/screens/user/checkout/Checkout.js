/* eslint-disable react-native/no-inline-styles */
//import liraries
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused, useNavigation} from '@react-navigation/native';
let userId = '';

// create a component
const Checkout = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [cartList, setCartList] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('No Selected Address');

  useEffect(() => {
    getCartItems();
    getAddressList();
  }, [isFocused]);

  const getCartItems = async () => {
    try {
      userId = await AsyncStorage.getItem('USERID');
      const user = await firestore().collection('users').doc(userId).get();
      setCartList(user._data.cart);
    } catch (e) {
      console.error('' + e);
    }
  };

  const getTotal = () => {
    let total = 0;
    cartList.map(item => {
      total = total + item.data.qty * item.data.discountPrice;
    });
    return total;
  };

  const getAddressList = async () => {
    try {
      userId = await AsyncStorage.getItem('USERID');
      const addressId = await AsyncStorage.getItem('ADDRESS');
      const user = await firestore().collection('users').doc(userId).get();
      let tempDart = [];
      tempDart = user._data.address;
      tempDart.map(item => {
        if (item.addressId === addressId) {
          setSelectedAddress(
            'Address:\n' +
              item.street +
              ', ' +
              item.city +
              ', ' +
              item.pincode +
              '.\n\nContact: ' +
              item.mobile,
          );
        }
      });
    } catch (e) {
      console.error('' + e);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <FlatList
          data={cartList}
          renderItem={({item, index}) => {
            return (
              <View style={styles.itemView}>
                <Image
                  source={{uri: item.data.imageUrl}}
                  style={styles.itemImage}
                />
                <View style={styles.nameView}>
                  <Text style={styles.nameText}>{item.data.name}</Text>
                  <Text style={styles.descText}>{item.data.description}</Text>
                  <View style={styles.priceView}>
                    <Text style={styles.priceText}>
                      {'₹' + item.data.discountPrice}
                    </Text>
                    <Text style={styles.discountText}>
                      {'₹' + item.data.price}
                    </Text>
                  </View>
                </View>
                <Text style={styles.nameText}>{'Qty : ' + item.data.qty}</Text>
              </View>
            );
          }}
        />
      </View>
      <View style={styles.totalView}>
        <Text style={styles.nameText}>Total</Text>
        <Text style={styles.nameText}>{'₹' + getTotal()}</Text>
      </View>
      <View style={styles.totalView}>
        <Text style={styles.nameText}>Selected Address</Text>
        <Text
          style={styles.editAddress}
          onPress={() => {
            navigation.navigate('Address');
          }}>
          Change Address
        </Text>
      </View>
      <Text
        style={{
          margin: 15,
          width: '100%',
          fontSize: 16,
          color: '#000',
          fontWeight: '600',
        }}>
        {selectedAddress}
      </Text>
      <TouchableOpacity
        disabled={selectedAddress === 'No Selected Address' ? true : false}
        style={[
          styles.checkoutBtn,
          {
            backgroundColor:
              selectedAddress === 'No Selected Address' ? '#DADADA' : 'green',
          },
        ]}
        onPress={() => {
          if (selectedAddress !== 'No Selected Address') {
            // payNow();
          }
        }}>
        <Text style={{color: '#fff', fontSize: 18, fontWeight: '600'}}>
          Pay Now {'₹' + getTotal()}
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
  itemView: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    elevation: 4,
    marginTop: 10,
    borderRadius: 10,
    height: 100,
    marginBottom: 10,
    alignItems: 'center',
  },
  itemImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    margin: 5,
  },
  nameView: {
    width: '35%',
    margin: 10,
  },
  priceView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 18,
    fontWeight: '700',
  },
  descText: {
    fontSize: 14,
    fontWeight: '600',
  },
  priceText: {
    fontSize: 18,
    color: 'green',
    fontWeight: '700',
  },
  discountText: {
    fontSize: 17,
    fontWeight: '600',
    textDecorationLine: 'line-through',
    marginLeft: 5,
  },
  totalView: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingLeft: 20,
    height: 50,
    borderTopWidth: 0.3,
    paddingRight: 20,
    marginTop: 20,
    alignItems: 'center',
    borderTopColor: '#8e8e8e',
  },
  editAddress: {
    color: '#2F62D1',
    fontSize: 16,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  checkoutBtn: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    backgroundColor: 'green',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

//make this component available to the app
export default Checkout;
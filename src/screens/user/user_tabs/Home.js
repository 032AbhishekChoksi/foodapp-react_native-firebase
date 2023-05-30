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
import Header from '../../common/Header';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation} from '@react-navigation/native';
let userId = '';

// create a component
const Home = () => {
  const [items, setItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    getItems();
  }, []);

  useEffect(() => {
    getCartItems();
  }, [isFocused]);

  const getItems = () => {
    firestore()
      .collection('items')
      .get()
      .then(querySnapshot => {
        console.log('Total Items: ', querySnapshot.size);
        let tempData = [];
        querySnapshot.forEach(documentSnapshot => {
          tempData.push({
            id: documentSnapshot.id,
            data: documentSnapshot.data(),
          });
        });
        setItems(tempData);
      });
  };

  const getCartItems = async () => {
    try {
      userId = await AsyncStorage.getItem('USERID');
      const user = await firestore().collection('users').doc(userId).get();
      setCartCount(user._data.cart.length);
    } catch (e) {
      console.error('AsyncStorage Error: ' + e);
    }
  };

  const onAddToCart = async (item, index) => {
    try {
      userId = await AsyncStorage.getItem('USERID');
      const user = await firestore().collection('users').doc(userId).get();

      let tempCart = [];
      tempCart = user._data.cart;
      if (tempCart.length > 0) {
        let existing = false;
        tempCart.map(element => {
          if (element.id === item.id) {
            existing = true;
            item.data.qty = item.data.qty + 1;
            element.data.qty = item.data.qty;
          }
        });
        if (existing === false) {
          item.data.qty = 1;
          tempCart.push(item);
        }
        await firestore()
          .collection('users')
          .doc(userId)
          .update({cart: tempCart});
      } else {
        item.data.qty = 1;
        tempCart.push(item);
      }
      await firestore()
        .collection('users')
        .doc(userId)
        .update({cart: tempCart});
    } catch (e) {
      console.error('' + e);
    }
    getCartItems();
  };

  return (
    <View style={styles.container}>
      <Header
        title={'Food App'}
        icon={require('../../../images/cart.png')}
        count={cartCount}
        onClickIcon={() => {
          // navigation.navigate('Cart');
        }}
      />
      <FlatList
        data={items}
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
              <TouchableOpacity
                style={styles.addToCartBtn}
                onPress={() => {
                  onAddToCart(item, index);
                }}>
                <Text style={{color: '#fff'}}>Add To cart</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
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
    width: '30%',
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
  icon: {
    width: 24,
    height: 24,
  },
  addToCartBtn: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 10,
  },
});

//make this component available to the app
export default Home;

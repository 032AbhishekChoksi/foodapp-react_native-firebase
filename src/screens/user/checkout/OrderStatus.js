//import liraries
import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';

// create a component
const OrderStatus = () => {
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if (route.params.status === 'success') {
      placeOrder();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const placeOrder = async () => {
    try {
      let tempOrders = [];
      let user = await firestore()
        .collection('users')
        .doc(route.params.userId)
        .get();
      tempOrders = user._data.orders;
      tempOrders.push({
        items: route.params.cartList,
        address: route.params.address,
        orderBy: route.params.userName,
        userEmail: route.params.userEmail,
        userMobile: route.params.userMobile,
        userId: route.params.userId,
        orderTotal: route.params.total,
        paymentId: route.params.paymentId,
      });
      firestore().collection('users').doc(route.params.userId).update({
        cart: [],
        orders: tempOrders,
      });
      firestore()
        .collection('orders')
        .add({
          data: {
            items: route.params.cartList,
            address: route.params.address,
            orderBy: route.params.userName,
            userEmail: route.params.userEmail,
            userMobile: route.params.userMobile,
            userId: route.params.userId,
            orderTotal: route.params.total,
            paymentId: route.params.paymentId,
          },
          orderBy: route.params.userId,
        });
    } catch (error) {
      console.log('' + error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>{route.params.status === 'success' ? '' : null}</Text>
      <Image
        source={
          route.params.status === 'success'
            ? require('../../../images/success.png')
            : require('../../../images/failed.png')
        }
        style={styles.icon}
      />
      <Text style={styles.msg}>
        {route.params.status === 'success'
          ? 'Order Placed Successfully !!'
          : 'Order Failed !!'}
      </Text>
      <TouchableOpacity
        style={styles.backToHome}
        onPress={() => {
          navigation.navigate('Main');
        }}>
        <Text>Go To Home</Text>
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: '50%',
    height: '30%',
    alignSelf: 'center',
  },
  msg: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginTop: 30,
  },
  backToHome: {
    width: '50%',
    height: 50,
    borderWidth: 0.5,
    marginTop: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

//make this component available to the app
export default OrderStatus;

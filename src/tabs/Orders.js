//import liraries
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

// create a component
const Orders = () => {
  return (
    <View style={styles.container}>
      <Text>Orders</Text>
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
});

//make this component available to the app
export default Orders;

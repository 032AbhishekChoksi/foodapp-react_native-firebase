//import liraries
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

// create a component
const Items = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    getItems();
  }, []);

  const getItems = () => {
    firestore()
      .collection('items')
      .get()
      .then(querySnapshot => {
        console.log('Total Items: ', querySnapshot.size);
        let tempData = [];
        querySnapshot.forEach(documentSnapshot => {
          // console.log(
          //   'Item ID: ',
          //   documentSnapshot.id,
          //   documentSnapshot.data(),
          // );
          tempData.push({
            id: documentSnapshot.id,
            data: documentSnapshot.data(),
          });
        });
        setItems(tempData);
      });
  };

  const deleteItem = docId => {
    firestore()
      .collection('items')
      .doc(docId)
      .delete()
      .then(() => {
        alert('Item deleted!');
        getItems();
      });
  };
  return (
    <View style={styles.container}>
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
              <View style={{margin: 10}}>
                <TouchableOpacity>
                  <Image
                    source={require('../images/edit.png')}
                    style={styles.icon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    deleteItem(item.id);
                  }}>
                  <Image
                    source={require('../images/delete.png')}
                    style={[styles.icon, {marginTop: 20}]}
                  />
                </TouchableOpacity>
              </View>
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
  },
  itemImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    margin: 5,
  },
  nameView: {
    width: '53%',
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
});

//make this component available to the app
export default Items;

/* eslint-disable radix */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
//import liraries
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  PermissionsAndroid,
  Image,
  ScrollView,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
// import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {useRoute} from '@react-navigation/native';

// create a component
const EditItem = ({navigation}) => {
  const route = useRoute();
  const paramData = route.params;
  const [imageData, setImageData] = useState({
    assets: [{uri: paramData.data.imageUrl}],
  });
  const [name, setName] = useState(paramData.data.name);
  const [price, setPrice] = useState(paramData.data.price);
  const [discountPrice, setDiscountPrice] = useState(
    paramData.data.discountPrice,
  );
  const [description, setDescription] = useState(paramData.data.description);
  const [imageUrl, setImageUrl] = useState('');

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
        openGallery();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const openGallery = async () => {
    const result = await launchImageLibrary({mediaType: 'photo'});
    if (result.didCancel) {
    } else {
      // console.log(result);
      setImageData(result);
    }
  };

  // const uploadImage = async () => {
  //   const reference = storage().ref(imageData.assets[0].fileName);
  //   const pathToFile = imageData.assets[0].uri;
  //   // uploads file
  //   await reference.putFile(pathToFile);
  //   const url = await storage()
  //     .ref(imageData.assets[0].fileName)
  //     .getDownloadURL();
  //   // console.log(url);
  //   uploadItem(url);
  // };

  const uploadItem = () => {
    firestore()
      .collection('items')
      .doc(paramData.id)
      .update({
        name: name,
        price: parseInt(price),
        discountPrice: parseInt(discountPrice),
        description: description,
        imageUrl: paramData.data.imageUrl + '',
      })
      .then(() => {
        alert('Item updated!');
        navigation.goBack();
      });
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Edit Item </Text>
        </View>
        {imageData !== null ? (
          <Image
            source={{uri: imageData.assets[0].uri}}
            style={styles.imageStyle}
          />
        ) : null}
        <TextInput
          placeholder="Enter Item Name"
          style={styles.inputStyle}
          value={name}
          onChangeText={txt => setName(txt)}
        />
        <TextInput
          placeholder="Enter Item Price"
          style={styles.inputStyle}
          value={price.toString()}
          onChangeText={txt => setPrice(txt)}
        />
        <TextInput
          placeholder="Enter Item Discount Price"
          style={styles.inputStyle}
          value={discountPrice.toString()}
          onChangeText={txt => setDiscountPrice(txt)}
        />
        <TextInput
          placeholder="Enter Item Description"
          style={styles.inputStyle}
          value={description}
          onChangeText={txt => setDescription(txt)}
        />
        <TextInput
          placeholder="Enter Item Image URL"
          style={styles.inputStyle}
          value={imageUrl}
          onChangeText={txt => setImageUrl(txt)}
        />
        <Text style={{alignSelf: 'center', marginTop: 40}}>OR</Text>
        <TouchableOpacity
          style={styles.pickBtn}
          onPress={() => {
            requestCameraPermission();
          }}>
          <Text>Pick Image From Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.uploadBtn}
          onPress={() => {
            uploadItem();
          }}>
          <Text style={{color: '#fff'}}>Upload Item</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 60,
    width: '100%',
    backgroundColor: '#fff',
    elevation: 5,
    paddingLeft: 20,
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '700',
  },
  inputStyle: {
    width: '90%',
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 30,
    alignSelf: 'center',
  },
  pickBtn: {
    width: '90%',
    height: 50,
    borderWidth: 0.5,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  uploadBtn: {
    backgroundColor: '#5246f2',
    width: '90%',
    height: 50,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 70,
  },
  imageStyle: {
    width: '90%',
    height: 200,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
  },
});

//make this component available to the app
export default EditItem;

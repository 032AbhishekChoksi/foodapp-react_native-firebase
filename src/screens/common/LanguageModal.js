/* eslint-disable react-native/no-inline-styles */
//import liraries
import React, {useState} from 'react';
import {
  View,
  Modal,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';

const {height, width} = Dimensions.get('window');

// create a component
const LanguageModal = ({
  languageModalVisible,
  setLanguageModalVisible,
  onSelectLanguage,
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState(0);
  const [languages, setLanguages] = useState([
    {name: 'English', selected: true},
    {name: 'ગુજરાતી', selected: false},
    {name: 'हिंदी', selected: false},
    {name: 'ਪੰਜਾਬੀ', selected: false},
    {name: 'தமிழ்', selected: false},
    {name: 'اردو', selected: false},
  ]);

  const onSelected = index => {
    const temp = languages;
    temp.map((item, i) => {
      if (index === i) {
        if (item.selected === true) {
          item.selected = false;
        } else {
          item.selected = true;
          setSelectedLanguage(index);
        }
      } else {
        item.selected = false;
      }
    });

    let temp2 = [];
    temp.map(item => {
      temp2.push(item);
    });

    setLanguages(temp2);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={languageModalVisible}
      onRequestClose={() => {
        setLanguageModalVisible(!languageModalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>Select Language</Text>
          <View style={{width: '100%'}}>
            <FlatList
              style={{marginBottom: 10}}
              data={languages}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    style={[
                      styles.languageItem,
                      {
                        borderColor: item.selected === true ? 'blue' : 'black',
                      },
                    ]}
                    onPress={() => {
                      onSelected(index);
                    }}>
                    {item.selected === true ? (
                      <Image
                        source={require('../../images/selected.png')}
                        style={[styles.icon, {tintColor: 'blue'}]}
                      />
                    ) : (
                      <Image
                        source={require('../../images/non_selected.png')}
                        style={[styles.icon, {tintColor: 'black'}]}
                      />
                    )}
                    <Text
                      style={{
                        marginLeft: 20,
                        fontSize: 18,
                        color: item.selected === true ? 'blue' : 'black',
                      }}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          <View style={styles.btns}>
            <TouchableOpacity
              style={styles.btnCancel}
              onPress={() => {
                setLanguageModalVisible(false);
              }}>
              <Text>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnApply}
              onPress={() => {
                setLanguageModalVisible(false);
                onSelectLanguage(selectedLanguage);
              }}>
              <Text style={{color: '#fff'}}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// define your styles
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    width: width - 20,
    // height: height / 2,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  languageItem: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    borderWidth: 0.5,
    marginTop: 10,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {width: 24, height: 24},
  btns: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 0,
    marginBottom: 20,
  },
  btnCancel: {
    width: '40%',
    height: 50,
    borderWidth: 0.5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnApply: {
    width: '40%',
    height: 50,
    borderWidth: 0.5,
    borderRadius: 10,
    backgroundColor: '#4B68E9',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

//make this component available to the app
export default LanguageModal;

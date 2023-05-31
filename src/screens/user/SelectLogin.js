//import liraries
import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import LanguageModal from '../common/LanguageModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {translation} from '../../utils';

// create a component
const SelectLogin = ({navigation}) => {
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(0);

  const saveSelectedLanguage = async index => {
    try {
      await AsyncStorage.setItem('LANGUAGE', index + '');
    } catch (e) {
      console.error('AsyncStorage Error: ' + e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {selectedLanguage === 0
          ? translation[0].English
          : selectedLanguage === 1
          ? translation[0].Gujarati
          : selectedLanguage === 2
          ? translation[0].Hindi
          : selectedLanguage === 3
          ? translation[0].Punjabi
          : selectedLanguage === 4
          ? translation[0].Tamil
          : translation[0].Urdu}
      </Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          navigation.navigate('Login');
        }}>
        <Text style={styles.btnText}>
          {selectedLanguage === 0
            ? translation[1].English
            : selectedLanguage === 1
            ? translation[1].Gujarati
            : selectedLanguage === 2
            ? translation[1].Hindi
            : selectedLanguage === 3
            ? translation[1].Punjabi
            : selectedLanguage === 4
            ? translation[1].Tamil
            : translation[1].Urdu}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          navigation.navigate('UserLogin');
        }}>
        <Text style={styles.btnText}>
          {selectedLanguage === 0
            ? translation[2].English
            : selectedLanguage === 1
            ? translation[2].Gujarati
            : selectedLanguage === 2
            ? translation[2].Hindi
            : selectedLanguage === 3
            ? translation[2].Punjabi
            : selectedLanguage === 4
            ? translation[2].Tamil
            : translation[2].Urdu}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.selectLangaugeBtn}
        onPress={() => {
          setLanguageModalVisible(true);
        }}>
        <Text>
          {selectedLanguage === 0
            ? translation[5].English
            : selectedLanguage === 1
            ? translation[5].Gujarati
            : selectedLanguage === 2
            ? translation[5].Hindi
            : selectedLanguage === 3
            ? translation[5].Punjabi
            : selectedLanguage === 4
            ? translation[5].Tamil
            : translation[5].Urdu}
        </Text>
      </TouchableOpacity>
      <LanguageModal
        languageModalVisible={languageModalVisible}
        setLanguageModalVisible={setLanguageModalVisible}
        onSelectLanguage={e => {
          setSelectedLanguage(e);
          saveSelectedLanguage(e);
        }}
      />
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
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  btn: {
    backgroundColor: 'purple',
    height: 50,
    width: '90%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  btnText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  selectLangaugeBtn: {
    width: '50%',
    height: 50,
    borderWidth: 0.2,
    borderRadius: 10,
    position: 'absolute',
    alignSelf: 'center',
    bottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});

//make this component available to the app
export default SelectLogin;

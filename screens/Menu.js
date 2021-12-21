/* eslint-disable prettier/prettier */
import React from 'react';
import {
  KeyboardAvoidingView,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Button,
  Dimensions,
  } from 'react-native';
  import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

  const {width, height } = Dimensions.get('screen');




const Menu = ({navigation}) => {


  return (

    <View style={styles.body}>
      <View style={styles.homeTextContainer}>
        <Text style={styles.menuText}>Menu</Text>
      </View>

      <View style={styles.container} behavior="padding">

        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Watchlist')}>
          <Text style={styles.menuTextButton}>Watchlist</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Seenlist')}>
          <Text style={styles.menuTextButton}>Seen List</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Upcoming')}>
          <Text style={styles.menuTextButton}>Upcoming Movies</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Import-Export')}>
          <Text style={styles.menuTextButton}>Import/Export</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Settings')}>
          <Text style={styles.menuTextButton}>Settings</Text>
        </TouchableOpacity>

      </View>

      <View style={styles.footer}>
      <TouchableOpacity style={{  width: 50, height: 50,}} onPress={() => navigation.navigate('SignOut')}>
        <Icon name='account' size={40} color='#6B3A2A' />
        </TouchableOpacity>
        <TouchableOpacity style={{  width: 50, height: 50,}} onPress={() => navigation.navigate('Home')}>
        <Icon name='home-circle' size={40} color='#6B3A2A' />
        </TouchableOpacity>
        <TouchableOpacity style={{  width: 50, height: 50,}} onPress={() => navigation.navigate('Search')}>
        <Icon name='magnify' size={40} color='#6B3A2A' />
        </TouchableOpacity>
      </View> 
    </View>
  );
};

const styles = StyleSheet.create({
  body:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4ECE8'
  },
  header: {
    width: '90%',
  },
  homeTextContainer: {
    flex: 0.1,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding:10,
  },
  menuText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    backgroundColor: 'black',
    width: 90,
    padding: 20,
  },
  container: {
    flex: 0.8,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding:30,
    backgroundColor: 'rgba(107, 58, 42, 0.1)',
    width: '90%',
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    
    elevation: 3,
    
  },
  footerButton: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 5,
    border: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    
    elevation: 3,

  },
  menuTextButton: {
    fontSize: 20,
    color: '#6B3A2A',
    // texthadow: -1px 1px 10px rgba(0, 0, 0, 0.75)
    textShadowColor: 'rgba(0, 0, 0, 0.20)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  
  },
  footer: {
    flex: 0.1,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
  },
  bottombutton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '70%',
  },
});



export default Menu;


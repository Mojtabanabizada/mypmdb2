/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
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
    KeyboardAvoidingViewBase
    } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {importWatchlist, exportWatchlist} from './functions'
const Import_Export = ({navigation}) => {
    const [importData, setImoportData] = useState('');
    const [exportData, setExportData] = useState('');


    const import_ = async ()=>{

        // console.log(friendUser);
        importWatchlist(importData);
        // alert('Imported succe11fully!');
    };
    const export_ = async ()=>{

        // console.log(friendUser);
        exportWatchlist(exportData);
        setExportData('');
        // alert('Imported succe11fully!');
    };


    useEffect(() => {
    }, []);



    return (


        <View style={styles.body}>
            <View style={{flex: 0.9, width: '100%', justifyContent: 'flex-start', alignItems: 'center'}}>
                <View style={styles.homeTextContainer}>
                    <Text style={styles.menuText}>Import</Text>
                </View>
        
                <View style={styles.container} behavior="padding">
                    <Text style={styles.text}>Write the username you want to import watchlist from</Text>
                    <TextInput
                        placeholder="Search"
                        style={styles.searchInput}
                        onChangeText={text => setImoportData(text)}
                        onSubmitEditing={import_}
                        value={importData}
                    />

                    <TouchableOpacity onPress={import_}>
                        <Text style={styles.button}>Import</Text>
                    </TouchableOpacity>

                </View>
                <View style={styles.homeTextContainer}>
                    <Text style={styles.menuText}>Export</Text>
                </View>

                <View style={styles.container} behavior="padding">
        
                    <Text style={styles.text}>Write the username you want to import watchlist from</Text>
                        <TextInput
                            placeholder="Search"
                            style={styles.searchInput}
                            onChangeText={text => setExportData(text)}
                            onSubmitEditing={export_}
                            value={exportData}
                        />

                        <TouchableOpacity onPress={export_}>
                            <Text style={styles.button}>Export</Text>
                        </TouchableOpacity>

                </View>
            </View>    
            <View style={styles.footer}>
                <TouchableOpacity style={{  width: 50, height: 50,}} onPress={() => navigation.navigate('SignOut')}>
                    <Icon name='account' size={40} color='#6B3A2A' />
                </TouchableOpacity>
                <TouchableOpacity style={{  width: 50, height: 50,}} onPress={() => navigation.navigate('Home')}>
                    <Icon name='home-circle' size={40} color='#6B3A2A' />
                </TouchableOpacity>
                <TouchableOpacity style={{  width: 50, height: 50,}} onPress={() => navigation.navigate('Menu')}>
                    <Icon name='menu' size={40} color='#6B3A2A' />
                </TouchableOpacity>
            </View> 
      </View>
        );
    

};

export default Import_Export;


const styles = StyleSheet.create({
    body:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F4ECE8'
    },
    searchInput: {
        backgroundColor: 'white',
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: '#c4c4c4',
        paddingLeft: 10,
        borderRadius: 10,
        fontSize: 14,
        shadowColor: 'black',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,        
        elevation: 27,

      },
    
    homeTextContainer: {
      flex: 0.2,
      width: '90%',
      justifyContent: 'center',
      alignItems: 'flex-start',
      padding:10,
    },
    text:{
        fontSize: 16,
        marginBottom: 20,
        width: '100%',

        borderWidth: 1,
        padding: 10,
        borderColor: '#c4c4c4',
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 10,        
        elevation: 27,
        backgroundColor: '#F4ECE8'  
    },
    menuText: {
      fontSize: 30,
      fontWeight: 'bold',
    },
    button: {
      color: 'white',
      borderWidth: 1,
      padding: 3,
      borderRadius: 3,
      backgroundColor: '#6B3A2A',
      paddingLeft: 15,
      paddingRight: 15,
      marginTop: 15,
      shadowColor: 'black',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.1,
      shadowRadius: 10,        
      elevation: 27,

    },
    container: {
      flex: 0.3,
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
  
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {StyleSheet, ImageBackground, Animated, Text, Dimensions, View, TextInput,  TouchableOpacity, ScrollView, Image, FlatList, Button, StatusBar } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { authentication, db } from '../firebase';
import { collection, getDocs, doc, setDoc, updateDoc } from 'firebase/firestore/lite';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {sairam} from './database';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {addToWatchlist, fetchRecomendation, addToSeenlist, fetchUpcomingMovies} from './functions'
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import {Item} from '../components/data'


export default function Home ({navigation}) {
  const [user, setUser] = useState('Hello World!');
  const [popularMovies, setPopularMovies] = useState({results: []});
  const [loaded, setLoaded] = useState(false);
  const [IMDB_KEY, setIMDB_KEY] = useState('tt6920084');


  const renderItem = ({ item }) => (
    <Item data={item}/>
  );


  const init =  async ()=>{
    const recomendation = await fetchRecomendation();
    setPopularMovies({
      results: recomendation,
    });
  };


  useEffect(() => {

    if (!loaded) {
      init();
      setLoaded(true);
    }
    const auth = getAuth();
    setUser(auth.currentUser.email);
  }, [loaded, IMDB_KEY, user]);

  return (
    <View style={styles.body}>
      <StatusBar backgroundColor={'black'}/>
      <View style={styles.homeTextContainer}>
        <Text style={styles.homeText}>Home</Text>
      </View>
      <View style={styles.flatlistContainer}>
          <FlatList
            data={popularMovies.results}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal={true}
            pagingEnabled={true}
            bounces={false}
            showsHorizontalScrollIndicator={false}
            snapToAlignment={'center'}
          />
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={{  width: 50, height: 50,}} onPress={() => navigation.navigate('SignOut')}>
        <Icon name='account' size={40} color='#6B3A2A' />
        </TouchableOpacity>
        <TouchableOpacity style={{  width: 50, height: 50,}} onPress={() => navigation.navigate('Search')}>
        <Icon name='magnify' size={40} color='#6B3A2A' />
        </TouchableOpacity>
        <TouchableOpacity style={{  width: 50, height: 50,}} onPress={() => navigation.navigate('Menu')}>
        <Icon name='menu' size={40} color='#6B3A2A' />
        </TouchableOpacity>
      </View>
    </View>
  );
  }


  const styles = StyleSheet.create({
    body:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F4ECE8',
      marginTop: 0,
      padding:1,

    },
    header: {
      width: '90%',
      alignItems: 'flex-start',
    },
    searchInput: {
      backgroundColor: 'white',
      width: '100%',
      borderRadius: 10,
      fontSize: 17,
    },
    homeText: {
      color: 'black',

      fontSize: 24,
      fontWeight: 'bold',

    },
    homeTextContainer: {
      flex: 0.05,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      width: '90%',
      height: '10%',
      paddingBottom: 5,
      paddingLeft: 5,

    },
    flatlistContainer:{
    flex: 1.2,
    },
    button: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 30,
      backgroundColor: '#CDCDCD',
      width: 70,
    },
    poster: {
      height: '50%',
      width: '100%',
      borderWidth: 1,
      borderColor: '#C4C4C4',

    },
    resultContainer: {
      flex: 1,
      // flexDirection: 'row',
      justifyContent: 'center',
      borderRadius: 10,
      alignItems: 'flex-start',
      width: '90%',
      backgroundColor: 'rgba(26,26,26,0.9)',
      },
    text:{
      color: 'white',
      paddingLeft: 8,
      paddingRight: 8,
      fontFamily:'FiraSans-Black',
  
    },
    searchText: {
      fontSize: 15,
      marginLeft: 8,
      marginBottom: 15,
    },
    searchTextContainer: {
      flex: 1,
      justifyContent: 'flex-end',

    },
    footer: {
      flex: 0.1,
      width: '90%',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'flex-end',


    },
    footerButton: {
      justifyContent: 'center',
      alignItems: 'center',
      height: '70%',
      backgroundColor: 'red',

    },
    itemBody: {
      flex: 1 ,
      // width: '90%',
      // height: '100%',
      // alignItems: 'center',
      // justifyContent: 'center',
      backgroundColor: 'white',
    },
    titleText: {

      fontSize: 20,
      fontWeight: 'bold',
      color: 'black',
      fontStyle:'italic',
    },
    movieTrailer:{
      backgroundColor: '#212121',
      padding:18,
      borderRadius:40,
      justifyContent:'center',
      alignItems:'center',
      elevation: 10,
      borderWidth:4,

    },
    buttonStyle:{
      flex: 1, 
      flexDirection: 'row',
      width: 50, 
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      boder: 1,
      borderColor: 'black',
      backgroundColor: 'rgba(107, 58, 42, 0.8) ',
      borderRadius: 8,
      margin: 5,
    },
    buttonTextStyle: {
      paddingLeft: 5,
      fontSize: 16,
      color: 'white',
      fontWeight: '600',
    },
    genreContainer: {
      flex: 1, 
      flexDirection: 'row', 
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 2,    
      },
    genre: {
      backgroundColor: 'white',
      fontFamily:'Times New Roman',
      color: 'black',
      height: 23,
      marginRight: 10,
      marginLeft: 5,
      borderRadius: 10,
      paddingLeft: 8,
      paddingRight: 8,
      alignSelf: 'center',
     
    }
  
  });

/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {StyleSheet, ImageBackground, Dimensions, Text, View, TextInput, TouchableOpacity, ScrollView, Image, Button, StatusBar} from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { authentication } from '../firebase';
import axios from 'axios';
import YouTube from 'react-native-youtube';
import {fetchMovieData} from './functions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



export default function Movie ({navigation, route}) {
  const [imageLink, setImageLink] = useState('https://image.tmdb.org/t/p/w500');

  const {data} = route.params;
  const {user, setUser} = useState('');
  const [searched, setSearched] = useState(false);
  const [movieDetails, setMovieDetails] = useState({
    runtime: '',
    genre: [],
  });
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  
  const init =  async ()=>{
    var details= 'https://api.themoviedb.org/3/movie/'+data.id.toString(10)+'?api_key=6c987418485ac7e897b299b7568c7be8&language=en-US';
    // var data;
    await axios.request(details)
    .then(function(response)  {
      setMovieDetails({
        runtime: response.data.runtime,
        genre: response.data.genres,
      });
      // console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
  };


  useEffect(() => {

    if (!searched) {
      console.log(data)
      init();
      setSearched(true);

    }  
    const auth = getAuth();
    // setUser(auth.currentUser.email);
  }, [searched, movieDetails]);




  return (

    <View style={styles.body}>
      <StatusBar backgroundColor={'#6B3A2A'}/>
      <ImageBackground source={{uri: data.poster}}
        source={{uri: imageLink + data.backdrop_path}}
        blurRadius={1}
        style={{
            width: width * 0.9947,
            height: height,
            flex: 0.92,
            justifyContent: 'center',
            alignItems: 'center',
        }}
      >

      <Image style={styles.poster} source={{uri: imageLink + data.poster_path}}/>
      <View style={styles.homeTextContainer}>      
        <Text style={styles.homeText}>{data.title} ({data.release_date.substring(0,4)})</Text>
        <Text style={styles.description}>IMDB Rating: {data.vote_average}</Text>
        <Text style={styles.description}>Plot: {data.overview}</Text>
      </View>
      </ImageBackground>
      <View style={styles.footer}>
      <TouchableOpacity style={{  width: 50, height: 50,}} onPress={() => navigation.navigate('SignOut')}>
        <Icon name='account' size={40} color='#6B3A2A' />
        </TouchableOpacity>
        <TouchableOpacity style={{  width: 50, height: 50,}}onPress={() => navigation.navigate('Home')}>
        <Icon name='home-circle' size={40} color='#6B3A2A' />
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
  },
  header: {
    width: '90%',
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
  },
  homeTextContainer: {
    flex: 1,
    // flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 10,
    alignItems: 'center',
    width: '90%',
    backgroundColor: 'rgba(226, 181, 166, 0.7)',

  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    backgroundColor: '#CDCDCD',
    width: 70,
  },
  poster: {
    height: '60%',
    width: '80%',
    borderWidth: 1,
    borderColor: '#C4C4C4',

  },
  resultContainer: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#C4C4C4',
    padding: 5,
    backgroundColor: 'rgba(107, 58, 42, 0.1)',
    margin: 3,
    borderRadius: 8,

  },
  searchText: {
    fontSize: 15,
    marginLeft: 10,
    marginBottom: 15,
  },
  searchTextContainer: {
    flex: 1,
    justifyContent: 'flex-end',

  },
  description: {

  },
  footer: {
    flex: 0.08,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
    backgroundColor: 'white',
  }

});



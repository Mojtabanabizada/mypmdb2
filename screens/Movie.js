/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {StyleSheet, ImageBackground, FlatList, Dimensions, Text, View, TextInput, TouchableOpacity, ScrollView, Image, Button, StatusBar} from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { authentication } from '../firebase';
import axios from 'axios';
import YouTube from 'react-native-youtube';
import {fetchMovieData} from './functions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {addToWatchlist, fetchRecomendation, addToSeenlist, fetchUpcomingMovies} from './functions';


const Genre = ({data}) => (
  <View style={styles.genreContainer}>
    <Text style={[styles.genre]}>{data.name}</Text>
  </View>
);

export default function Movie ({navigation, route}) {

  const {data} = route.params;
  const {user, setUser} = useState('');
  const [searched, setSearched] = useState(false);
  const [movieDetails, setMovieDetails] = useState({
    title: '',
    rating: '',
    banner: '',
    poster: '',
    description: '',
    imdb_id: '',
    lan: '',
    year: '',
    genre: [],
    popularity: '',
    runtime: '',
    status: '',
    vote_count: '',
});
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  const init =  async ()=>{
    var details = 'https://api.themoviedb.org/3/movie/' + data.id.toString(10) + '?api_key=6c987418485ac7e897b299b7568c7be8&language=en-US';
    var image = 'https://image.tmdb.org/t/p/w500';

    await axios.request(details)
    .then(function(response)  {
      setMovieDetails({
        title: data.title,
        rating: data.vote_average,
        banner: image + data.backdrop_path,
        poster: image + data.poster_path,
        description: data.overview,
        imdb_id: response.data.imdb_id,
        lan: data.original_language,
        year: data.release_date.substring(0,4),
        genre: response.data.genres,
        popularity: data.popularity,
        runtime: response.data.runtime,
        status: response.data.status,
        vote_count: data.vote_count,
      });
    })
    .catch((error) => {
      console.error(error);
    });


  };
  const renderItem = ({ item }) => (
    <Genre data={item}/>
  );


  useEffect(() => {

    if (!searched) {
      init();
      setSearched(true);

    }
    const auth = getAuth();
  }, [searched, movieDetails]);




  return (

    <View style={styles.body}>
      <StatusBar backgroundColor={'black'}/>
      <ImageBackground
        source={{uri: 'test'}}
        source={{uri: movieDetails.banner}}
        blurRadius={1}
        style={{
            width: width * 0.9947,
            height: height,
            flex: 0.92,
            justifyContent: 'center',
            alignItems: 'center',
        }}
      >

      <Image style={styles.poster} source={{uri: 'test'}} source={{uri: movieDetails.poster}}/>
      <View style={styles.titleTextContainer}>
      <ScrollView>

      <Text style={[styles.titleText, styles.text]}>{movieDetails.title} ({movieDetails.year})</Text>

          <Text style={[styles.description, styles.text]}>
            <Icon name="star" size={18} color="#F5C518" />
            {movieDetails.rating + ' | '}
            {Math.floor(movieDetails.runtime / 60) + 'h ' + (movieDetails.runtime % 60) + 'm'}
          </Text>
          <FlatList
            data={movieDetails.genre}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal={true}
          />
          <Text style={[styles.description, styles.text]}>{movieDetails.description}</Text>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end'}}>
              <TouchableOpacity style={styles.buttonStyle} onPress={() => addToWatchlist(movieDetails)}>
                <Icon name="plus" size={25} color="white" />
                <Text style={styles.buttonTextStyle}>Watchlist</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonStyle} onPress={() => addToSeenlist(movieDetails)}>
                <Icon name="plus" size={25} color="white" />
                <Text style={styles.buttonTextStyle}>Seenlist</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
      </View>
      </ImageBackground>
      <View style={styles.footer}>
      <TouchableOpacity style={{  width: 50, height: 50}} onPress={() => navigation.navigate('SignOut')}>
        <Icon name="account" size={40} color="#6B3A2A" />
        </TouchableOpacity>
        <TouchableOpacity style={{  width: 50, height: 50}}onPress={() => navigation.navigate('Home')}>
        <Icon name="home-circle" size={40} color="#6B3A2A" />
        </TouchableOpacity>
        <TouchableOpacity style={{  width: 50, height: 50}} onPress={() => navigation.navigate('Menu')}>
        <Icon name="menu" size={40} color="#6B3A2A" />
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
  titleText: {
    fontSize: 24,
  },
  titleTextContainer: {
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
    // fontFamily:'FiraSans-Black',

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
    backgroundColor: 'rgba(107, 58, 42, 0.5)',
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
    marginRight: 10,
    borderRadius: 10,
    paddingLeft: 8,
    paddingRight: 8,
    fontFamily:'Times New Roman',
    color: 'black',
    fontWeight: '500',
    padding: 2,

    
  }


});



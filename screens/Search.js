/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Image} from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { authentication } from '../firebase';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default function Search ({navigation}) {
  const [imageLink, setImageLink] = useState('https://image.tmdb.org/t/p/w500');
  const APIURL = 'http://www.omdbapi.com/?i=tt3896198&apikey=601a74e1';
  const [searchResult, setSearchResult] = useState([]);


  const [searched, setSearched] = useState('');

  const findMovie = async ()=>{

    // console.log(searched)
    var url = 'https://api.themoviedb.org/3/search/movie?api_key=6c987418485ac7e897b299b7568c7be8&language=en-US&query= '+searched+'&page=1&include_adult=false'
    await axios.request(url)
    .then(function(response)  {
      // console.log(data[0]);
      setSearchResult(response.data.results);
    })
    .catch((error) => {
      console.error(error);
    });
  
  };
  useEffect(() => {
  }, []);

  return (
    <View style={styles.body}>
      <View style={styles.header}>
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          onChangeText={text => setSearched(text)}
          onSubmitEditing={findMovie}
          value={searched}
        />
      </View>
      <View style={styles.homeTextContainer}>
        {/* <Text style={styles.homeText}>{user} </Text> */}
          <ScrollView >
            {searchResult?.map(result => (
            <TouchableOpacity 
              onPress={ () =>
                navigation.navigate('Movie', {
                  data: result} )}
              style={[styles.resultContainer]}
            >

                <Image style={styles.poster} source={{uri: imageLink+ result.poster_path}}/>
                  <View style={styles.searchTextContainer}>
                    <Text style={styles.searchText}>{result.title}  ({result.release_date.substring(0,4)})</Text>
                    <Text>{result.overview}</Text>
                  </View>

            </TouchableOpacity>

          ))}
        </ScrollView>
      </View>
      <View>
        <Text>{searched}</Text>
      </View>

      <View style={styles.footer}> 
      <TouchableOpacity style={{  width: 50, height: 50,}} onPress={() => navigation.navigate('SignOut')}>
        <Icon name='account' size={40} color='#6B3A2A' />
        </TouchableOpacity>
        <TouchableOpacity style={{  width: 50, height: 50,}} onPress={() => navigation.navigate('Home')}>
        <Icon name='home-circle' size={40} color='#6B3A2A' />
        </TouchableOpacity>
        <TouchableOpacity style={{  width: 50, height: 50,}} onPress={() => navigation.navigate('Menu')}>
        <Icon  name='menu' size={40} color='#6B3A2A' />
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
    flexDirection: 'row',
    justifyContent: 'center',
    width: '90%',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 30,
    backgroundColor: '#CDCDCD',
    width: 70,
  },
  poster: {
    height: 100,
    width: 70,
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
    height: 30,
    backgroundColor: '#CDCDCD',
    width: 70,
    color: 'red',
  },



});



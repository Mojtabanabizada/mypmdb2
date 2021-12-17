/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {ImageBackground, Dimensions, Image, TouchableOpacity, View, Text, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { fetchUpcoming, addToSeenlist, addToWatchlist } from './functions';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const Item = ({data}) => (
    
    <View style={{flex: 1}}>
        <ImageBackground 
        source={{uri: data.banner}}
        blurRadius={1}
        style={{
            width: width * 0.9947,
            height: height,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }}>
        <Image
          source={{uri: data.poster}}
          style={{
            width: width,
            height: height / 2,
            resizeMode: 'contain',
            borderRadius: 8,
          }}
      />
        <View style={styles.resultContainer}>
          <Text style={styles.titleText}>{data.title} ({data.year})</Text>
          <Text style={{fontSize: 14.5,fontWeight: 'bold',color: 'black',}}>Rating: {data.rating}</Text>
          <Text style={{fontSize: 12, fontWeight: '600', color: 'black',}}>OVERVIEW : {data.description}</Text>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end',}}>
            <TouchableOpacity style={styles.buttonStyle} onPress={() => addToWatchlist(data)}>
              <Icon name='plus' size={25} color='white' /> 
              <Text style={styles.buttonTextStyle}>Watchlist</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonStyle} onPress={() => addToSeenlist(data)}>
              <Icon name='plus' size={25} color='white' />
              <Text style={styles.buttonTextStyle}>Seenlist</Text>
            </TouchableOpacity>
          </View>
  
        </View>


    </ImageBackground>
    </View>
  );
  
const Upcoming = ({navigation}) => {
    const [loaded, setLoaded] = useState(false);
    const [upcomingMovies, setUpcomingMovies] = useState({results: []});
    const renderItem = ({ item }) => (
        <Item data={item}/>
      );
    
    const init =  async ()=>{
        const movieList = await fetchUpcoming();
        setUpcomingMovies({
          results: movieList,
        });
      };
    
    useEffect(() => {

        if (!loaded) {
          init();
          setLoaded(true);
        }
      }, [loaded]);
    
    return (
    <View style={styles.body}>
        <View style={styles.homeTextContainer}>
            <Text style={styles.homeText}>Upcoming Movies</Text>
        </View>
        <View style={styles.flatlistContainer}>
            <FlatList
            data={upcomingMovies.results}
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
      )
}


export default Upcoming;
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
      flex: 0.1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: '90%',
      height: '10%',
      paddingBottom: 5,
      paddingLeft: 5,

    },
    flatlistContainer:{
      flex: 1.2,
    resizeMode: 'contain',


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
      width: '90%',
      borderWidth: 2,
      borderColor: '#C4C4C4',
      padding: 10,
      backgroundColor: 'rgba(226, 181, 166, 0.7)',
      borderRadius: 8,
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
  });

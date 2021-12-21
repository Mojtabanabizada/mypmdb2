/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  FlatList,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {addToWatchlist, addToSeenlist, removeFromWatchlist, removeFromSeenlist} from '../screens/functions';

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
        <Text style={[styles.titleText, styles.text]}>{data.title} ({data.year})</Text>
        <Text style={[styles.description, styles.text]}>
          <Icon name="star" size={18} color="#F5C518" />
          {data.rating + ' | '}
          {Math.floor(data.runtime / 60) + 'h ' + (data.runtime % 60) + 'm'}
        </Text>
        <ScrollView>
        <View style={{flex: 0.2, flexDirection:'row', height: 30}}>
          <Text style={styles.genre}> {data.genre[0]?.name}</Text>
          <Text style={styles.genre}> {data.genre[1]?.name}</Text>
        </View>
          <Text style={styles.text}> {data.description}</Text>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start',}}>
            <TouchableOpacity style={styles.buttonStyle} onPress={() => addToWatchlist(data)}>
              <Icon name='plus' size={25} color='white' /> 
              <Text style={styles.buttonTextStyle}>Watchlist</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonStyle} onPress={() => addToSeenlist(data)}>
              <Icon name='plus' size={25} color='white' />
              <Text style={styles.buttonTextStyle}>Seenlist</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>  
      </View>
  </ImageBackground>
  </View>

);

const Genre = ({data}) => (
  <View style={{flex: 1}}>
    <Text style={[styles.genre]}>{data.name}</Text>
  </View>
);


const renderGenre = ({ item }) => (
  <Genre data={item}/>
);


const Watch = ({data}) => (

  <View style={styles.itemContainer}>
    <View style={styles.imageContainer}>
        <Image
            source={{uri: data.poster}}
            style={styles.itemImage}
        />
    </View>
    <View style={styles.textContainer}>
      <Text style = {styles.textTitle}>{data.title} </Text>
      <Text style={styles.descText}>
        <Icon name="star" size={18} color="#F5C518" />{data.rating + ' | '}
        {Math.floor(data.runtime / 60) + 'h ' + (data.runtime % 60) + 'm  | '}
        {data.year}
      </Text>
        <FlatList
            data={data.genre}
            renderItem={renderGenre}
            keyExtractor={(item) => item.id}
            horizontal={true}
          />
        <TouchableOpacity style={{justifyContent: 'center',}} onPress={() => removeFromWatchlist(data)}>
          <Text style={styles.removeButton}> <Icon name='minus-circle' size={20} color='#6B3A2A'/> Remove</Text>
        </TouchableOpacity>
        
    </View>
</View>
);

const Seen = ({data}) => (

  <View style={styles.itemContainer}>
    <View style={styles.imageContainer}>
        <Image
            source={{uri: data.poster}}
            style={styles.itemImage}
        />
    </View>
    <View style={styles.textContainer}>
      <Text style = {styles.textTitle}>{data.title} </Text>
      <Text style={styles.descText}>
        <Icon name="star" size={18} color="#F5C518" />{data.rating + ' | '}
        {Math.floor(data.runtime / 60) + 'h ' + (data.runtime % 60) + 'm  | '}
        {data.year}
      </Text>
        <FlatList
            data={data.genre}
            renderItem={renderGenre}
            keyExtractor={(item) => item.id}
            horizontal={true}
          />
        <TouchableOpacity style={{justifyContent: 'center',}} onPress={() => removeFromSeenlist(data)}>
          <Text style={styles.removeButton}> <Icon name='minus-circle' size={20} color='#6B3A2A'/> Remove</Text>
        </TouchableOpacity>
        
    </View>
</View>
);




export {Item, Watch, Seen}

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
    // fontFamily:'FiraSans-Black',

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
    backgroundColor: '#6B3A2A',
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
  itemContainer: {
    flex: 1,
    height: 120,
    flexDirection: 'row',
    // backgroundColor: 'red',
    margin: 2,
    alignItems: 'center',
    border: 3,
    borderColor: 'balck',
    // justifyContent: 'flex-start',
    
  },
  itemImage: {
    width: 100,
    height: 120,
    resizeMode: 'contain',
    borderRadius: 15,
  },
  textTitle: {
    fontSize: 15,
    fontWeight: "900",  
    textShadowColor: 'rgba(0, 0, 0, 0.15)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 20,
    marginTop: 20,
    },
    descText: {
      fontSize: 12,
      fontWeight: "400",  
      textShadowColor: 'rgba(0, 0, 0, 0.20)',
      textShadowOffset: {width: -1, height: 1},
      textShadowRadius: 5,
     },
    


  genreContainer: {
    flex: 1, 
    flexDirection: 'row', 
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,    
    },
  genre: {
    backgroundColor: '#6B3A2A',
    fontFamily:'Times New Roman',
    color: 'white',
    height: 17,
    marginRight: 5,
    marginLeft: 2,
    borderRadius: 10,
    paddingLeft: 8,
    paddingRight: 8,
    alignSelf: 'center',
    fontSize: 11,
  },
  removeButton: {
    width: 90,
    borderWidth:1, 
    borderColor:'rgba(0,0,0,0.2)', 
    borderRadius: 5,
    fontWeight: '500',
    
  }

});

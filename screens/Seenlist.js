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
  FlatList,
  Image,
  } from 'react-native';
  import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
  import {fetchSeenlist} from './functions'

  const {width, height } = Dimensions.get('screen');

  const Item = ({data}) => (

  <View style={styles.itemContainer}>
    <View style={styles.imageContainer}>
        <Image
            source={{uri: data.poster}}
            style={styles.itemImage}
        />
    </View>
    <View style={styles.textContainer}>
        <Text style = {styles.textTitle}>{data.title} ({data.year})</Text>
        <Text style = {styles.descText}>Plot: {data.description}</Text>
    </View>
</View>
);
  


const Seenlist = ({navigation}) => {
  const [seenlist , setSeenList] = useState([]);
  const [loaded, setLoaded] = useState(false);

    const renderItem = ({ item }) => (
        <Item
          data={item}
        />
    )
    const init =  async ()=>{
    const mySeenlist = await fetchSeenlist();
    setSeenList(mySeenlist);
  
    };
  

    useEffect(() => {

      if (!loaded) {

      init();
      setLoaded(true);
      }
  
    }, [loaded, seenlist]);
  
  return (

    <View style={styles.body}>
      <View style={styles.homeTextContainer}>
        <Text style={styles.menuText}>Watchlist</Text>
      </View>

      <View style={styles.container} >
      <FlatList
          data={seenlist}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal={false}
          pagingEnabled
          bounces={false}
          showsHorizontalScrollIndicator={false}
        />


      </View>

      <View style={styles.footer}>
      <TouchableOpacity style={{  width: 50, height: 50,}} onPress={() => navigation.navigate('SignOut')}>
        <Icon name='account' size={40} color='#000' />
        </TouchableOpacity>
        <TouchableOpacity style={{  width: 50, height: 50,}}onPress={() => navigation.navigate('Home')}>
        <Icon name='home-circle' size={40} color='#000' />
        </TouchableOpacity>
        <TouchableOpacity style={{  width: 50, height: 50,}} onPress={() => navigation.navigate('Menu')}>
        <Icon name='menu' size={40} color='#000' />
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
  imageContainer:{
    borderRadius: 15,

  },
  textContainer: {
    
  },
  itemImage: {
    width: 100,
    height: 120,
    resizeMode: 'contain',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,    
    elevation: 3,

  },
  textTitle: {
  fontSize: 12,
  fontWeight: "900",  
  textShadowColor: 'rgba(0, 0, 0, 0.20)',
  textShadowOffset: {width: -1, height: 1},
  textShadowRadius: 20,
  },
  starsText: {
  fontSize: 12,
  fontWeight: "700",  
  textShadowColor: 'rgba(0, 0, 0, 0.20)',
  textShadowOffset: {width: -1, height: 1},
  textShadowRadius: 15,
  },
  descText: {
  fontSize: 12,
  fontWeight: "400",  
  textShadowColor: 'rgba(0, 0, 0, 0.20)',
  textShadowOffset: {width: -1, height: 1},
  textShadowRadius: 5,
 },

});



export default Seenlist;


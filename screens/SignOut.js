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
  NetInfo,
  } from 'react-native';
import { authentication } from '../firebase';
import { signOut,  getAuth, onAuthStateChanged } from 'firebase/auth';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// import {useNavigation} from '@react-navigation/core'




const SignOut = ({navigation}) => {
  const [email, setEmail] =  useState('Hello');
  const [password, setPassword] =  useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState('Hello');

  const signOutUser = async ()=>{
    // await signOut(authentication)
    // .then((result)=>{
    //     setIsSignedIn(false);
    //     navigation.navigate('Login');
    // })
    // .catch((result)=>{
    //     console.log(result);
    // });
    // NetInfo.isConnected.fetch();
    const connction = await NetInfo.isConnected.fetch()
    .then(isConnected => {
      alert(isConnected);
    })
    console.log(connction);
  };

  useEffect(() => {
    const auth = getAuth();
    setCurrentUser(auth.currentUser.email);
  }, []);
  // eslint-disable-next-line no-undef
  // const { title, year } = route.params;



  return (

    <View style={styles.container} behavior="padding">
       <View style={styles.titleContainer}>
         <Text style={styles.signUpText}>Sign out from</Text>
         <Text style={styles.myPMDbUpText}>My PMDb</Text>
         {/* <Text>itemId: {JSON.stringify(currentUser)}</Text> */}
          {/* <Text>otherParam: {JSON.stringify(year)}</Text> */}

       </View>
       <View>
           <Text>current user: {currentUser}</Text>
       </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={signOutUser}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
        <TouchableOpacity style={{  width: 50, height: 50,}} onPress={() => navigation.navigate('Search')}>
        <Icon name='magnify' size={40} color='#6B3A2A' />
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

export default SignOut;

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor: '#F4ECE8',
  },
  test: {
    width: '20%',
    height: 20,
    backgroundColor: 'red',
  },
  titleContainer: {
    alignItems: 'flex-start',
    width: '80%',
    marginTop: 60,
  },
  welcomeText: {
    fontSize: 19,
    fontWeight: '400',
    fontFamily: 'Poppins',
    color: 'black',
    marginBottom: 30,

  },
  signUpText: {
    fontSize: 25,
    fontWeight: '900',
    fontFamily: 'Poppins',
    color: 'black',
    marginBottom: 30,
  },
  myPMDbUpText:{
    color: 'black',
    fontSize: 36,
    fontWeight: '900',
    fontFamily: 'Poppins',
    marginBottom: 50,
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 6,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#6B3A2A',
    width: '100%',
    padding: 15,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,

  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  registerContainer:{
    marginTop: 10,
    flex: 1,
    flexDirection: 'row',
  },
  registerMatter: {
    color: '#7D7D7D',
    fontSize: 12,
    fontWeight: '300',

  },
  register: {
    color: '#000000',
    fontSize: 12,
    fontWeight: '700',
  },
  footer: {
    flex: 1,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
  }

});

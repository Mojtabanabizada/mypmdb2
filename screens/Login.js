/* eslint-disable no-alert */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import { useNavigation } from '@react-navigation/core';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Alert,
  } from 'react-native';
import { authentication } from '../firebase';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

// import {useNavigation} from '@react-navigation/core'




const Login = ({navigation}) => {
  const [email, setEmail] =  useState('');
  const [password, setPassword] =  useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  // const navigation = useNavigation();

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(user => {
  //     if (user) {
  //       navigation.navigate('Home');
  //     }
  //   });
  //   return unsubscribe;
  // });

  const LoginUser = async ()=>{
    await signInWithEmailAndPassword(authentication, email, password)
    .then((result)=>{
      const user = result.user;
      navigation.navigate('Home', {email, isSignedIn});

      setIsSignedIn(true);
    })
    .catch((result)=>{
      switch (result.code) {
        case 'auth/invalid-email':
          alert('Invalid Username. Please try again!');
          break;
        case 'auth/wrong-password':
          alert('Invalid Password. Please try again!');
          break;
        case 'auth/user-not-found':
          alert('Invalid Username. Please try again!');
          break;
        default:
          alert(result.code);
          break;
      }
    });
  };


  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.welcomeText}>Welcome !!!</Text>
        <Text style={styles.signUpText}>Sign In to</Text>
        <Text style={styles.myPMDbUpText}>My PMDb</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputText}>User name</Text>
        <TextInput
          placeholder="Enter your user name"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <Text style={styles.inputText}>Password</Text>
        <TextInput
          placeholder="Enter your Password"
          value={ password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        <View style={styles.checkboxContainer}>
          {/* <Text style={styles.label}>Do you like React Native?</Text> */}
        </View>
       </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={LoginUser}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.registerContainer}>
          <Text style={styles.registerMatter}>don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.register}>Register</Text>
          </TouchableOpacity>
        </View>

    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F4ECE8',
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
});

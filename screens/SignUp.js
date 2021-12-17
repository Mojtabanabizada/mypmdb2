/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView} from 'react-native';
import { authentication } from '../firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = ({navigation}) => {
  const [email, setEmail] =  useState('');
  const [password, setPassword] =  useState('');
  const [confirmPassword, setConfirmPassword] =  useState('');

  const [isSignedIn, setIsSignedIn] = useState(false);
  function navigate(){
    console.log(authentication);
  }

  const RegisterUser = ()=>{
    if(password != confirmPassword){
      alert('Pasword is not match with the confirm! ');
    }
    else{
      createUserWithEmailAndPassword(authentication, email, password)
      .then((result)=>{
        navigation.navigate('Home');
        setIsSignedIn(true);
      })
      .catch((result)=>{
        switch (result.code) {
          case 'auth/email-already-in-use':
            alert('The email address is already in use!');
            break;
          case 'auth/weak-password':
            alert('Password must be at least 6 letters! ');
            break;
          case 'auth/invalid-email':
            alert('Username must be en email adress!');
            break;
          default:
            alert(result);
            break;
        }
      })
    }
  }
  return (
    
    <KeyboardAvoidingView style={styles.container} behavior="padding">
       <View style={styles.titleContainer}>
         <Text style={styles.signUpText}>Sign up to</Text>
         <Text style={styles.myPMDbUpText}>My PMDb</Text>
       </View>
       <View style={styles.inputContainer}>
           <Text style={styles.headerText}>Email</Text>
         <TextInput
          placeholder="Enter your email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
         />
        <Text style={styles.headerText}>New Password</Text>
        <TextInput
          placeholder="Enter your New Password"
          value={ password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
         />
        <Text style={styles.headerText}>Confirm New Password</Text>
        <TextInput
          placeholder="Confirm New Password"
          value={ confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
          style={styles.input}
          secureTextEntry
         />


       </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={RegisterUser}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>      
    </KeyboardAvoidingView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F4ECE8',
  },
  titleContainer: {
    alignItems: 'flex-start',
    width: '80%',
    marginTop: 60,
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
  headerText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Poppins',
    marginTop: 30,
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

});

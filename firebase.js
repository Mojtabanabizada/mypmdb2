/* eslint-disable prettier/prettier */
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: 'AIzaSyCOOH1qwk-kJFhM-MF6steZ-fR-ZBVYLZ8',
  authDomain: 'my-pmdb.firebaseapp.com',
  projectId: 'my-pmdb',
  storageBucket: 'my-pmdb.appspot.com',
  messagingSenderId: '179860853336',
  appId: '1:179860853336:web:6cc98aca9a8591b69ef02d',
};

const app = initializeApp(firebaseConfig);

export const authentication = getAuth(app);
export const db = getFirestore(app);

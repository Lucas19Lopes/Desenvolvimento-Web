import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBshhDEmW_MAhFxFuSBCpA-O3KwgaeLZco",
  authDomain: "barbearia-e969a.firebaseapp.com",
  projectId: "barbearia-e969a",
  storageBucket: "barbearia-e969a.appspot.com",
  messagingSenderId: "146881854073",
  appId: "1:146881854073:web:1e4fc5b456700f227772a8",
  measurementId: "G-MNTMESB5WG"
};


firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export default firebase;

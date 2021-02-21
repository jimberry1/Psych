import firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyAg3F-mJFhWb11EQBsP8kftKDzGAlW6gMo',
  authDomain: 'psych2.firebaseapp.com',
  projectId: 'psych2',
  storageBucket: 'psych2.appspot.com',
  messagingSenderId: '144426654499',
  appId: '1:144426654499:web:628b25489a670a26a74a96',
  measurementId: 'G-8M0FJD320X',
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebaseApp.storage();

export { auth, firebaseApp, storage };
export default db;

import firebase from 'firebase/app'
import 'firebase/firebase-auth'
import 'firebase/firebase-firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAXLkG26gFRqNtmiMUaEMgLzGEYZY5bHF4',
  authDomain: 'roomie-market-v2.firebaseapp.com',
  databaseURL: 'https://roomie-market-v2.firebaseio.com',
  projectId: 'roomie-market-v2',
  storageBucket: 'roomie-market-v2.appspot.com',
  messagingSenderId: '556698080231',
  appId: '1:556698080231:web:cc2592471aa0d21300a342',
  measurementId: 'G-5DPBZDFSTV',
}

export default ({ store }) => {
  firebase.initializeApp(firebaseConfig)
  store.dispatch('auth/init')
}

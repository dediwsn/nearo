import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const prodConfig = {
  apiKey: "AIzaSyAshRmJgF-p3IesZfmeLzhB-n705ePUAFA",
  authDomain: "nearo.co",
  databaseURL: "https://locally-57510.firebaseio.com",
  projectId: "locally-57510",
  storageBucket: "locally-57510.appspot.com",
  messagingSenderId: "225376231981"
}

const devConfig = {
  apiKey: "AIzaSyAshRmJgF-p3IesZfmeLzhB-n705ePUAFA",
  authDomain: "nearo.co",
  databaseURL: "https://locally-57510.firebaseio.com",
  projectId: "locally-57510",
  storageBucket: "locally-57510.appspot.com",
  messagingSenderId: "225376231981"
}

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

const auth = firebase.auth()
const db = firebase.firestore()
db.settings({timestampsInSnapshots: true})

export { auth, db }

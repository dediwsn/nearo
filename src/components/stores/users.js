import { observable, when } from "mobx"
import { auth, db } from '../commons/firebase/firebase'
import firebase from 'firebase/app'
import {
  fetchUserInfo,
  storeUserInfo,
  removeUserInfo
} from '../commons/dbfunctions'

const initUser = {username: '', password: '', name: '', email: ''}

class UsersStore {
    @observable currentUser = initUser
    @observable statusVerified = false
    @observable signedIn = false

    constructor() {
      auth.onAuthStateChanged(user => {
        if (user) {
          this.loadUser(user)
        } else {
          this.statusVerified = true
          removeUserInfo('user-info')
        }
      })

      when(
        () => this.isStatusVerified() && !this.isSignedIn() && window.googleyolo,
        () => {
          const hintPromise = window.googleyolo.hint({
            supportedAuthMethods: [
              "https://accounts.google.com"
            ],
            supportedIdTokenProviders: [
              {
                uri: "https://accounts.google.com",
                clientId: "225376231981-m0a8otu93ha2btftd05vku6kob7nidr4"
              }
            ]
          });

          hintPromise.then(credential => {
            const key = firebase.auth.GoogleAuthProvider.credential(credential.idToken);
            auth.signInAndRetrieveDataWithCredential(key).catch(function(error) {
              console.error(error)
            });
          })
        }
      )
    }

    loadUser (user) {
      fetchUserInfo('user-info')
      .then(userInfo => {
        if (userInfo && userInfo.email === user.email) {
          this.currentUser = userInfo
          this.signedIn = true
          this.statusVerified = true
        } else {
          // Fallback
          this.fetchUserInfoFromDB(user)
        }
      })
    }

    fetchUserInfoFromDB (user) {
      const email = user.email ? user.email : user.providerData[0].email
      const userRef = db.collection('users').doc(email)
      userRef.get()
      .then(userInfo => {
        if(userInfo.exists) {
          this.currentUser = userInfo.data()
          storeUserInfo('user-info', JSON.parse(JSON.stringify(this.currentUser)))
          this.signedIn = true
        } else {
          removeUserInfo('user-info')
        }
        this.statusVerified = true
      })
      .catch(error => {
        console.log('Unable to complete operation', error)
      })
    }

    isStatusVerified = () => this.statusVerified

    isSignedIn = () => this.signedIn

    doSignOut = () => {
      auth.signOut()
      this.setCurrentUser(initUser)
      this.signedIn = false
      removeUserInfo('user-info')
    }

    setCurrentUser(user) {
      this.currentUser = user
    }
}

export const usersStore = new UsersStore()

import * as firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
// Your web app's Firebase configuration
var config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

class Firebase {
  constructor() {
    // Initialize Firebase
    firebase.initializeApp(config);
    this.auth = firebase.auth();
    this.db = firebase.database();
    this.storage = firebase.storage();
    this.firestore = firebase.firestore();
  }

  async login(email, password) {
    try {
      const res = await this.auth.signInWithEmailAndPassword(email, password);
      const resUserData = await this.firestore
        .collection("users")
        .doc(res.user.uid)
        .get();

      const user = {
        uid: res.user.uid,
        data: resUserData.data(),
      };
      if (user.data.disabled) {
        return {
          success: false,
          user: null,
          message: "This account is banned",
        };
      } else {
        return {
          success: true,
          user,
          message: "",
        };
      }
    } catch (error) {
      return {
        success: false,
        user: null,
        message: "Email or password is incorrect!",
      };
    }
  }

  logout() {
    return this.auth.signOut();
  }

  async loginWithCustomToken(token) {
    try {
      const res = await this.auth.signInWithCustomToken(token);
      const uIdToken = await res.user.getIdToken();
      return uIdToken;
    } catch (error) {
      console.log(error);
    }
  }

  async register(name, email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    return this.auth.currentUser.updateProfile({
      displayName: name,
    });
  }

  async updateUserData(user) {
    const userRef = this.firestore.collection("users").doc(user.uid);
    try {
      await userRef.update({
        name: user.data.name,
        level: user.data.level.level_id,
        access: user.data.access,
        disabled: user.data.disabled,
      });
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  }
}

export default Firebase;

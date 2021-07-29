import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from "./config";

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}
export const auth = firebase.auth();
export const sessionPersistance = firebase.auth.Auth.Persistence.SESSION;
export type UserCredential = firebase.auth.UserCredential;

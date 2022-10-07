import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDMpx8Snw66URy8b0S4rQK2VGjUSGrSD8M",
  authDomain: "animal-matching-1fb37.firebaseapp.com",
  projectId: "animal-matching-1fb37",
  storageBucket: "animal-matching-1fb37.appspot.com",
  messagingSenderId: "643416909794",
  appId: "1:643416909794:web:51dad0d60922907286ce3bbb"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const storage = getStorage(app)

export {
  db,
  storage
}
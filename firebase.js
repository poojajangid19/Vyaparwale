// import { initializeApp } from 'firebase/app';
// import {
//   initializeAuth,
//   getReactNativePersistence
// } from 'firebase/auth';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { getFirestore } from 'firebase/firestore';

// export const webClientId = "663467097294-m6pg94f5l3600rr4tcbo57eujbfaeps9.apps.googleusercontent.com";

// const firebaseConfig = {
//   apiKey: "AIzaSyBdAOTUzPBiJZnrJ6K0z0qOCy7SceN5GCY",
//   authDomain: "apnavayapaayar.firebaseapp.com",
//   projectId: "apnavayapaayar",
//   storageBucket: "apnavayapaayar.firebasestorage.app",
//   messagingSenderId: "663467097294",
//   appId: "1:663467097294:web:b8ad1bb95cd5b0f30ae49f"
// };

// // Initialize Firebase App
// const app = initializeApp(firebaseConfig);

// // ✅ Enable persistent auth
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(AsyncStorage),
// });

// // Firestore
// const db = getFirestore(app);

// export { auth, db };

// firebase.js
import { initializeApp } from 'firebase/app';
import {
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

export const webClientId = "663467097294-m6pg94f5l3600rr4tcbo57eujbfaeps9.apps.googleusercontent.com";

const firebaseConfig = {
  apiKey: "AIzaSyBdAOTUzPBiJZnrJ6K0z0qOCy7SceN5GCY",
  authDomain: "apnavayapaayar.firebaseapp.com",
  projectId: "apnavayapaayar",
  storageBucket: "apnavayapaayar.appspot.com",
  messagingSenderId: "663467097294",
  appId: "1:663467097294:web:b8ad1bb95cd5b0f30ae49f"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

export { auth, db };

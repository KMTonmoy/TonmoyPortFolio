 
import { initializeApp, FirebaseApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBBI178X93I6b3FlcnjK2uTb4Pq41B7fO8",
  authDomain: "tonmoy-pro-d9503.firebaseapp.com",
  projectId: "tonmoy-pro-d9503",
  storageBucket: "tonmoy-pro-d9503.firebasestorage.app",
  messagingSenderId: "566338930845",
  appId: "1:566338930845:web:dcb70fa2babc11a70f6c74",
};

export const app: FirebaseApp = initializeApp(firebaseConfig);
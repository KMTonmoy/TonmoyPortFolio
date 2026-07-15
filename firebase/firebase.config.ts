 
import { initializeApp, FirebaseApp } from "firebase/app";
import { getAnalytics, Analytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUgMg7U-MnUaKJI7E8v5Auu6wmKlJzoDk",
  authDomain: "tonmoypro-414a7.firebaseapp.com",
  projectId: "tonmoypro-414a7",
  storageBucket: "tonmoypro-414a7.firebasestorage.app",
  messagingSenderId: "593165175859",
  appId: "1:593165175859:web:b6658e05fe5763d776a746",
  measurementId: "G-3LV2KBGV72"
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);

// Initialize Analytics (only on client side)
let analytics: Analytics | undefined;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { app, analytics };
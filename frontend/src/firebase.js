// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDfVeXMeVoQU2W-q0OI9dElTCsGpv5FarI",
  authDomain: "aispotr.firebaseapp.com",
  projectId: "aispotr",
  storageBucket: "aispotr.appspot.com",
  messagingSenderId: "340303799005",
  appId: "1:340303799005:web:54e2f9372cc3f3b11a7134",
  measurementId: "G-GNELVHB242",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };

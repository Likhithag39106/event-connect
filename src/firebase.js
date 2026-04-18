import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
 apiKey: "AIzaSyBaglGoOB2ETLXDQdsex3tNPAJfHqMWEJs",
  authDomain: "event-connect-ed8ca.firebaseapp.com",
  projectId: "event-connect-ed8ca",
  storageBucket: "event-connect-ed8ca.firebasestorage.app",
  messagingSenderId: "745902111618",
  appId: "1:745902111618:web:9609735e3e137f72a5ad9b",
  measurementId: "G-EG12BMP9FQ"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
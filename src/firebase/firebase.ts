
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCcsxLEWB9UDg9ZBFa6o1okVikAJraCLnw",
  authDomain: "segurarse-3853d.firebaseapp.com",
  projectId: "segurarse-3853d",
  storageBucket: "segurarse-3853d.appspot.com",
  messagingSenderId: "615948798673",
  appId: "1:615948798673:web:a99b8ea6ca5716451b13f0"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

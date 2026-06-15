import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// GANTI BAGIAN INI DENGAN KODE DARI FIREBASE CONSOLE ANDA!
const firebaseConfig = {
  apiKey: "AIzaSy...", 
  authDomain: "bangjek-app-9c727.firebaseapp.com",
  projectId: "bangjek-app-9c727",
  storageBucket: "bangjek-app-9c727.firebasestorage.app",
  messagingSenderId: "...",
  appId: "..."
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Ekspor Database (Firestore) agar bisa dipakai di file lain
export const db = getFirestore(app);
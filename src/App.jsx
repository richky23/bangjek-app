import React, { useState } from 'react';
// 1. Import fungsi dari Firebase
import { collection, addDoc } from "firebase/firestore"; 
import { db } from './firebase'; // Import file firebase yang baru kita buat

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [userData, setUserData] = useState({
    name: 'Suhendri',
    balance: 1250000,
    poin: 450,
    location: 'Jl. Jend. Sudirman, Jakarta'
  });

  // 2. Fungsi untuk mengirim data ke Firebase
  const simpanDataKeFirebase = async () => {
    try {
      // Menyimpan data ke dalam tabel (collection) bernama "users"
      const docRef = await addDoc(collection(db, "users"), userData);
      alert("Berhasil! Data tersimpan dengan ID: " + docRef.id);
    } catch (error) {
      console.error("Error menambahkan dokumen: ", error);
      alert("Gagal menyimpan data. Cek console log.");
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <h1 className="text-2xl font-bold text-green-600 mb-2">Halo, {userData.name}!</h1>
            <p className="text-gray-600 mb-6">Kerangka Home Screen Bangjek berhasil dibuat.</p>
            
            {/* 3. Tombol untuk memicu fungsi simpan */}
            <button 
              onClick={simpanDataKeFirebase}
              className="bg-green-600 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-green-700 active:scale-95 transition-transform"
            >
              Simpan Profil ke Firebase
            </button>
          </div>
        );
      case 'order_bike':
        return <div>Layar Order Motor (Akan dibuat nanti)</div>;
      default:
        return <div>Layar tidak ditemukan</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center font-sans">
      <div className="w-full max-w-md h-[100dvh] bg-white relative overflow-x-hidden overflow-y-auto shadow-2xl sm:h-[90vh] sm:rounded-3xl sm:border-[8px] sm:border-gray-900">
        {renderScreen()}
      </div>
    </div>
  );
}
import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, onSnapshot, updateDoc, arrayUnion } from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { Bike, Car, Utensils, Wallet, MessageSquare, MapPin, Send, User } from 'lucide-react';

// ==========================================
// PENTING: GANTI DENGAN KODE FIREBASE CONFIG ANDA SENDIRI
// ==========================================
const firebaseConfig = {
  apiKey: "AIzaSyBP5Akc2pFVVbA3qnuT_acZEC9Hc-valM8",
  authDomain: "bangjek-app-pro.firebaseapp.com",
  projectId: "bangjek-app-pro",
  storageBucket: "bangjek-app-pro.firebasestorage.app",
  messagingSenderId: "774157577251",
  appId: "1:774157577251:web:9cb8722faa0f805077d596"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export default function App() {
  const [user, setUser] = useState(null);
  const [saldo, setSaldo] = useState(50000);
  const [poin, setPoin] = useState(0);
  const [layanan, setLayanan] = useState('');
  const [lokasi, setLokasi] = useState('');
  const [statusOrder, setStatusOrder] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [chats, setChats] = useState([]);

  // 1. Autentikasi Anonim Otomatis & Sinkronisasi Real-time
  useEffect(() => {
    signInAnonymously(auth)
      .then((cred) => {
        const userId = cred.user.uid;
        setUser(userId);
        
        // Buat atau sinkronisasi dokumen pengguna di Firestore
        const userRef = doc(db, "users", userId);
        setDoc(userRef, { id: userId }, { merge: true });

        // Dengarkan perubahan data (Real-time Listener)
        const unsubscribe = onSnapshot(userRef, (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.data();
            if (data.saldo !== undefined) setSaldo(data.saldo);
            if (data.poin !== undefined) setPoin(data.poin);
            if (data.chats !== undefined) setChats(data.chats);
            if (data.statusOrder !== undefined) setStatusOrder(data.statusOrder);
          }
        });
        return () => unsubscribe();
      })
      .catch((err) => console.error("Firebase Auth Error:", err));
  }, []);

  // 2. Sistem Order & Perhitungan Monetisasi Admin (Komisi 15%)
  const handleOrder = async (jenisLayanan, tarifDasar) => {
    if (!user) return;
    if (saldo < tarifDasar) {
      alert("Saldo tidak mencukupi! Silakan top up.");
      return;
    }

    setLayanan(jenisLayanan);
    setStatusOrder('Mencari Driver...');
    
    const userRef = doc(db, "users", user);
    
    // Simulasi Driver Menemukan Penumpang setelah 3 detik
    setTimeout(async () => {
      setStatusOrder('Driver Menuju Lokasi Anda');
      
      // Simulasi Perjalanan Selesai setelah 6 detik
      setTimeout(async () => {
        const potonganSaldo = tarifDasar;
        const komisiAdmin = potonganSaldo * 0.15; // Komisi Admin 15%
        const poinDidapat = Math.floor(potonganSaldo / 1000); // Sistem Poin Loyalitas

        await updateDoc(userRef, {
          saldo: saldo - potonganSaldo,
          poin: poin + poinDidapat,
          statusOrder: 'Selesai'
        });

        alert(`Hore! Perjalanan selesai.\nTarif: Rp ${potonganSaldo.toLocaleString()}\nKomisi masuk ke kas Admin: Rp ${komisiAdmin.toLocaleString()}\nAnda mendapat: +${poinDidapat} Poin!`);
        setLayanan('');
      }, 6000);
    }, 3000);
  };

  // 3. Fitur Real-time Chat dengan Driver
  const sendChatMessage = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || !user) return;

    const userRef = doc(db, "users", user);
    const pesanBaru = {
      sender: 'Anda',
      text: chatInput,
      timestamp: new Date().toLocaleTimeString()
    };

    await updateDoc(userRef, {
      chats: arrayUnion(pesanBaru)
    });

    setChatInput('');

    // Simulasi balasan otomatis dari Driver setelah 2 detik
    setTimeout(async () => {
      const balasanDriver = {
        sender: 'Driver',
        text: 'Siap kak, mohon ditunggu sesuai titik jemput ya! 👍',
        timestamp: new Date().toLocaleTimeString()
      };
      await updateDoc(userRef, {
        chats: arrayUnion(balasanDriver)
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center p-4">
      {/* Container Ponsel Simulator */}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border-8 border-slate-800 relative flex flex-col h-[800px]">
        
        {/* Status Bar Atas */}
        <div className="bg-slate-900 text-white px-6 py-3 flex justify-between items-center text-xs font-semibold">
          <span>Bangjek Mobile</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            <span>Cloud Connected</span>
          </div>
        </div>

        {/* Info Wallet & Profile */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-500 p-6 text-white rounded-b-2xl shadow-md">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <User size={20} className="opacity-80" />
              <span className="text-sm font-medium tracking-wide">ID: {user ? user.substring(0, 6) : 'Memuat...'}...</span>
            </div>
            <div className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">PRO LEVEL</div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 p-3 rounded-xl border border-white/10">
              <div className="flex items-center gap-2 text-xs opacity-90 mb-1">
                <Wallet size={14} /> <span>Kantong Saldo</span>
              </div>
              <p className="text-xl font-bold">Rp {saldo.toLocaleString()}</p>
            </div>
            <div className="bg-white/10 p-3 rounded-xl border border-white/10">
              <div className="text-xs opacity-90 mb-1">⭐ Poin Loyalitas</div>
              <p className="text-xl font-bold">{poin} Poin</p>
            </div>
          </div>
        </div>

        {/* Layanan & Peta (Main Content) */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          
          {/* Peta Integrasi OpenStreetMap */}
          <div className="rounded-2xl overflow-hidden shadow-inner border border-slate-200 h-40 bg-slate-200 relative">
            <iframe 
              title="peta"
              className="w-full h-full border-0 grayscale-[20%] contrast-[110%]" 
              src="https://maps.google.com/maps?q=jakarta&t=&z=13&ie=UTF8&iwloc=&output=embed"
            />
            <div className="absolute top-3 left-3 bg-white px-3 py-1.5 rounded-xl shadow-md text-xs font-bold flex items-center gap-1.5 text-slate-700">
              <MapPin size={12} className="text-red-500" /> Live Tracker Map
            </div>
          </div>

          {/* Form Input Lokasi */}
          {!statusOrder && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Lokasi Tujuan Anda</label>
              <input 
                type="text" 
                placeholder="Mau pergi ke mana hari ini?" 
                value={lokasi}
                onChange={(e) => setLokasi(e.target.value)}
                className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition-all font-medium"
              />
            </div>
          )}

          {/* Grid Menu Utama */}
          {!statusOrder && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pilih Armada Bangjek</h3>
              <div className="grid grid-cols-3 gap-3">
                <button 
                  disabled={!lokasi}
                  onClick={() => handleOrder('BangRide', 12000)}
                  className={`p-4 rounded-2xl flex flex-col items-center justify-center gap-2 border transition-all ${lokasi ? 'bg-green-50 border-green-200 hover:scale-105 active:scale-95 text-green-700' : 'bg-slate-50 text-slate-400 border-slate-100 cursor-not-allowed'}`}
                >
                  <Bike size={28} />
                  <span className="text-xs font-bold">BangRide</span>
                  <span className="text-[10px] bg-green-200 text-green-800 px-1.5 py-0.5 rounded-md font-semibold">12K</span>
                </button>

                <button 
                  disabled={!lokasi}
                  onClick={() => handleOrder('BangCar', 25000)}
                  className={`p-4 rounded-2xl flex flex-col items-center justify-center gap-2 border transition-all ${lokasi ? 'bg-blue-50 border-blue-200 hover:scale-105 active:scale-95 text-blue-700' : 'bg-slate-50 text-slate-400 border-slate-100 cursor-not-allowed'}`}
                >
                  <Car size={28} />
                  <span className="text-xs font-bold">BangCar</span>
                  <span className="text-[10px] bg-blue-200 text-blue-800 px-1.5 py-0.5 rounded-md font-semibold">25K</span>
                </button>

                <button 
                  disabled={!lokasi}
                  onClick={() => handleOrder('BangFood', 15000)}
                  className={`p-4 rounded-2xl flex flex-col items-center justify-center gap-2 border transition-all ${lokasi ? 'bg-orange-50 border-orange-200 hover:scale-105 active:scale-95 text-orange-700' : 'bg-slate-50 text-slate-400 border-slate-100 cursor-not-allowed'}`}
                >
                  <Utensils size={28} />
                  <span className="text-xs font-bold">BangFood</span>
                  <span className="text-[10px] bg-orange-200 text-orange-800 px-1.5 py-0.5 rounded-md font-semibold">15K</span>
                </button>
              </div>
            </div>
          )}

          {/* Sistem Status Order Real-time & Fitur Chat */}
          {statusOrder && (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-4 shadow-sm animate-fade-in">
              <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">Layanan Aktif ({layanan})</p>
                  <p className="text-sm font-extrabold text-slate-700 animate-pulse">{statusOrder}</p>
                </div>
                {statusOrder === 'Selesai' && (
                  <button onClick={() => { setStatusOrder(''); setLokasi(''); }} className="text-xs font-bold text-green-600 bg-green-100 px-3 py-1.5 rounded-xl hover:bg-green-200 transition-all">Pesan Lagi</button>
                )}
              </div>

              {/* Tampilan Riwayat Chat */}
              <div className="space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                  <MessageSquare size={14} /> Hubungi Driver Anda
                </div>
                <div className="h-40 overflow-y-auto bg-white border border-slate-100 rounded-xl p-3 space-y-2 text-xs flex flex-col shadow-inner">
                  {chats.length === 0 ? (
                    <p className="text-slate-400 text-center my-auto italic">Belum ada obrolan dengan driver.</p>
                  ) : (
                    chats.map((c, idx) => (
                      <div key={idx} className={`p-2 rounded-xl max-w-[80%] ${c.sender === 'Anda' ? 'bg-green-500 text-white self-end rounded-tr-none' : 'bg-slate-200 text-slate-800 self-start rounded-tl-none'}`}>
                        <p className="font-bold text-[10px] mb-0.5 opacity-75">{c.sender}</p>
                        <p className="font-medium break-all">{c.text}</p>
                        <span className="text-[8px] block text-right mt-1 opacity-60">{c.timestamp}</span>
                      </div>
                    ))
                  )}
                </div>

                {/* Input Kirim Chat */}
                {statusOrder !== 'Selesai' && (
                  <form onSubmit={sendChatMessage} className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Ketik pesan untuk driver..." 
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      className="flex-1 px-4 py-2.5 border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-green-500 font-medium"
                    />
                    <button type="submit" className="bg-green-600 text-white p-2.5 rounded-xl hover:bg-green-700 transition-all active:scale-95"><Send size={14} /></button>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
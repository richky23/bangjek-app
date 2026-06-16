import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, onSnapshot, updateDoc, arrayUnion } from 'firebase/firestore';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { 
  Search, User, MapPin, ChevronDown, Wallet, QrCode, 
  PlusCircle, MoreHorizontal, Bike, Utensils, Box, 
  ShoppingBag, Car, Ticket, Newspaper, Home, 
  Percent, Clock, MessageCircle, Star, ShieldCheck, 
  ChevronRight, Send
} from 'lucide-react';

// ==========================================
// PENTING: GANTI DENGAN KODE FIREBASE CONFIG ANDA
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

// Custom CSS
const style = `
  .hide-scrollbar::-webkit-scrollbar { display: none; }
  .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
  .stagger-1 { animation-delay: 0.1s; } .stagger-2 { animation-delay: 0.2s; }
  .stagger-3 { animation-delay: 0.3s; } .stagger-4 { animation-delay: 0.4s; }
`;

export default function App() {
  // UI State
  const [activeTab, setActiveTab] = useState('home');
  const [isLoaded, setIsLoaded] = useState(false);

  // Firebase & App Logic State
  const [user, setUser] = useState(null);
  const [saldo, setSaldo] = useState(50000);
  const [poin, setPoin] = useState(0);
  const [layanan, setLayanan] = useState('');
  const [lokasi, setLokasi] = useState('');
  const [statusOrder, setStatusOrder] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [chats, setChats] = useState([]);

  // --- 1. FIREBASE AUTH & REAL-TIME LISTENER ---
  useEffect(() => {
    setIsLoaded(true);
    signInAnonymously(auth)
      .then((cred) => {
        const userId = cred.user.uid;
        setUser(userId);
        
        const userRef = doc(db, "users", userId);
        setDoc(userRef, { id: userId }, { merge: true });

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

  // --- 2. SISTEM ORDER & KOMISI ---
  const handleOrder = async (jenisLayanan, tarifDasar) => {
    if (!lokasi) {
      alert("Silakan masukkan lokasi tujuan terlebih dahulu!");
      return;
    }
    if (!user) return;
    if (saldo < tarifDasar) {
      alert("Saldo BangPay tidak mencukupi! Silakan top up.");
      return;
    }

    setLayanan(jenisLayanan);
    setStatusOrder('Mencari Driver...');
    setActiveTab('orders'); // Otomatis pindah ke tab pesanan

    const userRef = doc(db, "users", user);

    setTimeout(async () => {
      setStatusOrder('Driver Menuju Lokasi Anda');

      setTimeout(async () => {
        const potonganSaldo = tarifDasar;
        const komisiAdmin = potonganSaldo * 0.15; // Komisi 15%
        const poinDidapat = Math.floor(potonganSaldo / 1000);

        await updateDoc(userRef, {
          saldo: saldo - potonganSaldo,
          poin: poin + poinDidapat,
          statusOrder: 'Selesai'
        });

        alert(`Perjalanan selesai!\nTarif: Rp ${potonganSaldo.toLocaleString()}\nKomisi Admin: Rp ${komisiAdmin.toLocaleString()}\nAnda mendapat: +${poinDidapat} Poin!`);
      }, 6000);
    }, 3000);
  };

  // --- 3. SISTEM CHAT ---
  const sendChatMessage = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || !user) return;

    const userRef = doc(db, "users", user);
    const pesanBaru = { sender: 'Anda', text: chatInput, timestamp: new Date().toLocaleTimeString() };

    await updateDoc(userRef, { chats: arrayUnion(pesanBaru) });
    setChatInput('');

    setTimeout(async () => {
      const balasanDriver = { sender: 'Driver', text: 'Baik kak, saya segera meluncur ke lokasi! 🚀', timestamp: new Date().toLocaleTimeString() };
      await updateDoc(userRef, { chats: arrayUnion(balasanDriver) });
    }, 2000);
  };

  // --- MOCK DATA UNTUK UI ---
  const services = [
    { id: 1, name: 'BangRide', icon: Bike, color: 'bg-green-500', textColor: 'text-white', price: 12000 },
    { id: 2, name: 'BangCar', icon: Car, color: 'bg-green-500', textColor: 'text-white', price: 25000 },
    { id: 3, name: 'BangFood', icon: Utensils, color: 'bg-red-500', textColor: 'text-white', price: 15000 },
    { id: 4, name: 'BangSend', icon: Box, color: 'bg-green-500', textColor: 'text-white', price: 0 },
    { id: 5, name: 'BangMart', icon: ShoppingBag, color: 'bg-red-500', textColor: 'text-white', price: 0 },
    { id: 6, name: 'BangTix', icon: Ticket, color: 'bg-blue-500', textColor: 'text-white', price: 0 },
    { id: 7, name: 'BangNews', icon: Newspaper, color: 'bg-orange-500', textColor: 'text-white', price: 0 },
    { id: 8, name: 'More', icon: MoreHorizontal, color: 'bg-gray-200', textColor: 'text-gray-600', price: 0 },
  ];

  return (
    <>
      <style>{style}</style>
      <div className="min-h-screen bg-gray-100 flex justify-center items-center font-sans">
        <div className="w-full max-w-md h-[100dvh] bg-white relative overflow-hidden shadow-2xl sm:rounded-[2.5rem] sm:border-8 sm:border-gray-900 flex flex-col">
          
          <div className="flex-1 overflow-y-auto hide-scrollbar pb-24">
            
            {/* HEADER KHUSUS BERANDA */}
            {activeTab === 'home' && (
              <div className="bg-[#00aa13] pt-12 pb-20 px-4 rounded-b-[2rem] relative z-0">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex-1 bg-white/20 backdrop-blur-sm rounded-full flex items-center px-4 py-2 border border-white/30 text-white shadow-inner">
                    <Search size={20} className="text-white/80" />
                    <input type="text" placeholder="Cari layanan, makanan..." className="bg-transparent border-none outline-none text-white placeholder-white/80 w-full ml-3 text-sm" readOnly />
                  </div>
                  <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#00aa13] shadow-md border-2 border-white/50">
                    <User size={20} />
                  </button>
                </div>
                <div className="flex items-center text-white w-max">
                  <div className="w-6 h-6 bg-green-700/50 rounded-full flex items-center justify-center mr-2">
                    <User size={14} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-green-100 font-medium">ID Pengguna</span>
                    <div className="flex items-center font-bold text-sm">
                      {user ? user.substring(0, 6).toUpperCase() : 'Memuat...'}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* KONTEN BERANDA */}
            {activeTab === 'home' && (
              <>
                {/* BangPay Card - Ter

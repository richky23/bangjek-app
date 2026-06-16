import React, { useState, useEffect } from 'react';
import { 
  Search, User, MapPin, ChevronDown, Wallet, QrCode, 
  PlusCircle, MoreHorizontal, Bike, Utensils, Box, 
  ShoppingBag, Car, Ticket, Newspaper, Home, 
  Percent, Clock, MessageCircle, Star, ShieldCheck, 
  ChevronRight
} from 'lucide-react';

// Custom CSS for hiding scrollbars and simple animations
const style = `
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .animate-fade-in-up {
    animation: fadeInUp 0.6s ease-out forwards;
  }
  
  .stagger-1 { animation-delay: 0.1s; }
  .stagger-2 { animation-delay: 0.2s; }
  .stagger-3 { animation-delay: 0.3s; }
  .stagger-4 { animation-delay: 0.4s; }
`;

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // --- MOCK DATA ---
  const services = [
    { id: 1, name: 'BangRide', icon: Bike, color: 'bg-green-500', textColor: 'text-white' },
    { id: 2, name: 'BangCar', icon: Car, color: 'bg-green-500', textColor: 'text-white' },
    { id: 3, name: 'BangFood', icon: Utensils, color: 'bg-red-500', textColor: 'text-white' },
    { id: 4, name: 'BangSend', icon: Box, color: 'bg-green-500', textColor: 'text-white' },
    { id: 5, name: 'BangMart', icon: ShoppingBag, color: 'bg-red-500', textColor: 'text-white' },
    { id: 6, name: 'BangTix', icon: Ticket, color: 'bg-blue-500', textColor: 'text-white' },
    { id: 7, name: 'BangNews', icon: Newspaper, color: 'bg-orange-500', textColor: 'text-white' },
    { id: 8, name: 'More', icon: MoreHorizontal, color: 'bg-gray-200', textColor: 'text-gray-600' },
  ];

  const promos = [
    { id: 1, title: 'Diskon 50% BangFood', desc: 'Makan siang lebih hemat hari ini!', bg: 'bg-gradient-to-r from-orange-400 to-red-500' },
    { id: 2, title: 'Cashback BangRide', desc: 'Pergi ngantor dapet cashback 10rb.', bg: 'bg-gradient-to-r from-green-400 to-emerald-600' },
    { id: 3, title: 'Gratis Ongkir Mart', desc: 'Belanja bulanan bebas biaya antar.', bg: 'bg-gradient-to-r from-blue-400 to-indigo-500' },
  ];

  const nearbyRestos = [
    { id: 1, name: 'Ayam Geprek Mas Bro', rating: 4.8, dist: '1.2 km', img: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&q=80&w=200&h=200' },
    { id: 2, name: 'Kopi Kenangan Mantan', rating: 4.9, dist: '0.8 km', img: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&q=80&w=200&h=200' },
    { id: 3, name: 'Sate Khas Senayan', rating: 4.7, dist: '2.5 km', img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=200&h=200' },
  ];

  const newsFeed = [
    { id: 1, title: 'Fitur Baru: BangPay Later!', excerpt: 'Sekarang kamu bisa belanja dulu bayar bulan depan. Cek syarat & ketentuannya.', img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=400&h=200' },
    { id: 2, title: 'Tips Aman Berkendara', excerpt: 'Pastikan helm klik dan selalu patuhi rambu lalu lintas bersama driver kami.', img: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=400&h=200' },
  ];

  return (
    <>
      <style>{style}</style>
      <div className="min-h-screen bg-gray-100 flex justify-center items-center font-sans">
        {/* Mobile Device Simulator Container */}
        <div className="w-full max-w-md h-[100dvh] bg-white relative overflow-hidden shadow-2xl sm:rounded-[2.5rem] sm:border-8 sm:border-gray-900 flex flex-col">
          
          {/* Main Scrollable Content */}
          <div className="flex-1 overflow-y-auto hide-scrollbar pb-24">
            
            {/* Header Section (Green Background) */}
            <div className="bg-[#00aa13] pt-12 pb-20 px-4 rounded-b-[2rem] relative z-0">
              
              {/* Top Bar: Search & Profile */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 bg-white/20 backdrop-blur-sm rounded-full flex items-center px-4 py-2 border border-white/30 text-white shadow-inner active:scale-95 transition-transform">
                  <Search size={20} className="text-white/80" />
                  <input 
                    type="text" 
                    placeholder="Find services, food, or places" 
                    className="bg-transparent border-none outline-none text-white placeholder-white/80 w-full ml-3 text-sm"
                    readOnly
                  />
                </div>
                <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#00aa13] shadow-md active:scale-90 transition-transform flex-shrink-0 border-2 border-white/50">
                  <User size={20} />
                </button>
              </div>

              {/* Location Picker */}
              <div className="flex items-center text-white active:opacity-70 transition-opacity w-max">
                <div className="w-6 h-6 bg-green-700/50 rounded-full flex items-center justify-center mr-2">
                  <MapPin size={14} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-green-100 font-medium">Your Location</span>
                  <div className="flex items-center font-bold text-sm">
                    Jl. Sudirman No. 45, Pekanbaru <ChevronDown size={16} className="ml-1" />
                  </div>
                </div>
              </div>
            </div>

            {/* BangPay Card (Overlapping) */}
            <div className={`px-4 -mt-10 relative z-10 opacity-0 ${isLoaded ? 'animate-fade-in-up stagger-1' : ''}`}>
              <div className="bg-[#0f60b6] rounded-2xl p-4 shadow-lg text-white relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                
                <div className="flex justify-between items-center mb-4 relative z-10">
                  <div className="flex items-center gap-2">
                    <Wallet size={20} />
                    <span className="font-bold text-lg tracking-tight">BangPay</span>
                  </div>
                  <div className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md flex items-center gap-1 border border-white/10">
                    <ShieldCheck size={14}/>
                    Protected
                  </div>
                </div>
                
                <div className="flex gap-4 relative z-10">
                  <div className="bg-white rounded-xl p-3 flex-1 text-gray-800 shadow-sm active:scale-95 transition-transform flex flex-col justify-center">
                    <span className="text-xs text-gray-500 font-medium mb-1">Balance</span>
                    <span className="font-bold text-base leading-none">Rp 245.000</span>
                    <div className="text-[10px] text-[#00aa13] font-semibold mt-1 flex items-center">
                      Tap to view history <ChevronRight size={10} />
                    </div>
                  </div>
                  
                  <div className="flex gap-1">
                    <button className="flex flex-col items-center justify-center gap-1 w-16 bg-white/10 rounded-xl active:bg-white/20 transition-colors">
                      <PlusCircle size={22} className="text-white" />
                      <span className="text-[10px] font-medium">Top Up</span>
                    </button>
                    <button className="flex flex-col items-center justify-center gap-1 w-16 bg-white/10 rounded-xl active:bg-white/20 transition-colors">
                      <QrCode size={22} className="text-white" />
                      <span className="text-[10px] font-medium">Pay</span>
                    </button>
                    <button className="flex flex-col items-center justify-center gap-1 w-16 bg-white/10 rounded-xl active:bg-white/20 transition-colors">
                      <MoreHorizontal size={22} className="text-white" />
                      <span className="text-[10px] font-medium">More</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Services Grid */}
            <div className={`px-4 mt-6 opacity-0 ${isLoaded ? 'animate-fade-in-up stagger-2' : ''}`}>
              <div className="grid grid-cols-4 gap-y-6 gap-x-2">
                {services.map((service) => (
                  <button key={service.id} className="flex flex-col items-center gap-2 group active:scale-95 transition-transform">
                    <div className={`w-14 h-14 ${service.color} rounded-2xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow`}>
                      <service.icon size={28} className={service.textColor} strokeWidth={2.5} />
                    </div>
                    <span className="text-xs font-medium text-gray-700">{service.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="h-2 w-full bg-gray-100 my-6"></div>

            {/* Promos Section */}
            <div className={`mt-2 opacity-0 ${isLoaded ? 'animate-fade-in-up stagger-3' : ''}`}>
              <div className="px-4 flex justify-between items-end mb-3">
                <h2 className="text-lg font-bold text-gray-800">Spesial buat kamu</h2>
                <button className="text-sm text-[#00aa13] font-semibold active:opacity-70">Lihat Semua</button>
              </div>
              <div className="flex overflow-x-auto hide-scrollbar px-4 gap-4 pb-4 snap-x">
                {promos.map((promo) => (
                  <div key={promo.id} className={`${promo.bg} min-w-[260px] h-32 rounded-2xl p-4 text-white flex flex-col justify-end shadow-md snap-center active:scale-[0.98] transition-transform relative overflow-hidden`}>
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 rounded-full blur-xl -mr-8 -mt-8"></div>
                    <h3 className="font-bold text-lg mb-1 relative z-10">{promo.title}</h3>
                    <p className="text-xs opacity-90 relative z-10">{promo.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Nearby Restos Section */}
            <div className={`mt-4 opacity-0 ${isLoaded ? 'animate-fade-in-up stagger-4' : ''}`}>
              <div className="px-4 flex justify-between items-end mb-3">
                <h2 className="text-lg font-bold text-gray-800">Terdekat & Terlaris</h2>
              </div>
              <div className="flex overflow-x-auto hide-scrollbar px-4 gap-4 pb-4 snap-x">
                {nearbyRestos.map((resto) => (
                  <div key={resto.id} className="min-w-[160px] bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden snap-start active:scale-95 transition-transform">
                    <img src={resto.img} alt={resto.name} className="w-full h-24 object-cover" />
                    <div className="p-3">
                      <h3 className="font-bold text-sm text-gray-800 truncate mb-1">{resto.name}</h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-xs font-semibold text-gray-600">
                          <Star size={12} className="text-yellow-400 mr-1 fill-yellow-400" />
                          {resto.rating}
                        </div>
                        <span className="text-xs text-gray-500 font-medium">{resto.dist}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* News Feed Section */}
            <div className="mt-4 px-4 pb-8">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Info & Berita Bangjek</h2>
              <div className="space-y-4">
                {newsFeed.map((news) => (
                  <div key={news.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden active:scale-[0.98] transition-transform">
                    <img src={news.img} alt={news.title} className="w-full h-36 object-cover" />
                    <div className="p-4">
                      <h3 className="font-bold text-base text-gray-800 mb-1">{news.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">{news.excerpt}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
          </div>

          {/* Bottom Navigation */}
          <div className="absolute bottom-0 w-full bg-white border-t border-gray-200 pb-safe pt-2 px-6 flex justify-between items-center z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] rounded-b-[2rem] sm:rounded-b-[1.8rem]">
            {[
              { id: 'home', icon: Home, label: 'Beranda' },
              { id: 'promos', icon: Percent, label: 'Promo' },
              { id: 'orders', icon: Clock, label: 'Pesanan' },
              { id: 'chat', icon: MessageCircle, label: 'Chat' },
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center p-2 min-w-[60px] active:scale-90 transition-all duration-200 ${activeTab === tab.id ? 'text-[#00aa13]' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <div className={`relative ${activeTab === tab.id ? 'bg-green-50 p-2 rounded-xl mb-1' : 'mb-1'}`}>
                  <tab.icon 
                    size={24} 
                    className={`transition-all duration-300 ${activeTab === tab.id ? 'scale-110' : ''}`} 
                    strokeWidth={activeTab === tab.id ? 2.5 : 2}
                  />
                  {/* Notification dot for Chat */}
                  {tab.id === 'chat' && (
                    <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <span className={`text-[10px] font-semibold ${activeTab === tab.id ? 'text-[#00aa13]' : ''}`}>
                  {tab.label}
                </span>
              </button>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}

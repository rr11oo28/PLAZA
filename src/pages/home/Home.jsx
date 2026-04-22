import { HomeCards, HomeContCards, HomeHeader, HomePage } from './Home.styles';
import imgOne from '../../assets/res.jpg'
import imgTwo from '../../assets/buyurtma.avif'
import imgThree from '../../assets/yetkazish.jpeg'
import logo from '../../assets/IMG_logo.PNG'
import { Button } from '../../style/StyleComponent';

import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const Home = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const [tableId, setTableId] = useState(null);
  const [isQrOpen, setIsQrOpen] = useState(false);
  
  // ? Til holati (localStorage orqali saqlanadi)
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'uz');

  // ? To'liq matnlar bazasi
  const content = {
    uz: { 
      resTitle: "Stol band qilish", 
      resDesc: "Qulay joyni oldindan band qiling va vaqtingizni tejang.",
      orderTitle: "Buyurtma berish", 
      orderDesc: "Menyuni ko'ring va sevimli taomingizga hoziroq buyurtma bering.",
      deliverTitle: "Yetkazib berish", 
      deliverDesc: "Issiq va mazali taomlarni uyingizga tezda yetkazamiz.",
      sub: "Barchangizga xizmat ko`rsatishimizdan mamnunmiz..!",
      btn1: "Band qilish",
      btn2: "Buyurtma berish",
      btn3: "Yetkazib berish"
    },
    ru: { 
      resTitle: "Бронь стола", 
      resDesc: "Забронируйте удобное место заранее и сэкономьте время.",
      orderTitle: "Сделать заказ", 
      orderDesc: "Посмотрите меню и закажите любимое блюдо прямо сейчас.",
      deliverTitle: "Доставка", 
      deliverDesc: "Мы быстро доставим горячую и вкусную еду к вам домой.",
      sub: "Мы рады служить каждому из вас..!",
      btn1: "Забронировать",
      btn2: "Заказать",
      btn3: "Доставка"
    },
    en: { 
      resTitle: "Book a Table", 
      resDesc: "Book a comfortable seat in advance and save your time.",
      orderTitle: "Order Food", 
      orderDesc: "Browse the menu and order your favorite dish right now.",
      deliverTitle: "Delivery", 
      deliverDesc: "We will quickly deliver hot and delicious food to your home.",
      sub: "We are happy to serve all of you..!",
      btn1: "Book Now",
      btn2: "Order Now",
      btn3: "Delivery"
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const table = params.get('table');
    if (table) {
      setTableId(table);
      localStorage.setItem('qr_table', table);
    }
    localStorage.setItem('lang', lang);
  }, [location, lang]);

  const orderClick = () => {
    const savedTable = tableId || localStorage.getItem('qr_table');
    navigation(savedTable ? `/order?table=${savedTable}` : '/order');
  };

  return (
    // HomePage'dan overflow: hidden va height: 100vh olib tashlandi, scroll ishlashi uchun min-height berildi
    <HomePage style={{ minHeight: '100vh', paddingBottom: '100px' }}>
      <style>
        {`
          html, body { 
            /* overflow: hidden olib tashlandi */
            min-height: 100%; 
            margin: 0; 
            /* touch-action: auto qilindi scroll ishlashi uchun */
            touch-action: auto; 
          }
          
          .lang-wrapper {
            position: absolute;
            top: 25px;
            right: 25px;
            z-index: 1001;
            background: rgba(255, 255, 255, 0.45);
            backdrop-filter: blur(15px);
            WebkitBackdropFilter: blur(15px);
            border: 1px solid rgba(255, 255, 255, 0.5);
            padding: 6px 14px;
            border-radius: 14px;
            display: flex;
            align-items: center;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
          }
          
          .lang-wrapper:hover {
            background: rgba(255, 255, 255, 0.65);
            transform: translateY(-2px);
          }

          .lang-select {
            background: transparent;
            border: none;
            color: #222;
            font-weight: 800;
            font-size: 14px;
            cursor: pointer;
            outline: none;
            text-transform: uppercase;
          }

          @keyframes orbit-glow {
            from { transform: rotate(0deg) translateX(12px) rotate(0deg); }
            to { transform: rotate(360deg) translateX(12px) rotate(-360deg); }
          }
          
          .dynamic-qr-float {
            background: rgba(0, 0, 0, 0.85);
            backdrop-filter: blur(15px);
            border: 1px solid rgba(255, 255, 255, 0.1);
          }
          
          .orbit-dot {
            width: 6px; height: 6px; background: #e67e22; border-radius: 50%;
            position: absolute; animation: orbit-glow 3s linear infinite;
          }
        `}
      </style>

      {/* TIL TANLASH (GLASS DESIGN) */}
      <div className="lang-wrapper">
        <span style={{ marginRight: '8px' }}>🌐</span>
        <select 
          className="lang-select" 
          value={lang} 
          onChange={(e) => setLang(e.target.value)}
        >
          <option value="uz">UZB</option>
          <option value="ru">RUS</option>
          <option value="en">ENG</option>
        </select>
      </div>

      <div className="max-width">
        <HomeHeader>
          <img src={logo} alt="logo" />
          <h1>Plaza</h1>
          {tableId && <p style={{color: '#e67e22', fontWeight: 'bold'}}>Stol №{tableId}</p>}
          <p>{content[lang].sub}</p>
        </HomeHeader>

        <HomeContCards>
          <HomeCards onClick={() => navigation('/reserved')}>
            <img src={imgOne} alt="res" />
            <h2>{content[lang].resTitle}</h2>
            <p style={{ fontSize: '13px', opacity: 0.8, padding: '0 10px' }}>{content[lang].resDesc}</p>
            <Button>{content[lang].btn1}</Button>
          </HomeCards>
          
          <HomeCards onClick={orderClick}>
            <img src={imgTwo} alt="order" />
            <h2>{content[lang].orderTitle}</h2>
            <p style={{ fontSize: '13px', opacity: 0.8, padding: '0 10px' }}>{content[lang].orderDesc}</p>
            <Button>{content[lang].btn2}</Button>
          </HomeCards>

          <HomeCards onClick={() => navigation('/delivery')}>
            <img src={imgThree} alt="delivery" />
            <h2>{content[lang].deliverTitle}</h2>
            <p style={{ fontSize: '13px', opacity: 0.8, padding: '0 10px' }}>{content[lang].deliverDesc}</p>
            <Button>{content[lang].btn3}</Button>
          </HomeCards>
        </HomeContCards>
      </div>

      {/* QR FLOAT BUTTON */}
      <div 
        onClick={() => setIsQrOpen(true)}
        className="dynamic-qr-float"
        style={{
          position: 'fixed', bottom: '30px', right: '30px',
          width: '60px', height: '60px', borderRadius: '30px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', zIndex: 1000, overflow: 'hidden'
        }}
      >
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
                <rect x="3" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="3" width="7" height="7" rx="1.5" />
                <rect x="14" y="14" width="7" height="7" rx="1.5" />
                <rect x="3" y="14" width="7" height="7" rx="1.5" />
            </svg>
            <div className="orbit-dot"></div>
        </div>
      </div>

      {/* QR MODAL */}
      {isQrOpen && (
        <div 
          onClick={() => setIsQrOpen(false)}
          style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            background: 'rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 2000
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#fff',
              padding: '40px', borderRadius: '40px', textAlign: 'center',
              boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
              maxWidth: '320px', width: '90%'
            }}
          >
            <QRCodeCanvas value={window.location.origin} size={200} fgColor="#000" bgColor="transparent" />
            <p style={{ marginTop: '20px', fontWeight: 'bold', color: '#000', fontSize: 'var(--font-size-18)' }}>Plaza Menu</p>
            <Button onClick={() => setIsQrOpen(false)} style={{ marginTop: '15px', width: '100%' }}>OK</Button>
          </div>
        </div>
      )}
    </HomePage>
  );
};

export default Home;
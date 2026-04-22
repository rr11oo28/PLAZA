import { HomeCards, HomeContCards, HomeHeader, HomePage } from './Home.styles';

// ? imgs
import imgOne from '../../assets/res.jpg'
import imgTwo from '../../assets/buyurtma.avif'
import imgThree from '../../assets/yetkazish.jpeg'
import logo from '../../assets/IMG_logo.PNG'
// ? style
import { Button } from '../../style/StyleComponent';

import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react'; // QR kod kutubxonasi

const Home = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const [tableId, setTableId] = useState(null);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false); // Modal uchun holat

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const table = params.get('table');
    if (table) {
      setTableId(table);
      localStorage.setItem('qr_table', table);
    }
  }, [location]);

  const reservedClick = () => navigation('/reserved');
  const orderClick = () => {
    const savedTable = tableId || localStorage.getItem('qr_table');
    navigation(savedTable ? `/order?table=${savedTable}` : '/order');
  };
  const deliveryClick = () => navigation('/delivery');

  const [homeCards] = useState([
    { id: 1, img: imgOne, title: 'Stol band qilish', desc: 'Qulay joyni oldindan band qiling.', btn: 'Band qilish', click: reservedClick },
    { id: 2, img: imgTwo, title: 'Buyurtma berish', desc: 'Sevimli taomingizni hoziroq buyurtma bering.', btn: 'Buyurtma berish', click: orderClick },
    { id: 3, img: imgThree, title: 'Yetkazib berish', desc: 'Taomingizni tez va issiq holda yetkazamiz.', btn: 'Yetkazib berish', click: deliveryClick }
  ]);

  return (
    <HomePage>
      <div className="max-width">
        <HomeHeader>
          <img src={logo} alt="logo" />
          <h1>Plaza</h1>
          {tableId && <span style={{color: '#e67e22', fontWeight: 'bold'}}>Stol №{tableId}</span>}
          <p>Barchangizga xizmat ko`rsatishimizdan mamnunmiz..!</p>
        </HomeHeader>

        <HomeContCards>
          {homeCards.map((card) => (
            <HomeCards onClick={card.click} key={card.id}>
              <img src={card.img} alt="restaurant" />
              <h2>{card.title}</h2>
              <p>{card.desc}</p>
              <Button>{card.btn}</Button>
            </HomeCards>
          ))}
        </HomeContCards>
      </div>

      {/* --- QR SKANER TUGMASI (O'ng pastda) --- */}
      <div 
        onClick={() => setIsQrModalOpen(true)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          background: '#e67e22',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
          cursor: 'pointer',
          zIndex: 1000,
          border: '2px solid white'
        }}
      >
        <span style={{ fontSize: '30px' }}>🚀</span> {/* Bu yerga QR icon qo'ysa ham bo'ladi */}
      </div>

      {/* --- QR MODAL --- */}
      {isQrModalOpen && (
        <div 
          onClick={() => setIsQrModalOpen(false)}
          style={{
            position: 'fixed',
            top: 0, left: 0, width: '100%', height: '100%',
            background: 'rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1001
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'white',
              padding: '30px',
              borderRadius: '20px',
              textAlign: 'center',
              position: 'relative',
              width: '280px'
            }}
          >
            <h3 style={{marginBottom: '15px'}}>Saytga ulanish</h3>
            <QRCodeCanvas 
              value={window.location.origin} 
              size={200} 
              level="H" 
              includeMargin={true}
            />
            <p style={{marginTop: '15px', fontSize: '14px', color: '#666'}}>
              Boshqalarga ulashish uchun skaner qiling
            </p>
            <button 
              onClick={() => setIsQrModalOpen(false)}
              style={{
                marginTop: '15px',
                padding: '8px 20px',
                background: '#e67e22',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Yopish
            </button>
          </div>
        </div>
      )}
    </HomePage>
  )
}

export default Home;
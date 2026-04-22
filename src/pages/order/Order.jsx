import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'; 
import { 
  OrderMenu, OrderNav, OrderPage, OrderTitle, 
  CartModal, CartOverlay, CartButtonWrapper, 
  CartItemRow, CartFooter, CardControlWrapper,
  HeaderWrapper, BackButton,
  CheckoutModal, InputGroup, ModalButtons 
} from './Order.style';
import { Button } from '../../style/StyleComponent';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import imgOne from '../../assets/res.jpg'
import imgTwo from '../../assets/buyurtma.avif'
import imgThree from '../../assets/yetkazish.jpeg'
import logo from '../../assets/IMG_logo.PNG'
import Footer from '../footer/Footer';

const Order = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const lang = localStorage.getItem('lang') || 'uz';

  const [activeNav, setActiveNav] = useState('Hammasi');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const [userName, setUserName] = useState('');
  const [tableNum, setTableNum] = useState('');

  // --- TILGA QARAB MATNLAR ---
  const t = useMemo(() => {
    const content = {
      uz: {
        back: "Orqaga",
        title: "Plaza menu",
        subTitle: "Sifatli va halol taomlarimiz siz uchun.",
        cartBtn: "Savatcha",
        emptyCart: "Savatchangiz bo'sh",
        checkout: "Buyurtma berish",
        total: "Jami",
        confirmTitle: "Tasdiqlash",
        nameLabel: "To'liq ism va familiyangiz",
        namePlaceholder: "Ism va familiyangizni kiriting",
        tableLabel: "Stol raqami",
        qrNotice: "(QR orqali aniqlandi)",
        cancel: "Orqaga",
        confirm: "Yuborish",
        add: "qo`shish",
        addedNotify: "Savatchaga qo'shildi! +1",
        navs: ['Hammasi', 'Asosiy taomlar', 'Salatlar', 'Ichimliklar', 'Shirinliklar'],
        errName: "Iltimos, ism va familiyangizni to'liq kiriting!",
        errTable: "Stol raqamini to'g'ri kiriting!",
        errEmpty: "Savatchangiz bo'sh!",
        errNet: "Xatolik! Internetni tekshiring.",
        success: "Buyurtmangiz qabul qilindi!",
        som: "so'm"
      },
      ru: {
        back: "Назад",
        title: "Меню Plaza",
        subTitle: "Наши качественные и халяльные блюда для вас.",
        cartBtn: "Корзина",
        emptyCart: "Ваша корзина пуста",
        checkout: "Оформить заказ",
        total: "Итого",
        confirmTitle: "Подтверждение",
        nameLabel: "Полное имя и фамилия",
        namePlaceholder: "Введите ваше имя и фамилию",
        tableLabel: "Номер стола",
        qrNotice: "(Определено по QR)",
        cancel: "Назад",
        confirm: "Отправить",
        add: "добавить",
        addedNotify: "Добавлено в корзину! +1",
        navs: ['Все', 'Основные блюда', 'Салаты', 'Напитки', 'Десерты'],
        errName: "Пожалуйста, введите полное имя и фамилию!",
        errTable: "Введите правильный номер стола!",
        errEmpty: "Ваша корзина пуста!",
        errNet: "Ошибка! Проверьте интернет.",
        success: "Ваш заказ принят!",
        som: "сум"
      }
    };
    return content[lang] || content.uz;
  }, [lang]);

  // --- TAOMLAR RO'YXATI ---
  const orderCards = useMemo(() => [
    { id: 1, img: imgOne, title: lang === 'uz' ? 'Asosiy taom' : 'Основное блюдо', desc: lang === 'uz' ? 'Taomning qisqacha tavsifi' : 'Краткое описание блюда', price: '10000', category: lang === 'uz' ? 'Asosiy taomlar' : 'Основные блюда' },
    { id: 2, img: imgTwo, title: lang === 'uz' ? 'Salat nomi' : 'Название салата', desc: lang === 'uz' ? 'Salatning qisqacha tavsifi' : 'Краткое описание салата', price: '23000', category: lang === 'uz' ? 'Salatlar' : 'Салаты' },
    { id: 3, img: imgThree, title: lang === 'uz' ? 'Ichimlik nomi' : 'Напиток', desc: lang === 'uz' ? 'Ichimlikning qisqacha tavsifi' : 'Краткое описание напитка', price: '5000', category: lang === 'uz' ? 'Ichimliklar' : 'Напитки' },
    { id: 4, img: logo, title: lang === 'uz' ? 'Shirinlik nomi' : 'Десерт', desc: lang === 'uz' ? 'Shirinlikning qisqacha tavsifi' : 'Краткое описание десерта', price: '15000', category: lang === 'uz' ? 'Shirinliklar' : 'Десерты' },
    { id: 5, img: imgOne, title: lang === 'uz' ? 'Taom nomi' : 'Блюдо', desc: lang === 'uz' ? 'Taomning qisqacha tavsifi' : 'Краткое описание блюда', price: '20000', category: lang === 'uz' ? 'Asosiy taomlar' : 'Основные блюда' },
  ], [lang]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const table = params.get('table');
    if (table) setTableNum(table);
  }, [location]);

  // --- SAVATCHA FUNKSIYALARI ---
  const addToCart = (product) => {
    toast.info(t.addedNotify, {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: true,
      theme: "colored",
    });

    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === id);
      if (existing.quantity === 1) return prev.filter(item => item.id !== id);
      return prev.map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item);
    });
  };

  const deleteItem = (id) => setCart(prev => prev.filter(item => item.id !== id));
  const totalPrice = cart.reduce((acc, item) => acc + (parseInt(item.price) * item.quantity), 0);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0); 

  // --- TELEGRAMGA YUBORISH ---
  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    if (userName.trim().split(' ').length < 2) return toast.error(t.errName, { position: "bottom-right" });
    if (!tableNum) return toast.error(t.errTable, { position: "bottom-right" });

    const token = "8708223354:AAHDfvoi7knAt-ruCQDrKlyvpYOMSjlB6OE";
    const chatId = "8162236227";
    
    const productList = cart.map((item, index) => 
        `${index + 1}. *${item.title}* \n   ${item.quantity} ta x ${item.price} = ${parseInt(item.price) * item.quantity} ${t.som}`
    ).join('\n\n');

    const message = `🍽 *YANGI BUYURTMA (MENU)*\n━━━━━━━━━━━━━━━━━━\n👤 *Mijoz:* ${userName}\n🔢 *Stol:* ${tableNum}-stol\n━━━━━━━━━━━━━━━━━━\n🛒 *MAHSULOTLAR:*\n${productList}\n\n💰 *JAMI:* ${totalPrice} ${t.som}\n━━━━━━━━━━━━━━━━━━`;

    try {
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: "Markdown" }),
      });
      toast.success(t.success, { position: "bottom-right" });
      setCart([]); setUserName(''); setIsCheckoutOpen(false);
    } catch { toast.error(t.errNet, { position: "bottom-right" }); }
  };

  const filteredCards = activeNav === 'Hammasi' || activeNav === t.navs[0] ? orderCards : orderCards.filter(c => c.category === activeNav);

  return (
    <OrderPage>
      <ToastContainer position="bottom-right" autoClose={2000} />
      
      <AnimatePresence>
        {(isCartOpen || isCheckoutOpen) && (
          <CartOverlay 
            as={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => { setIsCartOpen(false); setIsCheckoutOpen(false); }} 
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCartOpen && (
          <CartModal 
            as={motion.div} initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween' }} isOpen={true}
          >
            <div className="cart-header">
              <h2>{t.cartBtn} ({totalItems})</h2>
              <button className="close-btn" onClick={() => setIsCartOpen(false)}>&times;</button>
            </div>
            <div className="cart-items">
              {cart.length === 0 ? (
                <div className="empty-cart" style={{textAlign: 'center', marginTop: '50px'}}>
                   <div style={{fontSize: '40px'}}>🛒</div>
                   <p>{t.emptyCart}</p>
                </div>
              ) : cart.map(item => (
                <CartItemRow as={motion.div} layout key={item.id}>
                  <div className="item-main">
                    <h4>{item.title}</h4>
                    <button className="delete-btn" onClick={() => deleteItem(item.id)}>&times;</button>
                  </div>
                  <div className="item-controls" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <button className="qty-btn" onClick={() => removeFromCart(item.id)}>-</button>
                    <span style={{minWidth: '25px', textAlign: 'center'}}>{item.quantity}</span>
                    <button className="qty-btn" onClick={() => addToCart(item)}>+</button>
                    <div className="price-total">{parseInt(item.price) * item.quantity} {t.som}</div>
                  </div>
                </CartItemRow>
              ))}
            </div>
            <CartFooter>
              <div className="total-row"><span>{t.total}:</span><span>{totalPrice} {t.som}</span></div>
              <Button className="submit-btn" disabled={cart.length === 0} onClick={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }}>{t.checkout}</Button>
            </CartFooter>
          </CartModal>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCheckoutOpen && (
          <CheckoutModal 
            as={motion.div} initial={{ opacity: 0, scale: 0.8, x: '-50%', y: '-50%' }} animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }} exit={{ opacity: 0, scale: 0.8, x: '-50%', y: '-50%' }} 
            style={{ position: 'fixed', left: '50%', top: '50%', zIndex: 1100 }} isOpen={true}
          >
            <h2>{t.confirmTitle}</h2>
            <form onSubmit={handleFinalSubmit}>
              <InputGroup>
                <label>{t.nameLabel}</label>
                <input type="text" placeholder={t.namePlaceholder} value={userName} onChange={(e) => setUserName(e.target.value)} />
              </InputGroup>
              <InputGroup>
                <label>{t.tableLabel} {new URLSearchParams(location.search).get('table') && t.qrNotice}</label>
                <input type="number" value={tableNum} onChange={(e) => setTableNum(e.target.value)} readOnly={!!new URLSearchParams(location.search).get('table')} style={new URLSearchParams(location.search).get('table') ? {background: '#f0f0f0', cursor: 'not-allowed'} : {}} />
              </InputGroup>
              <ModalButtons>
                <button type="button" className="cancel" onClick={() => setIsCheckoutOpen(false)}>{t.cancel}</button>
                <button type="submit" className="confirm">{t.confirm}</button>
              </ModalButtons>
            </form>
          </CheckoutModal>
        )}
      </AnimatePresence>

      <div className='max-width'>
        <HeaderWrapper>
          <BackButton onClick={() => navigate(-1)}>← {t.back}</BackButton>
          <OrderTitle as={motion.div} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <h1>{t.title}</h1>
            <p>{t.subTitle}</p>
          </OrderTitle>
        </HeaderWrapper>

        <CartButtonWrapper>
          <OrderNav>
            {t.navs.map(nav => (
              <div key={nav} onClick={() => setActiveNav(nav)} className={`nav-item ${activeNav === nav ? 'active' : ''}`}>{nav}</div>
            ))}
          </OrderNav>
          <motion.button whileTap={{ scale: 0.9 }} className="cart-icon-btn" onClick={() => setIsCartOpen(true)}>
            🛒 {t.cartBtn} ({totalItems})
          </motion.button>
        </CartButtonWrapper>

        <OrderMenu>
          <AnimatePresence mode='popLayout'>
            {filteredCards.map(card => {
              const inCart = cart.find(i => i.id === card.id);
              return (
                <motion.div 
                  layout key={card.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="order-card"
                >
                  <img src={card.img} alt={card.title} /> 
                  <h2>{card.title}</h2>
                  <p>{card.desc}</p>
                  <div className="for-price-and-btn">
                    <span>{card.price} {t.som}</span>
                    {inCart ? (
                      <CardControlWrapper as={motion.div} initial={{ scale: 0.8 }} animate={{ scale: 1 }} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <Button onClick={() => removeFromCart(card.id)}>-</Button>
                        <span style={{ fontWeight: 'bold', minWidth: '20px', textAlign: 'center' }}>{inCart.quantity}</span>
                        <Button onClick={() => addToCart(card)}>+</Button>
                      </CardControlWrapper>
                    ) : (
                      <Button as={motion.button} whileTap={{ scale: 0.9 }} onClick={() => addToCart(card)}>{t.add}</Button>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </OrderMenu>
      </div>
      <Footer />
    </OrderPage>
  );
};

export default Order;
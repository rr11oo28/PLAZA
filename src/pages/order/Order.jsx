import React, { useState, useEffect, useMemo, useCallback } from 'react';
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
  const lang = useMemo(() => localStorage.getItem('lang') || 'uz', []);

  const [activeNav, setActiveNav] = useState('Hammasi');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [tableNum, setTableNum] = useState('');

  // --- SMART GREETING (Warninglarsiz) ---
  const getGreeting = useCallback(() => {
    const hour = new Date().getHours();
    if (lang === 'uz') {
      if (hour >= 5 && hour < 12) return "Xayrli tong! Nonushta qildingizmi? ☕";
      if (hour >= 12 && hour < 17) return "Xayrli kun! Mazali tushlik vaqti bo'ldi 🍲";
      if (hour >= 17 && hour < 22) return "Xayrli kech! Kechki ovqatga nima buyurtma qilamiz? 🌙";
      return "Tungi taomlar o'zgacha gasht beradi, shunday emasmi? ✨";
    } else {
      if (hour >= 5 && hour < 12) return "Доброе утро! Позавтракаем? ☕";
      if (hour >= 12 && hour < 17) return "Добрый день! Время вкусного обеда 🍲";
      if (hour >= 17 && hour < 22) return "Добрый вечер! Что закажем на ужин? 🌙";
      return "Ночные перекусы имеют особый вкус, не так ли? ✨";
    }
  }, [lang]);

  const t = useMemo(() => {
    const content = {
      uz: {
        back: "Orqaga", title: "Plaza menu", subTitle: getGreeting(),
        cartBtn: "Savatcha", emptyCart: "Savatchangiz bo'sh", checkout: "Buyurtma berish",
        total: "Jami", confirmTitle: "Tasdiqlash", nameLabel: "To'liq ism va familiyangiz",
        namePlaceholder: "Ism va familiyangizni kiriting", tableLabel: "Stol raqami",
        qrNotice: "(QR orqali aniqlandi)", cancel: "Orqaga", confirm: "Yuborish", add: "qo`shish",
        addedNotify: "Savatchaga qo'shildi! +1",
        navs: ['Hammasi', 'Asosiy taomlar', 'Salatlar', 'Ichimliklar', 'Shirinliklar'],
        errName: "Iltimos, ism va familiyangizni to'liq kiriting!",
        errTable: "Stol raqamini to'g'ri kiriting!", errEmpty: "Savatchangiz bo'sh!",
        errNet: "Xatolik! Internetni tekshiring.", success: "Buyurtmangiz qabul qilindi!", som: "so'm"
      },
      ru: {
        back: "Назад", title: "Меню Plaza", subTitle: getGreeting(),
        cartBtn: "Корзина", emptyCart: "Ваша корзина пуста", checkout: "Оформить заказ",
        total: "Итого", confirmTitle: "Подтверждение", nameLabel: "Полное имя и фамилия",
        namePlaceholder: "Введите ваше имя и фамилию", tableLabel: "Номер стола",
        qrNotice: "(Определено по QR)", cancel: "Назад", confirm: "Отправить", add: "добавить",
        addedNotify: "Добавлено в корзину! +1",
        navs: ['Все', 'Основные блюда', 'Салаты', 'Напитки', 'Десерты'],
        errName: "Пожалуйста, введите полное имя и фамилию!",
        errTable: "Введите правильный номер стола!", errEmpty: "Ваша корзина пуста!",
        errNet: "Ошибка! Проверьте интернет.", success: "Ваш заказ принят!", som: "сум"
      }
    };
    return content[lang] || content.uz;
  }, [lang, getGreeting]);

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
  }, [location.search]);

  const addToCart = useCallback((product) => {
    toast.info(t.addedNotify, { position: "bottom-right", autoClose: 1000, hideProgressBar: true, theme: "colored" });
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { ...product, quantity: 1 }];
    });
  }, [t.addedNotify]);

  const removeFromCart = useCallback((id) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === id);
      if (existing.quantity === 1) return prev.filter(item => item.id !== id);
      return prev.map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item);
    });
  }, []);

  const deleteItem = (id) => setCart(prev => prev.filter(item => item.id !== id));
  const totalPrice = cart.reduce((acc, item) => acc + (parseInt(item.price) * item.quantity), 0);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0); 

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    if (userName.trim().split(' ').length < 2) return toast.error(t.errName, { position: "bottom-right" });
    if (!tableNum) return toast.error(t.errTable, { position: "bottom-right" });

    const token = "8708223354:AAHDfvoi7knAt-ruCQDrKlyvpYOMSjlB6OE";
    const chatId = "8162236227";
    const productList = cart.map((item, index) => `${index + 1}. *${item.title}* (${item.quantity} ta) - ${parseInt(item.price) * item.quantity} ${t.som}`).join('\n');
    const message = `🍽 *YANGI BUYURTMA*\n👤 Mijoz: ${userName}\n🔢 Stol: ${tableNum}\n\n🛒 Mahsulotlar:\n${productList}\n💰 Jami: ${totalPrice} ${t.som}`;

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
      <ToastContainer position="top-right" autoClose={2000} />
      
      <AnimatePresence>
        {(isCartOpen || isCheckoutOpen) && (
          <CartOverlay 
            as={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => { setIsCartOpen(false); setIsCheckoutOpen(false); }} 
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {totalItems > 0 && !isCartOpen && (
          <motion.div 
            initial={{ scale: 0, opacity: 0, y: 50 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0, opacity: 0, y: 50 }}
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setIsCartOpen(true)}
            style={{
              position: 'fixed', bottom: '30px', right: '30px', zIndex: 999, backgroundColor: 'var(--primary)', color: 'white',
              width: '65px', height: '65px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center',
              boxShadow: '0px 10px 25px var(--primary)', cursor: 'pointer'
            }}
          >
            <span style={{ fontSize: '24px' }}>🛒</span>
            <span style={{ position: 'absolute', top: '0', right: '0', backgroundColor: 'white', color: 'black', borderRadius: '50%', width: '22px', height: '22px', fontSize: '12px', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px solid var(--primary)' }}>{totalItems}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isCartOpen && (
          <CartModal as={motion.div} initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween' }} isOpen={true}>
            <div className="cart-header">
              <h2>{t.cartBtn} ({totalItems})</h2>
              <button className="close-btn" onClick={() => setIsCartOpen(false)}>&times;</button>
            </div>
            <div className="cart-items">
              {cart.length === 0 ? <p style={{textAlign: 'center', marginTop: '50px'}}>{t.emptyCart}</p> : cart.map(item => (
                <CartItemRow as={motion.div} layout key={item.id}>
                  <div className="item-main">
                    <h4>{item.title}</h4>
                    <button className="delete-btn" onClick={() => deleteItem(item.id)}>&times;</button>
                  </div>
                  <div className="item-controls" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <button className="qty-btn" onClick={() => removeFromCart(item.id)}>-</button>
                    <span>{item.quantity}</span>
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
          <CheckoutModal as={motion.div} initial={{ opacity: 0, scale: 0.8, x: '-50%', y: '-50%' }} animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }} exit={{ opacity: 0, scale: 0.8, x: '-50%', y: '-50%' }} style={{ position: 'fixed', left: '50%', top: '50%', zIndex: 1100 }} isOpen={true}>
            <h2>{t.confirmTitle}</h2>
            <form onSubmit={handleFinalSubmit}>
              <InputGroup><label>{t.nameLabel}</label><input type="text" placeholder={t.namePlaceholder} value={userName} onChange={(e) => setUserName(e.target.value)} /></InputGroup>
              <InputGroup><label>{t.tableLabel}</label><input type="number" value={tableNum} onChange={(e) => setTableNum(e.target.value)} readOnly={!!new URLSearchParams(location.search).get('table')} style={new URLSearchParams(location.search).get('table') ? {background: '#f0f0f0'} : {}} /></InputGroup>
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
            <motion.p key={t.subTitle} initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontStyle: 'italic', color: '#666' }}>{t.subTitle}</motion.p>
          </OrderTitle>
        </HeaderWrapper>

        <CartButtonWrapper>
          <OrderNav>
            {t.navs.map(nav => (
              <div key={nav} onClick={() => setActiveNav(nav)} className={`nav-item ${activeNav === nav ? 'active' : ''}`}>{nav}</div>
            ))}
          </OrderNav>
        </CartButtonWrapper>

        <OrderMenu>
          <AnimatePresence mode='popLayout'>
            {filteredCards.map(card => {
              const inCart = cart.find(i => i.id === card.id);
              return (
                <motion.div layout key={card.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="order-card">
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
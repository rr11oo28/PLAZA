import React, { useState, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'; 
import { 
  DeliveryPage, DeliveryTitle, DeliveryNav, DeliveryMenu, 
  CartModal, CartOverlay, CartButtonWrapper, 
  CartItemRow, CartFooter, CardControlWrapper, 
  CheckoutModal, InputGroup,
  HeaderWrapper, BackButton 
} from './Delivery.style';
import { Button } from '../../style/StyleComponent';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import imgOne from '../../assets/res.jpg';
import imgTwo from '../../assets/buyurtma.avif';
import imgThree from '../../assets/yetkazish.jpeg';
import logo from '../../assets/IMG_logo.PNG';
import Footer from '../footer/Footer';

const Delivery = () => {
  const navigate = useNavigate();
  const lang = useMemo(() => localStorage.getItem('lang') || 'uz', []);

  const [activeNav, setActiveNav] = useState('Hammasi');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('+998');
  const [userPhone2, setUserPhone2] = useState('+998');
  const [userAddress, setUserAddress] = useState('');

  const t = useMemo(() => {
    const content = {
      uz: {
        back: "Orqaga", title: "Yetkazib berish", subTitle: "Sevimli taomlaringizni uyingizga yetkazamiz",
        cartBtn: "Savat", emptyCart: "Savatchangiz hozircha bo'sh", next: "Keyingi qadam",
        total: "Jami", confirmTitle: "Buyurtmani rasmiylashtirish",
        nameLabel: "To'liq Ism va Familiyangiz", namePlaceholder: "Ism va familiyangizni kiriting",
        phoneLabel: "Telefon raqam", phone2Label: "Qo'shimcha telefon raqam",
        addressLabel: "Manzil", addressPlaceholder: "Ko'cha, uy raqami, xonadon...",
        cancel: "Orqaga", confirm: "Tasdiqlash", add: "Qo'shish",
        addedNotify: "Savatchaga qo'shildi! +1", 
        navs: ['Hammasi', 'Asosiy taomlar', 'Salatlar', 'Ichimliklar', 'Shirinliklar'],
        errName: "Iltimos, ism va familiyangizni to'liq kiriting!",
        errPhone: "Telefon raqami to'liq emas!", errAddress: "Iltimos, manzilni aniqroq ko'rsating!",
        success: "Buyurtmangiz muvaffaqiyatli qabul qilindi!", som: "UZS"
      },
      ru: {
        back: "Назад", title: "Доставка", subTitle: "Доставим ваши любимые блюда прямо к вам домой",
        cartBtn: "Корзина", emptyCart: "Ваша корзина пока пуста", next: "Следующий шаг",
        total: "Итого", confirmTitle: "Оформление заказа",
        nameLabel: "Ваше полное имя и фамилия", namePlaceholder: "Введите имя и фамилию",
        phoneLabel: "Номер телефона", phone2Label: "Дополнительный номер",
        addressLabel: "Адрес", addressPlaceholder: "Улица, номер дома, квартира...",
        cancel: "Назад", confirm: "Подтвердить", add: "Добавить",
        addedNotify: "Добавлено в корзину! +1", 
        navs: ['Все', 'Основные блюда', 'Салаты', 'Напитки', 'Десерты'],
        errName: "Пожалуйста, введите полное имя и фамилию!",
        errPhone: "Номер телефона введен не полностью!", errAddress: "Пожалуйста, укажите адрес точнее!",
        success: "Ваш заказ успешно принят!", som: "UZS"
      },
      en: {
        back: "Back", title: "Delivery", subTitle: "We deliver your favorite dishes to your home",
        cartBtn: "Cart", emptyCart: "Your cart is empty", next: "Next step",
        total: "Total", confirmTitle: "Checkout",
        nameLabel: "Full Name", namePlaceholder: "Enter your full name",
        phoneLabel: "Phone Number", phone2Label: "Additional Phone Number",
        addressLabel: "Address", addressPlaceholder: "Street, house number, apartment...",
        cancel: "Back", confirm: "Confirm", add: "Add",
        addedNotify: "Added to cart! +1", 
        navs: ['All', 'Main Dishes', 'Salads', 'Drinks', 'Desserts'],
        errName: "Please enter your full name!",
        errPhone: "Phone number is incomplete!", errAddress: "Please provide a clearer address!",
        success: "Your order has been successfully received!", som: "UZS"
      }
    };
    return content[lang] || content.uz;
  }, [lang]);

  const deliveryCards = useMemo(() => {
    const getVal = (uz, ru, en) => lang === 'en' ? en : (lang === 'ru' ? ru : uz);
    return [
      { id: 1, img: imgOne, title: getVal('Taom nomi', 'Название блюда', 'Dish Name'), desc: getVal('Taomning qisqacha tavsifi', 'Описание блюда', 'Short description'), price: '20000', category: t.navs[1] },
      { id: 2, img: imgTwo, title: getVal('Salat nomi', 'Название салата', 'Salad Name'), desc: getVal('Salatning qisqacha tavsifi', 'Описание салата', 'Short description'), price: '10000', category: t.navs[2] },
      { id: 3, img: imgThree, title: getVal('Ichimlik nomi', 'Напиток', 'Drink Name'), desc: getVal('Ichimlikning qisqacha tavsifi', 'Описание напитка', 'Short description'), price: '5000', category: t.navs[3] },
      { id: 4, img: logo, title: getVal('Shirinlik nomi', 'Десерт', 'Dessert Name'), desc: getVal('Shirinlikning qisqacha tavsifi', 'Описание десерта', 'Short description'), price: '15000', category: t.navs[4] },
      { id: 5, img: imgOne, title: getVal('Taom nomi', 'Блюдо', 'Meal Name'), desc: getVal('Taomning qisqacha tavsifi', 'Описание блюда', 'Short description'), price: '20000', category: t.navs[1] },
    ];
  }, [lang, t.navs]);

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

  const handlePhoneChange = (e) => {
    const val = e.target.value;
    if (val.startsWith('+998') && /^[0-9+]*$/.test(val)) setUserPhone(val.slice(0, 13)); 
  };
  const handlePhone2Change = (e) => {
    const val = e.target.value;
    if (val.startsWith('+998') && /^[0-9+]*$/.test(val)) setUserPhone2(val.slice(0, 13));
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    if (userName.trim().split(' ').length < 2) return toast.error(t.errName, { position: "bottom-right" });
    if (userPhone.length < 13) return toast.error(t.errPhone, { position: "bottom-right" });
    if (userAddress.trim().length < 5) return toast.error(t.errAddress, { position: "bottom-right" });

    const token = "8708223354:AAHDfvoi7knAt-ruCQDrKlyvpYOMSjlB6OE";
    const chatId = "8162236227";
    const productList = cart.map((item, index) => `${index + 1}. *${item.title}* (${item.quantity}) - ${parseInt(item.price) * item.quantity} ${t.som}`).join('\n');
    
    const orderHeader = lang === 'en' ? 'NEW ORDER (DELIVERY)' : (lang === 'ru' ? 'НОВЫЙ ЗАКАЗ (ДОСТАВКА)' : 'YANGI BUYURTMA (DELIVERY)');
    const customerLabel = lang === 'en' ? 'Customer' : (lang === 'ru' ? 'Клиент' : 'Mijoz');
    const addressLabel = lang === 'en' ? 'Address' : (lang === 'ru' ? 'Адрес' : 'Manzil');
    const totalLabel = lang === 'en' ? 'Total' : (lang === 'ru' ? 'Итого' : 'Jami');

    const message = `🛍 *${orderHeader}*\n👤 ${customerLabel}: ${userName}\n📞 Tel: ${userPhone}\n📞 Tel 2: ${userPhone2}\n🏠 ${addressLabel}: ${userAddress}\n\n🛒 Products:\n${productList}\n💰 ${totalLabel}: ${totalPrice} ${t.som}`;

    try {
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: "Markdown" }),
      });
      toast.success(t.success, { position: "bottom-right" });
      setCart([]); setUserName(''); setUserPhone('+998'); setUserPhone2('+998'); setUserAddress(''); setIsCheckoutOpen(false);
    } catch { 
      const errMsg = lang === 'en' ? "An error occurred!" : (lang === 'ru' ? "Произошла ошибка!" : "Xatolik yuz berdi!");
      toast.error(errMsg, { position: "bottom-right" }); 
    }
  };

  const filteredCards = deliveryCards.filter(c => {
    const isAll = activeNav === 'Hammasi' || activeNav === 'Все' || activeNav === 'All' || activeNav === t.navs[0];
    return isAll || c.category === activeNav;
  });

  return (
    <DeliveryPage>
      <ToastContainer position="bottom-right" autoClose={2000} />
      
      <AnimatePresence>
        {(isCartOpen || isCheckoutOpen) && (
          <CartOverlay as={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
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
        {isCheckoutOpen && (
          <CheckoutModal as={motion.div} initial={{ opacity: 0, scale: 0.8, x: '-50%', y: '-50%' }} animate={{ opacity: 1, scale: 1, x: '-50%', y: '-50%' }} exit={{ opacity: 0, scale: 0.8, x: '-50%', y: '-50%' }} style={{ position: 'fixed', left: '50%', top: '50%', zIndex: 1100 }} isOpen={true}>
            <h2>{t.confirmTitle}</h2>
            <form onSubmit={handleOrderSubmit}>
              <InputGroup><label>{t.nameLabel}</label><input type="text" placeholder={t.namePlaceholder} value={userName} onChange={(e) => setUserName(e.target.value)} /></InputGroup>
              <InputGroup><label>{t.phoneLabel}</label><input type="tel" value={userPhone} onChange={handlePhoneChange} /></InputGroup>
              <InputGroup><label>{t.phone2Label}</label><input type="tel" value={userPhone2} onChange={handlePhone2Change} /></InputGroup>
              <InputGroup><label>{t.addressLabel}</label><input type="text" placeholder={t.addressPlaceholder} value={userAddress} onChange={(e) => setUserAddress(e.target.value)} /></InputGroup>
              <div className="checkout-btns">
                <button type="button" className="cancel" onClick={() => setIsCheckoutOpen(false)}>{t.cancel}</button>
                <button type="submit" className="confirm">{t.confirm}</button>
              </div>
            </form>
          </CheckoutModal>
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
                    <span style={{ minWidth: '25px', textAlign: 'center' }}>{item.quantity}</span>
                    <button className="qty-btn" onClick={() => addToCart(item)}>+</button>
                    <div className="price-total">{parseInt(item.price) * item.quantity} {t.som}</div>
                  </div>
                </CartItemRow>
              ))}
            </div>
            <CartFooter>
              <div className="total-row"><span>{t.total}:</span><span>{totalPrice} {t.som}</span></div>
              <Button className="submit-btn" disabled={cart.length === 0} onClick={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }}>{t.next}</Button>
            </CartFooter>
          </CartModal>
        )}
      </AnimatePresence>

      <div className='max-width'>
        <HeaderWrapper>
          <BackButton onClick={() => navigate(-1)}>← {t.back}</BackButton>
          <DeliveryTitle as={motion.div} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
              <h1>{t.title}</h1>
              <p>{t.subTitle}</p>
          </DeliveryTitle>
        </HeaderWrapper>

        <CartButtonWrapper>
          <DeliveryNav style={{ width: '100%' }}>
            {t.navs.map(n => (
              <div key={n} onClick={() => setActiveNav(n === t.navs[0] ? (lang === 'en' ? 'All' : (lang === 'ru' ? 'Все' : 'Hammasi')) : n)} className={`nav-item ${activeNav === (n === t.navs[0] ? (lang === 'en' ? 'All' : (lang === 'ru' ? 'Все' : 'Hammasi')) : n) ? 'active' : ''}`}>{n}</div>
            ))}
          </DeliveryNav>
        </CartButtonWrapper>

        <DeliveryMenu>
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
                        <span style={{ minWidth: '20px', textAlign: 'center', fontWeight: 'bold' }}>{inCart.quantity}</span>
                        <Button onClick={() => addToCart(card)}>+</Button>
                      </CardControlWrapper>
                    ) : (
                      <Button as={motion.button} whileTap={{ scale: 0.9 }} onClick={() => addToCart(card)}>{t.add}</Button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </DeliveryMenu>
      </div>
      <Footer />
    </DeliveryPage>
  );
};

export default Delivery;
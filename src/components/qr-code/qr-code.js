import React, { useState,useEffect } from 'react';
import { Switch } from '@mui/material';
import axios from 'axios';
import { styled } from '@mui/system';
import  '../../styles/qr-code/qr-code.scss'
import bag from '../../assets/bag.gif'
import bagpic from '../../assets/bag1.jpeg'
import InfiniteScroll from 'react-infinite-scroll-component';

const items = [
  { id: 1, name: 'BAG', image:bagpic, lost: false },
  { id: 2, name: 'PHONE', image: bagpic, lost: false },
  { id: 3, name: 'BICYCLE', image: bag, lost: false },
  { id: 4, name: 'KEYS', image: bag, lost: false },
  { id: 5, name: 'PASSPORT', image: bag, lost: false },
  { id: 6, name: 'WALLET',image: bag, lost: false }
  
];



const ItemCard = ({ item, onToggle }) => (
  <div className="item-card">
   <div style={{display:'flex',flexDirection:"column",justifyContent:'center',alignItems:"center"}}>
   <img src={item.image} alt={item.name} className="item-image" />
<h5 style={{fontSize:'14px'}}>{item.name}</h5>
    <div className='switch-container'> 
    <span className="lost-mode-text">{item.lost ? 'Lost Mode' : 'Found'}</span>

    <div className="toggle-container" onClick={() => onToggle(item.id)}>
      <div className={`toggle-button ${item.lost ? 'active' : ''}`}></div>
    </div>
    </div>
   </div>
    
    {/* <p>{item.name}</p> */}
    
  </div>
);

const QrCode = () => {
  const [itemList, setItemList] = useState(items);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(`https://api.example.com/items?page=${page}&limit=6`);
      const newItems = response.data.items;
      setItemList((prevItems) => [...prevItems, ...newItems]);
      if (newItems.length === 0 || newItems.length < 6) {
        setHasMore(false);
      }
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const handleToggle = (id) => {
    const updatedItems = itemList.map(item =>
      item.id === id ? { ...item, lost: !item.lost } : item
    );
    setItemList(updatedItems);
  };

  return (
    <div className="app">
       <InfiniteScroll
        dataLength={itemList.length}
        next={fetchItems}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      ></InfiniteScroll>
      <div className="item-list">
        {itemList.map(item => (
          <ItemCard key={item.id} item={item} onToggle={handleToggle} />
        ))}
      </div>
      <div className="footer-buttons">
        <button className="shop-button">Shop Now</button>
        <button className="activate-qr-button">Activate QR</button>
      </div>
    </div>
  );
};

export default QrCode;

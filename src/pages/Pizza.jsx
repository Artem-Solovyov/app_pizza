import React, {useEffect, useState} from 'react';
import axios from "axios";
import cartEmpty from "../components/CartEmpty";
import {useNavigate, useParams} from "react-router-dom";

const Pizza = () => {

  const [pizza, setPizza] = useState();
  const {id} = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchPizza() {
      try {
        const {data} = await axios.get(`https://632b1dd01090510116d1c169.mockapi.io/items/${id}`)
        setPizza(data)
      } catch
          (error) {
        alert('Some error')
        navigate('/')
      }
    }

    fetchPizza()
  }, []);

  if (!pizza) {
    return <h2>Loading...</h2>
  }
  return (
      <div style={{textAlign: "center"}}>
        <h1 style={{padding: '20px 0'}}>{pizza.title}-піцца</h1>
        <h2 style={{marginTop: '-20px', marginBottom: '30px'}}>Рейтинг: {pizza.rating}/10</h2>
        <img src={pizza.imageUrl} width={'400px'} alt="Pizza"/>
        <h2 style={{padding: '20px 0'}}>{pizza.price} $</h2>
      </div>
  );
};

export default Pizza;
import React from 'react';
import {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom";

type PizzaType = {
  imageUrl: string,
  title: string,
  price: number,
  rating: number
}

const Pizza: React.FC = () => {

  const [pizza, setPizza] = useState<PizzaType>();
  const {id} = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchPizza() {
      try {
        const {data} = await axios.get(`https://632b1dd01090510116d1c169.mockapi.io/items/${id}`)
        setPizza(data)
      } catch (error) {
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
        <h1 style={{padding: '20px 0'}}>{pizza.title}-піца</h1>
        <h2 style={{marginTop: '-20px', marginBottom: '30px'}}>Рейтинг: {pizza.rating}/10</h2>
        <img src={pizza.imageUrl} width={'400px'} alt="Pizza"/>
        <h2 style={{paddingTop: '20px 0', marginBottom: '70px'}}>{pizza.price} $</h2>
        <Link to="/" className="button button--black">
          <span>Повернутись назад</span>
        </Link>
      </div>
  );
};

export default Pizza;
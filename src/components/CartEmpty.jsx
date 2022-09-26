import React from 'react';
import img  from '../assets/img/empty-cart.png'
import {Link} from "react-router-dom";

const CartEmpty = () => {
  return (
      <>
        <div className="cart cart--empty">
          <h2>Кошик порожній <icon>😕</icon></h2>
          <p>
            Найімовірніше, ви не замовляли ще піцу.<br/>
            Щоб замовити піцу, перейди на головну сторінку.
          </p>
          <img src={img} alt="Empty cart"/>
          <Link to="/" className="button button--black">
            <span>Повернутись назад</span>
          </Link>
        </div>

      </>
  );
};

export default CartEmpty;
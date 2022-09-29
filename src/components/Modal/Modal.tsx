import React from 'react';
import s from './modal.module.scss'
import {useDispatch} from "react-redux";
import {clearItems} from "../../redux/cart/cartSlice";

type PropsType = {
  visible: boolean,
  setVisible: (value: boolean) => void,
  totalPrice: number
}
const MyModal: React.FC<PropsType> = ({totalPrice, visible, setVisible}) => {
  const dispatch = useDispatch()
  const rootClasses = [s.modal]
  if (visible) {
    rootClasses.push(s.active)
  }
  const onClick = () => {
    setVisible(false)
    dispatch(clearItems())
  }
  return (
    <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
      <div className={s.modalContent} onClick={e => e.stopPropagation()}>
        <h2 className={s.text}>Ваше замовлення прийнято!</h2>
        <h4>До сплати: <b>{totalPrice}</b> $</h4>
        <h3 className={s.text}>Очікуйте кур'єра. Гарного дня!</h3>
        <div className="button pay-btn" onClick={onClick}>
          <span>Ok</span>
        </div>
        <div style={{padding: '20px'}}>Дякуємо, що обрали нас!</div>
      </div>
    </div>
  );
};

export default MyModal;
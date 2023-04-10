import { useContext, useState, useRef } from 'react';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [isInCheckout, setIsInCheckout] = useState(false);
  const [orderIsSent, setOrderIsSent] = useState(false);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const nameRef =  useRef();
  const addressRef =  useRef();

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({...item, amount: 1}); //Item has current amount on it, but we only add one at the time from cart.
  };

  const startCheckoutHandler = () => {
    setIsInCheckout(true);
  };

  const closeCartHandler = () => {
    setIsInCheckout(false);
    setOrderIsSent(false);
    props.onClose();
  };

  const sendOrderHandler = () => {
    console.log('Order sent!');
    console.log(nameRef.current.value);
    console.log(addressRef.current.value);
    cartCtx.empty();
    setOrderIsSent(true);
    };

  const cartItems = (
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
          disabled={isInCheckout}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      {!orderIsSent &&<div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>}
      {orderIsSent && <div className={classes.summary}>
        <p>The order is sent - now you can await a delicious meal</p></div>}
      {isInCheckout && !orderIsSent && <div className={classes.control}>
        <label htmlFor='name'>Name</label>
        <input type='text' id='name' ref={nameRef} />
        <label htmlFor='address'>Address</label>
        <input type='text' id='address' ref={addressRef} />
      </div>}
      <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={closeCartHandler}>
          Close
        </button>
        {hasItems && !isInCheckout && <button className={classes.button} onClick={startCheckoutHandler}>Order</button>}
        {hasItems && isInCheckout && <button className={classes.button} disabled={orderIsSent} onClick={sendOrderHandler}>Send order</button>}
      </div>
    </Modal>
  );
};

export default Cart;

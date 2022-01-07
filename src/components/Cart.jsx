import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const Cart = ({ cartInLocalStorage }) => {
  const navigate = useNavigate()
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let updatedCart = [];
    let temporaryTotal = 0

    cartInLocalStorage.forEach(cartItem => {
      fetch(`http://localhost:5002/product/${cartItem.id}`)
        .then(response => response.json())
        .then(product => {
          product.quantity = cartItem.quantity;
          updatedCart = [...updatedCart, product];
          temporaryTotal += product.price * product.quantity;
          setTotal(temporaryTotal);
          setCart(updatedCart);
        })
        .catch(error => console.error(error));
    })
  }, [cartInLocalStorage]);

  return (
    <>
      <hr />
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Ref</th>
            <th scope="col">Plat</th>
            <th scope="col">Prix unitaire</th>
            <th scope="col">Quantité</th>
            <th scope="col">Total plat</th>
          </tr>
        </thead>
        <tbody>
          {cart.map(cartItem => {
            return (
              <tr key={cartItem.id}>
                <th scope="row">{cartItem.id}</th>
                <td>{cartItem.name}</td>
                <td>{cartItem.price} €</td>
                <td>{cartItem.quantity}</td>
                <td>{cartItem.price * cartItem.quantity} €</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h3>Total commande : {total} €</h3>
    </>
  )
}

export default Cart;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5002/product')
      .then(response => response.json())
      .then(products => setProducts(products))
      .catch(error => console.error(error));
  }, []);

  const handleDelete = (id) => {
    fetch(`http://localhost:5002/product/${id}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(() => {
        setProducts(products.filter(product => product.id !== id));
      })
      .catch(error => console.error(error));
  }

  return (
    <>
      <hr />
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Ref</th>
            <th scope="col">Plat</th>
            <th scope="col">Prix</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => {
            return (
              <tr key={product.id}>
                <th scope="row">{product.id}</th>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>
                  <Link className="btn btn-primary" to={`/admin/product/${product.id}/edit`}>Modifier</Link>
                  <button className="btn btn-danger" onClick={() => { handleDelete(product.id) }}>Supprimer</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  )
}

export default ProductList;
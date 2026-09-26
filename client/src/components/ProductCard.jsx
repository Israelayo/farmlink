import "./ProductCard.css";

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />

        <span>{product.category}</span>
      </div>

      <div className="product-info">
        <span className="product-category">{product.category}</span>

        <h3>{product.name}</h3>

        <p className="product-price">
          ₽{product.price}
          <span> / {product.unit}</span>
        </p>

        <p className="product-quantity">
          {product.quantity} {product.unit} available
        </p>

        <button className="add-to-cart">Add to cart</button>
      </div>
    </article>
  );
}

export default ProductCard;

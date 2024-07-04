import PriceList from "./PriceList";

function checkPriceLength(priceList) {
  if (Array.isArray(priceList) && priceList.length > 1) {
    return <PriceList priceList={priceList} />;
  } else if (Array.isArray(priceList) && priceList.length === 1) {
    return <p>{priceList[0]}</p>;
  } else {
    return <p>No prices available</p>;
  }
}

const ProductCard = ({ product }) => {
  return (
    <div>
      <h3>
        {product.marca} {product.modelo}
      </h3>
      {checkPriceLength(product.precio)}
    </div>
  );
};

export default ProductCard;

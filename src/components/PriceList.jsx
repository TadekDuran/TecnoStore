const PriceList = ({ priceList }) => {
  return (
    <div className="flex gap-5">
      {priceList.map((price, index) => (
        <p key={index}>{price}</p>
      ))}
    </div>
  );
};
export default PriceList;

import BtnDelete from './BtnDelete';
import Count from './Count';
import priceFormatter from './../priceFormatter';

const Product = ({ product }) => {
	const { img, title, priceTotal, count, id } = product;

	return (
		<section className="product">
			<div className="product__img">
				<img src={`./img/products/${img}`} alt={title} />
			</div>
			<div className="product__title">{title}</div>
			<div className="product__count">
				<Count count={count} id={id} />
			</div>
			<div className="product__price">
				{priceFormatter.format(priceTotal)} руб.
			</div>
			<div className="product__controls">
				<BtnDelete id={id} />
			</div>
		</section>
	);
};

export default Product;

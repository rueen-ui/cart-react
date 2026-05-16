import priceFormatter from './../priceFormatter'

const Footer = ({total}) => {
	const {count, price} = total;
	return (
		<footer className="cart-footer">
			<div className="cart-footer__count">{count} ед.</div>
			<div className="cart-footer__price">{priceFormatter.format(price)} руб.</div>
		</footer>
	);
};

export default Footer;

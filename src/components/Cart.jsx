import Button from './Button';
import CartHeader from './CartHeader';
import Footer from './Footer';
import Product from './Product';
import { useEffect, useState, createContext } from 'react';
import { serverPath } from '../helpers/variables';

export const AppContext = createContext(null);

const Cart = () => {
	const [cart, setCart] = useState(null);
	const [total, setTotal] = useState(null);
	const [fetchData, setFetchData] = useState(true);

	useEffect(() => {
		fetch(`${serverPath}/products`)
			.then((res) => res.json())
			.then((data) => {
				setCart(data);
			});
	}, [fetchData]);

	useEffect(() => {
		if (cart) {
			setTotal({
				price: cart.reduce((prev, curr) => prev + curr.priceTotal, 0),
				count: cart.reduce((prev, curr) => prev + curr.count, 0),
			});
		}
	}, [cart]);

	const deleteProduct = (id) => {
		setCart((card) => cart.filter((product) => id !== product.id));
		fetch(`${serverPath}/products/${id}`, {
			method: 'DELETE',
		}).then((res) => {
			res.ok && setFetchData((value) => !value);
		});
	};

	const increase = (id) => {
		const product = cart.find((product) => id === product.id);

		const data = {
			...product,
			count: product.count + 1,
			priceTotal: (product.count + 1) * product.price,
		};

		fetch(`${serverPath}/products/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		}).then((res) => {
			res.ok && setFetchData((value) => !value);
		});
	};

	const decrease = (id) => {
		const product = cart.find((product) => id === product.id);

		const newCount = product.count > 1 ? product.count - 1 : 1;

		const data = {
			...product,
			count: newCount,
			priceTotal: newCount * product.price,
		};

		fetch(`${serverPath}/products/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		}).then((res) => {
			res.ok && setFetchData((value) => !value);
		});
	};

	const changeValue = (id, value) => {
		const product = cart.find((product) => id === product.id);

		const data = {
			...product,
			count: value,
			priceTotal: value * product.price,
		};

		fetch(`${serverPath}/products/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		}).then((res) => {
			res.ok && setFetchData((value) => !value);
		});
	};

	const addProduct = () => {
		const titles = ['Apple MacBook Air 13', 'Apple watch', 'Mac Pro'];
		const images = ['macbook.jpg', 'apple-watch.jpg', 'mac-pro.jpg'];
		const prices = [25000, 43000, 58000];
		const randomValue = (array) => {
			return array[Math.floor(Math.random() * array.length)];
		};
		const price = randomValue(prices);

		const data = {
			img: randomValue(images),
			title: randomValue(titles),
			count: 1,
			price: price,
			priceTotal: price,
		};

		fetch(`${serverPath}/products/`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		}).then((res) => {
			res.ok && setFetchData((value) => !value);
		});
	};

	const products = () => {
		return cart.map((product) => {
			return <Product product={product} key={product.id} />;
		});
	};

	return (
		<AppContext.Provider
			value={{ deleteProduct, increase, decrease, changeValue, addProduct }}
		>
			<section className="cart">
				<CartHeader />
				{cart && products()}
				{total && <Footer total={total} />}
			</section>
			<section className="btn-wrapper">
				<Button title="Add Product" />
			</section>
		</AppContext.Provider>
	);
};

export default Cart;

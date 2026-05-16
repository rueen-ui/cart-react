import Cart from "./components/Cart";
import Title from "./components/Title";

const App = () => {
	return (
	<section className="section-cart">
        <header className="section-cart__header">
            <div className="container">
                <Title />
            </div>
        </header>
        <div className="section-cart__body">
            <div className="container">
				<Cart />
            </div>
        </div>
    </section>);
}

export default App;

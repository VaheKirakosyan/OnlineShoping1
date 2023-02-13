 import { NavLink, Routes, Route } from "react-router-dom";
import "./App.css";
import { Context } from "./Components/Context";
import { useState } from "react";
import Products from "./Pages/Products";
import { AiTwotoneShopping, AiFillDelete } from "react-icons/ai";
import Payment from "./Components/Payment";
import Shop from "./Pages/Shop";
import Home from "./Pages/Home";
import { MdCloseFullscreen } from "react-icons/md";
import About from "./Pages/About";
import { useRef } from "react";

function App() {
  const [openCart, setOpenCart] = useState(false);
  const [openPay, setOpenPay] = useState(false);
  const [carts, setCarts] = useState([]);
  const [count, setCount] = useState();
  const [money, setMoney] = useState(1);
  const [total, setTotal] = useState(0);
  const [cash, setCash] = useState(Math.round(Math.random() * 50000));
  console.log(cash);

  const addElement = (element) => {
    if (carts.includes(element)) return false;
    else setCarts([...carts, element]);
  };

  const removeElement = (id) => {
    setCarts([...carts.filter((item) => item.id !== id)]);
  };

  const details = {
    addElement, total, setTotal, openPay, setOpenPay, cash,
    setCash, setCarts, carts, setMoney, setCount,
  };
  const headerRef = useRef();

window.onmousewheel = (e) => {
    if(e.deltaY === 100) {
      headerRef.current.style.top = '-400px'
    }
    else{
      headerRef.current.style.top = 0
    }
 }

  return (
    <Context.Provider value={details}>
      <div className="App">
        <header ref={headerRef}>
          <h2>
            SI<span>SHOP</span>
          </h2>
          <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/comments">Rates</NavLink>
            <NavLink to="/shop">Shop</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </nav>
          <div className="icons">
            <AiTwotoneShopping
              onClick={() => {
                document.body.style.overflow = openCart ? "visible" : "hidden";
                setOpenCart(!openCart);
              }}
            />
            <div className="count">{carts.length}</div>
          </div>
        </header>
        <Routes>
          <Route path="/comments" element={<Products />}></Route>
          <Route path="/shop" element={<Shop />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
        </Routes>
        <div
          className="cart-container"
          style={{ display: openCart ? "flex" : "none" }}
          onClick={(e) => {
            if (e.target.className === "cart-container") {
              setOpenCart(false);
              document.body.style.overflow = "visible";
            }
          }}
        >
          <div className="cart">
            <button
              className="close"
              onClick={() => {
                setOpenCart(false);
                document.body.style.overflow = "visible";
              }}
            >
              <MdCloseFullscreen />
            </button>
            <div className="cart-information"></div>
            {carts.length === 0 ? (
              <div className="empty">Cart Is Empty</div>
            ) : (
              <div className="cart-items">
                {carts.map((cart) => {
                  return (
                    <div className="cart-item" key={cart.id}>
                      <img src={cart.picture} alt="" />
                      <span className="names">
                        <h2>{cart.name}</h2>
                        <h5>{cart.made}</h5>
                        <p className="lorem">
                          Lorem ipsum dolor, sit amet consectetur adipisicing
                          elit. Deleniti quasi eius fuga iure ipsam accusantium,
                          ducimus reprehenderit in ea consequuntur!
                        </p>
                      </span>
                      <div className="for-price">
                        <h2 className="del-price">{cart.price + 250}$</h2>
                        <h2>{cart.price}$</h2>
                      </div>
                      <span className="count-point">
                        <button
                          onClick={() => {
                            if (cart.isQuan <= 1) return false;
                            else setCount((cart.isQuan -= 1));
                            setMoney((cart.data = cart.isQuan * cart.price));
                            setTotal(total - cart.price);
                          }}
                        >
                          {cart.isQuan === 1 ? (
                            <AiFillDelete
                              onClick={() => {
                                removeElement(cart.id);
                                setTotal(total - cart.data);
                                setMoney((cart.data = cart.price));
                                setCount((cart.isQuan = 1));
                              }}
                            />
                          ) : (
                            "-"
                          )}
                        </button>
                        <span>{cart.isQuan}</span>
                        <button
                          onClick={() => {
                            setCount((cart.isQuan += 1));
                            setMoney((cart.data = cart.isQuan * cart.price));
                            setTotal(total + cart.price);
                          }}
                        >
                          +
                        </button>
                      </span>
                      <h3>{cart.data}$</h3>
                    </div>
                  );
                })}
              </div>
            )}
            <div className="grand-total">
              <h2>Cart product Count {carts.length}p.</h2>
              <span>
                Grand total
                <span style={{ paddingLeft: "60px", color: "black" }}>
                  {total}$
                </span>
              </span>
              <button
                className="pay"
                onClick={() => setOpenPay(!openPay)}
                style={{
                  visibility: carts.length === 0 ? "hidden" : "visible",
                }}
              >
                Pay with Card
              </button>
            </div>
          </div>
        </div>
        <Payment />
      </div>
    </Context.Provider>
  );
}

export default App;

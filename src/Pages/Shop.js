import { useContext, useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { Context } from '../Components/Context';
import { menu } from '../Components/menu';
import { MdOutlineArrowBackIos } from 'react-icons/md';
import { memo } from 'react';
export default memo(function Shop() {
    const $ = useContext(Context)
    const [category, setCategory] = useState(menu);
    const [burger,setBurger] =useState(false)
    const [look, setLook] = useState([]);
    const [openLook, setOpenLook] = useState(false);

    const filterElements = item => {
        const effect = menu.filter(current => {
            return current.category === item
        })
        setCategory(effect);
    }
    const loaderRef = useRef();
    useEffect(() => {
        loaderRef.current.style.opacity = 1;
        loaderRef.current.style.visibility = 'visible'
        setTimeout(() => {
            loaderRef.current.style.opacity = 0;
            loaderRef.current.style.visibility = 'hidden'

        }, 3000);
    }, [category]);
    return (
        <div className="shop-container">
            <div className='look' style={{ clipPath: openLook ? 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' : 'polygon(0 0, 0 0, 0 100%, 0% 100%)' }}>
                {look.map(item => <div className='look-open'>
                    <img src={item.picture} alt="" key={item.id} />
                    <div className='look-info'>
                        <MdOutlineArrowBackIos className='arrow-right' onClick={() => {
                            setOpenLook(false)
                            setTimeout(() => {
                                setLook([]);
                            }, 500);
                        }
                        } />
                        <h2>More Information</h2>
                        <h3>{item.name}</h3>
                        <h5>{item.made}</h5>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus sed debitis error maiores similique ullam incidunt, sint delectus expedita qui earum impedit adipisci, ad repellendus, at distinctio? Ea tempora, provident quas ipsum magnam officia ullam perspiciatis repellendus, sunt quam tempore veniam exercitationem deleniti quos perferendis ipsam reprehenderit placeat saepe vitae quisquam dolore nesciunt! Eaque non, voluptatum tempore assumenda possimus accusamus.</p>
                        <div className="stars">
                            <div className="star"></div>
                            <div className="star"></div>
                            <div className="star" style={{ background: item.price < 20 ? 'gray' : 'orangered' }}></div>
                            <div className="star" style={{ background: item.price < 50 ? 'gray' : 'orangered' }}></div>
                            <div className="star" style={{ background: item.price < 100 ? 'gray' : 'orangered' }}></div>
                        </div>
                        <span>{item.price}$</span>
                        <button style={{ background: $.carts.includes(item) ? "#212121" : '#DA270C', pointerEvents: $.carts.includes(item) ? 'none' : 'unset' }} onClick={() => {
                            if ($.carts.includes(item)) {
                                return false
                            }
                            else {
                                $.addElement(item);
                                $.setTotal($.total + item.data);
                            }
                        }}>Add To Cart</button>
                    </div>
                </div>)}
            </div>
            
            <div className="tab-menu">
                <button className='burger'  onClick={()=>setBurger(!burger)}>
                &#9776;
                </button>
                {burger && (
                <>
                 <button onClick={() => setCategory(menu)}>All</button>
                <button onClick={() => filterElements('Shoes')}>Shoes</button>
                <button onClick={() => filterElements('Cap')}>Cap</button>
                <button onClick={() => filterElements('Shirt')}>Shirt</button>
                <button onClick={() => filterElements('Jewelry')}>Jewelry</button>
                <button onClick={() => filterElements('Bags')}>Bags</button>
                <button onClick={() => filterElements('Glasses')}>Glasses</button>
                <button onClick={() => filterElements('Electronics')}>Electronics</button>
                <button onClick={() => filterElements('Watches')}>Watches</button>
                <button onClick={() => filterElements('Beauty')}>Beauty & Health</button>
                <button onClick={() => filterElements('Toys')}>Toys</button>
            
                </>
                )}
                
            </div>
            <div className='shop-products'>
                <div className='loader' ref={loaderRef}>
                    <img src="https://www.triumphhomedepot.com/admin_assets/css/ajax-loader.gif" alt="" />
                </div>
                {category.map(item => {
                    return <div className='shop-item' key={item.id}>
                        <img src="https://play-lh.googleusercontent.com/z9eFRur_sNJ9wpWypApEY7-Jsr-qOugKnIPg2cXBevzwJykVZuPZDgVljTkvRn1VLdo" alt="" className='sale' />
                        <img src={item.picture} alt="" onClick={() => {
                            setLook([...look, item])
                            setOpenLook(true)
                        }} />
                        <h2>{item.name}</h2>
                        <h3>{item.made}</h3>
                        <p className='cont'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum, culpa magni voluptatum eius</p>
                        <span style={{ color: 'red', textDecoration: 'line-through' }}>{item.price + 35}$</span>
                        <div className="star-cont">
                            <span>{item.price}$</span>
                            <div className="stars">
                                <div className="star"></div>
                                <div className="star"></div>
                                <div className="star" style={{ background: item.price < 20 ? 'gray' : 'orangered' }}></div>
                                <div className="star" style={{ background: item.price < 50 ? 'gray' : 'orangered' }}></div>
                                <div className="star" style={{ background: item.price < 100 ? 'gray' : 'orangered' }}></div>
                           </div>
                        </div>
                        <button onClick={(e) => {
                            $.addElement(item);
                            if ($.carts.includes(item)) {
                                e.target.parentElement.classList.add('shake');
                                setTimeout(() => {
                                    e.target.parentElement.classList.remove('shake');
                                }, 500);
                                return false
                            }
                            else {
                                $.setTotal($.total + item.data);
                                e.target.children[0].classList.add('show');
                                setTimeout(() => {
                                    e.target.children[0].classList.remove('show');
                                }, 1000);
                            }
                        }}>Add To Cart
                            <span className='add'>+1</span>
                        </button>
                    </div>
                })}
            </div>
        </div>
    )
}
)
import { useContext, useState } from "react";
import { Context } from "../Components/Context";
import { comments } from "../Components/comments";
import Zoom from 'react-medium-image-zoom';
import { memo } from "react";
export default memo(function Products() {
    const $ = useContext(Context);
    const [value, setValue] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const filterProducts = comments.filter(item => {
        return item.brand.toLowerCase().includes(value.toLowerCase());
    })
    return (
        <div className="products">
            <div className="products-show"></div>
            <label htmlFor="">
                <input type="text" value={value} placeholder="Search Comment..." onChange={(e) => {
                    setValue(e.target.value);
                }}
                    onClick={() => setShowSearch(true)}
                />
                <ul className="search-menu">
                    {value && showSearch ?
                        filterProducts.map(item => <li className="menu-item" onClick={(e) => {
                            setValue(e.target.textContent);
                            setShowSearch(!showSearch)
                        }}>{item.brand}</li>) : null}
                </ul>
            </label>
            <div className="watches">
                {filterProducts.map(product => {
                    return <div className="watches-item" key={product.id}>
                        <h2>{product.brand}</h2>
                        <Zoom>
                            <img src={product.picture} alt="" />
                        </Zoom>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, at. Dolore praesentium quibusdam aliquid delectus veniam distinctio fuga in quos architecto! Vel commodi repellendus beatae molestias quia reiciendis cumque tempora, reprehenderit, soluta error nostrum. Veritatis itaque vero, nesciunt soluta labore temporibus facilis officiis possimus cum corporis</p>
                    </div>
                })}
            </div>
        </div>
    )
}
)
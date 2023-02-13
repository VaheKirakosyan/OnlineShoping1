import { memo, useState } from "react";
import { products } from "../Components/products";
import {HiArrowLeft} from 'react-icons/hi';

export default memo(function About() {
const[about,setAbout]=useState([]);
const[openAbout,setOpenAbout]=useState(false)

    return (
        <>
            <div className="products">
           <div className="watch-more" style={{display:openAbout ? 'flex':'none'}}>
           {about.map(item=>{
            return <div className="watch-more-item" key={item.id}>
            <img src={item.picture} key={item.id} alt='' />
            <div className="watch-more-flex">
            <HiArrowLeft className='arrow-right' onClick={() => {
                setOpenAbout(false)
                setTimeout(() => {
                    setAbout([]);
                }, 500);
                }
                } />
            <h1>{item.category}</h1>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis cumque tenetur reiciendis, consectetur quam quaerat tempora iure eum magni minima ipsa impedit veritatis omnis temporibus, consequuntur nemo placeat et voluptas!</p>
            </div>
            </div>
           })}
           </div>
                    <div className="product">
                    {products.map(product => {
                        return <div className="product-item" key={product.id}>
                            <h3>{product.category}</h3>
                            <img src={product.picture} />
                            <button onClick={()=>{
                            setAbout([...about,product])
                            setOpenAbout(true)
                            }}>Watch More</button>
                        </div>
                    })}
                </div>
            </div>
        </>
    )
}
)
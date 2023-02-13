import { useRef } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react"
import { AutoTabProvider } from "react-auto-tab"
import { Context } from "./Context";
import { AiFillInstagram, AiFillFacebook, AiFillTwitterCircle, AiFillLinkedin } from 'react-icons/ai'
import { memo } from "react";

export default memo(function Payment() {
    const $ = useContext(Context);
    const [valid, setValid] = useState({
        name: '', surname: '', number: '', cvv: '', region: '',
        code: '', num1: '', num2: '', num3: ''
    });
    const validName = /^[A-Z][a-z]+$/;
    const validNumber = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
    const validCVV = /^\d{3}$/;
    const validRegion = /^\+\d{3}$/;
    const validNum = /^\d{2}$/;
    const nameRef = useRef();
    const surnameRef = useRef();
    const numberRef = useRef();
    const cvvRef = useRef();
    const phoneRef = useRef();

    const [payMessage, setPayMessage] = useState('');
    const [payBollean, setPayBollean] = useState(false);
    let paymessage;

    useEffect(() => {
        paymessage = document.querySelector('.paymessage');
    })

    const numberChange = e => {
        if (valid.number.length === 3 || valid.number.length === 8 || valid.number.length === 13) {
            setValid({ ...valid, number: e.target.value.concat('-') })
        }
        else {
            setValid({ ...valid, number: e.target.value })
        }
    }

    const numberKeyChange = e => {
        if (valid.number.length === 3 || valid.number.length === 8 || valid.number.length === 13) {
            if (e.key === 'Backspace') {
                e.preventDefault()
                setValid({ ...valid, number: e.target.value.slice(0, -1) })
            }
        }
    }

    return (
        <div className="payment" style={{ display: $.openPay ? 'flex' : 'none' }} onClick={(e) => {
            if (e.target.className === 'payment') {
                e.target.style.display = 'none';
                $.setOpenPay(false);
            }
        }}>
            <form>
                <h2>Pay with Master / Visa card</h2>
                <img src="https://icon-library.com/images/visa-master-icon/visa-master-icon-9.jpg" alt="" />
                <AutoTabProvider>
                    <div className="for-name">
                        <label>
                            <div className="invalid" ref={nameRef}>!</div>
                            <input type='text' placeholder="Name" tabbable="false" value={valid.name} onChange={(e) => setValid({ ...valid, name: e.target.value })} />

                        </label>
                        <label>
                            <div className="invalid" ref={surnameRef}>!</div>
                            <input type='text' placeholder="Surname" tabbable="false" value={valid.surname} onChange={(e) => setValid({ ...valid, surname: e.target.value })} /></label>
                    </div>



                    <label>
                        <div className="invalid" ref={numberRef}>!</div>
                        <input type="text" placeholder="XXXX-XXXX-XXXX-XXXX" tabbable="false" maxLength={19} value={valid.number} onChange={(e) => numberChange(e)} onKeyDown={(e) => numberKeyChange(e)} /></label>


                    <label>
                        <div className="invalid" ref={cvvRef}>!</div>
                        <input type="text" placeholder="CVV code" tabbable="false" maxLength={3} value={valid.cvv} onChange={(e) => setValid({ ...valid, cvv: e.target.value })} /></label>
                    <div className="phone">
                        <label>
                            <div className="invalid" ref={phoneRef}>!</div>

                            <input type="text" placeholder="+374" tabbable="false" maxLength={4} value={valid.region} onChange={(e) => setValid({ ...valid, region: e.target.value })} />

                            <input type="text" placeholder="43" tabbable="false" maxLength={2} value={valid.code} onChange={(e) => setValid({ ...valid, code: e.target.value })} />

                            <input type="text" placeholder="XX" tabbable="false" maxLength={2} value={valid.num1} onChange={(e) => setValid({ ...valid, num1: e.target.value })} />

                            <input type="text" placeholder="XX" tabbable="false" maxLength={2} value={valid.num2} onChange={(e) => setValid({ ...valid, num2: e.target.value })} />

                            <input type="text" placeholder="XX" tabbable="false" maxLength={2} value={valid.num3} onChange={(e) => setValid({ ...valid, num3: e.target.value })} />
                        </label>
                    </div>
                </AutoTabProvider>
                <div className="social">
                    <AiFillFacebook />
                    <AiFillInstagram />
                    <AiFillLinkedin />
                    <AiFillTwitterCircle />
                </div>
                <button onClick={(e) => {
                    paymessage.style.opacity = 1
                    e.preventDefault();
                    nameRef.current.style.opacity = valid.name.match(validName) ? 0 : 1

                    surnameRef.current.style.opacity = valid.surname.match(validName) ? 0 : 1

                    numberRef.current.style.opacity = valid.number.match(validNumber) ? 0 : 1

                    cvvRef.current.style.opacity = valid.cvv.match(validCVV) ? 0 : 1

                    phoneRef.current.style.opacity = valid.region.match(validRegion) && valid.code.match(validNum) && valid.num1.match(validNum) && valid.num2.match(validNum) && valid.num3.match(validNum) ? 0 : 1;

                    if (valid.name.match(validName) && valid.surname.match(validName) && valid.number.match(validNumber) && valid.cvv.match(validCVV) && valid.region.match(validRegion) && valid.code.match(validNum) && valid.num1.match(validNum) && valid.num2.match(validNum) && valid.num3.match(validNum)) {
                        if ($.cash >= $.total) {
                            $.setCash($.cash - $.total);
                            $.setTotal(0);
                            setPayBollean(true);
                            $.setCarts([]);
                            setPayMessage('Your Payment is succesfuull, Promo code send in your phone');
                            $.carts.map(cart => {
                                $.setMoney(cart.data = cart.price);
                                $.setCount(cart.isQuan = 1)
                            })
                            setValid({
                                name: '', surname: '', number: '', cvv: '', region: '',
                                code: '', num1: '', num2: '', num3: ''
                            });
                            setTimeout(() => {
                                paymessage.style.opacity = 0
                            }, 2000);
                        }
                        else {
                            setPayBollean(false);
                            setPayMessage('Not Enough money')
                        }
                    }
                    else {
                        setPayBollean(false);
                        setPayMessage('The Places not correct')
                    }
                }}>Pay</button>
                <p className="paymessage" style={{ color: payBollean ? 'green' : 'red' }}>{payMessage}</p>
            </form>
        </div>
    )
}
)
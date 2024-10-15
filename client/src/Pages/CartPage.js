import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layout/Layout'
import { useAuth } from '../Context/auth'
import { useCart } from '../Context/Cart';
import { useNavigate } from 'react-router-dom';
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios';
import { toast } from 'react-toastify';


const CartPage = () => {
    const [auth] = useAuth();
    const [cart, setcart] = useCart();
    const [clientToken, setClientToken] = useState("")
    const [instanse, setinstance] = useState("");
    const [loading, setLoading] = useState(false)
    const Navigate = useNavigate();

    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map((Item) => {
                return (
                    total = total + Item.price)
            });
            return total.toLocaleString("en-US", {
                style: "currency",
                currency: "USD"
            })
        } catch (error) {
            console.log(error)
        }
    }
    const RemoveCartItem = (pid) => {
        try {
            let myCart = [...cart]
            let index = myCart.findIndex(Item => Item._id === pid);
            myCart.splice(index, 1);
            setcart(myCart)
            localStorage.setItem('cart', JSON.stringify(myCart))
        } catch (error) {
            console.log(error)
        }
    }
    //Get Payment GateWay
    const getToken = async () => {
        try {
            const { data } = await axios.get('http://localhost:8080/api/v1/product/braintree/token')
            setClientToken(data?.clientToken)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getToken()
    }, [auth?.token])
    //HAndle Payment
    const handlePayment = async () => {
        try {
            setLoading(true);
            const { nonce } = await instanse.requestPaymentMethod();
          await axios.post('http://localhost:8080/api/v1/product/braintree/payments', {
                nonce, cart
            })
            setLoading(false);
            localStorage.removeItem('cart')
            setcart([])
            Navigate('/dashboard/user/orders')
            toast.success('Payment Completed Successfully')
        } catch (error) {
            console.log(error)
            setLoading(false);
        }
    }
    return (
        <Layout>
            <div className="container">
                <div className="row">
                    <div className="col-md-12 bg-light cartpagetop">
                        <h1 className='text-center bg-light p-2 mb-1'>
                            {`Hello ${auth?.token && auth?.user?.name}`}
                        </h1>
                        <h4 className='text-center'>
                            {cart?.length > 0 ? `You have ${cart.length} items in your cart ${auth?.token ? "" : "Please Login to checkout"
                                }` : "Your Cart is Empty"}
                        </h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-7 ">
                        {cart?.map((p) => {
                            return (
                                <div className="row card flex-row mb-2 cartpagetop">
                                    <div className="col-md-4">
                                        <img src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`} height="100px" style={{ width: "100px" }} className="card-img-top" alt={p.name} />
                                    </div>
                                    <div className="col-md-8">
                                        <p>{p.name}</p>
                                        <p>{p.description}</p>
                                        <p>${p.price}</p>
                                        <button className='btn btn-danger mb-1' onClick={() => { RemoveCartItem(p._id) }}>Remove Cart</button>
                                    </div>

                                </div>
                            )
                        })}
                    </div>
                    <div className="col-md-4 cardrightside">
                        <h2>Cart Summary</h2>
                        <p>Total || Checkout || Payment</p>
                        <hr />
                        <h4>Total: {totalPrice()}</h4>
                        {auth?.user?.address ? (
                            <>
                                <div className="mb-3">
                                    <h4>Current Address</h4>
                                    <h6>{auth?.user?.address}</h6>
                                    <button className='btn btn-primary' onClick={() => {
                                        Navigate('/dashboard/user/profile')
                                    }}>Update Address</button>
                                </div>
                            </>
                        ) : (
                            <div className="mb-3">
                                {auth?.token ? (
                                    <button className='btn btn-primary' onClick={() => {
                                        Navigate('/dashboard/user/profile')
                                    }}></button>
                                ) : (
                                    <button className='btn btn-primary' onClick={() => {
                                        Navigate('/login', {
                                            state: "/cart",
                                        })
                                    }}>Please Login to CheckOut</button>
                                )}

                            </div>
                        )}
                        <div className="mt-2">
                            {
                                !clientToken || !cart?.length ? ("") : (
                                    <>
                                        <DropIn
                                            options={{
                                                authorization: clientToken,
                                                paypal: {
                                                    flow: 'vault'
                                                }
                                            }}
                                            onInstance={instanse => setinstance(instanse)}
                                        />
                                        <button className='btn btn-primary' onClick={handlePayment} disabled={loading || !instanse || !auth?.user?.address}>{loading ? "Processing" : "Make Payment"}</button>
                                    </>
                                )
                            }

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CartPage

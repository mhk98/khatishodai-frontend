import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import useEcomerce from '~/hooks/useEcomerce';
import { useRouter } from 'next/navigation';
import { useCreateCartMutation } from '~/react-redux/features/cart/cart';
import { notification } from 'antd';

const ModuleDetailActionsMobile = ({ product }) => {
    // const { addItem } = useEcomerce();
    // const ecomerce = useSelector(({ ecomerce }) => ecomerce);

    // const handleAddItemToCart = (e) => {
    //     e.preventDefault();
    //     addItem({ id: product.id, quantity: 1 }, ecomerce.cartItems, 'cart');
    //     Router.push('/account/shopping-cart');
    // };

    // const handleBuyNow = (e) => {
    //     e.preventDefault();
    //     addItem({ id: product.id, quantity: 1 }, ecomerce.cartItems, 'cart');
    //     Router.push('/account/checkout');
    // };

      const [cart, setCart] = useState([]);
    
    
        const [createCart] = useCreateCartMutation();
        
            const handleAddItemToCart = async (product) => {
                if (cart.some((item) => item.product_id === product.id)) {
                    notification.warning({
                        message: "Already in cart",
                        description: "This product is already in your cart.",
                    });
                } else if (!userLoggedIn) {
                    router.push("/account/login");
                } else {
                    const newCartItem = {
                        title: product.title,
                        price: product.price,
                        default_image: product.default_image,
                        weight: 1,
                        quantity: 1,
                        product_id: product.id,
                        user_id: id,
                    };
        
                    const updatedCart = [...cart, newCartItem];
                    setCart(updatedCart);
        
                    try {
                        const res = await createCart(newCartItem);
                        console.log("createCart response:", res);
        
                        if (res?.data?.success) {
                            // Save to local storage
                            localStorage.setItem("cart", JSON.stringify(updatedCart));
        
                            notification.success({
                                message: "Success",
                                description: "Product added to your cart successfully!",
                            });
                        } else {
                            notification.error({
                                message: "Error",
                                description: res?.error?.data?.message || "Failed to add product to cart.",
                            });
                        }
                    } catch (err) {
                        console.error("Cart add error:", err);
                        notification.error({
                            message: "Error",
                            description: "Something went wrong while adding to cart.",
                        });
                    }
                }
            };

    return (
        <div className="ps-product__actions-mobile">
            <a
                className="ps-btn ps-btn--black"
                href="#"
                onClick={() => handleAddItemToCart(product)}
            >
                Add to cart
            </a>
            {/* <a className="ps-btn" href="#" onClick={(e) => handleBuyNow(e)}>
                Buy Now
            </a> */}
        </div>
    );
};

export default ModuleDetailActionsMobile;

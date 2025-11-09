import React, { useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import useProduct from '~/hooks/useProduct';
import useEcomerce from '~/hooks/useEcomerce';
import { useCreateCartMutation } from '~/react-redux/features/cart/cart';
import { notification } from 'antd';
import { isLoggedIn } from '~/components/services/auth.service';
import { useRouter } from 'next/navigation';

const OnHeaderProduct = ({ product }) => {
    // const ecomerce = useSelector(({ ecomerce }) => ecomerce);
    // const { thumbnailImage, price, title } = useProduct(
    //     product.attributes,
    //     product.id
    // );
    // const { addItem } = useEcomerce();

    // function handleAddItemToCart(e) {
    //     e.preventDefault();
    //     addItem({ id: product.id, quantity: 1 }, ecomerce.cartItems, 'cart');
    // }
    const userLoggedIn = isLoggedIn();
    const router = useRouter()

    const [cart, setCart] = useState([]);


    const [createCart] = useCreateCartMutation();
  console.log("OnHeaderProduct", product)
    
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

    console.log("OnHeaderProduct ~ product", product)
    return (
        <div className="ps-product--header-sticky">
            <div className="ps-product__thumbnail">
                <Link href={'/product/[pid]'} as={`/product/${product.id}`}>
                    {<img src={`https://backend.eaconsultancy.info/${product?.default_image}`} alt="Khatishodai" />}
                </Link>
            </div>
            <div className="ps-product__wrapper">
                <div className="ps-product__content">{product.title}</div>
                <div className="ps-product__shopping">
                    ৳{product.price}
                    <a
                        className="ps-btn"
                        style={{ marginLeft: '10px', backgroundColor: '#333', color: '#fff' }}
                        type="button"

                        onClick={() => handleAddItemToCart(product)}
                    >

                        
                        Add to Cart
                    </a>
                </div>
            </div>
        </div>
    );
};

export default OnHeaderProduct;

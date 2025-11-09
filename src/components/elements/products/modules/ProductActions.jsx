'use client';
import React, { useEffect, useState } from 'react';
import { Button, Modal, notification } from 'antd';
import { useSelector } from 'react-redux';
import ProductDetailQuickView from '~/components/elements/detail/ProductDetailQuickView';
import { useCreateCartMutation, useGetCartDataByIdQuery } from '~/react-redux/features/cart/cart';
import { getUserInfo, isLoggedIn } from '~/components/services/auth.service';
import { useRouter } from 'next/navigation';

const ProductActions = ({ product }) => {
    const ecomerce = useSelector(({ ecomerce }) => ecomerce);
    const [isQuickView, setIsQuickView] = useState(false);

    const router = useRouter();
    const userLoggedIn = isLoggedIn();
    const token = getUserInfo();
    const id = token?.userId;

    // Fetch cart by user id
    const { data, isLoading, isError, error } = useGetCartDataByIdQuery(id);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        if (isError) {
            console.error("Error fetching cart data:", error);
        } else if (!isLoading && data?.data) {
            setCart(data.data);
        }
    }, [data, isLoading, isError, error]);

    const [createCart] = useCreateCartMutation();
  console.log("ProductActions", product)

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
        <ul className="ps-product__actions">
            <li>
                <Button
                    title="Add To Cart"
                    onClick={() => handleAddItemToCart(product)}
                    >
                    <i className="icon-bag2" />
                </Button>
            </li>
            <li>
                <Button
                    title="Quick View"
                    onClick={() => setIsQuickView(true)}>
                    <i className="icon-eye" />
                </Button>
            </li>

            <Modal
                centered
                footer={null}
                width={1024}
                onCancel={() => setIsQuickView(false)}
                open={isQuickView} // ✅ AntD v5 (if v4 use `visible`)
                closeIcon={<i className="icon icon-cross2" />}>
                <h3>Quickview</h3>
                <ProductDetailQuickView product={product} />
            </Modal>
        </ul>
    );
};

export default ProductActions;

import React, { useEffect, useState } from 'react';
import { useCreateCartMutation, useGetAllCartQuery } from '~/react-redux/features/cart/cart';
import toast from 'react-hot-toast';
import { getUserInfo, isLoggedIn } from '~/components/services/auth.service';
import { useRouter } from 'next/navigation';
import { notification } from 'antd';

const ModuleDetailShoppingActions = ({product}) => {
    // const [quantity, setQuantity] = useState(1);
    const router = useRouter();
      const userLoggedIn = isLoggedIn();
    const token = getUserInfo();
    const id = token?.userId; // user id যদি থাকে

    // function handleAddItemToCart(e) {
    //     e.preventDefault();
    //     addItem(
    //         { id: product.id, quantity: quantity },
    //         ecomerce.cartItems,
    //         'cart'
    //     );
    // }

    const { data, isLoading, isError, error } = useGetAllCartQuery();
    const [cart, setCart] = useState([]);
  
    useEffect(() => {
      if (isError) {
        // Handle error, you can log it or display an error message.
        console.error2("Error fetching cart data:", error);
      } else if (!isLoading) {
        // Only set the cart if there is data and it's not already set to avoid infinite re-renders.
        if (data && data.data) {
          setCart(data.data);
        }
      }
    }, [data, isLoading, isError, error]);
  
    const [createCart] = useCreateCartMutation();
  
    // const handleAddItemToCart = (product) => {

    //     console.log('product', product)

    //   if (cart.some((item) => item.product_id === product.id)) {
    //     alert("This product is already in the cart.");
    //   } else {
    //     // Create a new cart with the added product
    //     const updatedCart = [...cart, product];
  
    //     setCart(updatedCart);
    //     const data = {
    //       title: product.title,
    //       price: product.price,
    //       default_image: product.default_image,
    //       quantity:1
         
    //     };
    //     console.log("cart data here", product);
    //     createCart(data);
    //     // Save the updated cart data to local storage
    //     localStorage.setItem("cart", JSON.stringify(updatedCart));
  
    //     // Show a success toast message to indicate that the product has been added
    //     toast.success("This product has been added to your cart");
    //   }
    // };

    // const handleAddItemToCart = (product) => {
    //     console.log("productId", product)
    //     if (cart.some((item) => item.product_id === product.id)) {
    //         alert("This product is already in the cart.");
    //     } else {
    //         const updatedCart = [...cart, {
    //             title: product.title,
    //             price: product.price,
    //             default_image: product.default_image,
    //             weight:1,
    //             quantity: 1,
    //         }];
    
    //         setCart(updatedCart);
    
    //         // Save only the serializable cart data
    //         localStorage.setItem("cart", JSON.stringify(updatedCart));
    //         createCart({
    //             title: product.title,
    //             price: product.price,
    //             default_image: product.default_image,
    //             weight:1,
    //             quantity: 1,
    //         });
            
    //         toast.success("This product has been added to your cart");
    //     }
    // };
    
 const handleAddItemToCart = async(product) => {
    console.log('productAction', product)
    if (cart.some((item) => item.product_id === product.id)) {
      alert("This product is already in the cart.");
    } else if(!userLoggedIn){
      router.push("/account/login");

    }else {
      // Create a new cart with the added product
      const updatedCart = [...cart, product];

      setCart(updatedCart);
      const data = {
        title: product.title,
        price: product.price,
        default_image: product.default_image,
        weight:1,
        product_id:product.id,
        user_id:id,
       
      };
      // console.log("cart data here", product);
      // createCart(data);
      // // Save the updated cart data to local storage
      // localStorage.setItem("cart", JSON.stringify(updatedCart));

      // // Show a success toast message to indicate that the product has been added
      // toast.success("Product added to the cart");


       try {
              const res = await createCart(data);
              console.log("createCart response:", res);
      
              if (res?.data?.success) {
                localStorage.setItem("cart", JSON.stringify(updatedCart));
      
                notification.success({
                  message: "Success",
                  description: "Product added to your cart successfully!",
                });
              } else {
                notification.error({
                  message: "Error",
                  description:
                    res?.error?.data?.message || "Failed to add product to cart.",
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

    // function handleBuynow(e) {
    //     e.preventDefault();
    //     addItem(
    //         { id: product.id, quantity: quantity },
    //         ecomerce.cartItems,
    //         'cart'
    //     );
    //     setTimeout(function () {
    //         Router.push('/account/checkout');
    //     }, 1000);
    // }

    // const handleAddItemToCompare = (e) => {
    //     e.preventDefault();
    //     e.preventDefault();
    //     addItem({ id: product.id }, ecomerce.compareItems, 'compare');
    //     const modal = Modal.success({
    //         centered: true,
    //         title: 'Success!',
    //         content: `This product has been added to compare listing!`,
    //     });
    //     modal.update;
    // };

    // const handleAddItemToWishlist = (e) => {
    //     e.preventDefault();
    //     addItem({ id: product.id }, ecomerce.wishlistItems, 'wishlist');
    //     const modal = Modal.success({
    //         centered: true,
    //         title: 'Success!',
    //         content: `This item has been added to your wishlist`,
    //     });
    //     modal.update;
    // };

    // function handleIncreaseItemQty(e) {
    //     e.preventDefault();
    //     setQuantity(quantity + 1);
    // }

    // function handleDecreaseItemQty(e) {
    //     e.preventDefault();
    //     if (quantity > 1) {
    //         setQuantity(quantity - 1);
    //     }
    // }
    // if (!extended) {
    //     return (
    //         <div className="ps-product__shopping">
    //             <figure>
    //                 <figcaption>Quantity</figcaption>
    //                 <div className="form-group--number">
    //                     <button
    //                         className="up"
    //                         onClick={(e) => handleIncreaseItemQty(e)}>
    //                         <i className="fa fa-plus" />
    //                     </button>
    //                     <button
    //                         className="down"
    //                         onClick={(e) => handleDecreaseItemQty(e)}>
    //                         <i className="fa fa-minus" />
    //                     </button>
    //                     <input
    //                         className="form-control"
    //                         type="text"
    //                         placeholder={quantity}
    //                         disabled
    //                     />
    //                 </div>
    //             </figure>
    //             <a
    //                 className="ps-btn ps-btn--black"
                
    //                 onClick={(e) => handleAddItemToCart(e)}>
    //                 Add to cart
    //             </a>
    //             {/* <a className="ps-btn" href="#" onClick={(e) => handleBuynow(e)}>
    //                 Buy Now
    //             </a> */}
    //             {/* <div className="ps-product__actions">
    //                 <a href="#" onClick={(e) => handleAddItemToWishlist(e)}>
    //                     <i className="icon-heart" />
    //                 </a>
    //                 <a href="#" onClick={(e) => handleAddItemToCompare(e)}>
    //                     <i className="icon-chart-bars" />
    //                 </a>
    //             </div> */}
    //         </div>
    //     );
    // } else {
        
    // }


    return (
        <div className="ps-product__shopping extend">
            <div className="ps-product__btn-group">
                {/* <figure>
                    <figcaption>Quantity</figcaption>
                    <div className="form-group--number">
                        <button
                            className="up"
                            onClick={(e) => handleIncreaseItemQty(e)}>
                            <i className="fa fa-plus" />
                        </button>
                        <button
                            className="down"
                            onClick={(e) => handleDecreaseItemQty(e)}>
                            <i className="fa fa-minus" />
                        </button>
                        <input
                            className="form-control"
                            type="text"
                            placeholder={quantity}
                            disabled
                        />
                    </div>
                </figure> */}
                <a
                    className="ps-btn ps-btn--black"
                            type="button"

                    // onClick={() => handleAddItemToCart(product)}
                    onClick={() => handleAddItemToCart(product)}>
                    
                    Add to cart
                </a>
                {/* <div className="ps-product__actions">
                    <a href="#" onClick={(e) => handleAddItemToWishlist(e)}>
                        <i className="icon-heart" />
                    </a>
                    <a href="#" onClick={(e) => handleAddItemToCompare(e)}>
                        <i className="icon-chart-bars" />
                    </a>
                </div> */}
            </div>
            {/* <a className="ps-btn" href="#" onClick={(e) => handleBuynow(e)}>
                Buy Now
            </a> */}
        </div>
    );
};

// export default connect((state) => state)(ModuleDetailShoppingActions);


export default ModuleDetailShoppingActions;
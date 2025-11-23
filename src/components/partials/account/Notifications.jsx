// import React, { useEffect, useState } from 'react';
// import AccountMenuSidebar from './modules/AccountMenuSidebar';
// import TableNotifications from './modules/TableNotifications';

// export default function Notifications() {
//     const accountLinks = [
//         {
//             text: 'Account Information',
//             url: '/account/user-information',
//             icon: 'icon-user',
//         },
//         {
//             text: 'Order',
//             url: '/account/notifications',
//             icon: 'icon-alarm-ringing',
//             active: true,
//         },
//         // {
//         //     text: 'Invoices',
//         //     url: '/account/invoices',
//         //     icon: 'icon-papers',
//         // },
//         // {
//         //     text: 'Address',
//         //     url: '/account/addresses',
//         //     icon: 'icon-papers',
//         // },
//         // {
//         //     text: 'Recent Viewed Product',
//         //     url: '/account/recent-viewed-product',
//         //     icon: 'icon-papers',
//         // },
//         // {
//         //     text: 'Wishlist',
//         //     url: '/account/wishlist',
//         //     icon: 'icon-papers',
//         // },
//     ];

//  const [userId, setUserId] = useState(null);

// useEffect(() => {
//   setUserId(localStorage.getItem('userId'));
// }, []);

//     const [order, setOrder] = useState(null);

    
//     // Fetch user info when component loads
//   useEffect(() => {
//     const fetchOrder = async () => {
//         try {
//             const res = await fetch(`http://localhost:5000/api/v1/order/${userId}`);
//             const json = await res.json();

//             if (res.ok && json.data) {
//                 const parsedOrder = {
//                     ...json.data,
//                     cartProducts: JSON.parse(json.data.cartProducts), // ✅ parse here
//                 };

//                 setOrder(parsedOrder);
//             }
//         } catch (err) {
//             console.error('Error fetching order:', err);
//         }
//     };

//     if (userId) fetchOrder();
// }, [userId]);


//     console.log('user information', order);


//     return (
//         <section className="ps-my-account ps-page--account">
//             <div className="container">
//                 <div className="row">
//                     <div className="col-lg-4">
//                         <div className="ps-page__left">
//                             <AccountMenuSidebar data={accountLinks} />
//                         </div>
//                     </div>
//                     <div className="col-lg-8">
//                         <div className="ps-page__content">
//                             <div className="ps-section--account-setting">
//                                 <div className="ps-section__header">
//                                     <h3>Product</h3>
//                                 </div>
//                                 <div className="ps-section__content">
//                                     <TableNotifications data={order}/>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }





import React, { useEffect, useState } from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import TableNotifications from './modules/TableNotifications';
import { getUserInfo } from '~/components/services/auth.service';

export default function Notifications() {
    const accountLinks = [
        {
            text: 'Account Information',
            url: '/account/user-information',
            icon: 'icon-user',
        },
        {
            text: 'Order',
            url: '/account/notifications',
            icon: 'icon-alarm-ringing',
            active: true,
        },
    ];

    // const [userId, setUserId] = useState(null);
    const [order, setOrder] = useState(null);

    // useEffect(() => {
    //     const storedUserId = localStorage.getItem('userId');
    //     setUserId(storedUserId);
    // }, []);

     const token = getUserInfo();
        const id = token?.userId; // ✅ user_id fix করা হলো

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/v1/order/${id}`);
                const json = await res.json();

                if (res.ok && json.data) {
                    const parsedOrder = {
                        ...json.data,
                        cartProducts: JSON.parse(json.data.cartProducts),
                    };
                    setOrder(parsedOrder);
                }
            } catch (err) {
                console.error('Error fetching order:', err);
            }
        };

        if (id) {
            fetchOrder();
        }
    }, [id]);

    return (
        <section className="ps-my-account ps-page--account">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="ps-page__left">
                            <AccountMenuSidebar data={accountLinks} />
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="ps-page__content">
                            <div className="ps-section--account-setting">
                                <div className="ps-section__header">
                                    <h3>Product</h3>
                                </div>
                                <div className="ps-section__content">
                                    <TableNotifications data={order} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

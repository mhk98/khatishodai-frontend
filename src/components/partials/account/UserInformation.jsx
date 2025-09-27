// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import FormChangeUserInformation from '~/components/shared/FormChangeUserInformation';

// const UserInformation = () => {
//     const accountLinks = [
//         {
//             text: 'Account Informations',
//             url: '/account/user-information',
//             icon: 'icon-user',
//             active: true,
//         },
//         {
//             text: 'Order',
//             url: '/account/notifications',
//             icon: 'icon-alarm-ringing',
//         },
//         // {
//         //     text: 'Invoices',
//         //     url: '/account/invoices',
//         //     icon: 'icon-papers',
//         // },
//         // {
//         //     text: 'Address',
//         //     url: '/account/addresses',
//         //     icon: 'icon-map-marker',
//         // },
//         // {
//         //     text: 'Recent Viewed Product',
//         //     url: '/account/recent-viewed-product',
//         //     icon: 'icon-store',
//         // },
//         // {
//         //     text: 'Wishlist',
//         //     url: '/account/wishlist',
//         //     icon: 'icon-heart',
//         // },
//     ];



//    const [userId, setUserId] = useState(null);

// useEffect(() => {
//   setUserId(localStorage.getItem('userId'));
// }, []);

//     const [user, setUser] = useState(null);

    
//     // Fetch user info when component loads
//     useEffect(() => {
//         const fetchUserInfo = async () => {
//             try {
//                 const res = await fetch(
//                     `http://localhost:5000/api/v1/user/${userId}`
//                 );
//                 const data = await res.json();

//                 if (res.ok) {
//                     setUser(data.data);
//                     if (data.phone) {
//                         // Extract country code & number
//                         const matchedCode = countryCodes.find((c) =>
//                             data.phone.startsWith(c.code)
//                         );
//                         if (matchedCode) {
//                             setSelectedCode(matchedCode.code);
//                             setPhone(data.phone.replace(matchedCode.code, ''));
//                         }
//                     }
//                 }
//             } catch (err) {
//                 console.error('Error fetching user info:', err);
//             }
//         };

//         if (userId) fetchUserInfo();
//     }, [userId]);

//     console.log('user information', user);

//     //Views
//     const accountLinkView = accountLinks.map((item) => (
//         <li key={item.text} className={item.active ? 'active' : ''}>
//             <Link href={item.url}>
//                 <i className={item.icon} />
//                 {item.text}
//             </Link>
//         </li>
//     ));

//     return (
//         <section className="ps-my-account ps-page--account">
//             <div className="container">
//                 <div className="row">
//                     <div className="col-lg-3">
//                         <div className="ps-section__left">
//                             <aside className="ps-widget--account-dashboard">
//                                 <div className="ps-widget__header">
//                                     <img src={`http://localhost:5000/${user?.image}`} />
//                                     <figure>
//                                         <figcaption>{user?.FirstName} {user?.LastName}</figcaption>
//                                         <p>{user?.Email}</p>
//                                     </figure>
//                                 </div>
//                                 <div className="ps-widget__content">
//                                     <ul className="ps-list--user-links">
//                                         {accountLinks.map((link) => (
//                                             <li
//                                                 key={link.text}
//                                                 className={
//                                                     link.active ? 'active' : ''
//                                                 }>
//                                                 <Link href={link.url}>
//                                                     <i className={link.icon} />
//                                                     {link.text}
//                                                 </Link>
//                                             </li>
//                                         ))}
//                                         <li>
//                                             <Link href="/account/my-account">
//                                                 <i className="icon-power-switch" />
//                                                 Logout
//                                             </Link>
//                                         </li>
//                                     </ul>
//                                 </div>
//                             </aside>
//                         </div>
//                     </div>
//                     <div className="col-lg-9">
//                         <div className="ps-page__content">
//                             <FormChangeUserInformation />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default UserInformation;



import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import FormChangeUserInformation from '~/components/shared/FormChangeUserInformation';


const UserInformation = () => {
    const accountLinks = [
        {
            text: 'Account Informations',
            url: '/account/user-information',
            icon: 'icon-user',
            active: true,
        },
        {
            text: 'Order',
            url: '/account/notifications',
            icon: 'icon-alarm-ringing',
        },
    ];

    const [userId, setUserId] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        setUserId(storedUserId);
    }, []);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const res = await fetch(
                    `http://localhost:5000/api/v1/user/${userId}`
                );
                const data = await res.json();

                if (res.ok && data.data) {
                    setUser(data.data);
                }
            } catch (err) {
                console.error('Error fetching user info:', err);
            }
        };

        if (userId) fetchUserInfo();
    }, [userId]);

    return (
        <section className="ps-my-account ps-page--account">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <div className="ps-section__left">
                            <aside className="ps-widget--account-dashboard">
                                <div className="ps-widget__header">
                                    {user?.image && (
                                        <img
                                            src={`http://localhost:5000/${user.image}`}
                                            alt="User"
                                        />
                                    )}
                                    <figure>
                                        <figcaption>
                                            {user?.FirstName} {user?.LastName}
                                        </figcaption>
                                        <p>{user?.Email}</p>
                                    </figure>
                                </div>
                                <div className="ps-widget__content">
                                    <ul className="ps-list--user-links">
                                        {accountLinks.map((link) => (
                                            <li
                                                key={link.text}
                                                className={
                                                    link.active ? 'active' : ''
                                                }>
                                                <Link href={link.url}>
                                                    <i className={link.icon} />
                                                    {link.text}
                                                </Link>
                                            </li>
                                        ))}
                                        <li>
                                            <Link href="/account/my-account">
                                                <i className="icon-power-switch" />
                                                Logout
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </aside>
                        </div>
                    </div>
                    <div className="col-lg-9">
                        <div className="ps-page__content">
                            <FormChangeUserInformation />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserInformation;

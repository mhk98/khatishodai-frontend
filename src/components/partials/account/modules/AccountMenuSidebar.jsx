import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const AccountMenuSidebar = ({ data }) => {

            const userId = localStorage.getItem('userId');
        const [user, setUser] = useState(null);
    
        
        // Fetch user info when component loads
        useEffect(() => {
            const fetchUserInfo = async () => {
                try {
                    const res = await fetch(
                        `https://backend.eaconsultancy.info/api/v1/user/${userId}`
                    );
                    const data = await res.json();
    
                    if (res.ok) {
                        setUser(data.data);
                        if (data.phone) {
                            // Extract country code & number
                            const matchedCode = countryCodes.find((c) =>
                                data.phone.startsWith(c.code)
                            );
                            if (matchedCode) {
                                setSelectedCode(matchedCode.code);
                                setPhone(data.phone.replace(matchedCode.code, ''));
                            }
                        }
                    }
                } catch (err) {
                    console.error('Error fetching user info:', err);
                }
            };
    
            if (userId) fetchUserInfo();
        }, [userId]);
    
        console.log('user information', user);


    return (
     <aside className="ps-widget--account-dashboard">
        <div className="ps-widget__header">
                                                <img src={`https://backend.eaconsultancy.info/${user?.image}`} />

            <figure>
                <figcaption>{user?.FirstName} {user?.LastName}</figcaption>
                <p>{user?.Email}</p>
            </figure>
        </div>
        <div className="ps-widget__content">
            <ul>
                {data.map((link) => (
                    <li key={link.text} className={link.active ? 'active' : ''}>
                        <Link href={link.url}>
                            <i className={link.icon} />
                            {link.text}
                        </Link>
                    </li>
                ))}
                <li>
                    <Link href="/account/my-account">Logout</Link>
                </li>
            </ul>
        </div>
    </aside>
   )

}

    
   

export default AccountMenuSidebar;

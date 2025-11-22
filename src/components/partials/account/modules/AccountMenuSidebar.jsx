import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getUserInfo, removeUserInfo } from '~/components/services/auth.service';
import { useRouter } from 'next/navigation';

const AccountMenuSidebar = ({ data }) => {

             const token = getUserInfo();
               const id = token?.userId; // ✅ user_id fix করা হলো

        const [user, setUser] = useState(null);
    
        
        // Fetch user info when component loads
        useEffect(() => {
            const fetchUserInfo = async () => {
                try {
                    const res = await fetch(
                        `https://backend.eaconsultancy.info/api/v1/user/${id}`
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
    
            if (id) fetchUserInfo();
        }, [id]);
    
        console.log('user information', user);

         const Router = useRouter()
        const handleLogout = () => {
            removeUserInfo('accessToken')
            Router.push('/account/login');
    
        };


    return (
     <aside className="ps-widget--account-dashboard">
        <div className="ps-widget__header">
                                                {user?.image && (
                                        <img
                                            src={`https://backend.eaconsultancy.info/${user.image}`}
                                            alt="User"
                                        />
                                    )}

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
                    <a
        type="button"
        onClick={handleLogout}
        className="flex items-center gap-2 text-left w-full"
      >
        <i className="icon-power-switch" />
        Logout
      </a>
                </li>
            </ul>
        </div>
    </aside>
   )

}

    
   

export default AccountMenuSidebar;

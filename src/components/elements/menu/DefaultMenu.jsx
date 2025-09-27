// import React from 'react';
// import Link from 'next/link';
// import MenuDropdown from '~/components/elements/menu/MenuDropdown';
// import MegaMenu from '~/components/elements/menu/MegaMenu';

// const DefaultMenuItem = ({ item }) => {

//     if (item.subMenu) {
//         return <MenuDropdown source={item} key={item.text} />;
//     } else if (item.megaContent) {
//         return <MegaMenu source={item} key={item.text} />;
//     }
//     return (
//         <li key={item.text}>
//             <Link href={item.url}>
//                 {item.icon && <i className={item.icon} />}
//                 {item.text}
//             </Link>
//         </li>
//     );
// };

// const DefaultMenu = ({ source, className }) => {
//     if (!source || source.length === 0) {
//         return (
//             <ul className={className}>
//                 <li>
//                     <a href="#" onClick={(e) => e.preventDefault()}>
//                         No menu item.
//                     </a>
//                 </li>
//             </ul>
//         );
//     }

//     const menuItems = source.map((item) => (
//         <DefaultMenuItem item={item} key={item.text} />
//     ));
//     return <ul className={className}>{menuItems}</ul>;
// };

// export default DefaultMenu;

import React from 'react';
import Link from 'next/link';
import MegaMenu from '~/components/elements/menu/MegaMenu';

const DefaultMenuItem = ({ item }) => {
    // Log the item (for debugging purposes, remove in production)

    console.log('subCategory', item);
    // Render MegaMenu only if megaContent exists and has items
    if (item.megaContent && item.megaContent.length > 0) {
        return <MegaMenu source={item} key={item.text} />;
    }

    return (
        <li key={item.id}>
            {' '}
            {/* Using item.id as key */}
            <Link href={`/category/${item.categoryId}`}>
                {item.icon && (
                    <img
                        src={`http://localhost:5000/${item.icon}`} // Dynamically constructing image URL
                        alt={item.text} // Alt text for accessibility
                        width={23}
                    />
                )}
                <span className="ml-3">{item.text}</span>
            </Link>
        </li>
    );
};

const DefaultMenu = ({ source, className }) => {
    // Check if source is empty or undefined
    if (!source || source.length === 0) {
        return (
            <ul className={className}>
                <li>
                    <a href="#" onClick={(e) => e.preventDefault()}>
                        No menu item.
                    </a>
                </li>
            </ul>
        );
    }

    // Map through source array and render DefaultMenuItem
    const menuItems = source.map((item) => (
        <DefaultMenuItem item={item} key={item.text} /> // Use item.text as key
    ));

    return <ul className={className}>{menuItems}</ul>;
};

export default DefaultMenu;

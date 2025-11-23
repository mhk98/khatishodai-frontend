import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DefaultMenu from '~/components/elements/menu/DefaultMenu';

const MenuCategoriesDropdown = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true); // Add a loading state
    const [error, setError] = useState(null); // Add an error state

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:5000/api/v1/category'
                );
                console.log('categories', response);
                setCategories(response.data.data); // API থেকে ডাটা সেট করা হচ্ছে
                setLoading(false); // Set loading to false once data is fetched
            } catch (err) {
                console.error('Error fetching categories:', err.message);
                setError('Failed to load categories. Please try again later.');
                setLoading(false); // Set loading to false even if there's an error
            }
        };

        fetchData();
    }, []);

    return (
        <div className="menu--product-categories">
            <div className="menu__toggle">
                <i className="icon-menu" />
                <span>Categories</span>
            </div>
            <div className="menu__content">
                {loading && <p>Loading categories...</p>}{' '}
                {/* Display loading state */}
                {error && <p>{error}</p>} {/* Display error message */}
                {categories.length > 0 && !loading && !error ? (
                    <DefaultMenu
                        className="menu--dropdown"
                        source={categories} // Send the entire category list
                    />
                ) : null}
            </div>
        </div>
    );
};

export default MenuCategoriesDropdown;

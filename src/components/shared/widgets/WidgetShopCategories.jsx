// import React, { useEffect, useMemo, useState } from 'react';
// import Link from 'next/link';
// import axios from 'axios';

// const WidgetShopCategories = ({ id }) => {
//     // const { loading, categories, getCategories } = useProducCategory();
//     // const [test, setSet] = useState(0);

//     // useEffect(() => {
//     //     getCategories();
//     // }, []);

//     //   const { data, error, isLoading } = useGetAllCategoryQuery({
//     //         category_id: id,
//     //     });

//     //     const categories = data?.data || [];

//     //     console.log('categories', categories)

//     // useEffect(() => {
//     //     fetchProducts();
//     // }, [fetchProducts]);

//     //     useEffect(() => {
//     //         fetchProducts();
//     //         handleSetColumns();
//     //     }, [fetchProducts, pageIndex]);

//     const [categories, setCategories] = useState([]);
//     console.log('maincategories', categories);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const res = await axios.get(
//                     'http://localhost:5000/api/v1/category/'
//                 );
//                 setCategories(res.data.data);
//             } catch (err) {
//                 console.error(err);
//             }
//         };

//         fetchData();
//     }, []);

//     const categoriesView = useMemo(() => {
//         if (!categories) {
//             return <p>Loading...</p>;
//         }
//         if (categories.length > 0) {
//             const items = categories.map((item, index) => {
//                 const slug = item.categoryId || '';
//                 const title = item.text || '';
//                 return (
//                     <li key={index}>
//                         <Link href={`/category/${slug}`}>{title}</Link>
//                     </li>
//                 );
//             });
//             return <ul className="ps-list--categories">{items}</ul>;
//         } else {
//             return [];
//         }
//     }, [categories]);

//     return (
//         <aside className="widget widget_shop">
//             <h4 className="widget-title">Categories</h4>
//             {categoriesView}
//         </aside>
//     );
// };

// export default WidgetShopCategories;



import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

const WidgetShopCategories = ({ id }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('http://localhost:5000/api/v1/category/');
                const json = await res.json();
                setCategories(json.data || []);
            } catch (err) {
                console.error("Error fetching categories:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const categoriesView = useMemo(() => {
        if (loading) {
            return <p>Loading...</p>;
        }
        if (categories.length > 0) {
            return (
                <ul className="ps-list--categories">
                    {categories.map((item, index) => {
                        const slug = item.categoryId || '';
                        const title = item.text || '';
                        return (
                            <li key={index}>
                                <Link href={`/category/${slug}`}>{title}</Link>
                            </li>
                        );
                    })}
                </ul>
            );
        } else {
            return <p>No categories found</p>;
        }
    }, [categories, loading]);

    return (
        <aside className="widget widget_shop">
            <h4 className="widget-title">Categories</h4>
            {categoriesView}
        </aside>
    );
};

export default WidgetShopCategories;

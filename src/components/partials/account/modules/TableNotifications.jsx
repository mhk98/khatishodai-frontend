


// 'use client'; // If using App Router in Next.js

// import React from 'react';
// import { Table } from 'antd';

// const TableNotifications = ({ data }) => {
//   const cartProducts = data?.cartProducts || [];

//   // Define table columns
//   const columns = [
//     {
//       title: '#',
//       dataIndex: 'index',
//       key: 'index',
//       render: (_, __, index) => index + 1, // auto-numbering
//     },
//     {
//       title: 'Title',
//       dataIndex: 'title',
//       key: 'title',
//     },
//     // {
//     //   title: 'Image',
//     //   dataIndex: 'thumbnailImage',
//     //   key: 'thumbnailImage',
//     //   render: (img, record) => (
//     //     <img
//     //       src={`http://localhost:5000${img}`}
//     //       alt={record.title}
//     //       className="h-12 w-12 object-cover rounded"
//     //     />
//     //   ),
//     // },
//     {
//       title: 'Quantity',
//       dataIndex: 'quantity',
//       key: 'quantity',
//     },
//     {
//       title: 'Subtotal',
//       dataIndex: 'price',
//       key: 'price',
//       render: (price) => `৳ ${price}`,
//     },
//   ];

//   // Make sure each item has a unique `key` (antd requires this)
//   const dataSource = cartProducts.map((product) => ({
//     ...product,
//     key: product.id, // required for Ant Design Table
//   }));


  

//   return (
//     <div className="p-6 w-full">
//       <h4>Order Id:</h4>
//       <Table
//         columns={columns}
//         dataSource={dataSource}
//         pagination={false}
//         bordered
//       />
//     </div>
//   );
// };

// export default TableNotifications;


'use client';

import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { getUserInfo } from '~/components/services/auth.service';

const TableNotifications = () => {
  const [order, setOrder] = useState(null);

  const token = getUserInfo();
          const id = token?.userId; // ✅ user_id fix করা হলো

  // Fetch order data
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

    if (id) fetchOrder();
  }, [id]);

  // Ensure cartProducts exists
  const cartProducts = order?.cartProducts || [];

  const dataSource = cartProducts.map((product) => ({
    ...product,
    key: product.id,
  }));

  // Define table columns
  const columns = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Subtotal',
      dataIndex: 'price',
      key: 'price',
      render: (price, record) => {
        const quantity = record.quantity || 1;
        return `৳ ${price * quantity}`;
      },
    },
  ];

  // ✅ Only show table if order exists and not Completed
  if (!order || order.orderStatus === 'Completed') {
    return null; // or show: <p>No active orders.</p>
  }

  // ✅ Calculate total price
  const totalPrice = cartProducts.reduce((total, item) => {
    const quantity = item.quantity || 1;
    return total + item.price * quantity;
  }, 0);

  return (
    <div className="p-6 w-full">
      <h4>Order Id: {order.id}</h4>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        bordered
        summary={() => (
          <Table.Summary.Row>
            <Table.Summary.Cell index={0} colSpan={3} align="right">
              <strong>Total Price:</strong>
            </Table.Summary.Cell>
            <Table.Summary.Cell index={3}>
              <strong>৳ {totalPrice}</strong>
            </Table.Summary.Cell>
          </Table.Summary.Row>
        )}
      />
    </div>
  );
};

export default TableNotifications;

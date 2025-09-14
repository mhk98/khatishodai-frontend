// import React from 'react';
// import { Divider, Table, Tag } from 'antd';

// export default function TableNotifications(data) {
//     const tableData = [
//         {
//             key: '1',
//             title: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor',
//             dateCreate: '20-1-2020',
//             tags: ['sale'],
//         },
//         {
//             key: '2',
//             title: 'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur',
//             dateCreate: '21-1-2020',
//             tags: ['new'],
//         },
//         {
//             key: '3',
//             title: ' Et harum quidem rerum',
//             dateCreate: '21-1-2020',
//             tags: ['new'],
//         },
//         {
//             key: '4',
//             title: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet',
//             dateCreate: '21-1-2020',
//             tags: ['sale'],
//         },
//     ];
//     const tableColumn = [
//         {
//             title: 'Title',
//             dataIndex: 'title',
//             key: 'title',
//         },
//         {
//             title: 'Quantity',
//             dataIndex: 'quantity',
//             key: 'quantity',
//         },
//         {
//             title: 'Sub Total',
//             dataIndex: 'title',
//             key: 'title',
//         },
     
    
//     ];
//     return <Table columns={tableColumn} dataSource={data} />;
// }



// 'use client'; // If using Next.js 13+ with app router

// import React from 'react';

// const TableNotification = (data) => {
//   // Sample data based on your JSON

// console.log("tablenotification", data)
//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Cart Products</h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-sm">
//           <thead>
//             <tr className="bg-gray-100 text-left">
//               <th className="py-2 px-4 border-b">#</th>
//               <th className="py-2 px-4 border-b">Product</th>
//               <th className="py-2 px-4 border-b">Image</th>
//               <th className="py-2 px-4 border-b">Price</th>
//               <th className="py-2 px-4 border-b">Quantity</th>
//               <th className="py-2 px-4 border-b">Subtotal</th>
//             </tr>
//           </thead>
//           <tbody>
//             {JSON.parse(data?.cartProducts).map((product, index) => (
//               <tr key={product.id} className="hover:bg-gray-50">
//                 <td className="py-2 px-4 border-b">{index + 1}</td>
//                 <td className="py-2 px-4 border-b">{product.title}</td>
//                 <td className="py-2 px-4 border-b">
//                   <img
//                     src={`https://backend.eaconsultancy.info${product.thumbnailImage}`}
//                     alt={product.title}
//                     className="h-12 w-12 object-cover rounded"
//                   />
//                 </td>
//                 <td className="py-2 px-4 border-b">৳ {product.price}</td>
//                 <td className="py-2 px-4 border-b">{product.quantity}</td>
//                 <td className="py-2 px-4 border-b font-semibold text-green-600">
//                   ৳ {product.subTotal}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default TableNotification;


// const TableNotifications = ({ data }) => {
//   const cartProducts = data?.cartProducts || [];

//   return (
//     <div className="p-6 w-full">
//       <div className="overflow-x-auto">
//         <Table className="w-full bg-white border border-gray-200 rounded-md shadow-sm">
//           <thead>
//             <tr className="bg-gray-100 text-left">
//               <th className="py-2 px-4 border-b">#</th>
//               <th className="py-2 px-4 border-b">Title</th>
//               {/* <th className="py-2 px-4 border-b">Image</th> */}
//               <th className="py-2 px-4 border-b">Quantity</th>
//               <th className="py-2 px-4 border-b">Subtotal</th>
//             </tr>
//           </thead>
//           <tbody>
//             {cartProducts.map((product, index) => (
//               <tr key={product.id} className="hover:bg-gray-50">
//                 <td className="py-2 px-4 border-b">{index + 1}</td>
//                 <td className="py-2 px-4 border-b">{product.title}</td>
//                 {/* <td className="py-2 px-4 border-b">
//                   <img
//                     src={`https://backend.eaconsultancy.info${product.thumbnailImage}`}
//                     alt={product.title}
//                     className="h-12 w-12 object-cover rounded"
//                   />
//                 </td> */}
//                 <td className="py-2 px-4 border-b">{product.quantity}</td>
//                 <td className="py-2 px-4 border-b">৳ {product.price}</td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       </div>
//     </div>
//   );
// };



// export default TableNotifications;


'use client'; // If using App Router in Next.js

import React from 'react';
import { Table } from 'antd';

const TableNotifications = ({ data }) => {
  const cartProducts = data?.cartProducts || [];

  // Define table columns
  const columns = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
      render: (_, __, index) => index + 1, // auto-numbering
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    // {
    //   title: 'Image',
    //   dataIndex: 'thumbnailImage',
    //   key: 'thumbnailImage',
    //   render: (img, record) => (
    //     <img
    //       src={`https://backend.eaconsultancy.info${img}`}
    //       alt={record.title}
    //       className="h-12 w-12 object-cover rounded"
    //     />
    //   ),
    // },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Subtotal',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `৳ ${price}`,
    },
  ];

  // Make sure each item has a unique `key` (antd requires this)
  const dataSource = cartProducts.map((product) => ({
    ...product,
    key: product.id, // required for Ant Design Table
  }));

  return (
    <div className="p-6 w-full">
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        bordered
      />
    </div>
  );
};

export default TableNotifications;

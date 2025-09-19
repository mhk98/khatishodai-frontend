// 'use client';
// import React from 'react';
// import BreadCrumb from '~/components/elements/BreadCrumb';
// import InvoiceDetail from '~/components/partials/account/InvoiceDetail';
// import FooterDefault from '~/components/shared/footers/FooterDefault';
// import Newletters from '~/components/partials/commons/Newletters';
// import PageContainer from '~/components/layouts/PageContainer';

// export default function Page() {
//     const breadCrumb = [
//         {
//             text: 'Home',
//             url: '/',
//         },
//         {
//             text: 'Invoice Detail',
//         },
//     ];
//     return (
//         <>
//             <PageContainer footer={<FooterDefault />} title="Invoice detail">
//                 <div className="ps-page--my-account">
//                     <BreadCrumb breacrumb={breadCrumb} />
//                     <InvoiceDetail />
//                 </div>
//                 <Newletters layout="container" />
//             </PageContainer>
//         </>
//     );
// }


'use client';
import React from 'react';
import dynamic from 'next/dynamic';

import BreadCrumb from '~/components/elements/BreadCrumb';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Newletters from '~/components/partials/commons/Newletters';
import PageContainer from '~/components/layouts/PageContainer';

// ✅ Client-side only import (ssr disabled)
const InvoiceDetail = dynamic(
    () => import('~/components/partials/account/InvoiceDetail'),
    { ssr: false }
);

export default function Page() {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Invoice Detail',
        },
    ];

    return (
        <PageContainer footer={<FooterDefault />} title="Invoice detail">
            <div className="ps-page--my-account">
                <BreadCrumb breacrumb={breadCrumb} />
                <InvoiceDetail />
            </div>
            <Newletters layout="container" />
        </PageContainer>
    );
}

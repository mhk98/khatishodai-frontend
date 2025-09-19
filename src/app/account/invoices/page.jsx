// 'use client';
// import React from 'react';

// import BreadCrumb from '~/components/elements/BreadCrumb';
// import Invoices from '~/components/partials/account/Invoices';
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
//             text: 'Invoices',
//         },
//     ];
//     return (
//         <>
//             <PageContainer footer={<FooterDefault />} title="Invoices">
//                 <div className="ps-page--my-account">
//                     <BreadCrumb breacrumb={breadCrumb} />
//                     <Invoices />
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

// ✅ Dynamic import with SSR disabled
const Invoices = dynamic(
    () => import('~/components/partials/account/Invoices'),
    { ssr: false }
);

export default function Page() {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Invoices',
        },
    ];

    return (
        <PageContainer footer={<FooterDefault />} title="Invoices">
            <div className="ps-page--my-account">
                <BreadCrumb breacrumb={breadCrumb} />
                <Invoices />
            </div>
            <Newletters layout="container" />
        </PageContainer>
    );
}

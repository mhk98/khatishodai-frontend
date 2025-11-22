// 'use client';
// import React from 'react';

// import BreadCrumb from '~/components/elements/BreadCrumb';
// import UserInformation from '~/components/partials/account/UserInformation';
// import FooterDefault from '~/components/shared/footers/FooterDefault';
// import PageContainer from '~/components/layouts/PageContainer';
// import Newletters from '~/components/partials/commons/Newletters';

// export default function Page() {
//     const breadCrumb = [
//         {
//             text: 'Home',
//             url: '/',
//         },
//         {
//             text: 'User Information',
//         },
//     ];

//     return (
//         <PageContainer footer={<FooterDefault />} title="User Information">
//             <div className="ps-page--my-account">
//                 <BreadCrumb breacrumb={breadCrumb} />
//                 <UserInformation />
//             </div>
//             <Newletters layout="container" />
//         </PageContainer>
//     );
// }


'use client';
import React from 'react';
import dynamic from 'next/dynamic';

import BreadCrumb from '~/components/elements/BreadCrumb';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import PageContainer from '~/components/layouts/PageContainer';
import Newletters from '~/components/partials/commons/Newletters';

// Dynamic import for client-side only rendering
const UserInformation = dynamic(
  () => import('~/components/partials/account/UserInformation'),
  { ssr: false }  // ssr:false means this component only renders on client-side
);

export default function Page() {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'User Information',
        },
    ];

    return (
        <PageContainer footer={<FooterDefault />} title="User Information">
            <div className="ps-page--my-account">
                <BreadCrumb breacrumb={breadCrumb} />
                <UserInformation />
            </div>
            {/* <Newletters layout="container" /> */}
        </PageContainer>
    );
}

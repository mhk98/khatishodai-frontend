

'use client'; 
import React from 'react';
// Import 'dynamic' from Next.js for client-side only rendering
import dynamic from 'next/dynamic'; 

import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Newletters from '~/components/partials/commons/Newletters';

// 🛑 THE CRITICAL CHANGE: Use dynamic import and disable SSR for the Login component.
// This prevents Next.js from trying to pre-render the dynamic hooks (useSearchParams, etc.) 
// during the static export process, which is what caused the "Export encountered errors" message.
const DynamicLogin = dynamic(
    () => import('~/components/partials/account/Login'), 
    { ssr: false }
);

export default function LoginPage() {
    const breadCrumb = [
        { text: 'Home', url: '/' },
        { text: 'Login' },
    ];

    return (
        <PageContainer footer={<FooterDefault />} title="Login">
            <div className="ps-page--my-account">
                <BreadCrumb breadcrumb={breadCrumb} />
                
                {/* Use the dynamically imported, client-side only Login component */}
                <DynamicLogin />
                
            </div>
            {/* <Newletters layout="container" /> */}
        </PageContainer>
    );
}
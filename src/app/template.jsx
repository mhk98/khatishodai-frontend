'use client';
import React from 'react';
import PageLoader from '~/components/elements/common/PageLoader';
import MobileNavigation from '~/components/shared/navigation/MobileNavigation';
import getHeadData, {
    generatePageMetadata,
} from '~/utilities/seo/RoutePathsSEO';
import Providers from '~/react-redux/provider';
import GeminiChatbot from '~/components/GeminiChatbot/GeminiChatbot';

export const metadata = generatePageMetadata(getHeadData('/'));

export default function Template({ children }) {
    return (
        <Providers>
            {children}
            <PageLoader />
            <MobileNavigation />
            {/* <BackTop>
               
                  
                    <WhatsAppButton className="ps-btn--backtop"/>
                  
               
            </BackTop> */}
            <GeminiChatbot className="ps-btn--backtop"/>
        </Providers>
    );
}

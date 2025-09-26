'use client';
import BlogItemsGridView from '~/components/partials/blog/BlogItemsGridView';
import BreadCrumb2 from '~/components/elements/BreadCrumb2';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import PageContainer from '~/components/layouts/PageContainer';
import Newletters from '~/components/partials/commons/Newletters';
import NewsGridView from '~/components/partials/blog/NewsGridView';
import ReviewProductGridView from '~/components/partials/blog/ReviewProductGridView';

export default function Page() {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Blog',
            url: '/',
        },
        {
            text: 'Review Product',
        },
    ];

    return (
        <PageContainer footer={<FooterDefault />} title="Blog ">
            <div className="ps-page--blog">
                <div className="container">
                    <div className="ps-page__header">
                        <h1>Our Press</h1>
                        <BreadCrumb2 breacrumb={breadCrumb} />
                    </div>
                    <ReviewProductGridView columns={4} />
                </div>
            </div>
            <Newletters layout="container" />
        </PageContainer>
    );
}

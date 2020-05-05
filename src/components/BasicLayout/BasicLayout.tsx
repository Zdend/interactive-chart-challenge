import React from 'react';
import { COLORS } from '../../shared/theme';
import styled from '@emotion/styled';

const PageHeader = styled.h1`
    border-bottom: 1px solid ${COLORS.GREY};
`;

const PageContent = styled.main`
    padding: 1rem;
`;

interface BasicLayoutProps {
    title: string;
    children: React.ReactNode;
}

const BasicLayout = ({ title, children }: BasicLayoutProps) => {
    return (
        <div>
            <PageHeader data-testid="basic-layout__title">{title}</PageHeader>
            <PageContent data-testid="basic-layout__content">{children}</PageContent>
        </div>
    );
};

export default BasicLayout;
import React from 'react';
import styled from '@emotion/styled';
import { GRID_LINE_COLOR } from '../../shared/theme';
import { allowBasicProps } from '../../shared/styled';

interface ChartGrid {
    height: number;
    isActive: boolean;
}

const ChartGridStyled = styled('div', { shouldForwardProp: allowBasicProps })<ChartGrid>`
    ${({ height, isActive }) => `
    height: ${height}px;
    ${isActive ? 'cursor: row-resize;' : ''}
    `}
    border-left: 1px solid ${GRID_LINE_COLOR};
    border-bottom: 1px solid ${GRID_LINE_COLOR};
    position: relative;
    width: 100%;
`;

interface ChartGridProps {
    height: number;
    children: React.ReactNode;
    isActive: boolean;
}

const ChartGrid =  React.forwardRef<HTMLDivElement, ChartGridProps>(({ 
    height, 
    children,
    isActive,
}: ChartGridProps, ref) => {
    return (
        <ChartGridStyled
            ref={ref}
            height={height}
            isActive={isActive}
        >
            {children}
        </ChartGridStyled>
    );
});

export default ChartGrid;
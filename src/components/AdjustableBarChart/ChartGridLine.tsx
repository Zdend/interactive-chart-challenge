import React from 'react';
import styled from '@emotion/styled';
import { GRID_LINE_COLOR, BASE_UNIT, COLORS } from '../../shared/theme';
import { allowBasicProps } from '../../shared/styled';

const LABEL_FONT_SIZE = BASE_UNIT * 3;

interface ChartGridLineStyledProps {
    height: number;
    y: number;
    showLeadingLine: boolean;
    showActiveLine: boolean;
}

const ChartGridLineStyled = styled('div', { shouldForwardProp: allowBasicProps })<ChartGridLineStyledProps>`
    ${({ height, y, showLeadingLine, showActiveLine }) => `
    height: ${height}px;
    bottom: ${y}px;
    ${showLeadingLine ? `border-top: 1px dotted ${COLORS.GREY};` : ''};
    ${showActiveLine ? `border-top: 1px dotted ${GRID_LINE_COLOR};` : ''};
    ${showActiveLine ? `z-index: 1;` : ''};
    `}
    width: 100%;
    position: absolute;
    user-select: none;
`;

interface ChartGridLineAxisProps {
    offsetLeft: number;
}

const ChartGridLineAxis = styled.div<ChartGridLineAxisProps>`
    ${({ offsetLeft }) => `
    left: -${offsetLeft / 2}px;
    width: ${offsetLeft / 2}px;
    `}
    top: -1px;
    height: 100%;
    position: absolute;
    border-top: 1px solid ${GRID_LINE_COLOR};
    font-size: ${LABEL_FONT_SIZE}px;
    line-height: ${LABEL_FONT_SIZE}px;
`;

interface ChartGridLineAxisLabelProps {
    offsetLeft: number;
}

const ChartGridLineAxisLabel = styled.div<ChartGridLineAxisLabelProps>`
    position: absolute;
    ${({ offsetLeft }) => `
    left: -${offsetLeft}px;
    `}
    top: -${LABEL_FONT_SIZE / 2}px;
`;

interface ChartGridLineProps {
    height: number;
    offsetLeft: number;
    position: number;
    y: number;
    showLeadingLine: boolean;
    showActiveLine: boolean;
}

const ChartGridLine = ({ height, y, position, offsetLeft, showLeadingLine, showActiveLine }: ChartGridLineProps) => {
    return (
        <ChartGridLineStyled
            {...{ height, y, showLeadingLine, showActiveLine }}
            data-testid="abc__grid-line"
        >
            <ChartGridLineAxis offsetLeft={offsetLeft}>
                {showLeadingLine ? <ChartGridLineAxisLabel offsetLeft={offsetLeft}>{position + 1}</ChartGridLineAxisLabel> : null}
            </ChartGridLineAxis>
        </ChartGridLineStyled>
    );
};


export default React.memo(ChartGridLine);
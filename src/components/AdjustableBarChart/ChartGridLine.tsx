import React from 'react';
import styled from '@emotion/styled';
import { GRID_LINE_COLOR, REM, BASE_UNIT, COLORS } from '../../shared/theme';

const LABEL_FONT_SIZE = BASE_UNIT * 3;

interface ChartGridLineStyledProps {
    height: number;
    y: number;
    showLeadingLine: boolean;
    showActiveLine: boolean;
}

const ChartGridLineStyled = styled.div<ChartGridLineStyledProps>`
    ${({ height, y, showLeadingLine, showActiveLine }) => `
    height: ${height}px;
    bottom: ${y}px;
    ${showLeadingLine ? `border-top: 1px dotted ${COLORS.GREY}`: ''};
    ${showActiveLine ? `border-top: 1px dotted ${GRID_LINE_COLOR}`: ''};
    `}
    width: 100%;
    position: absolute;
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
    y: number;
    showLeadingLine: boolean;
    showActiveLine: boolean;
    label: JSX.Element | string;
}

const ChartGridLine = ({ height, y, offsetLeft, showLeadingLine, showActiveLine, label }: ChartGridLineProps) => {
    return (
        <ChartGridLineStyled 
            {...{ height, y, showLeadingLine, showActiveLine }}
            onDragOver={e => {
                e.preventDefault();
                
            }}
            onDragEnter={e => {
                const barIndex = e.dataTransfer.getData('text/plain');
                console.log('enter', barIndex);
            }}
            onDrop={e => {
                const barIndex = e.dataTransfer.getData('text/plain');
                console.log('drop', barIndex);
                e.dataTransfer.clearData();
            }}>
            <ChartGridLineAxis offsetLeft={offsetLeft}>
                {showLeadingLine ? <ChartGridLineAxisLabel offsetLeft={offsetLeft}>{label}</ChartGridLineAxisLabel> : null}
            </ChartGridLineAxis>
        </ChartGridLineStyled>
    );
};


export default ChartGridLine;
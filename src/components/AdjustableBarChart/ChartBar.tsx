import React, { useCallback } from 'react';
import styled from '@emotion/styled';
import { BASE_UNIT, GRID_LINE_COLOR } from '../../shared/theme';

interface ChartBarStyledProps {
    value: number;
    width: number;
    gutter: number;
    x: number;
    color: string;
}

const ChartBarStyled = styled.div<ChartBarStyledProps>`
    ${({ width, value, x, color }) => `
        width: ${width}%;
        height: ${value}px;
        left: ${x}%;
        background: ${color};
    `}
    position: absolute;
    bottom: 0;
`;

interface ChartBarHandleProps {
    width: number;
}

const ChartBarHandle = styled.div<ChartBarHandleProps>`
    position: absolute;
    left: calc(50% - ${BASE_UNIT}px);
    top: -${BASE_UNIT}px;
    background: white;
    height: ${BASE_UNIT * 2}px;
    width: ${BASE_UNIT * 2}px;
    border: 1px solid ${GRID_LINE_COLOR};
    cursor: row-resize;
`;

interface ChartBarProps {
    value: number;
    width: number;
    gutter: number;
    x: number;
    position: number;
    color: string;
    onDrag: (e: React.DragEvent, position: number) => void;
}

const ChartBar = ({ width, value, gutter, x, color, onDrag, position }: ChartBarProps) => {
    return (
        <ChartBarStyled 
            width={width} 
            value={value} 
            gutter={gutter} 
            x={x}
            color={color}
        >
            <ChartBarHandle 
                width={width}
                draggable 
                onDragStart={e => e.dataTransfer.effectAllowed = 'move'}
                onDrag={(e) => {
                    onDrag(e, position);
                }}
                // onDrop={(e) => {
                //     e.preventDefault();
                //     e.dataTransfer.dropEffect = 'move';
                // }}
                onDragOver={e => {
                    e.dataTransfer.dropEffect = 'move';
                    e.preventDefault();
                }}
                // onDragLeave={e => console.log(e.dataTransfer.getData('text/plain'))}
            />
        </ChartBarStyled>
    );
};

export default ChartBar;
import React from 'react';
import styled from '@emotion/styled';
import { BASE_UNIT, GRID_LINE_COLOR } from '../../shared/theme';

interface ChartBarStyledProps {
    value: number;
    width: number;
    gutter: number;
    x: number;
    color: string;
    isActive: boolean;
}

const ChartBarStyled = styled.div<ChartBarStyledProps>`
    transition: height 30ms ease-in-out;
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
    isActive: boolean;
}

const ChartBarHandle = styled.div<ChartBarHandleProps>`
    height: 2px;    
    position: absolute;
    width: 100%;
    cursor: row-resize;
    &:hover, &:focus {
        background-color: black;
        &::before {
            border-width: 2px;
        }
    }

    &::before {
        content: " ";
        display: block;
        position: absolute;
        left: calc(50% - ${BASE_UNIT}px);
        top: -${BASE_UNIT}px;
        background: white;
        height: ${BASE_UNIT * 2}px;
        width: ${BASE_UNIT * 2}px;
        border: 1px solid ${GRID_LINE_COLOR};
    }
`;

interface ChartBarProps {
    value: number;
    width: number;
    gutter: number;
    x: number;
    position: number;
    color: string;
    isActive: boolean;
    readOnly: boolean;
    onDrag: (clientY: number, position: number) => void;
    onKeyPress: (e: React.KeyboardEvent, position: number) => void;
    setActiveBar: (position: number) => void;
}

const ChartBar = ({
    width,
    value, 
    gutter, 
    x, 
    color, 
    onDrag,
    onKeyPress, 
    position,
    setActiveBar,
    isActive,
    readOnly
}: ChartBarProps) => {

    return (
        <ChartBarStyled
            width={width}
            value={value}
            gutter={gutter}
            x={x}
            color={color}
            isActive={isActive}
        >
            {!readOnly && <ChartBarHandle
                width={width}
                isActive={isActive}
                tabIndex={0}
                role="button"
                draggable
                onDragStart={() => {
                    setActiveBar(position);
                }}
                onDrag={(e) => {
                    onDrag(e.clientY, position);
                }}
                onDragEnd={() => {
                    setActiveBar(null);
                }}
                onKeyDown={e => {
                    setActiveBar(position);
                    onKeyPress(e, position);
                }}
                onKeyUp={() => setActiveBar(null)}
            />}
        </ChartBarStyled>
    );
};

export default React.memo(ChartBar);
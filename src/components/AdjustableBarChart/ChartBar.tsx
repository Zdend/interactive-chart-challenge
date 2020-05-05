import React from 'react';
import styled from '@emotion/styled';
import { BASE_UNIT, GRID_LINE_COLOR, COLORS } from '../../shared/theme';
import { allowBasicProps } from '../../shared/styled';

interface ChartBarStyledProps {
    value: number;
    width: number;
    x: number;
    color: string;
}

const ChartBarStyled = styled('div', { shouldForwardProp: allowBasicProps })<ChartBarStyledProps>`
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
    isActive: boolean;
}

const ChartBarHandle = styled.div<ChartBarHandleProps>`
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
        background-color: ${COLORS.WHITE};
        z-index: 2;
    }

    height: 2px;    
    position: absolute;
    width: 100%;
    cursor: row-resize;
    &:hover, &:focus ${({ isActive }) => isActive ? ', &' : ''} {
        background-color: black;
        &::before {
            border-width: 2px;
        }
    }
`;

interface ChartBarProps {
    value: number;
    height: number;
    width: number;
    x: number;
    maxY: number;
    position: number;
    color: string;
    readOnly: boolean;
    onKeyPress: (e: React.KeyboardEvent, position: number) => void;
    setActiveBar: (position: number) => void;
    isActive: boolean;
}

const ChartBar = ({
    width,
    height,
    value, 
    maxY,
    x, 
    color,
    onKeyPress, 
    position,
    setActiveBar,
    readOnly,
    isActive,
}: ChartBarProps) => {
    return (
        <ChartBarStyled
            width={width}
            value={height}
            x={x}
            color={color}
            role="slider"
            aria-valuenow={value}
            aria-valuemin={0}
            aria-valuemax={maxY}
            aria-valuetext={`${value} / ${maxY}`}
            aria-label={`Bar ${position + 1}`}
            aria-readonly={readOnly}
            data-testid="abc__chart-bar"
        >
            {!readOnly && <ChartBarHandle
                tabIndex={0}
                isActive={isActive}
                role="button"
                data-testid="abc__bar-handle"
                onMouseDown={() => setActiveBar(position)}
                onTouchStart={() => setActiveBar(position)}
                onKeyDown={e => {
                    setActiveBar(position);
                    onKeyPress(e, position);
                }}
                onKeyUp={() => setActiveBar(null)}
                onTouchEnd={() => setActiveBar(null)}
            />}
        </ChartBarStyled>
    );
};

export default React.memo(ChartBar);
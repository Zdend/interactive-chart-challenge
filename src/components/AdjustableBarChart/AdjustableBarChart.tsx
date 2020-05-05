import React, { useState, useCallback, useEffect, useRef } from 'react';
import { getBarValues } from './utils';
import ChartGrid from './ChartGrid';
import ChartGridLines from './ChartGridLines';
import ChartWrapper from './ChartWrapper';
import ChartBar from './ChartBar';
import { BASE_UNIT, COLORS } from '../../shared/theme';
import throttle from 'lodash.throttle';
import { range } from '../../shared/number';

interface AdjustableBarChartProps {
    value: number[];
    onChange?: (values: number[]) => void;
    height?: number;
    maxY?: number;
    barColors?: string[] | string;
    readOnly?: boolean;
    offsetLeft?: number;
    barGutter?: number;
}

const AdjustableBarChart = ({
    onChange,
    value,
    height = 300,
    maxY = 15,
    readOnly = false,
    offsetLeft = BASE_UNIT * 4,
    barGutter = 5,
    barColors = [COLORS.PRIMARY, COLORS.INFO, COLORS.SUCCESS, COLORS.WARNING],
}: AdjustableBarChartProps) => {
    const barValues = getBarValues(value, maxY);
    const [activeBar, setActiveBar] = useState(null);

    const gridYHeight = height / maxY;
    const barWidth = (100 - (barValues.length + 1) * barGutter) / barValues.length;
    const isActive = activeBar !== null;

    const chartRef = useRef(null);
    const changeValue = useCallback((barIndex: number, value: number) => {
        const newValues = barValues.map((presentValue, index) => index === barIndex ? value : presentValue);
        if (typeof onChange === 'function') {
            onChange(newValues);
        } else if (process.env.NODE_ENV !== 'production') {
            console.warn('You must provide onChange handler in edit mode.');
        }
    }, [barValues, onChange]);

    const onBarMove = useCallback((clientY: number) => {
        if (clientY === 0 || !isActive || !chartRef.current) {
            return;
        }

        const chartBottom = chartRef.current.getBoundingClientRect().top + height;
        const barValue = Math.round((chartBottom - clientY) / gridYHeight);
        changeValue(activeBar, range(barValue, 0, maxY));
    }, [changeValue, gridYHeight, height, maxY, activeBar, isActive]);

    const onKeyPress = useCallback((e: React.KeyboardEvent, barIndex: number) => {
        let barValue = barValues[barIndex];
        if (e.keyCode === 38) {
            e.preventDefault();
            barValue++;
        } else if (e.keyCode === 40) {
            e.preventDefault();
            barValue--;
        }
        changeValue(barIndex, range(barValue, 0, maxY));
    }, [changeValue, maxY, barValues]);

    const onBarMoveThrottled = useCallback(throttle(onBarMove, 50), [onBarMove]);

    useEffect(() => {
        const removeActiveBar = () => setActiveBar(null);
        const moveBarMouse = (e: MouseEvent) => onBarMoveThrottled(e.clientY);
        const moveBarTouch = (e: TouchEvent) => {
            if (e.cancelable) {
                e.preventDefault();
                onBarMoveThrottled(e.touches[0]?.clientY);
            }
        }
        document.addEventListener('mouseup', removeActiveBar);
        document.addEventListener('mousemove', moveBarMouse);
        if (activeBar !== null) {
            document.addEventListener('touchmove', moveBarTouch, { passive: false, });
        }
        return () => {
            document.removeEventListener('mouseup', removeActiveBar);
            document.removeEventListener('mousemove', moveBarMouse);
            document.removeEventListener('touchmove', moveBarTouch);
        }
    }, [activeBar, setActiveBar, onBarMoveThrottled]);

    const activeBarValue = isActive ? barValues[activeBar] - 1 : -1;

    return (
        <ChartWrapper offsetLeft={offsetLeft}>
            <ChartGrid
                height={height}
                isActive={isActive}
                ref={chartRef}
            >
                <ChartGridLines
                    height={gridYHeight}
                    activeLevel={activeBarValue}
                    offsetLeft={offsetLeft}
                    maxY={maxY}
                />
                {barValues.map((barValue, index) => <ChartBar
                    key={index}
                    position={index}
                    onKeyPress={onKeyPress}
                    setActiveBar={setActiveBar}
                    readOnly={readOnly}
                    color={Array.isArray(barColors) ? barColors[index] || COLORS.GREY : barColors}
                    value={range(barValue, 0, maxY)}
                    height={range(barValue, 0, maxY) * gridYHeight}
                    maxY={maxY}
                    width={barWidth}
                    x={barGutter + index * barWidth + index * barGutter}
                    isActive={activeBar === index}
                />)}
            </ChartGrid>
        </ChartWrapper>
    );
};

export default AdjustableBarChart;
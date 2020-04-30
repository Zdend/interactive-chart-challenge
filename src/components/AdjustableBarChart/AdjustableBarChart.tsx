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
    height?: number;
    maxY?: number;
    value: number[];
    barColors?: string[] | string;
    readOnly?: boolean;
    offsetLeft?: number;
    barGutter?: number;
    onChange?: (values: number[]) => void;
}

const AdjustableBarChart = ({
    height,
    maxY,
    value,
    readOnly,
    offsetLeft,
    barGutter,
    barColors,
    onChange,
}: AdjustableBarChartProps) => {
    const barValues = getBarValues(value, maxY);
    const [activeBar, setActiveBar] = useState(null);

    const gridYHeight = height / maxY;
    const barWidth = (100 / barValues.length) - barGutter;
    const isActive = activeBar !== null;

    const chartRef = useRef(null);
    const changeValue = useCallback((barIndex: number, value: number) => {
        const newValues = barValues.map((presentValue, index) => index === barIndex ? value : presentValue);
        if (typeof onChange === 'function') {
            onChange(newValues);
        } else {
            process.env.NODE_ENV !== 'production' && console.warn('You must provide onChange handler in edit mode.')
        }
    }, [barValues, onChange]);

    const onBarMove = useCallback((clientY: number) => {
        if (clientY === 0 || !isActive) {
            return;
        }

        const chartBottom = chartRef.current.getBoundingClientRect().top + height;
        const barValue = Math.floor((chartBottom - clientY) / gridYHeight);
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
        const moveBar = (e: MouseEvent) => {
            onBarMoveThrottled(e.clientY);
        }
        document.addEventListener('mouseup', removeActiveBar);
        document.addEventListener('mousemove', moveBar);
        return () => {
            document.removeEventListener('mouseup', removeActiveBar);
            document.removeEventListener('mousemove', moveBar);
        }
    }, [setActiveBar, onBarMoveThrottled]);

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
                    isActive={activeBar === index}
                    color={Array.isArray(barColors) ? barColors[index] || COLORS.GREY : barColors}
                    value={range(barValue, 0, maxY) * gridYHeight}
                    width={barWidth}
                    x={barGutter + index * barWidth + index * barGutter}
                    gutter={barGutter}
                />)}
            </ChartGrid>
        </ChartWrapper>
    );
};

AdjustableBarChart.defaultProps = {
    height: 300,
    maxY: 15,
    value: [2, 5, 6, 9],
    barColors: [COLORS.PRIMARY, COLORS.INFO, COLORS.SUCCESS, COLORS.WARNING],
    readOnly: false,
    offsetLeft: BASE_UNIT * 4,
    barGutter: 5,
};

export default AdjustableBarChart;
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { getInitialBarValues } from './utils';
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
    barCount?: number;
    initialValues?: number[];
    barColors?: string[] | string;
    readOnly?: boolean;
    offsetLeft?: number;
    barGutter?: number;
    onChange?: (values: number[]) => void;
}

const AdjustableBarChart = ({
    height,
    maxY,
    barCount,
    initialValues,
    readOnly,
    offsetLeft,
    barGutter,
    barColors,
    onChange,
}: AdjustableBarChartProps) => {
    const [barValues, setBarValues] = useState(getInitialBarValues(barCount, initialValues, maxY));
    const [activeBar, setActiveBar] = useState(null);

    const gridYHeight = height / maxY;
    const barWidth = (100 / barValues.length) - barGutter;
    const isActive = activeBar !== null;

    const chartRef = useRef(null);
    const changeValue = useCallback((barIndex: number, value: number) => {
        const newValues = barValues.map((presentValue, index) => index === barIndex ? value : presentValue);
        setBarValues(newValues);
        if (typeof onChange === 'function') {
            onChange(newValues);
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

    const onBarMoveThrottled = useRef(onBarMove);

    useEffect(() => {
        onBarMoveThrottled.current = throttle(onBarMove, 50);
    }, [onBarMove]);

    useEffect(() => {
        const removeActiveBar = () => setActiveBar(null);
        const moveBar = (e: MouseEvent) => {
            onBarMoveThrottled.current(e.clientY);
        }
        document.addEventListener('mouseup', removeActiveBar);
        document.addEventListener('mousemove', moveBar);
        return () => {
            document.removeEventListener('mouseup', removeActiveBar);
            document.removeEventListener('mousemove', moveBar);
        }
    }, [setActiveBar]);

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
    barCount: 4,
    initialValues: [2, 5, 6, 9],
    barColors: [COLORS.PRIMARY, COLORS.INFO, COLORS.SUCCESS, COLORS.WARNING],
    readOnly: false,
    offsetLeft: BASE_UNIT * 4,
    barGutter: 5,
};

export default AdjustableBarChart;
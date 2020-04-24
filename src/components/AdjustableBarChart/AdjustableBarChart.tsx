import React, { useState, useCallback, useEffect, useRef } from 'react';
import { getInitialBarValues } from './utils';
import ChartGridLine from './ChartGridLine';
import ChartGrid from './ChartGrid';
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
    barColors?: string[];
    readOnly?: boolean; 
    offsetLeft?: number;
    barGutter?: number;
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
}: AdjustableBarChartProps) => {
    const [ barValues, setBarValues ] = useState(getInitialBarValues(barCount, initialValues, maxY));
    const [ activeBar, setActiveBar ] = useState(null);
    const gridLines = new Array(maxY).fill(0).map((_, index) => index);
    const gridYHeight = height / maxY;
    const barWidth = (100 / barValues.length) - barGutter;
    
    const chartRef = useRef(null);
    const changeValue = useCallback((barIndex: number, value: number) => {
        setBarValues(barValues.map((presentValue, index) => index === barIndex ? value : presentValue));
    }, [barValues]);
    
    const onDrag = useCallback((e: React.DragEvent, barIndex: number) => {
        e.preventDefault();
        if (e.clientY === 0) {
            return;
        }

        const chartBottom = chartRef.current.getBoundingClientRect().top + height;
        const barValue = Math.floor((chartBottom - e.clientY) / gridYHeight);
        changeValue(barIndex, range(barValue, 0, maxY));
    }, [changeValue]);

    const onKeyPress = useCallback((e: React.KeyboardEvent, barIndex: number) => {
        let barValue = barValues[barIndex];
        if (e.keyCode === 38) {
            barValue++;
        } else if(e.keyCode === 40) {
            barValue--;
        }
        changeValue(barIndex, range(barValue, 0, maxY));
    }, [changeValue])

    const onDragThrottled = useRef(onDrag);
    useEffect(() => {
        onDragThrottled.current = throttle(onDrag, 100);
    }, [onDrag])

    const activeBarValue = activeBar ? barValues[activeBar] - 1 : -1;

    return (
        <ChartWrapper offsetLeft={offsetLeft}>
            <ChartGrid height={height} ref={chartRef}>
                {gridLines.map((y, index) => <ChartGridLine 
                    key={y} 
                    label={`${y + 1}`}
                    showLeadingLine={(y + 1) % 5 === 0 || index + 1 === gridLines.length}
                    showActiveLine={activeBarValue === y}
                    height={gridYHeight} 
                    y={y * gridYHeight} 
                    offsetLeft={offsetLeft}
                />)}
                {barValues.map((barValue, index) => <ChartBar 
                    key={index}
                    position={index}
                    onDrag={onDragThrottled.current}
                    onKeyPress={onKeyPress}
                    setActiveBar={setActiveBar}
                    isActive={activeBar === index}
                    color={barColors[index] || COLORS.GREY}
                    value={barValue * gridYHeight}
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
    initialValues: [ 2, 5, 6, 9 ],
    barColors: [ COLORS.PRIMARY, COLORS.INFO, COLORS.SUCCESS, COLORS.WARNING ],
    readOnly: false,
    offsetLeft: BASE_UNIT * 4,
    barGutter: 5,
};

export default AdjustableBarChart;
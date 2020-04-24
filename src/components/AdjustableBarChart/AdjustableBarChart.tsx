import React, { useState, useCallback, useEffect, useRef } from 'react';
import { getInitialBarValues } from './utils';
import ChartGridLine from './ChartGridLine';
import ChartGrid from './ChartGrid';
import ChartWrapper from './ChartWrapper';
import ChartBar from './ChartBar';
import { BASE_UNIT, COLORS } from '../../shared/theme';
import throttle from 'lodash.throttle';

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
    const [ barValues, setBarValues ] = useState(getInitialBarValues(barCount, initialValues));
    const gridLines = new Array(maxY).fill(0).map((_, index) => index);
    const gridYHeight = height / maxY;
    const barWidth = (100 / barValues.length) - barGutter;
    
    const chartRef = useRef(null);
    const changeValue = useCallback((barIndex: number, value: number) => {
        setBarValues(barValues.map((presentValue, index) => index === barIndex ? value : presentValue));
    }, [barValues, setBarValues]);
    
    const onDrag = useCallback((e: React.DragEvent, barIndex: number) => {
        e.preventDefault();
        if (e.clientY === 0) {
            return;
        }

        const chartBottom = chartRef.current.getBoundingClientRect().top + height;
        const barValue = Math.floor((chartBottom - e.clientY) / gridYHeight);
        const adjustedBarValue = Math.min(Math.max(barValue, 0), maxY);
        changeValue(barIndex, adjustedBarValue);
    }, [changeValue]);

    const onDragThrottled = useRef(onDrag);
    useEffect(() => {
        onDragThrottled.current = throttle(onDrag, 200);
    }, [onDrag])

    return (
        <ChartWrapper offsetLeft={offsetLeft}>
            <ChartGrid height={height} ref={chartRef}>
                {gridLines.map((y) => <ChartGridLine 
                    key={y} 
                    label={`${y + 1}`}
                    showLeadingLine={(y + 1) % 5 === 0}
                    height={gridYHeight} 
                    y={y * gridYHeight} 
                    offsetLeft={offsetLeft}
                />)}
                {barValues.map((barValue, index) => <ChartBar 
                    key={index}
                    position={index}
                    onDrag={onDragThrottled.current}
                    color={barColors[index]}
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
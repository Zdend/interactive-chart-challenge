import React, { useState } from 'react';
import BasicLayout from '../components/BasicLayout';
import AdjustableBarChart from '../components/AdjustableBarChart';
import styled from '@emotion/styled';
import { COLORS, BASE_UNIT } from '../shared/theme';
import Btn from '../components/Btn';

const FancyInput = styled.input`
    padding: 0.5rem;
    border-radius: 4px;
    border: 2px solid ${COLORS.GREY};
    font-size: 1rem;
    margin: 1rem;
    min-width: ${BASE_UNIT * 15};
`;

const DEFAULT_MAX_Y = 15;

const AdjustableChartView = () => {
    const [chart1Y, setChart1Y] = useState(DEFAULT_MAX_Y);
    const [chart1Values, setChart1Values] = useState([2, 4, 5, 12]);
    const [chart2Values, setChart2Values] = useState([1, 8, 9]);
    return (
        <BasicLayout title="Adjustable Bar Chart Show Case">
            <label htmlFor="input-chart1y">Max Y Chart 1</label>
            <FancyInput
                id="input-chart1y"
                type="number"
                max={100}
                min={Math.max(...chart1Values)}
                value={chart1Y}
                onChange={(e) => setChart1Y(parseInt(e.target.value, 10) || DEFAULT_MAX_Y)}
            />
            <Btn onClick={() => setChart1Values([ ...chart1Values, Math.min(chart1Y, 5) ])} className="mr-2">Add Bar</Btn>
            <Btn onClick={() => setChart1Values(chart1Values.slice(0, -1))}>Remove Bar</Btn>
            <h2>Chart 1 - controlled Y axis ({chart1Values.join(', ')})</h2>
            <AdjustableBarChart maxY={chart1Y} value={chart1Values} onChange={setChart1Values} />
            <h2>Chart 2 - custom colors, bar count ({chart2Values.join(', ')})</h2>
            <AdjustableBarChart maxY={10} value={chart2Values} onChange={setChart2Values} barColors="purple" />
            <h2>Chart 3 - readonly, tall</h2>
            <AdjustableBarChart maxY={60} height={500} readOnly value={[5, 10, 25, 30, 54, 3]} />
        </BasicLayout>
    );
};

export default AdjustableChartView;
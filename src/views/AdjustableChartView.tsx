import React, { useState } from 'react';
import BasicLayout from '../components/BasicLayout';
import AdjustableBarChart from '../components/AdjustableBarChart';
import styled from '@emotion/styled';
import { COLORS, BASE_UNIT } from '../shared/theme';

const FancyInput = styled.input`
    padding: 0.5rem;
    border-radius: 4px;
    border: 2px solid ${COLORS.GREY};
    font-size: 1rem;
    margin: 1rem;
    min-width: ${BASE_UNIT * 15};
`;

const AdjustableChartView = () => {
    const [ chart1Y, setChart1Y ] = useState(15);
    const [ chart1Values, setChart1Values ] = useState([2, 4, 5, 12]);
    return (
        <BasicLayout title="Adjustable Bar Chart">
            <label htmlFor="input-chart1y">Max Y Chart 1</label>
            <FancyInput 
                id="input-chart1y"
                type="number" 
                max={50}
                min={Math.max(...chart1Values)}
                value={chart1Y} 
                onChange={(e) => setChart1Y(parseInt(e.target.value, 10) || 15)} 
            />
            <div>Current values: { chart1Values.join(', ') }</div>
            <h2>Chart 1 - controlled Y axis</h2>
            <AdjustableBarChart maxY={chart1Y} initialValues={chart1Values} onChange={setChart1Values} />
            <h2>Chart 2 - custom colors, bar count</h2>
            <AdjustableBarChart maxY={10} barCount={3} barColors="purple" />
            <h2>Chart 3 - readonly</h2>
            <AdjustableBarChart readOnly barCount={6} initialValues={[5, 10, 25, 30, 54, 3]} maxY={60} />
        </BasicLayout>
    );
};

export default AdjustableChartView;
import React, { useState } from 'react';
import BasicLayout from '../components/BasicLayout';
import AdjustableBarChart from '../components/AdjustableBarChart';


const AdjustableChartView = () => {
    const [ chart1Y, setChart1Y ] = useState(5);
    return (
        <BasicLayout title="Adjustable Bar Chart">
            <label htmlFor="input-chart1y">Max Y Chart 1</label>
            <input 
                id="input-chart1y"
                type="number" 
                max={50}
                min={5}
                value={chart1Y} 
                onChange={(e) => setChart1Y(parseInt(e.target.value, 10) || 15)} 
            />
            <h2>Chart 1</h2>
            <AdjustableBarChart maxY={chart1Y} />
            <h2>Chart 2</h2>
            <AdjustableBarChart maxY={20} barCount={10} />
        </BasicLayout>
    );
};

export default AdjustableChartView;
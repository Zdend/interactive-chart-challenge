import React from 'react';
import BasicLayout from '../components/BasicLayout';
import AdjustableBarChart from '../components/AdjustableBarChart';


const AdjustableChartView = () => {
    return (
        <BasicLayout title="Adjustable Bar Chart">
            <AdjustableBarChart />
        </BasicLayout>
    );
};

export default AdjustableChartView;
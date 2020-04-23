import React, { Suspense } from 'react';
import { Global } from '@emotion/core';
import { globalStyles } from './styles/global';

const AdjustableChartView = React.lazy(() => import('./views/AdjustableChartView'))

function App() {
  return (
    <div>
      <Global styles={globalStyles} />
      <Suspense fallback={<div>Loading...</div>}>
        <AdjustableChartView />
      </Suspense>
    </div>
  );
}

export default App;

import React from 'react';
import ChartGridLine from './ChartGridLine';

interface ChartGridLinesProps {
    maxY: number;
    height: number;
    offsetLeft: number;
    activeLevel: number;
}

const ChartGridLines = ({
    maxY,
    height,
    offsetLeft,
    activeLevel
}: ChartGridLinesProps) => {
    const gridLines = new Array(maxY).fill(0).map((_, index) => index);
    return (
        <div>
            {gridLines.map((y, index) => <ChartGridLine 
                key={y} 
                label={`${y + 1}`}
                showLeadingLine={(y + 1) % 5 === 0 || index + 1 === gridLines.length}
                showActiveLine={activeLevel === y}
                height={height} 
                y={y * height} 
                offsetLeft={offsetLeft}
            />)}
        </div>
    );
};

export default React.memo(ChartGridLines);
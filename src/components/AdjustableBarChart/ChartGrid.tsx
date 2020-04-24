import styled from '@emotion/styled';
import { GRID_LINE_COLOR } from '../../shared/theme';

interface ChartGrid {
    height: number;
}

const ChartGrid = styled.div<ChartGrid>`
    ${({ height }) => `height: ${height}px;`}
    
    border-left: 1px solid ${GRID_LINE_COLOR};
    border-bottom: 1px solid ${GRID_LINE_COLOR};
    position: relative;
    width: 100%;
`;

export default ChartGrid;
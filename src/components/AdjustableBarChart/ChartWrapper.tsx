import styled from '@emotion/styled';

interface ChartWrapperProps {
    offsetLeft: number;
}

const ChartWrapper = styled.div<ChartWrapperProps>`
    position: relative;
    width: 100%;
    padding-left: ${({ offsetLeft }) => `${offsetLeft}px;`};
`;

export default ChartWrapper;
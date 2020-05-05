import React from 'react';
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react';
import AdjustableBarChart from './AdjustableBarChart';
import { range } from '../../shared/number';

const BAR_ID = 'abc__chart-bar';
const GRID_LINE_ID = 'abc__grid-line';
const BAR_HANDLE_ID = 'abc__bar-handle';

jest.useFakeTimers();

afterEach(cleanup);

describe('AdjustableBarChart - Grid and Bars', () => {
    const defaultProps = {
        height: 500,
        maxY: 14,
        value: [ 2, 5, 8, 0 ],
        readOnly: true,
        onChange: jest.fn(),
    };

    let result: RenderResult;
    beforeEach(() => {
        result = render(<AdjustableBarChart {...defaultProps} />);
    });

    it('renders grid lines', () => {
        expect(result.queryAllByTestId(GRID_LINE_ID).length).toBe(defaultProps.maxY);
    });

    it.each([5, 10, 14])('renders axis label for %s', (axisIndex => {
        const axisElement = result.getAllByTestId(GRID_LINE_ID)[axisIndex - 1];
        expect(axisElement.textContent).toBe(`${axisIndex}`);
    }));

    it('renders bars', () => {
        expect(result.getAllByTestId(BAR_ID).length).toBe(defaultProps.value.length);
    });

    it.each(defaultProps.value.map((value, index) => [index, value]))
        ('render aria value for %sth bar', (index, value) => {
            const bar = result.getAllByTestId(BAR_ID)[index];
            expect(bar.getAttribute('aria-valuenow')).toBe(`${value}`);
            expect(bar.getAttribute('aria-valuemax')).toBe(`${defaultProps.maxY}`);
            expect(bar.getAttribute('aria-valuetext')).toBe(`${value} / ${defaultProps.maxY}`);
    });
});


describe('AdjustableBarChart - Change', () => {
    const defaultProps = {
        height: 300,
        maxY: 10,
        value: [ 5, 7 ],
        onChange: jest.fn(),
    };

    let result: RenderResult;
    beforeEach(() => {
        result = render(<AdjustableBarChart {...defaultProps} />);
    });

    it.each([
        [ 0, 0 ],
        [ 1, defaultProps.maxY ],
        [ 1, 5 ],
        [ 0, 14 ],
    ])('changes %sth column to %s on mouse move', async (barIndex, expectedValue) => {
        const handle = result.getAllByTestId(BAR_HANDLE_ID)[barIndex];
        fireEvent.mouseDown(handle);

        fireEvent.mouseMove(document, {
            clientY: 1 + (defaultProps.height / defaultProps.maxY) * (defaultProps.maxY - expectedValue)
        });

        jest.runAllTimers();
        const values = [ ...defaultProps.value ];
        values[barIndex] = range(expectedValue, 0, defaultProps.maxY);
        expect(defaultProps.onChange).toHaveBeenCalledWith(values);
    });
});
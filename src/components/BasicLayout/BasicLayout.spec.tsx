import React from 'react';
import { render } from '@testing-library/react';
import BasicLayout from './BasicLayout';

describe('BasicLayout', () => {
    let getByTestId;
    beforeEach(() => {
        ({ getByTestId } = render(
            <BasicLayout title="Hello title">
                <span>Layout content</span>
            </BasicLayout>
        ));
    })

    it('renders title', () => {
        expect(getByTestId('basic-layout__title').textContent).toBe('Hello title');
    })

    it('renders content', () => {
        expect(getByTestId('basic-layout__content').textContent).toBe('Layout content');
    })
})

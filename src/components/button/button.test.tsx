import React from 'react';
import { render } from '@testing-library/react';
import Button from './button';

describe('test button component', () => {
    it('should render the correct default button', () => {
        const wrapper = render(<Button>Hello</Button>);
        const element = wrapper.getByText('Hello');
        expect(element).toBeInTheDocument();
        expect(element.tagName).toEqual('BUTTON');
        expect(element).toHaveClass('btn', 'btn-default');
    });
});

import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Button, {
    ButtonType,
    ButtonSize,
    IButtonPropsWithNativeElement,
} from '.';

describe('test button component', () => {
    it('should render the correct default button', () => {
        const wrapper = render(<Button>Hello</Button>);
        const element = wrapper.getByText('Hello');

        expect(element).toBeInTheDocument();
        expect(element.tagName).toEqual('BUTTON');
        expect(element).toHaveClass(`mt-btn`, `mt-btn-default`);
    });

    it('should render the correct component base on different props', () => {
        const props: IButtonPropsWithNativeElement = {
            onClick: jest.fn(),
            size: ButtonSize.Large,
        };
        const wrapper = render(
            <Button data-testid="target" {...props}></Button>
        );
        const element = wrapper.getByTestId('target');

        fireEvent.click(element);

        expect(props.onClick).toBeCalled();
        expect(element).toHaveClass('mt-btn', 'mt-btn-lg');
    });

    it('should render a link when buttonType equal link and href is provided', () => {
        const props: IButtonPropsWithNativeElement = {
            buttonType: ButtonType.Link,
            href: 'http://dummyurl',
        };
        const wrapper = render(
            <Button data-testid="target" {...props}></Button>
        );
        const element = wrapper.getByTestId('target');

        expect(element.tagName).toEqual('A');
        expect(element).toHaveClass('mt-btn', 'mt-btn-link');
        expect(element).toHaveAttribute('href', props.href);
    });

    it('should render disabled button when disabled set to true', () => {
        const props: IButtonPropsWithNativeElement = {
            disabled: true,
            onClick: jest.fn(),
        };
        const wrapper = render(
            <Button data-testid="target" {...props}></Button>
        );
        const element = wrapper.getByTestId('target') as HTMLButtonElement;

        fireEvent.click(element);

        expect(props.onClick).not.toBeCalled();
        expect(element.disabled).toBeTruthy();
    });
});

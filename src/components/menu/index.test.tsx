import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Menu, { IMenuProps } from './index';
import MenuItem from './MenuItem';

const menuFactory = (props: IMenuProps, withWarning: boolean = false) => {
    const wrapper = render(
        <Menu {...props}>
            <MenuItem>active</MenuItem>
            <MenuItem disabled>disabled</MenuItem>
            <MenuItem>other</MenuItem>
            {withWarning ? <li>No display!</li> : null}
        </Menu>
    );

    const menuElement = wrapper.getByTestId('test-menu');
    const activeElement = wrapper.getByText('active');
    const disabledElement = wrapper.getByText('disabled');
    const otherElement = wrapper.getByText('other');
    return {
        wrapper,
        menuElement,
        activeElement,
        disabledElement,
        otherElement,
    };
};

let originalWarn: typeof console.warn;

describe('test Menu and MenuItem component', () => {
    beforeEach(() => {
        originalWarn = console.warn;
        console.warn = jest.fn();
    });

    afterEach(() => {
        console.warn = originalWarn;
    });

    it('should render the correct default Menu and MenuItem', () => {
        const props: IMenuProps = {
            className: 'test',
            style: { color: 'red' },
        };
        const { menuElement, activeElement, disabledElement } = menuFactory(
            props
        );

        expect(menuElement).toBeInTheDocument();
        expect(menuElement).toHaveClass('mt-menu', 'test');
        expect(menuElement).toHaveStyle({ color: 'red' });
        expect(menuElement.getElementsByTagName('li').length).toEqual(3);
        expect(activeElement).toHaveClass('mt-menu-item', 'active');
        expect(disabledElement).toHaveClass('mt-menu-item', 'disabled');
    });
    it('should log warn when menu has child which is not a menuItem component', () => {
        const props: IMenuProps = {};
        const withWarning = true;

        menuFactory(props, withWarning);

        expect(console.warn).toBeCalledWith(
            'Warning: Menu has child which is not a MenuItem.'
        );
    });
    it('should trigger callback function with correct props and change active state when click item', () => {
        const props: IMenuProps = {
            onSelect: jest.fn(),
        };
        const { activeElement, otherElement } = menuFactory(props);

        fireEvent.click(otherElement);

        expect(otherElement).toHaveClass('mt-menu-item', 'active');
        expect(activeElement).not.toHaveClass('mt-menu-item', 'disabled');
        expect(props.onSelect).toBeCalledWith(2);
    });
    it('should not trigger callback function when click disabled item', () => {
        const props: IMenuProps = {
            onSelect: jest.fn(),
        };
        const { activeElement, disabledElement } = menuFactory(props);

        fireEvent.click(disabledElement);

        expect(activeElement).toHaveClass('mt-menu-item', 'active');
        expect(disabledElement).toHaveClass('mt-menu-item', 'disabled');
        expect(props.onSelect).not.toBeCalled();
    });
    it('should render vertical menu when mode set to vertical', () => {
        const props: IMenuProps = {
            mode: 'vertical',
        };
        const { menuElement } = menuFactory(props);

        expect(menuElement).toHaveClass('mt-menu', 'mt-menu-vertical');
    });
});

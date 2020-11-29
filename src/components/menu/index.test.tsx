import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import Menu, { IMenuProps } from './index';
import MenuItem from './MenuItem';
import SubMenu from './SubMenu';

const createStyle = () => {
    const styleElm = document.createElement('style');
    styleElm.innerHTML = `
        .mt-submenu {
            display: none;
        }

        .mt-submenu.open {
            display: block;
        }
    `;
    return styleElm;
};

const menuFactory = (props: IMenuProps, withWarning: boolean = false) => {
    const wrapper = render(
        <Menu {...props}>
            <MenuItem>active</MenuItem>
            <MenuItem disabled>disabled</MenuItem>
            <MenuItem>other</MenuItem>
            <SubMenu title="submenu">
                <MenuItem>sub-active</MenuItem>
                <MenuItem disabled>sub-disabled</MenuItem>
                <MenuItem>sub-other</MenuItem>
            </SubMenu>
            {withWarning ? <li>No display!</li> : null}
        </Menu>
    );

    wrapper.container.append(createStyle());

    const menuElement = wrapper.getByTestId('test-menu');
    const activeElement = wrapper.getByText('active');
    const disabledElement = wrapper.getByText('disabled');
    const otherElement = wrapper.getByText('other');
    const subMenuElement = wrapper.getByTestId('test-submenu');
    const subTitleElement = wrapper.getByText('submenu');
    const subActiveElement = wrapper.getByText('sub-active');
    const subDisabledElement = wrapper.getByText('sub-disabled');
    const subOtherElement = wrapper.getByText('sub-other');
    return {
        wrapper,
        menuElement,
        activeElement,
        disabledElement,
        otherElement,
        subMenuElement,
        subTitleElement,
        subActiveElement,
        subDisabledElement,
        subOtherElement,
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
            openSubMenuList: ['3'],
        };
        const {
            menuElement,
            activeElement,
            disabledElement,
            subActiveElement,
        } = menuFactory(props);

        expect(menuElement).toBeInTheDocument();
        expect(subActiveElement).toBeInTheDocument();
        expect(menuElement).toHaveClass('mt-menu', 'test');
        expect(menuElement).toHaveStyle({ color: 'red' });
        expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4);
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
        expect(props.onSelect).toBeCalledWith('2');
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
    it('should open submenu with hover', async () => {
        const { subMenuElement, subActiveElement } = menuFactory({});

        fireEvent.mouseEnter(subMenuElement);

        await waitFor(() => {
            expect(subActiveElement).toBeVisible();
        });

        fireEvent.mouseLeave(subMenuElement);

        await waitFor(() => {
            expect(subActiveElement).not.toBeVisible();
        });
    });
    it('should trigger callback function with the correct props when click item in submenu', async () => {
        const props: IMenuProps = {
            onSelect: jest.fn(),
        };
        const { subMenuElement, subActiveElement } = menuFactory(props);

        fireEvent.mouseEnter(subMenuElement);

        await waitFor(() => {
            expect(subActiveElement).toBeVisible();
        });

        fireEvent.click(subActiveElement);

        expect(props.onSelect).toBeCalledWith('3-0');
    });
    it('should open vertical submenu with click', () => {
        const { subTitleElement, subActiveElement } = menuFactory({
            mode: 'vertical',
        });

        fireEvent.click(subTitleElement);

        expect(subActiveElement).toBeVisible();

        fireEvent.click(subTitleElement);

        expect(subActiveElement).not.toBeVisible();
    });
    it('should trigger callback function with the correct props when click item in vertical submenu', () => {
        const props: IMenuProps = {
            onSelect: jest.fn(),
            mode: 'vertical',
        };
        const { subTitleElement, subActiveElement } = menuFactory(props);

        fireEvent.click(subTitleElement);

        expect(subActiveElement).toBeVisible();

        fireEvent.click(subActiveElement);

        expect(props.onSelect).toBeCalledWith('3-0');
    });
});

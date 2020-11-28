import classNames from 'classnames';
import React, { Children, cloneElement, FunctionComponentElement } from 'react';
import { IMenuItemProps } from './MenuItem';

export interface ISubMenuProps {
    index?: number;
    className?: string;
    title: string;
}

const SubMenu: React.FC<ISubMenuProps> = ({
    index,
    className,
    title,
    children,
}) => {
    const classes = classNames(
        'mt-menu-item',
        'mt-submenu-item',
        className,
        {}
    );
    const renderChildren = () => (
        <ul className="mt-submenu">
            {Children.map(children, (child, index) => {
                if (!child) return;

                const childElement = child as FunctionComponentElement<IMenuItemProps>;
                const { displayName } = childElement?.type;
                if (displayName === 'MenuItem') {
                    return cloneElement(childElement, { index });
                } else {
                    console.error(
                        'Warning: SubMenu has a child which is not a MenuItem component'
                    );
                }
            })}
        </ul>
    );

    return (
        <li className={classes}>
            <div className="mt-submenu-title">{title}</div>
            {renderChildren()}
        </li>
    );
};

SubMenu.displayName = 'SubMenu';

export default SubMenu;

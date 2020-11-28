import classNames from 'classnames';
import React, { useContext } from 'react';
import { MenuContext } from '.';

export interface IMenuItemProps {
    index?: number;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
}

const MenuItem: React.FC<IMenuItemProps> = ({
    index = 0,
    disabled,
    className,
    style,
    children,
}) => {
    const context = useContext(MenuContext);
    const classes = classNames('mt-menu-item', className, {
        disabled,
        active: context.index === index,
    });
    const handleClick = () => {
        !disabled && context.onSelect?.(index);
    };

    return (
        <li className={classes} style={style} onClick={handleClick}>
            {children}
        </li>
    );
};

MenuItem.displayName = 'MenuItem';

export default MenuItem;

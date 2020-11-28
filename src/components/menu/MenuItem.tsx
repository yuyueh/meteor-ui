import classNames from 'classnames';
import React, { useContext } from 'react';
import { MenuContext } from '.';

interface IMenuItem {
    index: number;
    disabled?: boolean;
    className?: string;
    style?: React.CSSProperties;
}

const MenuItem: React.FC<IMenuItem> = ({
    index,
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

export default MenuItem;

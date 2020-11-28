import classNames from 'classnames';
import React, { createContext, useState } from 'react';

type MenuMode = 'horizontal' | 'vertical';

type SelectCallback = (selectedIndex: number) => void;

interface IMenuProps {
    defaultIndex?: number;
    className?: string;
    mode?: MenuMode;
    style?: React.CSSProperties;
    onSelect?: SelectCallback;
}

interface IMenuContext {
    index: number;
    onSelect?: SelectCallback;
}

export const MenuContext = createContext<IMenuContext>({
    index: 0,
});

const Menu: React.FC<IMenuProps> = ({
    defaultIndex = 0,
    className,
    mode,
    style,
    onSelect,
    children,
}) => {
    const [currentActive, setActive] = useState(defaultIndex);
    const classes = classNames('mt-menu', className, {
        'mt-menu-vertical': mode === 'vertical',
    });
    const passedContext: IMenuContext = {
        index: currentActive,
        onSelect: (selectedIndex: number) => {
            setActive(selectedIndex);
            onSelect?.(selectedIndex);
        },
    };
    return (
        <ul className={classes} style={style}>
            <MenuContext.Provider value={passedContext}>
                {children}
            </MenuContext.Provider>
        </ul>
    );
};

export default Menu;

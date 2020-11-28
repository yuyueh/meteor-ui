import classNames from 'classnames';
import React, {
    createContext,
    Children,
    useState,
    FunctionComponentElement,
    cloneElement,
} from 'react';
import { IMenuItemProps } from './MenuItem';

type MenuMode = 'horizontal' | 'vertical';

type SelectCallback = (selectedIndex: number) => void;

export interface IMenuProps {
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
    const renderChildren = () =>
        Children.map(children, (child, index) => {
            const childElm = child as FunctionComponentElement<IMenuItemProps>;
            const { displayName } = childElm.type;
            if (displayName === 'MenuItem') {
                return cloneElement(childElm, { index });
            } else {
                console.warn(
                    'Warning: Menu has child whitch is not a MenuItem.'
                );
            }
        });

    return (
        <ul className={classes} style={style} data-testid="test-menu">
            <MenuContext.Provider value={passedContext}>
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    );
};

export default Menu;

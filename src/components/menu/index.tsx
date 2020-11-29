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

const defaultMode: MenuMode = 'horizontal';

const defaultSelectedIndex = '0';

type SelectCallback = (selectedIndex: string) => void;

export interface IMenuProps {
    defaultIndex?: string;
    className?: string;
    mode?: MenuMode;
    style?: React.CSSProperties;
    onSelect?: SelectCallback;
    openSubMenuList?: string[];
}

interface IMenuContext {
    index: string;
    onSelect?: SelectCallback;
    mode: MenuMode;
    openSubMenuList?: string[];
}

export const MenuContext = createContext<IMenuContext>({
    index: defaultSelectedIndex,
    mode: defaultMode,
});

const Menu: React.FC<IMenuProps> = ({
    defaultIndex = defaultSelectedIndex,
    className,
    mode = defaultMode,
    style,
    onSelect,
    children,
    openSubMenuList = [],
}) => {
    const [currentActive, setActive] = useState(defaultIndex);
    const classes = classNames('mt-menu', className, {
        'mt-menu-vertical': mode === 'vertical',
        'mt-menu-horizontal': mode === 'horizontal',
    });
    const passedContext: IMenuContext = {
        index: currentActive,
        onSelect: (selectedIndex: string) => {
            setActive(selectedIndex);
            onSelect?.(selectedIndex);
        },
        mode,
        openSubMenuList,
    };
    const renderChildren = () =>
        Children.map(children, (child, index) => {
            if (!child) return;

            const childElm = child as FunctionComponentElement<IMenuItemProps>;
            const { displayName } = childElm?.type;
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return cloneElement(childElm, { index: `${index}` });
            } else {
                console.warn(
                    'Warning: Menu has child which is not a MenuItem.'
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

Menu.defaultProps = {
    mode: defaultMode,
};

export default Menu;

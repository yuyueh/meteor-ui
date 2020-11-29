import classNames from 'classnames';
import React, {
    Children,
    cloneElement,
    FunctionComponentElement,
    useContext,
    useState,
} from 'react';
import { MenuContext } from '.';
import { IMenuItemProps } from './MenuItem';

export interface ISubMenuProps {
    index?: string;
    className?: string;
    title: string;
}

const SubMenu: React.FC<ISubMenuProps> = ({
    index = '',
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
    const { mode, openSubMenuList } = useContext(MenuContext);
    const [open, setOpen] = useState(openSubMenuList?.includes(index));
    const submenuClasses = classNames('mt-submenu', {
        open,
    });

    let timer: NodeJS.Timeout;
    const toggleMenu = (e: React.MouseEvent, isOpen: boolean) => {
        e.preventDefault();
        clearTimeout(timer);
        timer = setTimeout(() => {
            setOpen(isOpen);
        }, 300);
    };

    const handleMouseHoverProps =
        mode === 'horizontal'
            ? {
                  onMouseEnter: (e: React.MouseEvent) => {
                      toggleMenu(e, true);
                  },
                  onMouseLeave: (e: React.MouseEvent) => {
                      toggleMenu(e, false);
                  },
              }
            : {};

    const handleClickProps =
        mode === 'vertical'
            ? {
                  onClick: (e: React.MouseEvent) => {
                      e.preventDefault();
                      setOpen(!open);
                  },
              }
            : {};

    const renderChildren = () => (
        <ul className={submenuClasses}>
            {Children.map(children, (child, i) => {
                if (!child) return;

                const childElement = child as FunctionComponentElement<IMenuItemProps>;
                const { displayName } = childElement?.type;
                if (displayName === 'MenuItem') {
                    return cloneElement(childElement, {
                        index: `${index}-${i}`,
                    });
                } else {
                    console.error(
                        'Warning: SubMenu has a child which is not a MenuItem component'
                    );
                }
            })}
        </ul>
    );

    return (
        <li className={classes} {...handleMouseHoverProps}>
            <div className="mt-submenu-title" {...handleClickProps}>
                {title}
            </div>
            {renderChildren()}
        </li>
    );
};

SubMenu.displayName = 'SubMenu';

export default SubMenu;

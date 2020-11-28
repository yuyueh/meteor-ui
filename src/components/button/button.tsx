import classNames from 'classnames';
import React from 'react';

export enum ButtonSize {
    Large = 'lg',
    Small = 'sm',
}

export enum ButtonType {
    Primary = 'primary',
    Default = 'default',
    Danger = 'danger',
    Link = 'link',
}

interface IButtonProps {
    className?: string;
    disabled?: boolean;
    size?: ButtonSize;
    buttonType?: ButtonType;
    children?: React.ReactNode;
    href?: string;
}

type IButtonPropsWithNativeElement = IButtonProps &
    React.ButtonHTMLAttributes<HTMLElement> &
    React.AnchorHTMLAttributes<HTMLElement>;

const Button: React.FC<Partial<IButtonPropsWithNativeElement>> = ({
    buttonType,
    className,
    disabled,
    size,
    children,
    href,
    ...restProps
}) => {
    const classes = classNames('btn', className, {
        [`btn-${buttonType}`]: buttonType,
        [`btn-${size}`]: size,
        disabled: buttonType === ButtonType.Link && disabled,
    });

    return buttonType === ButtonType.Link && href ? (
        <a className={classes} href={href} {...restProps}>
            {children}
        </a>
    ) : (
        <button className={classes} disabled={disabled} {...restProps}>
            {children}
        </button>
    );
};

Button.defaultProps = {
    disabled: false,
    buttonType: ButtonType.Default,
};

export default Button;

import classNames from 'classnames';
import React, { useState } from 'react';

export enum AlertType {
    Success = 'success',
    Default = 'default',
    Danger = 'danger',
    Warning = 'warning',
}

export interface IAlertProps {
    alertType?: AlertType;
    title: string;
    description?: string;
    onClose?: Function;
}

const Alert: React.FC<IAlertProps> = ({
    alertType,
    title,
    description,
    onClose,
}) => {
    const [closed, setClosed] = useState(false);
    const classes = classNames('mt-alert', {
        [`mt-alert-${alertType}`]: alertType,
    });
    const handleClose = (e: React.MouseEvent<HTMLButtonElement>) => {
        setClosed(true);
        onClose?.(e);
    };

    return closed ? null : (
        <span className={classes}>
            <div className="mt-alert-title">{title}</div>
            {description && (
                <div className="mt-alert-description">{description}</div>
            )}
            <button
                className="mt-alert-close-icon"
                onClick={handleClose}
            ></button>
        </span>
    );
};

Alert.defaultProps = {
    alertType: AlertType.Default,
};

export default Alert;

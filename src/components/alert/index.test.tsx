import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Alert, { AlertType, IAlertProps } from '.';

describe('test alert component', () => {
    it('should render the correct default alert', () => {
        const { container } = render(<Alert title="Hello"></Alert>);
        const alertWrapper = container.querySelector('span');
        const titleElm = container.querySelector('div');
        const buttonElm = container.querySelector('button');

        expect(alertWrapper).toBeInTheDocument();
        expect(titleElm).toBeInTheDocument();
        expect(buttonElm).toBeInTheDocument();
        expect(alertWrapper).toHaveClass('mt-alert', 'mt-alert-default');
        expect(titleElm).toHaveClass('mt-alert-title');
        expect(buttonElm).toHaveClass('mt-alert-close-icon');
        expect(titleElm).toHaveTextContent('Hello');
    });

    it('should render the correct default alert with description', () => {
        const { container } = render(
            <Alert title="" description="Hello"></Alert>
        );
        const descriptionElm = container.querySelectorAll('div')[1];

        expect(descriptionElm).toBeInTheDocument();
        expect(descriptionElm).toHaveClass('mt-alert-description');
        expect(descriptionElm).toHaveTextContent('Hello');
    });

    it('should render the correct success alert', () => {
        const { container } = render(
            <Alert title="Hello" alertType={AlertType.Success}></Alert>
        );
        const alertWrapper = container.querySelector('span');

        expect(alertWrapper).toHaveClass('mt-alert', 'mt-alert-success');
    });

    it('should render the correct danger alert', () => {
        const { container } = render(
            <Alert title="Hello" alertType={AlertType.Danger}></Alert>
        );
        const alertWrapper = container.querySelector('span');

        expect(alertWrapper).toHaveClass('mt-alert', 'mt-alert-danger');
    });

    it('should render the correct warning alert', () => {
        const { container } = render(
            <Alert title="Hello" alertType={AlertType.Warning}></Alert>
        );
        const alertWrapper = container.querySelector('span');

        expect(alertWrapper).toHaveClass('mt-alert', 'mt-alert-warning');
    });

    it('should hide alert when close button clicked', () => {
        const { container } = render(<Alert title="Hello"></Alert>);
        const alertWrapper = container.querySelector('span');
        const buttonElm = container.querySelector('button') as Element;

        fireEvent.click(buttonElm);

        expect(alertWrapper).not.toBeInTheDocument();
    });

    it('should trigger onClose when close button clicked', () => {
        const props: IAlertProps = {
            onClose: jest.fn(),
            title: '',
        };
        const { container } = render(<Alert {...props}></Alert>);
        const buttonElm = container.querySelector('button') as Element;

        fireEvent.click(buttonElm);

        expect(props.onClose).toBeCalled();
    });
});

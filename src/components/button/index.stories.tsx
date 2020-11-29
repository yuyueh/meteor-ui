import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Button, { ButtonSize, ButtonType } from './index';

const defaultButton = () => (
    <Button onClick={action('clicked')}>Hello World!!</Button>
);

const buttonWithSize = () => (
    <>
        <Button size={ButtonSize.Large}>Large Button</Button>
        <Button size={ButtonSize.Small}>Small Button</Button>
    </>
);

const buttonWithType = () => (
    <>
        <Button buttonType={ButtonType.Primary}>Primary Button</Button>
        <Button buttonType={ButtonType.Default}>Default Button</Button>
        <Button buttonType={ButtonType.Danger}>Danger Button</Button>
        <Button buttonType={ButtonType.Link} href="http://dummy-url">
            Link Button
        </Button>
    </>
);

storiesOf('Button', module)
    .add('Default Button', defaultButton)
    .add('各尺寸 Button', buttonWithSize)
    .add('各類型 Button', buttonWithType);

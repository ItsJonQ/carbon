import React from 'react';
import { Meta } from '@storybook/react';
import { atom } from '../src/atom';
import { cx } from '../src/atom/emotion';

const atoms = {
  bg: {
    blue: atom({ background: 'rgba(0, 0, 255)' })(),
    blue300: atom({ background: 'rgba(50, 50, 255)' })(),
    blue500: atom({ background: 'rgba(100, 100, 255)' })(),
  },
  text: {
    white: atom({ color: 'rgba(255, 255, 255)' })(),
    blue: atom({ color: 'rgba(0, 0, 255)' })(),
    blue300: atom({ color: 'rgba(50, 50, 255)' })(),
    blue500: atom({ color: 'rgba(100, 100, 255)' })(),
  },
};

const sizeAtom = atom(
  {},
  {
    variants: {
      size: {
        sm: { padding: 20 },
        md: { padding: 40 },
        lg: { padding: 80 },
      },
    },
    defaultVariants: {
      size: 'lg',
    },
  }
);

const blueAtom = atom(
  {},
  {
    composes: [atoms.bg.blue300, atoms.text.white, sizeAtom],
  }
);

const meta: Meta = {
  title: 'Atom',
};

export default meta;

const Template = () => (
  <div className={cx(blueAtom({ size: 'sm' }))}>Hello</div>
);

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {};

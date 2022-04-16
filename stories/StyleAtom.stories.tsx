import React from 'react';
import { Meta } from '@storybook/react';
import { atom, styled } from '../src/atom';

const atoms = {
  appearance: {
    none: atom({ appearance: 'none' })(),
  },
  base: atom({
    boxSizing: 'border-box',
  })(),
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

const blueAtom = atom(
  {},
  {
    composes: [atoms.base, atoms.bg.blue300, atoms.text.white],
  }
);

const controlAtom = atom(
  {
    border: '1px solid black',
    borderRadius: 3,
    height: 32,
    lineHeight: 30,
  },
  {
    variants: {
      size: {
        sm: { height: 24, lineHeight: '22px', padding: '0 8px' },
        md: { height: 32, lineHeight: '30px', padding: '0 12px' },
        lg: { height: 40, lineHeight: '38px', padding: '0 16px' },
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

const baseControlAtom = atom(
  {},
  {
    composes: [atoms.appearance.none, controlAtom],
  }
);

const TextInput = styled('input')({}, { composes: [baseControlAtom] });

const Textarea = styled('textarea')(
  { height: 'auto', width: '100%', minHeight: 80 },
  { composes: [baseControlAtom] }
);

const Button = styled('button')({}, { composes: [baseControlAtom, blueAtom] });

const meta: Meta = {
  title: 'Atom',
};

export default meta;

const Template = () => (
  <>
    <TextInput size="sm" placeholder="Hello" />
    <TextInput size="md" placeholder="Hello" />
    <TextInput size="lg" placeholder="Hello" />
    <Textarea size="sm" placeholder="Hello" />
    <Textarea size="md" placeholder="Hello" />
    <Textarea size="lg" placeholder="Hello" />
    <Button size="sm">Hello</Button>
    <Button size="md">Hello</Button>
    <Button size="lg">Hello</Button>
  </>
);

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {};

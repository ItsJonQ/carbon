import React from 'react';
import { Meta } from '@storybook/react';
import { atom, styled } from '../src/atom';
import { createVars } from '../src/atom/createVars';

const tokens = createVars({
  white: 'white',
  blue: 'rgba(0, 0, 255)',
  blue300: 'rgba(50, 50, 255)',
  blue400: 'rgba(100, 100, 255)',
  blue500: 'rgba(150, 150, 255)',
  controlHeightSm: 24,
  controlHeightMd: 32,
  controlHeightLg: 40,
});

const atoms = {
  appearance: {
    none: atom({ appearance: 'none' })(),
  },
  bg: {
    blue: atom({ background: tokens.blue })(),
    blue300: atom({ background: tokens.blue300 })(),
    blue400: atom({ background: tokens.blue400 })(),
    blue500: atom({ background: tokens.blue500 })(),
  },
  text: {
    white: atom({ color: tokens.white })(),
    blue: atom({ color: tokens.blue })(),
    blue300: atom({ color: tokens.blue300 })(),
    blue500: atom({ color: tokens.blue400 })(),
  },
  p: {
    0: atom({ padding: 0 }),
    1: atom({ padding: 4 }),
    2: atom({ padding: 8 }),
    3: atom({ padding: 12 }),
    4: atom({ padding: 16 }),
  },
  py: {
    0: atom({ paddingLeft: 0, paddingRight: 0 }),
    1: atom({ paddingLeft: 4, paddingRight: 4 }),
    2: atom({ paddingLeft: 8, paddingRight: 8 }),
    3: atom({ paddingLeft: 12, paddingRight: 12 }),
    4: atom({ paddingLeft: 16, paddingRight: 16 }),
  },
};

const blueAtom = atom(
  {
    '&:hover': atoms.bg.blue500,
    '&:active': atoms.bg.blue300,
  },
  {
    composes: [atoms.bg.blue400, atoms.text.white],
  }
);

const controlAtom = atom(
  {
    border: '1px solid black',
    borderRadius: 3,
    height: 32,
    lineHeight: '30px',
  },
  {
    variants: {
      size: {
        sm: {
          height: tokens.controlHeightSm,
          lineHeight: '22px',
          padding: '0 8px',
        },
        md: {
          height: tokens.controlHeightMd,
          lineHeight: '30px',
          padding: '0 12px',
        },
        lg: {
          height: tokens.controlHeightLg,
          lineHeight: '38px',
          padding: '0 16px',
        },
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

const Button = styled('button')(
  {},
  { composes: [baseControlAtom, blueAtom], debug: true }
);

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

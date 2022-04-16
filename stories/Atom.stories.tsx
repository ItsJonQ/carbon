import React from 'react';
import { Meta, Story } from '@storybook/react';
import { Thing, Props } from '../src';
import { atom } from '../src/atom';

const blueAtom = atom({ background: 'blue' });

const meta: Meta = {
  title: 'Atom',
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<Props> = (args) => <Thing {...args} />;

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {};

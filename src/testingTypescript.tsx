import * as React from 'react';
import { CSSObject } from '@emotion/css';

const defaultElement = 'div';

type Props = React.ComponentProps<typeof defaultElement>;

type AtomOptions = {
  variants: {
    [key: string]: {
      [key: string]: CSSObject;
    };
  };
};

type ExtractOptionsToProps<O extends AtomOptions> = {
  [Key in keyof O['variants']]: keyof O['variants'][Key];
};

type BoxOwnProps<E extends React.ElementType = React.ElementType> = {
  as?: E;
};

type BoxProps<E extends React.ElementType> = BoxOwnProps<E> &
  Omit<React.ComponentProps<E>, keyof BoxOwnProps>;

type AsComponent<
  E extends React.ElementType,
  P extends Record<string, unknown>
> = P['as'] extends never
  ? E extends never
    ? typeof defaultElement
    : E
  : P['as'];

const styled =
  <El extends React.ElementType, Options extends AtomOptions>(element: El) =>
  (styler: CSSObject, options: Options) => {
    const Box: <E extends React.ElementType = typeof defaultElement>(
      props: BoxProps<E> & ExtractOptionsToProps<Options>
    ) => React.ReactElement | null = React.forwardRef(function StyledComponent(
      props: BoxOwnProps,
      ref: React.Ref<Element>
    ) {
      const Element = props.as || element || defaultElement;
      return <Element ref={ref} {...props} as={undefined} />;
    });

    return Box;
  };

const opt = {
  variants: {
    size: {
      sm: {
        padding: 40,
      },
      md: {
        padding: 40,
      },
      lg: {
        padding: 40,
      },
    },
    outline: {
      true: {
        outline: '1px solid red',
      },
    },
  },
} as const;

export const Box: <E extends React.ElementType = typeof defaultElement>(
  props: BoxProps<E>
) => React.ReactElement | null = React.forwardRef(function Box(
  props: BoxOwnProps,
  ref: React.Ref<Element>
) {
  const Element = props.as || defaultElement;
  return <Element ref={ref} {...props} as={undefined} />;
});

const Button = styled('button')({}, { variants: { ...opt.variants } });
const A = () => <Button as="div" />;

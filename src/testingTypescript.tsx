import * as React from 'react';
import { CSSObject } from '@emotion/css';

const defaultElement = 'div';

type Variant = Record<string, CSSObject>;
type AtomOptions = {
  variants?: Record<string, Variant>;
};

type ExtractOptionsToProps<O extends AtomOptions> = O['variants'] extends never
  ? {}
  : {
      [Key in keyof O['variants']]?: keyof O['variants'][Key] extends 'true'
        ? boolean
        : keyof O['variants'][Key];
    };

type BoxOwnProps<E extends React.ElementType = React.ElementType> = {
  /**
   * Any React HTML element, such as a `div`, `button`, `input`, etc...
   */
  as?: E;
};

type BoxProps<E extends React.ElementType> = BoxOwnProps<E> &
  Omit<React.ComponentProps<E>, keyof BoxOwnProps>;

// type PolymorphicComponentProps<E extends React.ElementType, P> = P & BoxProps<E>;
// type PolymorphicComponent<P, D extends React.ElementType = "div"> = <E extends React.ElementType = D>(props: PolymorphicComponentProps<E, P>) => React.ReactElement | null;

const styled =
  <El extends React.ElementType>(element: El) =>
  <Options extends AtomOptions>(styler: CSSObject = {}, options?: Options) => {
    const Box: <E extends El>(
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
    /**
     * Does a thing
     */
    outline: {
      true: {
        outline: '1px solid red',
      },
    },
    flex: {
      true: {
        display: 'flex',
      },
    },
  },
};

const Button = styled('button')({}, opt);
const A = () => <Button size="md" flex outline />;

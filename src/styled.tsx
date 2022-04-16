import * as React from 'react';
import { CSSObject } from '@emotion/css';
import { css, cx } from './emotion';
import { AtomOptions, atom } from './atom';

declare const defaultElement = 'div';

type VariantMap = Record<string, unknown>;
type Styler = CSSObject;

type ExtractVariants<T extends VariantMap> = { [K in keyof T]: boolean };

type StyledComponentProps<E extends React.ElementType, O extends AtomOptions> =
  React.ComponentPropsWithRef<E> & ExtractVariants<O>;

export declare type StyledComponent<
  E extends React.ElementType,
  S extends Styler,
  O extends AtomOptions
> = (
  styler: S,
  atomOptions: O
) => (props: StyledComponentProps<E, O>) => React.ReactElement | null;

export declare type Styled = <
  E extends React.ElementType = typeof defaultElement
>(
  Element: E
) => <S extends Styler, O extends AtomOptions>(
  styler: S,
  atomOptions: O
) => (props: StyledComponentProps<E, O>) => React.ReactElement | null;

const baseStyles = css({ boxSizing: 'border-box' });

export const styled: Styled =
  <E extends React.ElementType = typeof defaultElement>(baseElement: E) =>
  (
    styler: CSSObject = {},
    options: AtomOptions = { variants: {}, composes: [], defaultVariants: {} }
  ) => {
    const Component = baseElement || 'div';

    try {
      const styleAtom = atom(styler, options);

      const StyledComponent = React.forwardRef((props, ref) => {
        const { className, ...rest } = props;
        const classes = cx(baseStyles, styleAtom(rest), className);
        return <Component {...rest} className={classes} ref={ref} />;
      });

      return StyledComponent;
    } catch (err) {
      return (props: any) => <Component {...props} />;
    }
  };

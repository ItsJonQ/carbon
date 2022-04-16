import * as React from 'react';
import { css, cx } from './emotion';
import hash from '@emotion/hash';

type Props = {};
type Variant = string | 'true';
type Variants = {
  [key: string]: {
    [key: Variant]: React.CSSProperties;
  };
};
type CompiledVariants = {
  [key: string]: {
    [key: Variant]: string;
  };
};
type DefaultVariants = {
  [key: string]: Variant;
};

type AtomClassName = string;
type Atom = (props?: Props) => AtomClassName;
type Atoms = Array<Atom | AtomClassName>;
type AtomOptions = {
  variants?: Variants;
  defaultVariants?: DefaultVariants;
  composes?: Atoms;
};

const ATOM_ID = '__c6Id';
const ATOM_NAMESPACE = '__carbonAtom__';
const ATOM_VALUE = Symbol(ATOM_NAMESPACE);
const ATOM_CACHE: { [key: string]: any } = {};

/**
 * Generates a unique hash for atoms.
 */
const createAtomHash = (
  styler: React.CSSProperties = {},
  options: AtomOptions = {}
): string => {
  return hash(JSON.stringify({ styler, options })) || '';
};

/**
 * Compiles the styles and registers it into the cache.
 */
const compileAtom = (
  styler: React.CSSProperties = {},
  options: AtomOptions = {}
) => {
  const { variants = {}, composes = [] } = options;
  const atomId = createAtomHash(styler, options);
  const compiledVariants: CompiledVariants = {};

  for (const variant in variants) {
    compiledVariants[variant] = {};
    const variantSet = variants[variant];
    for (const key in variantSet) {
      // @ts-ignore
      compiledVariants[variant][key] = css(variantSet[key]);
    }
  }
  /**
   * It's valid to send in a React.CSSProperties style object to
   * Emotion's css() function.
   */
  // @ts-ignore
  const className = css(styler);
  /**
   * Compiled data to register (and return).
   */
  const data = {
    className,
    styler: className,
    variants: compiledVariants,
    composes,
    atomId,
  };
  /**
   * Registeres the compiled styles to the cache.
   */
  ATOM_CACHE[atomId] = data;

  return data;
};

const getProps = (props: Props = {}, defaultVariants: DefaultVariants = {}) => {
  const enhancedProps: Record<string, unknown> = { ...props };
  for (const variant in defaultVariants) {
    if (typeof enhancedProps[variant] !== 'undefined') continue;
    enhancedProps[variant] = defaultVariants[variant];
  }
  return enhancedProps;
};

export const atom = (
  styler: React.CSSProperties = {},
  options: AtomOptions = { variants: {}, composes: [], defaultVariants: {} }
) => {
  try {
    const classes: Array<string> = [];

    const {
      className: atomClassName,
      variants = {},
      composes = [],
      atomId,
    } = compileAtom(styler, options);

    classes.push(atomClassName);

    const styledAtom = (props?: Props): AtomClassName => {
      const enhancedProps = getProps(props, options?.defaultVariants);

      for (const composedAtom of composes) {
        if (typeof composedAtom === 'string') {
          classes.push(composedAtom);
        }
        if (typeof composedAtom === 'function') {
          classes.push(composedAtom(enhancedProps));
        }
      }

      for (const variant in variants) {
        const key = enhancedProps[variant];
        if (typeof key === 'undefined') continue;
        if (key !== enhancedProps[variant]) continue;
        // @ts-ignore
        const variantClass = variants?.[variant]?.[key];
        classes.push(variantClass);
      }

      return css(...classes);
    };
    // @ts-ignore
    styledAtom[ATOM_NAMESPACE] = ATOM_VALUE;
    // @ts-ignore
    styledAtom[ATOM_ID] = atomId;

    return styledAtom;
  } catch (err) {
    console.log(err);
    return () => '';
  }
};

export const styled =
  (Component: any = 'div') =>
  (
    styler: React.CSSProperties = {},
    options: AtomOptions = { variants: {}, composes: [], defaultVariants: {} }
  ) => {
    try {
      const styleAtom = atom(styler, options);

      const StyledComponent = React.forwardRef<any, any>((props: any, ref) => {
        const { className, ...rest } = props;
        const classes = cx(styleAtom(rest), className);
        return <Component {...rest} className={classes} ref={ref} />;
      });

      return StyledComponent;
    } catch (err) {
      return (props: any) => <Component {...props} />;
    }
  };

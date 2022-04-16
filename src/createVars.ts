import { injectGlobal } from './emotion';
import hash from '@emotion/hash';

export const createVars = (vars: Record<string, string | number> = {}) => {
  const compiledVars: Record<string, string> = {};
  const stylesForRoot: Record<string, string> = {};

  for (const variable in vars) {
    const value = String(vars[variable]);
    const variableHash = hash(`${variable}-${value}`);
    const variableName = `--${variable}-${variableHash}`;

    stylesForRoot[variableName] = value;
    compiledVars[variable] = `var(${variableName})`;
  }

  injectGlobal({ ':root': stylesForRoot });

  return compiledVars;
};

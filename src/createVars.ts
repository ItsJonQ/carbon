import { injectGlobal } from './emotion';
import hash from '@emotion/hash';

export const createVars = (vars: Record<string, string | number> = {}) => {
  const compiledVars: Record<string, string> = {};
  for (const variable in vars) {
    const value = vars[variable];
    const variableHash = hash(`${variable}-${value}`);
    const variableName = `--${variable}-${variableHash}`;

    injectGlobal({ ':root': { [variableName]: value } });
    compiledVars[variable] = `var(${variableName})`;
  }
  return compiledVars;
};
